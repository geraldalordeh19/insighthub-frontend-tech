# InsightHub — Frontend

Academic Research and Capstone Repository — Frontend (HTML, CSS, JavaScript)

## Project Overview

InsightHub is a centralized digital platform for Academic City University students to store, share, and explore research papers and capstone projects. This repository contains the frontend built with pure HTML, CSS, and vanilla JavaScript.

## Deployment Link

- **Frontend (GitHub Pages):** `https://YOUR_USERNAME.github.io/insighthub-frontend`
- **Backend API (Render):** `https://insighthub-backend.onrender.com`

## Login Details (Test Accounts)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@insighthub.com | admin123 |
| Student | student@insighthub.com | student123 |

## Feature Checklist

- ✅ User registration page
- ✅ User login page with JWT storage
- ✅ Project browsing feed with search and filters (department, year, keyword)
- ✅ Project submission form (title, abstract, department, supervisor, year, file link, demo link, tags, technologies)
- ✅ Project detail page (full info, links, comments, bookmarks)
- ✅ Comments section — post and view feedback
- ✅ Bookmarks — save and view saved projects
- ✅ Admin dashboard (overview stats, pending review, approve/reject/edit/delete, user list)
- ✅ Responsive design (mobile-friendly)
- ✅ Toast notifications for user feedback
- ✅ Protected routes (redirect to login if not authenticated)

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — project feed with search & filter |
| `login.html` | Sign in page |
| `register.html` | Create account page |
| `submit.html` | Submit a new project (auth required) |
| `project.html` | Project detail + comments + bookmark |
| `bookmarks.html` | Saved/bookmarked projects (auth required) |
| `admin.html` | Admin dashboard (admin role required) |

## Installation Instructions

### Option 1: Open locally (no server needed)
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/insighthub-frontend.git
cd insighthub-frontend

# Open in browser
open index.html
# OR just double-click index.html
```

> **Important:** Edit `js/api.js` and set `API_BASE` to your backend URL:
> ```js
> const API_BASE = 'https://insighthub-backend.onrender.com/api';
> ```

### Option 2: Deploy to GitHub Pages
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **Deploy from branch** → `main` → `/ (root)`
4. Your site will be live at `https://YOUR_USERNAME.github.io/insighthub-frontend`

## Tech Stack

- **HTML5 / CSS3 / Vanilla JavaScript**
- **Google Fonts:** DM Serif Display + DM Sans
- **Deployment:** GitHub Pages
