# বাংলা ব্লগ - Bengali Blog

A modern Bengali blog website built with Next.js, Neon Database, and Vercel deployment. This blog is designed for monetization through Google AdSense.

## Features

- 📝 Full-featured blog with posts, categories, and comments
- 💰 Google AdSense integration for monetization
- 🗄️ Neon serverless PostgreSQL database
- 🎨 Modern, responsive design with TailwindCSS
- 🔍 SEO optimized
- 🌐 Bengali language support
- 👤 Admin panel for content management
- 🚀 Optimized for Vercel deployment

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Neon (PostgreSQL)
- **ORM:** Drizzle ORM
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **Deployment:** Vercel

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Neon Database URL
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require

# JWT Secret for authentication
JWT_SECRET=your-secret-key-here-change-this

# Google AdSense
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX

# Site URL for production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a Neon account at https://neon.tech
2. Create a new database
3. Copy the connection string to `.env.local`
4. Push the database schema:

```bash
npm run db:push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

## Deployment to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_ADSENSE_CLIENT`
   - `NEXT_PUBLIC_SITE_URL`
4. Deploy!

## Google AdSense Setup

1. Create a Google AdSense account
2. Add your site URL to AdSense
3. Get your AdSense client ID (ca-pub-XXXXXXXXXXXXXXXX)
4. Add it to `NEXT_PUBLIC_ADSENSE_CLIENT` in your environment variables
5. Create ad units in AdSense and update the ad slots in the code

## Database Schema

- **users** - Blog authors and admins
- **posts** - Blog posts
- **categories** - Post categories
- **tags** - Post tags
- **comments** - User comments on posts
- **ad_placements** - Ad configuration

## Admin Features

- Create, edit, and delete blog posts
- Manage categories and tags
- Moderate comments
- View analytics
- Manage ad placements

## Monetization Strategy

1. **Display Ads**: Google AdSense ads are placed strategically:
   - Header/banner ads
   - In-feed ads (between posts)
   - Sidebar ads
   - Footer ads

2. **Content Strategy**:
   - Focus on high-traffic Bengali keywords
   - Regular posting schedule
   - SEO optimization
   - Social media promotion

## License

MIT

## Support

For support, email: your-email@example.com
