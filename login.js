import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, get, ref, update } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBe7d9bllq8RnmI6xxEBk3oub3qogPT2aM",
  authDomain: "thinkwise-c7673.firebaseapp.com",
  databaseURL: "https://thinkwise-c7673-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "thinkwise-c7673",
  storageBucket: "thinkwise-c7673.appspot.com",
  messagingSenderId: "37732571551",
  appId: "1:37732571551:web:9b90a849ac5454f33a85aa",
  measurementId: "G-8957WM4SB7"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);
const dbref = ref(db);

let LoginForm = document.getElementsByClassName('LoginForm')[0];            // Selektion des HTML-Elements mit der Klasse 'LoginForm'

let EmailInput = LoginForm.querySelector('#emailInput');                    // Selektion der Eingabefelder innerhalb des Formulars
let PasswordInput = LoginForm.querySelector('#passwordInput');

let LoginUser = evt => {
    evt.preventDefault();         // Verhindern des Standardverhaltens des Formulars

    signInWithEmailAndPassword(auth, EmailInput.value, PasswordInput.value)     // Anmelden des Benutzers mit E-Mail und Passwort über das Firebase-Authentifizierungsmodul
    .then((userCredential)=>{
        const user = userCredential.user;
        const dt = new Date();

        update(ref(db, 'users/' + user.uid), {          // Aktualisieren des letzten Anmeldedatums in der Firebase-Datenbank für den angemeldeten Benutzer
          last_login: dt,
        });

        window.location.href = "https://benjiwurfl.github.io/Home/";
    })
    .catch((error) => {
        if (error.code === "auth/invalid-credential") {     // Wenn ein falsches Passwort eingegeben wurde, dann kommt eine Alert
            alert("Wrong password. Please try again.");
        } else {
            alert(error.message);
        }

        console.log(error.code);
        console.log(error.message);
    });
};

LoginForm.addEventListener('submit', LoginUser);