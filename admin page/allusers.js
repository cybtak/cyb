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
            const userId = childSnapshot.key;
            displayUser(userData, userId);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

function displayUser(userData, userId) {
    const userDetailsTable = document.getElementById('userDetails').getElementsByTagName('tbody')[0];
    const userRow = document.createElement('tr');
    userRow.innerHTML = `
        <td>${userDetailsTable.rows.length + 1}</td>
        <td>${userData.Name}</td>
        <td>${userData['Email Address']}</td>
        <td>${userData.Address}</td>
        <td>${userData['Phone Number']}</td>
        <td>${userData.Pincode}</td>
    `;
    userDetailsTable.appendChild(userRow);
}

// Fetch users when the page loads
fetchUsers();

// Add event listener for Add New User button
document.getElementById('addUserBtn').addEventListener('click', function () {
    // Redirect to a page where you can add a new user
    window.location.href = 'add_user.html';
});
