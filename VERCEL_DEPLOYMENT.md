# Vercel Deployment Guide for Codenies Solutions

## 🚀 **Pre-Deployment Checklist**

### ✅ **Completed**
- [x] Firebase Auth integration (replaced hardcoded password)
- [x] Firebase Storage for file uploads
- [x] Google Analytics (G-B1ML3MYSDD)
- [x] Meta Pixel (1944820842752519)
- [x] All code committed and pushed to GitHub

## 🔧 **Vercel Environment Variables Setup**

### **Required Environment Variables**

Go to your Vercel dashboard → Project Settings → Environment Variables and add:

```env
# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=codenies <no-reply@codenies.com>

# Alternative Gmail Configuration
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
CONTACT_EMAIL=contact@codenies.com

# Contact/Consultation Configuration
CONSULTATION_TO=codenies.solutions@gmail.com

# Firebase Configuration (CRITICAL - Get from Firebase Console)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-name.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-name
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-name.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-B1ML3MYSDD

# Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-B1ML3MYSDD
NEXT_PUBLIC_META_PIXEL_ID=1944820842752519
```

## 🔥 **Firebase Setup (Required Before Deployment)**

### **1. Create Firebase Project**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `codenies-solutions`
4. Enable Google Analytics (optional)
5. Choose Analytics account

### **2. Enable Authentication**
1. Go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Configure authorized domains:
   - `localhost` (for development)
   - `your-domain.vercel.app` (for production)
   - `your-custom-domain.com` (if you have one)

### **3. Enable Storage**
1. Go to **Storage**
2. Click "Get started"
3. Choose "Start in test mode" (we'll update rules later)
4. Select a location close to your users

### **4. Get Firebase Configuration**
1. Go to **Project Settings** → **General**
2. Scroll to "Your apps" section
3. Click "Add app" → Web app
4. Register app name: `codenies-web`
5. Copy the config object values to Vercel environment variables

### **5. Set Storage Security Rules**
Go to **Storage** → **Rules** and update:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Admin files - only authenticated users
    match /admin/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    
    // Project files - only authenticated users
    match /projects/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    
    // Blog files - only authenticated users
    match /blog/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🚀 **Vercel Deployment Steps**

### **1. Connect Repository**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `ahyyam/codenies_solutions`
4. Choose repository

### **2. Configure Project Settings**
- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### **3. Add Environment Variables**
Copy all environment variables from the list above to Vercel:
1. Go to Project Settings → Environment Variables
2. Add each variable with the correct value
3. Make sure to add to **Production**, **Preview**, and **Development** environments

### **4. Deploy**
1. Click "Deploy"
2. Wait for build to complete
3. Your site will be available at `https://your-project.vercel.app`

## 👤 **Create Admin User After Deployment**

Once deployed, create your admin user:

```bash
# Option 1: Using the script (run locally with production env)
node scripts/create-admin.js admin@codenies.com YourSecurePassword

# Option 2: Using Firebase Console
# Go to Authentication → Users → Add user
```

## 🔍 **Post-Deployment Verification**

### **1. Test Admin Login**
1. Visit `https://your-domain.vercel.app/admin`
2. Try logging in with your admin credentials
3. Verify file uploads work

### **2. Test Analytics**
1. Install [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Visit your deployed site
3. Check that pixel fires (ID: 1944820842752519)
4. Verify Google Analytics is tracking

### **3. Test Firebase Storage**
1. Login to admin panel
2. Try uploading project images
3. Verify files appear in Firebase Storage

## 🛠 **Troubleshooting Common Issues**

### **Issue 1: Firebase Auth Not Working**
- Check authorized domains in Firebase Console
- Verify environment variables are set correctly
- Ensure Firebase project is properly configured

### **Issue 2: File Uploads Failing**
- Check Firebase Storage rules
- Verify storage bucket permissions
- Check network requests in browser DevTools

### **Issue 3: Analytics Not Tracking**
- Verify environment variables are set
- Check browser console for errors
- Use Facebook Pixel Helper to verify tracking

### **Issue 4: Build Failures**
- Check for missing dependencies
- Verify all environment variables are set
- Check Vercel build logs for specific errors

## 📊 **Monitoring & Maintenance**

### **Firebase Console Monitoring**
- Monitor authentication usage
- Check storage usage and costs
- Review analytics data

### **Vercel Analytics**
- Monitor page views and performance
- Check for build failures
- Monitor function execution

### **Facebook Business Manager**
- Monitor pixel events
- Check conversion tracking
- Review audience data

## 🎯 **Custom Domain Setup (Optional)**

If you want to use a custom domain:

1. **Add Domain in Vercel**:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Firebase Auth**:
   - Add custom domain to authorized domains
   - Update environment variables

3. **Update Analytics**:
   - Update domain in Google Analytics
   - Verify Meta Pixel on new domain

## 🚨 **Security Checklist**

- [ ] Firebase Storage rules are restrictive
- [ ] Admin credentials are secure
- [ ] Environment variables are not exposed
- [ ] HTTPS is enabled (Vercel default)
- [ ] Firebase project is properly configured

## 📞 **Support**

If you encounter issues:
1. Check Vercel build logs
2. Check Firebase Console for errors
3. Use browser DevTools to debug
4. Review this documentation

Your site is now ready for production deployment! 🚀
