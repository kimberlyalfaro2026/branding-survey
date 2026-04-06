# 🚀 QUICK START GUIDE - Branding Survey Deployment

## Essential Commands (Copy and Paste These)

### 1️⃣ Initial Setup
```bash
# Navigate to project folder
cd branding-survey

# Install dependencies
npm install

# Install Vercel CLI globally
npm install -g vercel
```

### 2️⃣ Deploy to Vercel
```bash
# Login to Vercel (first time only)
vercel login

# Deploy (follow prompts, accept defaults)
vercel

# Deploy to production
vercel --prod
```

### 3️⃣ Set Up Database

**In Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Click "Storage" → "Create Database" → "Postgres"
3. Name: `branding-survey-db`
4. Click "Data" tab → "Query"
5. Copy contents of `schema.sql` and run it

**Link database to your project:**
1. In Vercel Dashboard → Your Project → "Storage"
2. Click "Connect Store" → Select `branding-survey-db`

### 4️⃣ Access Your App

Your app will be at: **`https://YOUR-PROJECT-NAME.vercel.app`**

- **Admin**: `/admin`
- **Survey**: `/survey/[id]` (created in admin)
- **Results**: `/results/[id]` (accessed from admin)

---

## Daily Usage

### Create a New Survey
1. Go to `/admin`
2. Enter month (e.g., "April 2026")
3. Click "Create Survey"
4. Link is auto-copied → Share it!

### View Results
1. Go to `/admin`
2. Click "View Results" on any survey
3. Click "Export to Excel" to download

---

## Troubleshooting

**Build fails?**
```bash
# Clear cache and rebuild
rm -rf node_modules
npm install
vercel --prod
```

**Database errors?**
- Check database is created in Vercel
- Verify `schema.sql` was run
- Check database is linked to project

**Can't access app?**
- Wait 2-3 minutes after first deploy
- Check deployment logs in Vercel dashboard
- Try opening in incognito mode

---

## File Structure Overview

```
branding-survey/
├── api/              ← Backend (Vercel Functions)
├── src/
│   └── components/   ← Survey, Admin, Results
├── schema.sql        ← Database setup
├── package.json      ← Dependencies
└── README.md         ← Full documentation
```

---

## Next Steps

1. ✅ Run the commands above
2. ✅ Deploy to Vercel
3. ✅ Set up database
4. ✅ Create your first survey
5. ✅ Share the link with your team!

**Need help?** Check the full README.md for detailed documentation.
