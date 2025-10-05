# Firebase Integration Setup

This document outlines the Firebase integration for authentication, storage, and analytics in the Codenies Solutions project.

## Features Implemented

### 1. Firebase Authentication
- **Email/Password Authentication**: Secure admin login system
- **User Management**: Context-based authentication state management
- **Error Handling**: Comprehensive error messages for authentication failures
- **Session Management**: Automatic session persistence and cleanup

### 2. Firebase Storage
- **File Upload**: Support for admin and project file uploads
- **Image Management**: Project image uploads with Firebase Storage
- **File Organization**: Organized storage with folders for admin, projects, and blog
- **File Deletion**: Proper cleanup when removing files

### 3. Analytics Integration
- **Google Analytics**: Page view tracking and user behavior analytics
- **Meta Pixel**: Facebook/Meta advertising pixel for conversion tracking
- **Performance Monitoring**: Core Web Vitals tracking

## Environment Variables Required

Add these to your `.env` file:

```env
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
NEXT_PUBLIC_META_PIXEL_ID=your-meta-pixel-id
```

## Firebase Project Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication and Storage services

### 2. Authentication Setup
1. Go to Authentication > Sign-in method
2. Enable Email/Password authentication
3. Add your admin email addresses to authorized users

### 3. Storage Setup
1. Go to Storage
2. Create a storage bucket
3. Set up security rules for authenticated users

### 4. Analytics Setup
1. Enable Google Analytics in Firebase
2. Get your measurement ID
3. Set up Meta Pixel in Facebook Business Manager

## Security Rules

### Storage Rules
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

## Usage

### Authentication
```typescript
import { useAuth } from '@/lib/contexts/AuthContext';

function AdminComponent() {
  const { user, signIn, signOut, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <LoginForm />;
  
  return <AdminDashboard />;
}
```

### File Upload
```typescript
import { StorageService } from '@/lib/firebase/storage';

// Upload project images
const uploadImages = async (files: File[]) => {
  try {
    const urls = await StorageService.uploadProjectImages(files);
    console.log('Uploaded URLs:', urls);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

## Admin User Creation

To create an admin user, you can use the Firebase Console or create a script:

```typescript
import { AuthService } from '@/lib/firebase/auth';

// Create admin user
const createAdmin = async () => {
  try {
    const user = await AuthService.signUpWithEmail(
      'admin@codenies.com',
      'your-secure-password'
    );
    console.log('Admin user created:', user);
  } catch (error) {
    console.error('Failed to create admin:', error);
  }
};
```

## Migration from Hardcoded Password

The system has been migrated from hardcoded password authentication to Firebase Auth:

- ✅ Removed hardcoded password (`AhyamEmad@315`)
- ✅ Implemented Firebase Authentication
- ✅ Added proper error handling
- ✅ Maintained session persistence
- ✅ Added loading states

## File Structure

```
lib/
├── firebase/
│   ├── config.ts          # Firebase configuration
│   ├── auth.ts           # Authentication service
│   ├── storage.ts        # Storage service
│   └── index.ts          # Exports
├── contexts/
│   └── AuthContext.tsx   # Authentication context
components/
├── analytics/
│   ├── GoogleAnalytics.tsx
│   ├── MetaPixel.tsx
│   └── index.ts
└── admin/
    └── ProjectFormImages.tsx # Updated for Firebase Storage
```

## Next Steps

1. **Set up Firebase project** with the required services
2. **Configure environment variables** with your Firebase credentials
3. **Create admin user** through Firebase Console or script
4. **Test authentication** and file uploads
5. **Configure analytics** with your tracking IDs
6. **Set up security rules** for Storage

## Troubleshooting

### Common Issues
1. **Authentication errors**: Check Firebase project configuration
2. **Storage upload failures**: Verify storage rules and permissions
3. **Analytics not tracking**: Confirm measurement IDs are correct
4. **Environment variables**: Ensure all required variables are set

### Debug Mode
Enable debug logging by setting:
```env
NEXT_PUBLIC_FIREBASE_DEBUG=true
```

This will provide detailed logs for Firebase operations.
