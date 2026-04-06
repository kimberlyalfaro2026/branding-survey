# Branding Survey System - Deployment Guide

A complete survey system for collecting monthly branding team feedback with admin dashboard and Excel export.

## Features

✅ **Survey Interface**: Beautiful, UX-friendly survey with Applaudo branding  
✅ **Admin Dashboard**: Create monthly survey links  
✅ **Results Dashboard**: View responses with charts and stats  
✅ **Excel Export**: Download all responses as .xlsx file  
✅ **Shareable Links**: Generate unique links for each month  
✅ **Mobile Responsive**: Works perfectly on all devices  

---

## Quick Start - Deploy to Vercel

### Step 1: Set Up Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database" → "Postgres"
3. Name it `branding-survey-db`
4. Once created, click "Data" tab
5. Click "Query" and paste the contents of `schema.sql`
6. Click "Run Query" to create the tables

### Step 2: Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project folder
cd branding-survey

# Install dependencies
npm install

# Deploy to Vercel
vercel

# Follow the prompts:
# - Link to existing project? No
# - What's your project's name? branding-survey
# - In which directory is your code located? ./
# - Want to modify settings? No

# Deploy to production
vercel --prod
```

**Option B: Using GitHub + Vercel Dashboard**

1. Create a new GitHub repository
2. Push this code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. Go to [Vercel Dashboard](https://vercel.com/dashboard)
4. Click "Add New Project"
5. Import your GitHub repository
6. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click "Deploy"

### Step 3: Connect Database to Deployment

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. The Postgres database should already be linked
4. If not, click "Storage" → "Connect Store" → Select your database

### Step 4: Access Your App

Your app will be live at: `https://your-project-name.vercel.app`

- **Admin Panel**: `https://your-project-name.vercel.app/admin`
- **Survey Links**: `https://your-project-name.vercel.app/survey/[survey-id]`

---

## How to Use

### 1. Create a Monthly Survey

1. Go to `/admin`
2. Enter the month and year (e.g., "March 2026")
3. Click "Create Survey"
4. A shareable link will be copied to your clipboard

### 2. Share the Survey Link

- Send the link via email, Slack, or any communication channel
- Anyone with the link can fill out the survey
- No login required

### 3. View Results

1. Go to `/admin`
2. Click "View Results" on any survey
3. See:
   - Average scores for each question
   - Distribution charts
   - Written feedback
4. Click "Export to Excel" to download all responses

---

## Project Structure

```
branding-survey/
├── api/                      # Backend API endpoints
│   ├── surveys.js           # Create and list surveys
│   ├── responses.js         # Submit responses
│   ├── survey/[id].js       # Get single survey
│   └── responses/[id].js    # Get survey responses
├── src/
│   ├── components/
│   │   ├── Survey.jsx       # Survey interface
│   │   ├── Admin.jsx        # Admin dashboard
│   │   └── Results.jsx      # Results viewer
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel configuration
└── schema.sql               # Database schema
```

---

## Database Schema

### `surveys` table
- `id`: Unique survey ID
- `month`: Month and year label
- `created_at`: Creation timestamp

### `responses` table
- `id`: Unique response ID
- `survey_id`: Foreign key to surveys
- `responses`: JSON object with all answers
- `submitted_at`: Submission timestamp

---

## API Endpoints

### `GET /api/surveys`
Get all surveys with response counts

### `POST /api/surveys`
Create a new survey
```json
{
  "month": "March 2026"
}
```

### `GET /api/survey/[id]`
Get a single survey by ID

### `POST /api/responses`
Submit a survey response
```json
{
  "surveyId": "abc123",
  "responses": {
    "satisfaction": 5,
    "quality": 4,
    "improvement": "Great work!"
  }
}
```

### `GET /api/responses/[id]`
Get all responses for a survey

---

## Customization

### Update Survey Questions

Edit `src/components/Survey.jsx`, lines 12-62:

```javascript
const questions = [
  {
    id: 'satisfaction',
    title: 'Overall Satisfaction',
    question: 'How satisfied are you...',
    labels: ['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'],
    required: true
  },
  // Add or modify questions here
];
```

### Change Branding Colors

All Applaudo brand colors are already applied:
- Primary Red: `#FF4040`
- Green: `#40C763`
- Yellow: `#FFCC00`
- Orange: `#FF9124`

---

## Troubleshooting

### Database Connection Issues
- Make sure Postgres database is created in Vercel
- Check that environment variables are set
- Run `schema.sql` if tables don't exist

### API Errors
- Check Vercel function logs in dashboard
- Ensure database connection is working
- Verify API routes are correct

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check that Node version is 18 or higher
- Clear `.vercel` folder and redeploy

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access at http://localhost:3000
```

For local development, you'll need to set up environment variables for database connection or use Vercel CLI:

```bash
vercel dev
```

---

## Support

For issues or questions:
1. Check Vercel deployment logs
2. Verify database tables exist
3. Check browser console for errors

---

## Tech Stack

- **Frontend**: React + Vite
- **Routing**: React Router
- **Backend**: Vercel Serverless Functions
- **Database**: Vercel Postgres
- **Excel Export**: xlsx library
- **Deployment**: Vercel

---

## License

Internal use for Applaudo branding team feedback collection.
