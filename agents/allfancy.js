import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, get, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const usersRef = ref(db, 'fancyRequests');

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
    const requestDetailsTable = document.getElementById('requestDetails').getElementsByTagName('tbody')[0];
    const userRow = document.createElement('tr');
    userRow.innerHTML = `
        <td>${requestDetailsTable.rows.length + 1}</td>
        <td>${userData.Name}</td>
        <td>${userData.Username}</td>
        <td>${userData['Telecom Provider']}</td>
        <td>${userData['Request Type']}</td>
        <td>${userData.Address}</td>
        <td>${userData['Phone Number']}</td>
        <td>${userData.Pincode}</td>
        <td>${userData.Uid}</td>
        <td>${userData.Status}</td>
        <td>
            <button class="delete-btn" data-id="${userId}">Delete</button>
            <button class="complete-btn" data-id="${userId}">Complete</button>
        </td>
    `;
    requestDetailsTable.appendChild(userRow);
}

// Function to delete user data from the database
function deleteUser(userId) {
    const userRef = ref(db, `fancyRequests/${userId}`);
    try {
        // Remove the user data from the database
        remove(userRef);
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}

// Function to mark the request as completed
function markAsCompleted(userId) {
    const userRef = ref(db, `fancyRequests/${userId}`);
    try {
        // Update the status to "Completed"
        update(userRef, {
            Status: "Completed"
        });
    } catch (error) {
        console.error("Error marking as completed:", error);
    }
}

// Function to filter table rows based on search input
function filterTable() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const table = document.getElementById('requestDetails');
    const rows = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those that don't match the search query
    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;
        for (let j = 0; j < cells.length; j++) {
            const cell = cells[j];
            if (cell) {
                const txtValue = cell.textContent || cell.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }
        // Toggle row visibility based on search result
        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Attach event listener to search input for real-time filtering
document.getElementById('searchInput').addEventListener('input', filterTable);

// Attach event listener to handle delete and complete button clicks
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const userId = event.target.getAttribute('data-id');
        if (confirm("Are you sure you want to delete this request?")) {
            deleteUser(userId);
            // Remove the row from the table
            event.target.closest('tr').remove();
        }
    } else if (event.target.classList.contains('complete-btn')) {
        const userId = event.target.getAttribute('data-id');
        if (confirm("Are you sure you want to mark this request as completed?")) {
            markAsCompleted(userId);
            // Update the status cell in the table
            event.target.closest('tr').querySelector('td:nth-child(10)').textContent = "Completed";
            // Disable the button
            event.target.disabled = true;
        }
    }
});

// Fetch users when the page loads
fetchUsers();
