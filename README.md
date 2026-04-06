# Search & Play

A Greek dictionary and word games platform. The system has 4 parts that work together:

| Part | Tech | Port | Description |
|------|------|------|-------------|
| `web/` | Next.js 14 | 3000 | Main web app (dictionary + games) |
| `backend/` | Django + DRF | 8000 | REST API + JWT auth |
| `frontend/` | React Native / Expo | 8081 | Mobile app |
| `search_play/` | PHP (legacy) | 80 | Original PHP version (being retired) |

---

## Prerequisites

Make sure you have these installed before starting:

- **Node.js** v18+ and npm
- **Python** 3.10+
- **MySQL** 8.0+ (running locally)
- **PHP** 8.0+ with Apache/XAMPP (for `search_play/` only)
- **Expo CLI** — `npm install -g expo-cli` (for `frontend/` only)

---

## 1. Database Setup

All parts share the same MySQL database: `games_dictionary`.

```sql
-- Run once in MySQL
CREATE DATABASE IF NOT EXISTS games_dictionary
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Then run the schema files in order:

```bash
mysql -u root -p games_dictionary < search_play/db_schema.sql
mysql -u root -p games_dictionary < web/password_resets_table.sql
mysql -u root -p games_dictionary < web/achievements_seed.sql
mysql -u root -p games_dictionary < web/daily_challenge_tables.sql
```

---

## 2. Backend (Django) Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers mysqlclient

# Copy env file and fill in your values
copy .env.example .env       # Windows
# cp .env.example .env       # Mac/Linux

# Run migrations (Django manages its own auth tables only)
python manage.py migrate

# Start the server
python manage.py runserver 8000
```

Backend will be available at: `http://localhost:8000`

---

## 3. Web App (Next.js) Setup

```bash
cd web

# Install dependencies
npm install

# Copy env file and fill in your values
copy .env.example .env.local   # Windows
# cp .env.example .env.local   # Mac/Linux

# Start the development server
npm run dev
```

Web app will be available at: `http://localhost:3000`

---

## 4. Mobile App (Expo) Setup

```bash
cd frontend

# Install dependencies
npm install

# Start Expo
npx expo start
```

Scan the QR code with the **Expo Go** app on your phone, or press `w` to open in browser.

---

## 5. Legacy PHP (search_play/) Setup

Requires XAMPP or any Apache + PHP + MySQL stack.

1. Copy the `search_play/` folder into your XAMPP `htdocs/` directory
2. Copy `.env.example` to `.env` and fill in your values
3. Start Apache and MySQL in XAMPP
4. Visit `http://localhost/search_play/`

> Note: `search_play/` is the legacy version being replaced by `web/`. Both share the same database.

---

## Running Everything Together

Open 3 terminals and run each command:

```bash
# Terminal 1 — Django backend
cd backend && venv\Scripts\activate && python manage.py runserver 8000

# Terminal 2 — Next.js web app
cd web && npm run dev

# Terminal 3 — Expo mobile (optional)
cd frontend && npx expo start
```

---

## Environment Variables

### `web/.env.local`
See `web/.env.example` for all required variables.

| Variable | Description |
|----------|-------------|
| `NEXTAUTH_SECRET` | Random secret string for NextAuth session encryption |
| `NEXTAUTH_URL` | Base URL of the web app (e.g. `http://localhost:3000`) |
| `DJANGO_URL` | URL of the Django backend (e.g. `http://localhost:8000`) |
| `DB_HOST` | MySQL host (usually `localhost`) |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | MySQL database name (`games_dictionary`) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash of admin password |
| `EMAIL_USER` | Gmail address for sending OTP/reset emails |
| `EMAIL_PASS` | Gmail App Password (not your regular password) |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI features |

### `backend/.env`
See `backend/.env.example` for all required variables.

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | Django secret key |
| `DB_NAME` | MySQL database name (`games_dictionary`) |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_HOST` | MySQL host |
| `DB_PORT` | MySQL port (default `3306`) |
| `EMAIL_HOST_USER` | Gmail address for sending emails |
| `EMAIL_HOST_PASSWORD` | Gmail App Password |

### `search_play/.env`
See `search_play/.env.example` for all required variables.

---

## Project Structure

```
Capstone/
├── web/              # Next.js web app (main)
├── backend/          # Django REST API
├── frontend/         # React Native / Expo mobile app
└── search_play/      # Legacy PHP app (being retired)
```

---

## Common Issues

**MySQL connection refused**
Make sure MySQL is running. On Windows with XAMPP, start MySQL from the XAMPP Control Panel.

**Django `mysqlclient` install fails on Windows**
Try: `pip install mysqlclient --only-binary :all:` or install via wheel from [https://www.lfd.uci.edu/~gohlke/pythonlibs/](https://www.lfd.uci.edu/~gohlke/pythonlibs/)

**Next.js can't connect to Django**
Make sure Django is running on port 8000 and `DJANGO_URL=http://localhost:8000` is set in `web/.env.local`.

**Expo app can't connect to backend**
Replace `localhost` with your machine's local IP address (e.g. `192.168.1.x`) in the Expo app's API config.
