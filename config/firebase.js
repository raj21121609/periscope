import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyA6yL3esQCnKocQyd2K8UsM6kG8Lhg9azw",
    authDomain: "auth-d1b85.firebaseapp.com",
    projectId: "auth-d1b85",
    storageBucket: "auth-d1b85.firebasestorage.app",
    messagingSenderId: "665924959456",
    appId: "1:665924959456:web:60943f5e035a2dce8ea485",
    measurementId: "G-LJBB80RVFW"
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});