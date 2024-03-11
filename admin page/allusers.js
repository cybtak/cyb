import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const db = getDatabase();
const usersRef = ref(db, 'Users');



async function fetchUsers() {
    try {
      const snapshot = await get(usersRef);
      snapshot.forEach((childSnapshot) => {
        const userData = childSnapshot.val();
        // Check if the user data contains the required keys
        if (userData.hasOwnProperty('Name') && 
            userData.hasOwnProperty('Email Address') && 
            userData.hasOwnProperty('Address') && 
            userData.hasOwnProperty('Phone Number') && 
            userData.hasOwnProperty('Pincode')) {
          displayUser(userData);
        }
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }


  function displayUser(userData) {
    const userDetailsDiv = document.getElementById('userDetails');
    const userElement = document.createElement('div');
    userElement.innerHTML = `
      <p><strong>Name:</strong> ${userData.Name}</p>
      <p><strong>Email Address:</strong> ${userData['Email Address']}</p>
      <p><strong>Address:</strong> ${userData.Address}</p>
      <p><strong>Phone Number:</strong> ${userData['Phone Number']}</p>
      <p><strong>Pincode:</strong> ${userData.Pincode}</p>
      <hr>
    `;
    userDetailsDiv.appendChild(userElement);
  }
  
  // Fetch users when the page loads
  fetchUsers();