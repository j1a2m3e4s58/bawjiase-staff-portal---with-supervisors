import json
import os
import secrets
import smtplib
import tempfile
import time
from email.message import EmailMessage
from urllib.parse import urlencode, urlparse, urlunparse, parse_qsl

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

OFFICIAL_EMAIL_DOMAIN = "@bawjiasearearuralbank.com"
PRESENCE_STORE_PATH = os.path.join(BASE_DIR, "presence_store.json")
PASSWORD_STORE_PATH = os.path.join(BASE_DIR, "password_store.json")
USERS_STORE_PATH = os.path.join(BASE_DIR, "users_store.json")
PENDING_VERIFICATIONS_PATH = os.path.join(BASE_DIR, "pending_verifications.json")
RESET_TOKENS_PATH = os.path.join(BASE_DIR, "reset_tokens.json")
SESSIONS_STORE_PATH = os.path.join(BASE_DIR, "sessions_store.json")
ANNOUNCEMENTS_STORE_PATH = os.path.join(BASE_DIR, "announcements_store.json")
FORMS_STORE_PATH = os.path.join(BASE_DIR, "forms_store.json")
TRAINING_VIDEOS_STORE_PATH = os.path.join(BASE_DIR, "training_videos_store.json")
TRAINING_DOCUMENTS_STORE_PATH = os.path.join(BASE_DIR, "training_documents_store.json")
PRESENCE_TTL_SECONDS = 15 * 60
RESET_TOKEN_TTL_SECONDS = 30 * 60
VERIFICATION_TTL_SECONDS = 15 * 60
SESSION_TTL_SECONDS = 30 * 24 * 60 * 60
DEFAULT_PASSWORD_HASH = "403784255"  # Bcb@2026
IT_ACCESS_CODE = "BCB-IT-2026"
HR_ACCESS_CODE = "BCB-HR-2026"

INITIAL_USERS = [
    {
        "id": "db-user-6",
        "fullname": "Desmond Tettey Quarshie",
        "phone": "0243670230",
        "email": "dquarshie@bawjiasearearuralbank.com",
        "role": "GeneralStaff",
        "position": "Staff",
        "department": "BANKING OPERATIONS",
        "branch": "HEAD OFFICE",
        "imageFile": None,
        "isActive": True,
        "isVerified": True,
        "lastSeen": 1772637593885,
        "registrationTime": 0,
        "isArchived": False,
    },
    {
        "id": "db-user-9",
        "fullname": "Jane Afua Bruku",
        "phone": "0248154869",
        "email": "jbruku@bawjiasearearuralbank.com",
        "role": "GeneralStaff",
        "position": "Staff",
        "department": "COMPLIANCE",
        "branch": "HEAD OFFICE",
        "imageFile": None,
        "isActive": True,
        "isVerified": True,
        "lastSeen": 1770741882598,
        "registrationTime": 0,
        "isArchived": False,
    },
    {
        "id": "db-user-5",
        "fullname": "Kwabena Asare",
        "phone": "0599779664",
        "email": "kasare@bawjiasearearuralbank.com",
        "role": "GeneralStaff",
        "position": "Staff",
        "department": "COMPLIANCE",
        "branch": "HEAD OFFICE",
        "imageFile": None,
        "isActive": True,
        "isVerified": True,
        "lastSeen": 1770990814598,
        "registrationTime": 0,
        "isArchived": False,
    },
    {
        "id": "db-user-8",
        "fullname": "Kwesi Adu Snr Yeenu-Prah",
        "phone": "0555443053",
        "email": "kyeenu-prah@bawjiasearearuralbank.com",
        "role": "HRAdmin",
        "position": "Staff",
        "department": "HR",
        "branch": "HEAD OFFICE",
        "imageFile": "profile_pics/f658de3c2aa8ca6d.jpeg",
        "isActive": True,
        "isVerified": True,
        "lastSeen": 1770296150530,
        "registrationTime": 0,
        "isArchived": False,
    },
    {
        "id": "db-user-4",
        "fullname": "Ato Asiedu Mensah",
        "phone": "0247554428",
        "email": "amensah@bawjiasearearuralbank.com",
        "role": "SuperAdmin",
        "position": "Staff",
        "department": "IT",
        "branch": "HEAD OFFICE",
        "imageFile": None,
        "isActive": True,
        "isVerified": True,
        "lastSeen": 1770975614364,
        "registrationTime": 0,
        "isArchived": False,
    },
    {
        "id": "db-user-2",
        "fullname": "James Lincoln Awuah",
        "phone": "0536799490",
        "email": "lawuah@bawjiasearearuralbank.com",
        "role": "SuperAdmin",
        "position": "Staff",
        "department": "IT",
        "branch": "HEAD OFFICE",
        "imageFile": "profile_pics/88efb134d068db11.jpg",
        "isActive": True,
        "isVerified": True,
        "lastSeen": 1775309044811,
        "registrationTime": 0,
        "isArchived": False,
    },
    {
        "id": "db-user-3",
        "fullname": "Nathaniel Oglie Narh",
        "phone": "0246377830",
        "email": "nnarh@bawjiasearearuralbank.com",
        "role": "SuperAdmin",
        "position": "Staff",
        "department": "IT",
        "branch": "HEAD OFFICE",
        "imageFile": None,
        "isActive": True,
        "isVerified": True,
        "lastSeen": 1769519876185,
        "registrationTime": 0,
        "isArchived": False,
    },
    {
        "id": "db-user-7",
        "fullname": "GABRIEL OWUSU",
        "phone": "0246315586",
        "email": "gowusu@bawjiasearearuralbank.com",
        "role": "GeneralStaff",
        "position": "Staff",
        "department": "RECOVERY",
        "branch": "HEAD OFFICE",
        "imageFile": None,
        "isActive": True,
        "isVerified": True,
        "lastSeen": 1769689048721,
        "registrationTime": 0,
        "isArchived": False,
    },
]
DEFAULT_PASSWORD_HASHES = {
    user["email"]: DEFAULT_PASSWORD_HASH
    for user in INITIAL_USERS
}

app = Flask(__name__)


def allowed_origins() -> set[str]:
    raw = os.getenv("ALLOWED_ORIGINS", "")
    return {item.strip() for item in raw.split(",") if item.strip()}


@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    origins = allowed_origins()
    if "*" in origins:
        response.headers["Access-Control-Allow-Origin"] = origin or "*"
        response.headers["Vary"] = "Origin"
    elif origin and origin in origins:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Vary"] = "Origin"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
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


def role_from_department(department: str) -> str:
    normalized = (department or "").strip().upper()
    if normalized == "IT":
        return "SuperAdmin"
    if normalized == "HR":
        return "HRAdmin"
    return "GeneralStaff"


def now_ms() -> int:
    return int(time.time() * 1000)


def now_seconds() -> int:
    return int(time.time())


def legacy_hash_password(password: str) -> str:
    h = 0
    for char in password:
        h = ((31 * h) + ord(char)) & 0xFFFFFFFF
        if h & 0x80000000:
            h -= 0x100000000
    return str(abs(h))


def is_secure_password_hash(value: str) -> bool:
    return value.startswith("pbkdf2:") or value.startswith("scrypt:")


def hash_password_for_storage(password: str) -> str:
    return generate_password_hash(password)


def verify_password(stored_value: str, password: str) -> bool:
    if is_secure_password_hash(stored_value):
        try:
            return check_password_hash(stored_value, password)
        except ValueError:
            return False
    return stored_value == legacy_hash_password(password)


def atomic_write_json(path: str, payload) -> None:
    directory = os.path.dirname(path)
    fd, tmp_path = tempfile.mkstemp(prefix="tmp-", suffix=".json", dir=directory)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(payload, handle, ensure_ascii=True, indent=2)
        os.replace(tmp_path, path)
    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)


def read_json_file(path: str, default):
    if not os.path.exists(path):
        return default
    try:
        with open(path, "r", encoding="utf-8") as handle:
            return json.load(handle)
    except Exception:
        return default


def normalize_user(raw: dict) -> dict:
    email = validate_email(str(raw.get("email", "")))
    department = str(raw.get("department", "")).strip().upper()
    branch = str(raw.get("branch", "")).strip().upper()
    return {
        "id": str(raw.get("id", "")).strip(),
        "fullname": str(raw.get("fullname", "")).strip(),
        "phone": str(raw.get("phone", "")).strip(),
        "email": email,
        "role": str(raw.get("role", role_from_department(department))).strip() or role_from_department(department),
        "position": str(raw.get("position", "")).strip() or "Staff",
        "department": department,
        "branch": branch,
        "imageFile": raw.get("imageFile"),
        "isActive": bool(raw.get("isActive", True)),
        "isVerified": bool(raw.get("isVerified", True)),
        "lastSeen": int(raw.get("lastSeen", 0) or 0),
        "registrationTime": int(raw.get("registrationTime", 0) or 0),
        "isArchived": bool(raw.get("isArchived", False)),
    }


def load_user_store() -> list[dict]:
    raw = read_json_file(USERS_STORE_PATH, [])
    users_by_email = {}
    for default_user in INITIAL_USERS:
        normalized = normalize_user(default_user)
        users_by_email[normalized["email"]] = normalized
    if isinstance(raw, list):
        for item in raw:
            if isinstance(item, dict):
                try:
                    normalized = normalize_user(item)
                    users_by_email[normalized["email"]] = normalized
                except ValueError:
                    continue
    return list(users_by_email.values())


def save_user_store(users: list[dict]) -> None:
    normalized = []
    for user in users:
        try:
            normalized.append(normalize_user(user))
        except ValueError:
            continue
    atomic_write_json(USERS_STORE_PATH, normalized)


def find_user_by_email(users: list[dict], email: str):
    return next((user for user in users if user["email"] == email), None)


def find_user_by_id(users: list[dict], user_id: str):
    return next((user for user in users if user["id"] == user_id), None)


def load_presence_store() -> dict[str, int]:
    raw = read_json_file(PRESENCE_STORE_PATH, {})
    if not isinstance(raw, dict):
        return {}
    return {
        str(user_id): int(timestamp)
        for user_id, timestamp in raw.items()
        if str(user_id) and isinstance(timestamp, (int, float, str))
    }


def save_presence_store(store: dict[str, int]) -> None:
    atomic_write_json(PRESENCE_STORE_PATH, store)


def prune_presence(store: dict[str, int]) -> dict[str, int]:
    cutoff = int(time.time()) - PRESENCE_TTL_SECONDS
    return {
        str(user_id): int(timestamp)
        for user_id, timestamp in store.items()
        if int(timestamp) >= cutoff
    }


def load_password_store() -> dict[str, str]:
    raw = read_json_file(PASSWORD_STORE_PATH, {})
    merged = dict(DEFAULT_PASSWORD_HASHES)
    if isinstance(raw, dict):
        for email, password_hash in raw.items():
            if isinstance(email, str) and isinstance(password_hash, str) and password_hash:
                merged[email.strip().lower()] = password_hash
    return merged


def save_password_store(store: dict[str, str]) -> None:
    normalized = {
        str(email).strip().lower(): str(password_hash).strip()
        for email, password_hash in store.items()
        if str(email).strip() and str(password_hash).strip()
    }
    atomic_write_json(PASSWORD_STORE_PATH, normalized)


def load_pending_verifications() -> dict[str, dict]:
    raw = read_json_file(PENDING_VERIFICATIONS_PATH, {})
    if not isinstance(raw, dict):
        return {}
    pending = {}
    current = int(time.time())
    for email, item in raw.items():
        if not isinstance(item, dict):
            continue
        try:
            normalized_email = validate_email(email)
        except ValueError:
            continue
        expires_at = int(item.get("expiresAt", 0) or 0)
        if expires_at <= current:
            continue
        user = item.get("user")
        password_hash = str(item.get("passwordHash", "")).strip()
        code = "".join(ch for ch in str(item.get("code", "")) if ch.isdigit())
        if not isinstance(user, dict) or len(code) != 6 or not password_hash:
            continue
        try:
            pending[normalized_email] = {
                "user": normalize_user(user),
                "passwordHash": password_hash,
                "code": code,
                "expiresAt": expires_at,
            }
        except ValueError:
            continue
    return pending


def save_pending_verifications(store: dict[str, dict]) -> None:
    atomic_write_json(PENDING_VERIFICATIONS_PATH, store)


def load_reset_tokens() -> dict[str, dict]:
    raw = read_json_file(RESET_TOKENS_PATH, {})
    if not isinstance(raw, dict):
        return {}
    current = int(time.time())
    tokens = {}
    for token, item in raw.items():
        if not isinstance(token, str) or not isinstance(item, dict):
            continue
        expires_at = int(item.get("expiresAt", 0) or 0)
        if expires_at <= current:
            continue
        try:
            email = validate_email(str(item.get("email", "")))
        except ValueError:
            continue
        tokens[token] = {
            "email": email,
            "expiresAt": expires_at,
        }
    return tokens


def save_reset_tokens(store: dict[str, dict]) -> None:
    atomic_write_json(RESET_TOKENS_PATH, store)


def load_json_list_store(path: str) -> list[dict]:
    raw = read_json_file(path, [])
    return raw if isinstance(raw, list) else []


def save_json_list_store(path: str, items: list[dict]) -> None:
    atomic_write_json(path, items)


def next_content_id(items: list[dict], floor: int = 1000) -> int:
    current = floor - 1
    for item in items:
        try:
            current = max(current, int(item.get("id", 0) or 0))
        except Exception:
            continue
    return current + 1


def load_sessions() -> dict[str, dict]:
    raw = read_json_file(SESSIONS_STORE_PATH, {})
    if not isinstance(raw, dict):
        return {}
    current = now_seconds()
    sessions = {}
    for token, item in raw.items():
        if not isinstance(token, str) or not isinstance(item, dict):
            continue
        user_id = str(item.get("userId", "")).strip()
        expires_at = int(item.get("expiresAt", 0) or 0)
        if not user_id or expires_at <= current:
            continue
        sessions[token] = {
            "userId": user_id,
            "expiresAt": expires_at,
        }
    return sessions


def save_sessions(store: dict[str, dict]) -> None:
    atomic_write_json(SESSIONS_STORE_PATH, store)


def issue_session(user_id: str) -> str:
    sessions = load_sessions()
    token = secrets.token_urlsafe(32)
    sessions[token] = {
        "userId": user_id,
        "expiresAt": now_seconds() + SESSION_TTL_SECONDS,
    }
    save_sessions(sessions)
    return token


def revoke_session(token: str) -> None:
    sessions = load_sessions()
    if token in sessions:
        sessions.pop(token, None)
        save_sessions(sessions)


def revoke_user_sessions(user_id: str) -> None:
    sessions = load_sessions()
    filtered = {
        token: session
        for token, session in sessions.items()
        if session.get("userId") != user_id
    }
    if filtered != sessions:
        save_sessions(filtered)


def parse_bearer_token() -> str:
    header = str(request.headers.get("Authorization", "")).strip()
    if not header.startswith("Bearer "):
        return ""
    return header[7:].strip()


def require_authenticated_user():
    token = parse_bearer_token()
    if not token:
        return None, None, (jsonify({"error": "Authentication required"}), 401)
    sessions = load_sessions()
    session = sessions.get(token)
    if not session:
        return None, None, (jsonify({"error": "Invalid or expired session"}), 401)
    users = load_user_store()
    user = find_user_by_id(users, session["userId"])
    if not user or user["isArchived"] or not user["isActive"] or not user["isVerified"]:
        revoke_session(token)
        return None, None, (jsonify({"error": "Invalid or expired session"}), 401)
    return token, user, None


def require_staff_manager():
    token, user, error = require_authenticated_user()
    if error:
        return token, user, error
    if user["role"] not in {"SuperAdmin", "HRAdmin"}:
        return token, user, (jsonify({"error": "Admin access required"}), 403)
    return token, user, None


def generate_verification_code() -> str:
    return f"{secrets.randbelow(900000) + 100000:06d}"


def build_reset_url(base_url: str, token: str) -> str:
    parsed = urlparse(base_url)
    if parsed.scheme not in {"http", "https"} or not parsed.netloc:
        raise ValueError("A valid reset page URL is required")
    query = dict(parse_qsl(parsed.query, keep_blank_values=True))
    query["token"] = token
    return urlunparse(parsed._replace(query=urlencode(query)))


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


def send_verification_code_email(email: str, code: str) -> None:
    text_body = (
        "Dear Staff,\n\n"
        f"Your Bawjiase Staff Portal verification code is: {code}\n\n"
        "This code expires in 15 minutes.\n\n"
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
          <p>This code expires in 15 minutes.</p>
          <p>If you did not request this code, please ignore this email.</p>
          <p style="font-weight: 700; color: #4b5563;">Bawjiase Community Bank PLC</p>
        </div>
      </body>
    </html>
    """
    send_mail(email, "Bawjiase Staff Portal - Email Verification Code", text_body, html_body)


def send_password_reset_link_email(email: str, reset_url: str) -> None:
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


def handle_options():
    if request.method == "OPTIONS":
        return ("", 204)
    return None


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True})


@app.route("/api/presence", methods=["GET"])
def get_presence():
    _, _, error = require_authenticated_user()
    if error:
        return error
    store = prune_presence(load_presence_store())
    save_presence_store(store)
    return jsonify({"presence": store})


@app.route("/api/presence/ping", methods=["POST", "OPTIONS"])
def ping_presence():
    preflight = handle_options()
    if preflight:
        return preflight
    _, auth_user, error = require_authenticated_user()
    if error:
        return error
    data, error = require_json()
    if error:
        return error
    user_id = str(data.get("userId", "")).strip()
    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    if auth_user["id"] != user_id:
        return jsonify({"error": "Cannot update another user's presence"}), 403
    store = prune_presence(load_presence_store())
    store[user_id] = int(time.time())
    save_presence_store(store)
    return jsonify({"ok": True, "lastSeen": store[user_id]})


@app.route("/api/presence/logout", methods=["POST", "OPTIONS"])
def logout_presence():
    preflight = handle_options()
    if preflight:
        return preflight
    _, auth_user, error = require_authenticated_user()
    if error:
        return error
    data, error = require_json()
    if error:
        return error
    user_id = str(data.get("userId", "")).strip()
    if not user_id:
        return jsonify({"error": "userId is required"}), 400
    if auth_user["id"] != user_id:
        return jsonify({"error": "Cannot update another user's presence"}), 403
    store = prune_presence(load_presence_store())
    store.pop(user_id, None)
    save_presence_store(store)
    return jsonify({"ok": True})


@app.route("/api/users", methods=["GET"])
def list_users():
    _, _, error = require_authenticated_user()
    if error:
        return error
    return jsonify({"users": load_user_store()})


@app.route("/api/users/<user_id>", methods=["GET"])
def get_user(user_id: str):
    _, auth_user, error = require_authenticated_user()
    if error:
        return error
    if auth_user["id"] != user_id and auth_user["role"] not in {"SuperAdmin", "HRAdmin"}:
        return jsonify({"error": "Access denied"}), 403
    users = load_user_store()
    user = find_user_by_id(users, user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"user": user})


@app.route("/api/users/<user_id>/profile", methods=["POST", "OPTIONS"])
def update_profile(user_id: str):
    preflight = handle_options()
    if preflight:
        return preflight
    _, auth_user, error = require_authenticated_user()
    if error:
        return error
    if auth_user["id"] != user_id and auth_user["role"] not in {"SuperAdmin", "HRAdmin"}:
        return jsonify({"error": "Access denied"}), 403
    data, error = require_json()
    if error:
        return error
    users = load_user_store()
    user = find_user_by_id(users, user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    can_manage_org_fields = auth_user["role"] in {"SuperAdmin", "HRAdmin"}
    if "fullname" in data:
        user["fullname"] = str(data.get("fullname", "")).strip() or user["fullname"]
    if "phone" in data:
        user["phone"] = str(data.get("phone", "")).strip() or user["phone"]
    if "position" in data:
        user["position"] = str(data.get("position", "")).strip() or user["position"]
    if "department" in data and can_manage_org_fields:
        department = str(data.get("department", "")).strip().upper()
        if department:
            user["department"] = department
            user["role"] = role_from_department(department)
    if "branch" in data and can_manage_org_fields:
        branch = str(data.get("branch", "")).strip().upper()
        if branch:
            user["branch"] = branch
    if "imageFile" in data:
        image_file = data.get("imageFile")
        user["imageFile"] = str(image_file) if image_file else None
    save_user_store(users)
    return jsonify({"ok": True, "user": user})


@app.route("/api/staff/active", methods=["GET"])
def get_active_staff():
    _, _, error = require_authenticated_user()
    if error:
        return error
    users = load_user_store()
    active_users = [
        user for user in users
        if user["isActive"] and not user["isArchived"] and user["fullname"] not in {"MASTER ADMIN", "System Admin"}
    ]
    return jsonify({"users": active_users})


@app.route("/api/staff/archived", methods=["GET"])
def get_archived_staff():
    _, _, error = require_authenticated_user()
    if error:
        return error
    users = load_user_store()
    return jsonify({"users": [user for user in users if user["isArchived"]]})


@app.route("/api/staff/stats", methods=["GET"])
def get_staff_stats():
    _, _, error = require_authenticated_user()
    if error:
        return error
    users = load_user_store()
    active = [user for user in users if user["isActive"] and not user["isArchived"]]
    by_department = {}
    by_branch = {}
    by_role = {}
    for user in active:
        by_department[user["department"]] = by_department.get(user["department"], 0) + 1
        by_branch[user["branch"]] = by_branch.get(user["branch"], 0) + 1
        by_role[user["role"]] = by_role.get(user["role"], 0) + 1
    return jsonify({
        "total": len(users),
        "active": len(active),
        "archived": len([user for user in users if user["isArchived"]]),
        "byDepartment": by_department,
        "byBranch": by_branch,
        "byRole": by_role,
    })


@app.route("/api/staff/<user_id>", methods=["GET"])
def get_staff_member(user_id: str):
    _, _, error = require_authenticated_user()
    if error:
        return error
    users = load_user_store()
    user = find_user_by_id(users, user_id)
    if not user:
        return jsonify({"error": "Staff member not found"}), 404
    return jsonify({"user": user})


@app.route("/api/staff/<user_id>/update", methods=["POST", "OPTIONS"])
def update_staff(user_id: str):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    data, error = require_json()
    if error:
        return error
    users = load_user_store()
    user = find_user_by_id(users, user_id)
    if not user:
        return jsonify({"error": "Staff member not found"}), 404

    requested_department = str(data.get("department", user["department"])).strip().upper()
    if requested_department == "IT" and user["department"] != "IT":
        if str(data.get("accessCode", "")).strip() != IT_ACCESS_CODE:
            return jsonify({"error": "Access denied: invalid IT security code."}), 400

    if "fullname" in data:
        user["fullname"] = str(data.get("fullname", "")).strip() or user["fullname"]
    if "phone" in data:
        user["phone"] = str(data.get("phone", "")).strip() or user["phone"]
    if "position" in data:
        user["position"] = str(data.get("position", "")).strip() or user["position"]
    if "department" in data and requested_department:
        user["department"] = requested_department
        user["role"] = role_from_department(requested_department)
    if "branch" in data:
        branch = str(data.get("branch", "")).strip().upper()
        if branch:
            user["branch"] = branch
    if "imageFile" in data:
        image_file = data.get("imageFile")
        user["imageFile"] = str(image_file) if image_file else None
    if "isActive" in data:
        user["isActive"] = bool(data.get("isActive"))
    save_user_store(users)
    return jsonify({"ok": True, "user": user})


@app.route("/api/staff/<user_id>/archive", methods=["POST", "OPTIONS"])
def archive_staff(user_id: str):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    users = load_user_store()
    user = find_user_by_id(users, user_id)
    if not user:
        return jsonify({"error": "Staff member not found"}), 404
    if user["role"] == "SuperAdmin":
        return jsonify({"error": "Cannot archive Super Admin."}), 400
    user["isArchived"] = True
    user["isActive"] = False
    save_user_store(users)
    revoke_user_sessions(user_id)
    return jsonify({"ok": True})


@app.route("/api/staff/<user_id>/restore", methods=["POST", "OPTIONS"])
def restore_staff(user_id: str):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    users = load_user_store()
    user = find_user_by_id(users, user_id)
    if not user:
        return jsonify({"error": "Staff member not found"}), 404
    user["isArchived"] = False
    user["isActive"] = True
    save_user_store(users)
    return jsonify({"ok": True})


@app.route("/api/staff/<user_id>/delete", methods=["POST", "OPTIONS"])
def delete_staff(user_id: str):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    users = load_user_store()
    user = find_user_by_id(users, user_id)
    if not user:
        return jsonify({"error": "Staff member not found"}), 404
    users = [item for item in users if item["id"] != user_id]
    passwords = load_password_store()
    passwords.pop(user["email"], None)
    pending = load_pending_verifications()
    pending.pop(user["email"], None)
    save_user_store(users)
    save_password_store(passwords)
    save_pending_verifications(pending)
    revoke_user_sessions(user_id)
    return jsonify({"ok": True})


@app.route("/api/auth/register", methods=["POST", "OPTIONS"])
def auth_register():
    preflight = handle_options()
    if preflight:
        return preflight
    data, error = require_json()
    if error:
        return error
    try:
        email = validate_email(str(data.get("email", "")))
        password = str(data.get("passwordHash", ""))
        department = str(data.get("department", "")).strip().upper()
        branch = str(data.get("branch", "")).strip().upper()
        if not password:
            return jsonify({"error": "Password is required"}), 400
        if len(password) < 8:
            return jsonify({"error": "Password must be at least 8 characters"}), 400
        if not department or not branch:
            return jsonify({"error": "Department and branch are required"}), 400
        if department == "IT" and str(data.get("accessCode", "")).strip() != IT_ACCESS_CODE:
            return jsonify({"error": "Incorrect IT access code. Registration blocked."}), 400
        if department == "HR" and str(data.get("accessCode", "")).strip() != HR_ACCESS_CODE:
            return jsonify({"error": "Incorrect HR access code. Registration blocked."}), 400

        users = load_user_store()
        existing = find_user_by_email(users, email)
        if existing and existing["isVerified"]:
            return jsonify({"error": "Email already registered"}), 400

        pending = load_pending_verifications()
        new_user = normalize_user({
            "id": existing["id"] if existing else f"user-{int(time.time() * 1000)}",
            "fullname": str(data.get("fullname", "")).strip(),
            "phone": str(data.get("phone", "")).strip(),
            "email": email,
            "role": role_from_department(department),
            "position": str(data.get("position", "Staff")).strip() or "Staff",
            "department": department,
            "branch": branch,
            "imageFile": None,
            "isActive": True,
            "isVerified": False,
            "lastSeen": now_ms(),
            "registrationTime": now_ms(),
            "isArchived": False,
        })
        code = generate_verification_code()
        pending[email] = {
            "user": new_user,
            "passwordHash": hash_password_for_storage(password),
            "code": code,
            "expiresAt": int(time.time()) + VERIFICATION_TTL_SECONDS,
        }
        save_pending_verifications(pending)
        send_verification_code_email(email, code)
        return jsonify({"ok": True, "user": new_user})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        app.logger.exception("Registration failed")
        return jsonify({"error": f"Registration failed: {exc}"}), 500


@app.route("/api/auth/verify-email", methods=["POST", "OPTIONS"])
def auth_verify_email():
    preflight = handle_options()
    if preflight:
        return preflight
    data, error = require_json()
    if error:
        return error
    try:
        email = validate_email(str(data.get("email", "")))
        code = "".join(ch for ch in str(data.get("code", "")) if ch.isdigit())
        if len(code) != 6:
            return jsonify({"error": "A 6-digit verification code is required"}), 400

        pending = load_pending_verifications()
        entry = pending.get(email)
        if not entry:
            return jsonify({"error": "No pending verification for this email"}), 404
        if entry["code"] != code:
            return jsonify({"error": "Incorrect verification code"}), 400

        user = entry["user"]
        user["isVerified"] = True

        users = load_user_store()
        existing = find_user_by_email(users, email)
        if existing:
            existing.update(user)
        else:
            users.append(user)

        passwords = load_password_store()
        passwords[email] = entry["passwordHash"]

        pending.pop(email, None)
        save_user_store(users)
        save_password_store(passwords)
        save_pending_verifications(pending)
        return jsonify({"ok": True, "user": user})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400


@app.route("/api/auth/resend-verification", methods=["POST", "OPTIONS"])
def auth_resend_verification():
    preflight = handle_options()
    if preflight:
        return preflight
    data, error = require_json()
    if error:
        return error
    try:
        email = validate_email(str(data.get("email", "")))
        pending = load_pending_verifications()
        entry = pending.get(email)
        if not entry:
            return jsonify({"error": "Email not found"}), 404
        entry["code"] = generate_verification_code()
        entry["expiresAt"] = int(time.time()) + VERIFICATION_TTL_SECONDS
        pending[email] = entry
        save_pending_verifications(pending)
        send_verification_code_email(email, entry["code"])
        return jsonify({"ok": True})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        app.logger.exception("Verification email failed")
        return jsonify({"error": f"Email could not be sent: {exc}"}), 500


@app.route("/api/auth/login", methods=["POST", "OPTIONS"])
def auth_login():
    preflight = handle_options()
    if preflight:
        return preflight
    data, error = require_json()
    if error:
        return error
    try:
        email = validate_email(str(data.get("email", "")))
        password = str(data.get("passwordHash", ""))
        if not password:
            return jsonify({"error": "Password is required"}), 400

        passwords = load_password_store()
        stored_password = passwords.get(email)
        if not stored_password or not verify_password(stored_password, password):
            return jsonify({"error": "Invalid email or password"}), 401

        users = load_user_store()
        user = find_user_by_email(users, email)
        if not user or user["isArchived"] or not user["isActive"]:
            return jsonify({"error": "Invalid email or password"}), 401
        if not user["isVerified"]:
            return jsonify({"error": "Email not verified"}), 403

        if not is_secure_password_hash(stored_password):
            passwords[email] = hash_password_for_storage(password)
            save_password_store(passwords)

        user["lastSeen"] = now_ms()
        save_user_store(users)
        session_token = issue_session(user["id"])
        return jsonify({"ok": True, "user": user, "sessionToken": session_token})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400


@app.route("/api/auth/logout", methods=["POST", "OPTIONS"])
def auth_logout():
    preflight = handle_options()
    if preflight:
        return preflight
    token, _, error = require_authenticated_user()
    if error:
        return error
    revoke_session(token)
    return jsonify({"ok": True})


@app.route("/api/auth/request-password-reset", methods=["POST", "OPTIONS"])
def auth_request_password_reset():
    preflight = handle_options()
    if preflight:
        return preflight
    data, error = require_json()
    if error:
        return error
    try:
        email = validate_email(str(data.get("email", "")))
        reset_page_url = str(data.get("resetPageUrl", "")).strip()

        users = load_user_store()
        user = find_user_by_email(users, email)
        if not user:
            return jsonify({"error": "Email not found"}), 404

        token = secrets.token_urlsafe(32)
        reset_url = build_reset_url(reset_page_url, token)
        tokens = load_reset_tokens()
        tokens[token] = {
            "email": email,
            "expiresAt": int(time.time()) + RESET_TOKEN_TTL_SECONDS,
        }
        save_reset_tokens(tokens)
        send_password_reset_link_email(email, reset_url)
        return jsonify({"ok": True})
    except ValueError as exc:
        return jsonify({"error": str(exc)}), 400
    except Exception as exc:
        app.logger.exception("Password reset email failed")
        return jsonify({"error": f"Email could not be sent: {exc}"}), 500


@app.route("/api/auth/password-reset", methods=["POST", "OPTIONS"])
def auth_password_reset():
    preflight = handle_options()
    if preflight:
        return preflight
    data, error = require_json()
    if error:
        return error
    token = str(data.get("token", "")).strip()
    new_password = str(data.get("newPasswordHash", ""))
    if not token:
        return jsonify({"error": "token is required"}), 400
    if not new_password:
        return jsonify({"error": "Password is required"}), 400
    if len(new_password) < 8:
        return jsonify({"error": "Password must be at least 8 characters"}), 400

    tokens = load_reset_tokens()
    entry = tokens.get(token)
    if not entry:
        return jsonify({"error": "Invalid or expired reset token"}), 400

    email = entry["email"]
    users = load_user_store()
    if not find_user_by_email(users, email):
        return jsonify({"error": "Invalid or expired reset token"}), 400

    passwords = load_password_store()
    passwords[email] = hash_password_for_storage(new_password)
    tokens.pop(token, None)
    save_password_store(passwords)
    save_reset_tokens(tokens)
    user = find_user_by_email(users, email)
    if user:
        revoke_user_sessions(user["id"])
    return jsonify({"ok": True})


@app.route("/api/content/announcements", methods=["GET"])
def get_shared_announcements():
    _, _, error = require_authenticated_user()
    if error:
        return error
    return jsonify({"announcements": load_json_list_store(ANNOUNCEMENTS_STORE_PATH)})


@app.route("/api/content/announcements", methods=["POST", "OPTIONS"])
def create_shared_announcement():
    preflight = handle_options()
    if preflight:
        return preflight
    _, actor, error = require_authenticated_user()
    if error:
        return error
    data, error = require_json()
    if error:
        return error
    items = load_json_list_store(ANNOUNCEMENTS_STORE_PATH)
    poll = data.get("poll")
    announcement = {
        "id": next_content_id(items),
        "title": str(data.get("title", "")).strip(),
        "content": str(data.get("content", "")).strip(),
        "category": str(data.get("category", "")).strip() or actor["department"],
        "imageUrl": data.get("imageUrl"),
        "fileUrl": data.get("fileUrl"),
        "attachmentName": data.get("attachmentName"),
        "allowDownload": bool(data.get("allowDownload", True)),
        "authorId": actor["id"],
        "authorName": actor["fullname"],
        "createdAt": now_ms(),
        "updatedAt": now_ms(),
        "isDismissed": False,
        "isTrashed": False,
        "poll": poll if isinstance(poll, dict) else None,
    }
    items.insert(0, announcement)
    save_json_list_store(ANNOUNCEMENTS_STORE_PATH, items)
    return jsonify({"ok": True, "announcement": announcement})


@app.route("/api/content/announcements/<int:item_id>/update", methods=["POST", "OPTIONS"])
def update_shared_announcement(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_authenticated_user()
    if error:
        return error
    data, error = require_json()
    if error:
        return error
    items = load_json_list_store(ANNOUNCEMENTS_STORE_PATH)
    announcement = next((item for item in items if int(item.get("id", 0) or 0) == item_id), None)
    if not announcement:
        return jsonify({"error": "Announcement not found"}), 404
    for key in ["title", "content", "category", "imageUrl", "fileUrl", "attachmentName", "allowDownload"]:
        if key in data:
            announcement[key] = data.get(key)
    if "poll" in data:
        announcement["poll"] = data.get("poll") if isinstance(data.get("poll"), dict) else None
    announcement["updatedAt"] = now_ms()
    save_json_list_store(ANNOUNCEMENTS_STORE_PATH, items)
    return jsonify({"ok": True, "announcement": announcement})


@app.route("/api/content/announcements/<int:item_id>/trash", methods=["POST", "OPTIONS"])
def trash_shared_announcement(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_authenticated_user()
    if error:
        return error
    items = load_json_list_store(ANNOUNCEMENTS_STORE_PATH)
    announcement = next((item for item in items if int(item.get("id", 0) or 0) == item_id), None)
    if not announcement:
        return jsonify({"error": "Announcement not found"}), 404
    announcement["isTrashed"] = True
    announcement["updatedAt"] = now_ms()
    save_json_list_store(ANNOUNCEMENTS_STORE_PATH, items)
    return jsonify({"ok": True})


@app.route("/api/content/announcements/<int:item_id>/restore", methods=["POST", "OPTIONS"])
def restore_shared_announcement(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_authenticated_user()
    if error:
        return error
    items = load_json_list_store(ANNOUNCEMENTS_STORE_PATH)
    announcement = next((item for item in items if int(item.get("id", 0) or 0) == item_id), None)
    if not announcement:
        return jsonify({"error": "Announcement not found"}), 404
    announcement["isTrashed"] = False
    announcement["updatedAt"] = now_ms()
    save_json_list_store(ANNOUNCEMENTS_STORE_PATH, items)
    return jsonify({"ok": True})


@app.route("/api/content/announcements/<int:item_id>/delete", methods=["POST", "OPTIONS"])
def delete_shared_announcement(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_authenticated_user()
    if error:
        return error
    items = load_json_list_store(ANNOUNCEMENTS_STORE_PATH)
    filtered = [item for item in items if int(item.get("id", 0) or 0) != item_id]
    if len(filtered) == len(items):
        return jsonify({"error": "Announcement not found"}), 404
    save_json_list_store(ANNOUNCEMENTS_STORE_PATH, filtered)
    return jsonify({"ok": True})


@app.route("/api/content/announcements/empty-trash", methods=["POST", "OPTIONS"])
def empty_shared_announcement_trash():
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_authenticated_user()
    if error:
        return error
    items = load_json_list_store(ANNOUNCEMENTS_STORE_PATH)
    save_json_list_store(
        ANNOUNCEMENTS_STORE_PATH,
        [item for item in items if not bool(item.get("isTrashed", False))],
    )
    return jsonify({"ok": True})


@app.route("/api/content/forms", methods=["GET"])
def get_shared_forms():
    _, _, error = require_authenticated_user()
    if error:
        return error
    return jsonify({"forms": load_json_list_store(FORMS_STORE_PATH)})


@app.route("/api/content/forms", methods=["POST", "OPTIONS"])
def create_shared_form():
    preflight = handle_options()
    if preflight:
        return preflight
    _, actor, error = require_staff_manager()
    if error:
        return error
    data, error = require_json()
    if error:
        return error
    items = load_json_list_store(FORMS_STORE_PATH)
    form = {
        "id": next_content_id(items),
        "title": str(data.get("title", "")).strip(),
        "description": str(data.get("description", "")).strip(),
        "fileUrl": str(data.get("fileUrl", "")).strip(),
        "category": str(data.get("category", "")).strip() or actor["department"],
        "visibleTo": data.get("visibleTo") if isinstance(data.get("visibleTo"), list) else ["GeneralStaff", "HRAdmin", "SuperAdmin"],
        "visibility": str(data.get("visibility", "General")).strip() or "General",
        "department": data.get("department"),
        "createdAt": now_ms(),
        "updatedAt": now_ms(),
    }
    items.insert(0, form)
    save_json_list_store(FORMS_STORE_PATH, items)
    return jsonify({"ok": True, "form": form})


@app.route("/api/content/forms/<int:item_id>/update", methods=["POST", "OPTIONS"])
def update_shared_form(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    data, error = require_json()
    if error:
        return error
    items = load_json_list_store(FORMS_STORE_PATH)
    form = next((item for item in items if int(item.get("id", 0) or 0) == item_id), None)
    if not form:
        return jsonify({"error": "Form not found"}), 404
    for key in ["title", "description", "fileUrl", "category", "visibleTo", "visibility", "department"]:
        if key in data:
            form[key] = data.get(key)
    form["updatedAt"] = now_ms()
    save_json_list_store(FORMS_STORE_PATH, items)
    return jsonify({"ok": True, "form": form})


@app.route("/api/content/forms/<int:item_id>/delete", methods=["POST", "OPTIONS"])
def delete_shared_form(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    items = load_json_list_store(FORMS_STORE_PATH)
    filtered = [item for item in items if int(item.get("id", 0) or 0) != item_id]
    if len(filtered) == len(items):
        return jsonify({"error": "Form not found"}), 404
    save_json_list_store(FORMS_STORE_PATH, filtered)
    return jsonify({"ok": True})


@app.route("/api/content/training/videos", methods=["GET"])
def get_shared_training_videos():
    _, _, error = require_authenticated_user()
    if error:
        return error
    return jsonify({"videos": load_json_list_store(TRAINING_VIDEOS_STORE_PATH)})


@app.route("/api/content/training/videos", methods=["POST", "OPTIONS"])
def create_shared_training_video():
    preflight = handle_options()
    if preflight:
        return preflight
    _, actor, error = require_staff_manager()
    if error:
        return error
    data, error = require_json()
    if error:
        return error
    items = load_json_list_store(TRAINING_VIDEOS_STORE_PATH)
    video = {
        "id": next_content_id(items),
        "title": str(data.get("title", "")).strip(),
        "description": str(data.get("description", "")).strip(),
        "videoUrl": str(data.get("videoUrl", "")).strip(),
        "thumbnailUrl": data.get("thumbnailUrl"),
        "duration": int(data.get("duration", 0) or 0),
        "category": str(data.get("category", "")).strip() or "General",
        "visibleTo": data.get("visibleTo") if isinstance(data.get("visibleTo"), list) else ["GeneralStaff", "HRAdmin", "SuperAdmin"],
        "visibility": str(data.get("visibility", "General")).strip() or "General",
        "department": data.get("department"),
        "isMandatory": bool(data.get("isMandatory", False)),
        "allowDownload": bool(data.get("allowDownload", False)),
        "storageType": str(data.get("storageType", "Drive")).strip() or "Drive",
        "driveRef": data.get("driveRef"),
        "localFilename": data.get("localFilename"),
        "uploadedBy": actor["fullname"],
        "uploadedAt": now_ms(),
        "viewCount": int(data.get("viewCount", 0) or 0),
        "isArchived": bool(data.get("isArchived", False)),
    }
    items.insert(0, video)
    save_json_list_store(TRAINING_VIDEOS_STORE_PATH, items)
    return jsonify({"ok": True, "video": video})


@app.route("/api/content/training/videos/<int:item_id>/archive", methods=["POST", "OPTIONS"])
def archive_shared_training_video(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    items = load_json_list_store(TRAINING_VIDEOS_STORE_PATH)
    video = next((item for item in items if int(item.get("id", 0) or 0) == item_id), None)
    if not video:
        return jsonify({"error": "Video not found"}), 404
    video["isArchived"] = True
    save_json_list_store(TRAINING_VIDEOS_STORE_PATH, items)
    return jsonify({"ok": True})


@app.route("/api/content/training/videos/<int:item_id>/delete", methods=["POST", "OPTIONS"])
def delete_shared_training_video(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    items = load_json_list_store(TRAINING_VIDEOS_STORE_PATH)
    filtered = [item for item in items if int(item.get("id", 0) or 0) != item_id]
    if len(filtered) == len(items):
        return jsonify({"error": "Video not found"}), 404
    save_json_list_store(TRAINING_VIDEOS_STORE_PATH, filtered)
    return jsonify({"ok": True})


@app.route("/api/content/training/documents", methods=["GET"])
def get_shared_training_documents():
    _, _, error = require_authenticated_user()
    if error:
        return error
    return jsonify({"documents": load_json_list_store(TRAINING_DOCUMENTS_STORE_PATH)})


@app.route("/api/content/training/documents", methods=["POST", "OPTIONS"])
def create_shared_training_document():
    preflight = handle_options()
    if preflight:
        return preflight
    _, actor, error = require_staff_manager()
    if error:
        return error
    data, error = require_json()
    if error:
        return error
    items = load_json_list_store(TRAINING_DOCUMENTS_STORE_PATH)
    document = {
        "id": next_content_id(items),
        "title": str(data.get("title", "")).strip(),
        "description": str(data.get("description", "")).strip(),
        "fileUrl": str(data.get("fileUrl", "")).strip(),
        "fileType": str(data.get("fileType", "")).strip(),
        "category": str(data.get("category", "")).strip() or "General",
        "visibleTo": data.get("visibleTo") if isinstance(data.get("visibleTo"), list) else ["GeneralStaff", "HRAdmin", "SuperAdmin"],
        "visibility": str(data.get("visibility", "General")).strip() or "General",
        "department": data.get("department"),
        "isMandatory": bool(data.get("isMandatory", False)),
        "allowDownload": bool(data.get("allowDownload", False)),
        "storageType": str(data.get("storageType", "Drive")).strip() or "Drive",
        "driveRef": data.get("driveRef"),
        "localFilename": data.get("localFilename"),
        "uploadedBy": actor["fullname"],
        "uploadedAt": now_ms(),
        "downloadCount": int(data.get("downloadCount", 0) or 0),
        "isArchived": bool(data.get("isArchived", False)),
    }
    items.insert(0, document)
    save_json_list_store(TRAINING_DOCUMENTS_STORE_PATH, items)
    return jsonify({"ok": True, "document": document})


@app.route("/api/content/training/documents/<int:item_id>/archive", methods=["POST", "OPTIONS"])
def archive_shared_training_document(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    items = load_json_list_store(TRAINING_DOCUMENTS_STORE_PATH)
    document = next((item for item in items if int(item.get("id", 0) or 0) == item_id), None)
    if not document:
        return jsonify({"error": "Document not found"}), 404
    document["isArchived"] = True
    save_json_list_store(TRAINING_DOCUMENTS_STORE_PATH, items)
    return jsonify({"ok": True})


@app.route("/api/content/training/documents/<int:item_id>/delete", methods=["POST", "OPTIONS"])
def delete_shared_training_document(item_id: int):
    preflight = handle_options()
    if preflight:
        return preflight
    _, _, error = require_staff_manager()
    if error:
        return error
    items = load_json_list_store(TRAINING_DOCUMENTS_STORE_PATH)
    filtered = [item for item in items if int(item.get("id", 0) or 0) != item_id]
    if len(filtered) == len(items):
        return jsonify({"error": "Document not found"}), 404
    save_json_list_store(TRAINING_DOCUMENTS_STORE_PATH, filtered)
    return jsonify({"ok": True})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "4185")))
