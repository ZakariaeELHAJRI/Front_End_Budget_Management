import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import  Constants  from "expo-constants";
//Firebase configuration
const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
    databseURL: Constants.manifest.extra.databaseURL,
};
// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
