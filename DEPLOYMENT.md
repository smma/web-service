# Deployment Guide

## ⚠️ Important: GitHub Pages Limitation

**GitHub Pages only serves static files** and cannot run Node.js/Express.js applications. You need to use a platform that supports Node.js.

## Deploy to Vercel

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/web-service.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect it's a Node.js project
   - Click **"Deploy"** (no configuration needed - vercel.json is already set up)

3. **Set Environment Variable:**
   - After deployment, go to your project dashboard
   - Click **Settings** → **Environment Variables**
   - Add a new variable:
     - **Name**: `DOMAIN`
     - **Value**: `your-project-name.vercel.app` (or your custom domain)
     - **Environment**: Select all (Production, Preview, Development)
   - Click **Save**
   - **Important**: Redeploy your project for the environment variable to take effect
     - Go to **Deployments** tab
     - Click the three dots (⋯) on the latest deployment
     - Click **Redeploy**

## Setting the Domain Variable

The `DOMAIN` environment variable is used to replace `<domínio>` in the activity config JSON.

### Option 1: Environment Variable (Recommended)
Set `DOMAIN` in Vercel: Project Settings → Environment Variables

### Option 2: Automatic Detection
If `DOMAIN` is not set, the server automatically uses the request host from incoming requests.

## Endpoints

After deployment, your endpoints will be:

- `GET /activity-config` - Returns activity config with dynamic domain
- `GET /json-params-atividade` - Get JSON params
- `GET /lista-analytics-atividade` - Get analytics list
- `POST /analytics-atividade` - Get analytics by activityID
- `POST /user_url` - Generate user URL
- `GET /configuracao-atividade.html` - Configuration HTML page

## Testing Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

3. **Set DOMAIN in `.env`:**
   ```
   DOMAIN=localhost:3000
   ```

4. **Start server:**
   ```bash
   npm start
   ```

5. **Test activity config:**
   ```bash
   curl http://localhost:3000/activity-config
   ```

## Getting Your Activity Config

After deployment, get your activity configuration with the correct domain:

```bash
curl https://your-domain.com/activity-config
```

This will return the JSON with all URLs using your actual domain instead of `<domínio>`.

