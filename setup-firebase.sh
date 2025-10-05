#!/bin/bash

# Firebase & Analytics Setup Script for Codenies Solutions
# This script helps you set up your environment variables

echo "🚀 Codenies Solutions - Firebase & Analytics Setup"
echo "=================================================="
echo ""

# Check if .env file exists
if [ -f ".env" ]; then
    echo "⚠️  .env file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
fi

echo "📝 Creating .env file with your Meta Pixel ID..."
echo ""

# Create .env file
cat > .env << 'EOF'
# Application Configuration
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://codenies.com

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=codenies <no-reply@codenies.com>

# Alternative Gmail Configuration (if using Gmail directly)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
CONTACT_EMAIL=contact@codenies.com

# Contact/Consultation Configuration
CONSULTATION_TO=codenies.solutions@gmail.com

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1944820842752519
EOF

echo "✅ .env file created successfully!"
echo ""
echo "📋 Next Steps:"
echo "=============="
echo ""
echo "1. 🔥 Set up Firebase Project:"
echo "   - Go to https://console.firebase.google.com/"
echo "   - Create a new project"
echo "   - Enable Authentication (Email/Password)"
echo "   - Enable Storage"
echo "   - Enable Analytics"
echo ""
echo "2. 🔧 Update Firebase Configuration:"
echo "   - Copy your Firebase config values to the .env file"
echo "   - Replace the placeholder values with your actual Firebase credentials"
echo ""
echo "3. 📊 Set up Google Analytics:"
echo "   - Get your GA4 Measurement ID"
echo "   - Replace 'G-XXXXXXXXXX' in .env with your actual ID"
echo ""
echo "4. 👤 Create Admin User:"
echo "   - Run: node scripts/create-admin.js admin@codenies.com YourPassword"
echo ""
echo "5. 🚀 Test the Setup:"
echo "   - Run: npm run dev"
echo "   - Visit: http://localhost:3000/admin"
echo "   - Try logging in with your admin credentials"
echo ""
echo "📚 For detailed instructions, see FIREBASE_SETUP.md"
echo ""
echo "🎉 Your Meta Pixel ID (1944820842752519) is already configured!"
echo ""
