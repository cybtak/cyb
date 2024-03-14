// registration.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const auth = getAuth();
const database = getDatabase();

const regBtn = document.getElementById("reg_btn");

regBtn.addEventListener("click", function () {
    const emailInput = document.getElementById("email").value;
    const passInput = document.getElementById("password").value;
    const nameInput = document.getElementById("name").value;
    const addressInput = document.getElementById("address").value;
    const phoneInput = document.getElementById("phone").value;
    const pincodeInput = document.getElementById("pincode").value;

    if (emailInput == "" || passInput == "" || nameInput == "" || addressInput == "" || phoneInput == "" || pincodeInput == "") {
        alert("Please fill in all fields.");
        return;
    }

    // Check if the email already exists in the database
    checkIfEmailExists(emailInput).then((emailExists) => {
        if (emailExists) {
            alert('Email already exists. Please use a different email address.');
            return;
        }

        // Continue with the registration logic
        createUserWithEmailAndPassword(auth, emailInput, passInput)
            .then((userCredential) => {
                const user = userCredential.user;
                const userUid = user.uid;
                const userPath = 'Users/' + userUid;

                const userData = {
                    'Email Address': emailInput,
                    'User ID': userUid,
                    'Name': nameInput,
                    'Address': addressInput,
                    'Phone Number': phoneInput,
                    'Pincode': pincodeInput
                };

                // Create a div element for displaying the message
                const messageDiv = document.createElement('div');
                messageDiv.textContent = 'Registration successful!';
                messageDiv.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: #4CAF50;
                    color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    z-index: 1000; /* Ensure it's above other elements */
                `;

                // Append the message element to the body
                document.body.appendChild(messageDiv);

                // Perform the registration
                set(ref(database, userPath), userData)
                    .then(() => {
                        console.log("Registration successful!");
                        setTimeout(() => {
                            window.location.href = "main.html";
                        }, 1000);
                    })
                    .catch((error) => {
                        console.error('Error adding user data to database:', error);
                        messageDiv.textContent = 'Registration failed. Please try again.';
                        messageDiv.style.backgroundColor = '#FF6347'; // Change color to red for error
                    });
            })
            .catch((error) => {
                console.error('Error creating user:', error);
                alert('Registration failed. Please try again.');
            });
    });
});

// Function to check if the email already exists in the database
async function checkIfEmailExists(email) {
    const emailExistsRef = ref(database, 'Users');
    const snapshot = await get(emailExistsRef);
    
    if (snapshot.exists()) {
        // Check if any user has the specified email
        const usersWithEmail = Object.values(snapshot.val()).filter(user => user['Email Address'] === email);
        return usersWithEmail.length > 0;
    } else {
        return false;
    }
}
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match. Please enter matching passwords.");
    } else {
        console.log("Registration successful!");
    }
});
