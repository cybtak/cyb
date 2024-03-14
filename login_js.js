// login_js.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAKfH8Z1GAt7kR7pizPrZ_Xfz_Th1mHYfU",
    authDomain: "simservicesind.firebaseapp.com",
    projectId: "simservicesind",
    storageBucket: "simservicesind.appspot.com",
    messagingSenderId: "133180748200",
    appId: "1:133180748200:web:b03dd7408e1bd17fd16d9d",
    measurementId: "G-P1BGZJ8QJV"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

const loginBtn = document.getElementById("login_btn");
const successMessageElement = document.getElementById("successMessage");


loginBtn.addEventListener("click", function () {
    console.log("Button Clicked");
    const emailInput = document.getElementById("email").value;
    const passInput = document.getElementById("password").value;

    if (emailInput == "") {
        alert("Enter Email");
    } else if (passInput == "") {
        alert("Enter Password");
    } else {
        console.log("Login Code Here");

        // Login Code 
        signInWithEmailAndPassword(auth, emailInput, passInput)
            .then((userCredential) => {
                // User signed in successfully
                const user = userCredential.user;
                console.log('User signed in:', user.uid);

                // Display success message on the webpage
                const successMessage = "Login successful";
                successMessageElement.textContent = successMessage;
                successMessageElement.style.color = "green";
                successMessageElement.style.fontWeight = "bold";
                successMessageElement.style.fontSize = "18px";
                successMessageElement.style.display = "block";

                // Redirect to main.html after a delay
                setTimeout(() => {
                    window.location.href = 'main.html';
                }, 2000);
            })
            .catch((error) => {
                // Handle errors
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing in:', errorCode, errorMessage);

                // Display error message on the webpage
                messagesElement.textContent = errorMessage;
                messagesElement.style.color = "red";
                messagesElement.style.display = "block";
            });
    }
});


// ... (your existing code)

loginBtn.addEventListener("click", function () {
    console.log("Button Clicked");
    const emailInput = document.getElementById("email").value;
    const passInput = document.getElementById("password").value;

    if (emailInput == "") {
        alert("Enter Email");
    } else if (passInput == "") {
        alert("Enter Password");
    } else {
        console.log("Login Code Here");

        // Login Code 
        signInWithEmailAndPassword(auth, emailInput, passInput)
            .then((userCredential) => {
                // User signed in successfully
                const user = userCredential.user;
                console.log('User signed in:', user.uid);

                // Check if the user exists in the database
                const userRef = ref(database, 'users/' + user.uid);
                get(child(userRef, 'email'))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            // User exists in the database
                            const successMessage = "Login successful";
                            successMessageElement.textContent = successMessage;
                            successMessageElement.style.color = "green";
                            successMessageElement.style.fontWeight = "bold";
                            successMessageElement.style.fontSize = "18px";
                            successMessageElement.style.display = "block";

                            // Redirect to main.html after a delay
                            setTimeout(() => {
                                window.location.href = 'admin.html';
                            }, 2000);
                        } else {
                            // User does not exist in the database
                            alert("User does not exist. Please check your credentials.");
                        }
                    })
                    .catch((error) => {
                        console.error('Error checking user in the database:', error.message);
                    });
            })
            .catch((error) => {
                // Handle errors
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error signing in:', errorCode, errorMessage);

                // Display error message on the webpage
                successMessageElement.textContent = errorMessage;
                successMessageElement.style.color = "red";
                successMessageElement.style.display = "block";
            });
    }
});
