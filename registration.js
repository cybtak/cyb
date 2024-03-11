import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
  import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
  
  import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


const regBtn = document.getElementById("reg_btn");


regBtn.addEventListener("click", function (){
    console.log("Button Clicked");
    const emailInput = document.getElementById("email").value;
    const passInput = document.getElementById("password").value;
    const nameInput = document.getElementById("name").value;
    const addressInput = document.getElementById("address").value;
    const phoneInput = document.getElementById("phone").value;
    const pincodeInput = document.getElementById("pincode").value;



    if (emailInput == "") {
        alert("Enter Email");
    } else if (passInput == "") {
        alert("Enter Password");

    } else if (nameInput == "") {
        alert("Enter The Name");
    
    } else if (addressInput == "") {
        alert("Enter The Address");
    } else if (phoneInput == "") {
        alert("Enter Phone Number ");
    } else if (pincodeInput == "") {
        alert("Enter The Pincode");
    } else {
        console.log("Login Code Here");

        // Register Code
        
        createUserWithEmailAndPassword(auth, emailInput, passInput)
        .then((userCredential) =>{
            // User created successfully
            

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
        // Add a success message to the console
        console.log("Registration successful!");

        // Redirect to main.html after a short delay
        setTimeout(() => {
            window.location.href = "main.html";
        }, 1000); // Adjust the delay as needed (in milliseconds)
    })
    .catch((error) => {
        // Display error message in the console
        console.error('Error adding user data to database:', error);

        // Optionally, display an error message to the user
        messageDiv.textContent = 'Registration failed. Please try again.';
        messageDiv.style.backgroundColor = '#FF6347'; // Change color to red for error
        // You may want to hide the message after a certain delay or let the user dismiss it
    });

        
            
        })
        .catch(error => {
            console.log(error);
        
        });

    }

});




// registration.js

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Fetch values from form fields
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;

    // Simple validation: Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match. Please enter matching passwords.");
    } else {
        // Perform the registration logic here (e.g., send data to server)
        console.log("Registration successful!");
        // You can redirect the user to another page or perform other actions as needed
    }
});
