# Bawjiase Staff Portal

This workspace contains:

- `src/frontend` - the Staff Portal Vite/React app
- `src/mail-api` - the Flask mail/persistence API used for auth email, presence, and shared AGM storage
- `src/backend` - the Motoko backend worktree

## Verified local commands

Frontend, from [src/frontend](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/frontend):

```powershell
pnpm install --prefer-offline
pnpm typecheck
pnpm fix
pnpm build
```

Mail API, from [src/mail-api](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/mail-api):

```powershell
python -m py_compile app.py
python app.py
```

Backend, from [src/backend](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/backend):

```powershell
mops install
mops check --fix
mops build
```

## Frontend production env

Copy [src/frontend/.env.example](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/frontend/.env.example) to `.env` for production-style local testing if needed.

Important variables:

- `VITE_MAIL_API_URL`
  - Use the deployed/shared mail API URL, for example:
    - `https://portal.bawjiasearearuralbank.com/mail-api/api`
  - If omitted, the frontend falls back to `${window.location.origin}/mail-api/api`
- `VITE_IT_ACCESS_CODE`
- `VITE_HR_ACCESS_CODE`
- `VITE_ENABLE_SEEDED_FALLBACK=false`

## Mail API production env

Start from [src/mail-api/.env.example](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/mail-api/.env.example).

Important variables:

- `PORTAL_DATA_DIR`
  - Use a persistent folder outside replaceable code files
- `MAIL_SERVER`
- `MAIL_PORT`
- `MAIL_USERNAME`
- `MAIL_PASSWORD`
- `MAIL_DEFAULT_SENDER`
- `PORTAL_PUBLIC_URL`
- `ALLOWED_ORIGINS`

The mail API now also stores shared AGM data in:

- `agm_state_store.json`

inside `PORTAL_DATA_DIR`.

## Production deployment checklist

### 1. Deploy the mail API

Deploy [src/mail-api/app.py](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/mail-api/app.py) as the live Flask service.

Must work:

- `GET /api/health`
- `GET /api/presence`
- `POST /api/presence/ping`
- `POST /api/presence/logout`
- `GET /api/agm/state`
- `POST /api/agm/state`

### 2. Point the frontend to the deployed mail API

For production builds, set:

```text
VITE_MAIL_API_URL=https://your-live-domain/mail-api/api
```

If the frontend and Flask API are served from the same domain and the legacy route exists, the default fallback also works:

```text
${window.location.origin}/mail-api/api
```

### 3. Build and publish the frontend

From [src/frontend](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/frontend):

```powershell
pnpm install --prefer-offline
pnpm build
```

Publish the generated `dist` folder through your web host or copy it into the Flask public folder if you are serving the portal and mail API together.

### 4. Make sure SPA routing is handled

If the frontend is served as static files, refreshes on routes like `/login`, `/profile`, `/agm`, and `/dashboard` must return `index.html`.

If the frontend is served by the Flask app in [src/mail-api/app.py](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/mail-api/app.py), this is already handled by the fallback route at the bottom of the file.

## Final live verification

### Browser/device test

Use two different browsers or devices.

#### Presence verification

1. Log in as user A in browser 1
2. Log in as user B in browser 2
3. Open Staff Directory in both
4. Confirm A sees B online
5. Confirm B sees A online
6. Log out user A
7. Confirm user A goes offline for user B without a page refresh

#### AGM shared persistence verification

1. Open `/agm/import`
2. Import or restore AGM shareholders
3. Open `/agm/registration`
4. Register one shareholder
5. Open `/agm/shareholders` in another browser/device
6. Confirm the same registration appears there
7. Open `/agm/admin`
8. Archive the current AGM year
9. Confirm `/agm` shows updated archive history
10. Reopen the archived year and confirm the registrations return

#### Sync badge verification

On [AgmPortalPage.tsx](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/frontend/src/pages/AgmPortalPage.tsx) and [AgmAdminPage.tsx](C:/Users/james/Downloads/Compressed/bawjiase-staff-portal-main/src/frontend/src/pages/AgmAdminPage.tsx), verify:

- `Shared AGM sync is active` when the live mail API is reachable
- `local fallback mode` only when the API is unavailable

## Done criteria

The production deployment is considered done when:

- frontend loads on the live domain
- refresh works on nested routes
- mail API health passes
- presence works across two browsers/devices
- AGM registration persists across two browsers/devices
- AGM archive/reopen works from shared storage
- AGM sync badge reports shared backend mode
