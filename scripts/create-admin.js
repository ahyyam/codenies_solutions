#!/usr/bin/env node

/**
 * Admin User Creation Script
 * 
 * This script helps create admin users for the Firebase authentication system.
 * Run this script after setting up your Firebase project and environment variables.
 * 
 * Usage: node scripts/create-admin.js <email> <password>
 */

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

// Load environment variables
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function createAdminUser(email, password) {
  try {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('✅ Admin user created successfully!');
    console.log(`📧 Email: ${user.email}`);
    console.log(`🆔 UID: ${user.uid}`);
    console.log(`📅 Created: ${user.metadata.creationTime}`);
    
    return user;
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        console.log('💡 This email is already registered. Try a different email or reset the password.');
        break;
      case 'auth/invalid-email':
        console.log('💡 Please provide a valid email address.');
        break;
      case 'auth/weak-password':
        console.log('💡 Password should be at least 6 characters long.');
        break;
      case 'auth/network-request-failed':
        console.log('💡 Network error. Check your internet connection and Firebase configuration.');
        break;
      default:
        console.log('💡 Check your Firebase configuration and environment variables.');
    }
    
    process.exit(1);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('📋 Usage: node scripts/create-admin.js <email> <password>');
    console.log('');
    console.log('📝 Example:');
    console.log('   node scripts/create-admin.js admin@codenies.com MySecurePassword123');
    console.log('');
    console.log('⚠️  Make sure to:');
    console.log('   1. Set up your Firebase project');
    console.log('   2. Configure environment variables');
    console.log('   3. Enable Email/Password authentication in Firebase Console');
    process.exit(1);
  }

  const [email, password] = args;
  
  console.log('🚀 Creating admin user...');
  console.log(`📧 Email: ${email}`);
  console.log('');
  
  await createAdminUser(email, password);
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createAdminUser };
