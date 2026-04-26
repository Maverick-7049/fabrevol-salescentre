# Fabrevol Sales Centre — Railway Deployment Guide

**Code is already on GitHub:** https://github.com/Maverick-7049/fabrevol-salescentre  
**Target URL:** https://salescentre.fabrevol.com  
**Login:** `Fabrevol@sales` / `Raj@2801`

---

## STEP 1 — Railway is Already Deploying

Your GitHub repo is already connected to Railway. The latest commit fixes the logo import that was causing build failures. Railway should be auto-deploying right now.

- Watch the Railway dashboard for a green checkmark
- If it's still showing "Failed", click the **⋮ menu** on the deployment → **Redeploy**
- The build takes about 2 minutes

---

## STEP 2 — Add PostgreSQL Database

If you haven't done this yet:

1. In your Railway project canvas, click **"+ New"**
2. Choose **"Database"** → **"Add PostgreSQL"**
3. Railway creates it and **automatically sets `DATABASE_URL`** in your app — no manual copy needed

---

## STEP 3 — Set Environment Variables

Click on the **fabrevol-salescentre service** (not the database) → **"Variables"** tab → add these:

| Variable | Value |
|---|---|
| `AUTH_USERNAME` | `Fabrevol@sales` |
| `AUTH_PASSWORD` | `Raj@2801` |
| `SESSION_SECRET` | `FabrevolSalesSecretKey2026!XZY99` (or any random 32+ char string) |
| `OPENAI_API_KEY` | Your key from platform.openai.com (needed for AI Discover) |
| `NODE_ENV` | `production` |

> **Do NOT set `DATABASE_URL` or `PORT` manually** — Railway sets both automatically.

After adding variables, Railway redeploys automatically. Wait for green.

---

## STEP 4 — Import Your Data

The app auto-seeds 140 demo leads on first start. To load your actual 175 leads + 3 suppliers + 8 products, run the SQL migration.

### Option A — Railway Query Tab (no extra tools needed)
1. Click the **PostgreSQL** service in Railway
2. Click **"Data"** tab → **"Query"**
3. Open the file `migration/fabrevol_data_export.sql` from your GitHub repo
4. Copy all contents → paste into the query box → click Run

### Option B — TablePlus or DBeaver (GUI)
1. Click PostgreSQL service → **"Connect"** → copy the **Public URL**  
   (looks like `postgresql://postgres:xxx@monorail.proxy.rlwy.net:12345/railway`)
2. Open TablePlus/DBeaver → New Connection → paste URL
3. Open a query window → paste contents of `migration/fabrevol_data_export.sql` → Run

### Option C — psql command line
```bash
psql "postgresql://postgres:xxx@monorail.proxy.rlwy.net:12345/railway" -f migration/fabrevol_data_export.sql
```

> The SQL file uses `INSERT ... ON CONFLICT DO NOTHING` — safe to run multiple times.

---

## STEP 5 — Test Your Railway URL

1. In Railway, click your service → **"Settings"** → **"Networking"**
2. Click **"Generate Domain"** if you don't have one yet
3. Visit the URL (e.g. `fabrevol-salescentre.up.railway.app`)
4. You should see the Fabrevol login page
5. Log in: `Fabrevol@sales` / `Raj@2801`
6. Check that leads, CRM, and Suppliers all load

---

## STEP 6 — Connect salescentre.fabrevol.com

### In Railway:
1. Service → **"Settings"** → **"Networking"** → **"+ Custom Domain"**
2. Enter: `salescentre.fabrevol.com`
3. Railway shows you a **CNAME target** (copy this value)

### In Hostinger:
1. Login → **Domains** → **fabrevol.com** → **DNS / Zone Editor**
2. Click **"Add Record"** and fill in:
   - **Type:** `CNAME`
   - **Name / Host:** `salescentre`
   - **Value / Points to:** *(paste the CNAME target from Railway above)*
   - **TTL:** `3600`
3. Save

Wait **5–30 minutes** for DNS to propagate worldwide.  
Then visit **https://salescentre.fabrevol.com** — SSL certificate is automatic.

---

## Making Future Code Changes

If you return to Replit to make changes:
1. Make changes in Replit
2. In the Replit Shell, run:
   ```bash
   git add -A && git commit -m "your change description" && git push
   ```
3. Railway **auto-deploys** within 2 minutes
4. Changes go live at salescentre.fabrevol.com

---

## Troubleshooting

**Build fails** → Check Railway build logs for the specific error line

**App crashes on start** → Check deploy logs; usually `DATABASE_URL` not connected (add PostgreSQL plugin)

**Login not working** → Check `AUTH_USERNAME`, `AUTH_PASSWORD`, `SESSION_SECRET` are all set in Variables tab

**Blank page / no data** → Run the SQL migration from Step 4

**AI Discover does nothing** → Set `OPENAI_API_KEY` in Variables tab; get key from platform.openai.com

**Domain not loading** → DNS takes up to 30 min; verify CNAME record in Hostinger is saved correctly

---

## Key Files in This Repo

| File | Purpose |
|---|---|
| `railway.toml` | Railway build + start commands |
| `nixpacks.toml` | Node 20 build environment |
| `migration/fabrevol_data_export.sql` | All your data (175 leads, 3 suppliers, 8 products) |
| `server/index.ts` | Express server entry point |
| `server/routes.ts` | All API routes |
| `shared/schema.ts` | Database schema (Drizzle ORM) |
| `client/src/pages/` | React pages: Login, Finder, Targets, CRM, Suppliers, Roadmap |
