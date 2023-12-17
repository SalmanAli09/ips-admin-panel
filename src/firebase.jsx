import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDMleam2sZiABCJUuDHla2VugmerJEePEE",
    authDomain: "islamic-public-school.firebaseapp.com",
    projectId: "islamic-public-school",
    storageBucket: "islamic-public-school.appspot.com",
    messagingSenderId: "380939875276",
    appId: "1:380939875276:web:e82adde7d4f6abfd75e369",
    measurementId: "G-BZFR3MN6JP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);