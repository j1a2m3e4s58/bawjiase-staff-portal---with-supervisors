import os
import smtplib
from email.message import EmailMessage
from flask import Flask, jsonify, request
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

OFFICIAL_EMAIL_DOMAIN = "@bawjiasearearuralbank.com"

app = Flask(__name__)


def allowed_origins() -> set[str]:
    raw = os.getenv("ALLOWED_ORIGINS", "")
    return {item.strip() for item in raw.split(",") if item.strip()}


@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    origins = allowed_origins()
    if origin and origin in origins:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS"
    return response


def require_json():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return None, (jsonify({"error": "JSON body required"}), 400)
    return data, None


def validate_email(email: str) -> str:
    normalized = (email or "").strip().lower()
    if not normalized.endswith(OFFICIAL_EMAIL_DOMAIN):
        raise ValueError("Only official Bawjiase email addresses are allowed")
    return normalized


def mail_config() -> dict[str, str | int]:
    required = {
        "MAIL_SERVER": os.getenv("MAIL_SERVER", ""),
        "MAIL_USERNAME": os.getenv("MAIL_USERNAME", ""),
        "MAIL_PASSWORD": os.getenv("MAIL_PASSWORD", ""),
        "MAIL_DEFAULT_SENDER": os.getenv("MAIL_DEFAULT_SENDER", ""),
    }
    missing = [key for key, value in required.items() if not value]
    if missing:
        raise RuntimeError(f"Missing mail configuration: {', '.join(missing)}")
    return {
        **required,
        "MAIL_PORT": int(os.getenv("MAIL_PORT", "465")),
    }


def send_mail(to_email: str, subject: str, text_body: str, html_body: str):
    cfg = mail_config()
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = str(cfg["MAIL_DEFAULT_SENDER"])
    msg["To"] = to_email
    msg.set_content(text_body)
    msg.add_alternative(html_body, subtype="html")

    with smtplib.SMTP_SSL(str(cfg["MAIL_SERVER"]), int(cfg["MAIL_PORT"]), timeout=30) as smtp:
        smtp.login(str(cfg["MAIL_USERNAME"]), str(cfg["MAIL_PASSWORD"]))
        smtp.send_message(msg)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True})


@app.route("/api/send-verification-email", methods=["POST", "OPTIONS"])
def send_verification_email():
    if request.method == "OPTIONS":
        return ("", 204)
    data, error = require_json()
    if error:
        return error
    try:
        email = validate_email(str(data.get("email", "")))
        code = "".join(ch for ch in str(data.get("code", "")) if ch.isdigit())
        if len(code) != 6:
            return jsonify({"error": "A 6-digit verification code is required"}), 400
        text_body = (
            "Dear Staff,\n\n"
            f"Your Bawjiase Staff Portal verification code is: {code}\n\n"
            "Thank you.\nBawjiase Community Bank PLC"
        )
        html_body = f"""
        <html>
          <body style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
              <h2 style="color: #15803d; text-align: center;">Email Verification</h2>
              <p>Dear Staff,</p>
              <p>Use this code to verify your email address for the <strong>Bawjiase Staff Portal</strong>:</p>
              <div style="text-align: center; margin: 28px 0;">
                <span style="display: inline-block; border: 2px solid #15803d; color: #15803d; padding: 14px 28px; font-size: 24px; font-weight: 700; border-radius: 8px; letter-spacing: 5px;">{code}</span>
              </div>
              <p>If you did not request this code, please ignore this email.</p>
              <p style="font-weight: 700; color: #4b5563;">Bawjiase Community Bank PLC</p>
            </div>
          </body>
        </html>
        """
        send_mail(email, "Bawjiase Staff Portal - Email Verification Code", text_body, html_body)
        return jsonify({"ok": True})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        app.logger.exception("Verification email failed")
        return jsonify({"error": f"Email could not be sent: {exc}"}), 500


@app.route("/api/send-password-reset-email", methods=["POST", "OPTIONS"])
def send_password_reset_email():
    if request.method == "OPTIONS":
        return ("", 204)
    data, error = require_json()
    if error:
        return error
    try:
        email = validate_email(str(data.get("email", "")))
        reset_url = str(data.get("resetUrl", "")).strip()
        if not reset_url.startswith(("http://", "https://")):
            return jsonify({"error": "A valid resetUrl is required"}), 400
        text_body = (
            "Dear Staff,\n\n"
            "Use the link below to reset your Bawjiase Staff Portal password:\n"
            f"{reset_url}\n\n"
            "This link expires in 30 minutes.\n\n"
            "Bawjiase Community Bank PLC"
        )
        html_body = f"""
        <html>
          <body style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.6;">
            <div style="max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px;">
              <h2 style="color: #15803d; text-align: center;">Password Reset</h2>
              <p>Dear Staff,</p>
              <p>Use the button below to reset your Bawjiase Staff Portal password.</p>
              <p style="text-align: center; margin: 28px 0;">
                <a href="{reset_url}" style="background: #15803d; color: #ffffff; padding: 12px 22px; border-radius: 8px; text-decoration: none; font-weight: 700;">Reset Password</a>
              </p>
              <p>This link expires in 30 minutes.</p>
              <p style="font-weight: 700; color: #4b5563;">Bawjiase Community Bank PLC</p>
            </div>
          </body>
        </html>
        """
        send_mail(email, "Bawjiase Staff Portal - Password Reset", text_body, html_body)
        return jsonify({"ok": True})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        app.logger.exception("Password reset email failed")
        return jsonify({"error": f"Email could not be sent: {exc}"}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=int(os.getenv("PORT", "4185")))
