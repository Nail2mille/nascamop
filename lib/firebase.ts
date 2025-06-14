// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5zDTDZL6uOpMEF5gtiwa8Fchb4JdUNBE",
  authDomain: "webzy-data.firebaseapp.com",
  projectId: "webzy-data",
  storageBucket: "webzy-data.firebasestorage.app",
  messagingSenderId: "336965390331",
  appId: "1:336965390331:web:981c1c7c2e6275b3fb055e",
  measurementId: "G-TR6JQ5M89K",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Analytics (only in browser)
let analytics
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app)
  })
}

// Initialize Firestore
export const db = getFirestore(app)
export { analytics }
export default app