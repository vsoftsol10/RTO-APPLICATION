import {initializeApp} from "@react-native-firebase/app"
import {getFirestore} from "@react-native-firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDEOXKqe_nFOdBQRRsuq0uYNxisVtCp3VM",
    authDomain: "licenseapp-a8c01.firebaseapp.com",
    projectId: "licenseapp-a8c01",
    storageBucket: "licenseapp-a8c01.firebasestorage.app",
    messageSenderId: "640987262083",
    appId: "1:640987262083:android:ae8aa00c275739d5173fb6"
};

const app= initializeApp(firebaseConfig);

const db= getFirestore(app);

export {db};