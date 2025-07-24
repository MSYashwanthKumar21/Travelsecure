// src/lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: "AIzaSyDf02S6o6qhP0YGSgp1NMCmCAgtEpzZYt8",
    authDomain: "travel-58ff3.firebaseapp.com",
    projectId: "travel-58ff3",
    storageBucket: "travel-58ff3.firebasestorage.app",
    messagingSenderId: "920768322048",
    appId: "1:920768322048:android:f2db588a12d84349f496e5"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { firestore, auth };
