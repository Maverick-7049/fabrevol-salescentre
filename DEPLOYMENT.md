# Fabrevol Sales Centre — Deployment Guide

This guide walks you through deploying the app on Railway and making it accessible at `fabrevol.com`.

---

## Step 1: Push Code to GitHub

1. In Replit, click the **Version Control** icon (branch icon) in the left sidebar
2. Click **Connect to GitHub**
3. Sign in to your GitHub account if prompted
4. Click **Create GitHub repository** → name it `fabrevol-salescentre` (private)
5. Click **Push to GitHub**

Your code is now on GitHub. Every time you make changes in Replit and push, Railway will auto-redeploy.

---

## Step 2: Create Railway Account & Project

1. Go to **railway.app** and sign up (free to start)
2. Click **New Project** → **Deploy from GitHub repo**
3. Connect your GitHub account → select `fabrevol-salescentre`
4. Railway will detect the project and start building

---

## Step 3: Add PostgreSQL Database on Railway

1. In your Railway project, click **+ New Service** → **Database** → **PostgreSQL**
2. Click on the database → **Variables** tab → copy the `DATABASE_URL`
3. Keep this tab open — you'll need it in Step 4

---

## Step 4: Import Your Data

Once Railway PostgreSQL is running:

1. Go to the database service → **Query** tab (or use any Postgres client like TablePlus/DBeaver)
2. Connect using the credentials from the Variables tab
3. Run the migration file: `migration/fabrevol_data_export.sql`
   - This creates all tables and imports your 175 leads, 3 suppliers, and 8 products

**Using psql command line:**
```bash
psql "your-railway-database-url" -f migration/fabrevol_data_export.sql
```

**Using TablePlus/DBeaver:**
- Connect with the Railway DATABASE_URL
- Open & execute `migration/fabrevol_data_export.sql`

---

## Step 5: Set Environment Variables on Railway

In your Railway app service → **Variables** tab, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | (copied from Railway Postgres in Step 3) |
| `AUTH_USERNAME` | `Fabrevol@sales` |
| `AUTH_PASSWORD` | `Raj@2801` (or change this) |
| `SESSION_SECRET` | (generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`) |
| `OPENAI_API_KEY` | Your OpenAI API key from platform.openai.com |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

After adding variables, Railway will redeploy automatically.

---

## Step 6: Test the Railway Deployment

Railway gives you a URL like `fabrevol-salescentre.up.railway.app`. 
Visit it, log in with `Fabrevol@sales` / your password, and confirm everything works.

---

## Step 7: Connect to fabrevol.com

You have two options:

### Option A — Subdomain: `salescentre.fabrevol.com` ✅ Recommended (simpler)

This is much simpler. Instead of `/salescentre` path, the app lives at its own subdomain.

In your DNS settings (wherever fabrevol.com is hosted):
1. Add a **CNAME record**:
   - Name: `salescentre`
   - Value: your Railway app domain (e.g. `fabrevol-salescentre.up.railway.app`)
   - TTL: 300

2. In Railway → your app service → **Settings** → **Custom Domain**
   - Add `salescentre.fabrevol.com`
   - Railway gives you a verification record — add it to DNS

3. Done! The app will be live at `https://salescentre.fabrevol.com`

---

### Option B — Path: `www.fabrevol.com/salescentre` (requires Cloudflare)

This only works if `fabrevol.com` is behind Cloudflare (check at cloudflare.com).

**In Cloudflare → Workers & Pages → Create Worker:**

```javascript
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/salescentre')) {
      const newPath = url.pathname.replace('/salescentre', '') || '/';
      const newUrl = `https://fabrevol-salescentre.up.railway.app${newPath}${url.search}`;
      return fetch(newUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });
    }
    return fetch(request); // pass through other requests to main site
  }
}
```

**Add a Cloudflare Route:**
- Pattern: `www.fabrevol.com/salescentre*`
- Worker: the one you just created

> Note: This approach routes traffic through Cloudflare Workers, which has a free tier of 100,000 requests/day.

---

## Step 8: Making Code Changes

Your workflow going forward:
1. Make changes in **Replit** using this chat
2. Click **Push to GitHub** in Replit's Version Control panel
3. Railway **auto-deploys** within ~2 minutes
4. Changes are live at your domain

---

## Troubleshooting

**Login not working after deploy?**
- Check `SESSION_SECRET` is set in Railway variables
- Check `NODE_ENV=production` is set
- Clear browser cookies and try again

**AI Discover not working?**
- Check `OPENAI_API_KEY` is set in Railway variables
- Verify the key is valid at platform.openai.com

**Database connection errors?**
- Confirm `DATABASE_URL` in Railway variables matches the PostgreSQL service
- Check the PostgreSQL service is running (green dot in Railway)

**No data showing after deploy?**
- Run the `migration/fabrevol_data_export.sql` file against the Railway database (Step 4)
