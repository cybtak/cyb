import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAuth,onAuthStateChanged, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set, update, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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


var uid;
var usr_mail;
var username;
var contact_num;


 onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is logged in");
          console.log(user);
          uid = user.uid;
          usr_mail = user.email;

              
// AFTER LOGIN CODE

const userRef = ref(database, 'Users/' + uid);

    // Fetch user data
    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
            // Extract name and contact number from userData object
            username = userData.Name;
            contact_num = userData["Phone Number"];

            console.log("Name:", name);
            console.log("Contact Number:", contact_num);
        } else {
            console.log("User data not found in the database");
        }
    });













} else {
                console.log("User is not logged in");
                // JavaScript code to go back to the previous page

  window.history.back();

                
                
              }
              });
              
              
              
              
              
              
              
              
              document.getElementById("send-btn").addEventListener("click", function(event) {
               
                const timestampInMilliseconds = Date.now();
console.log(timestampInMilliseconds);
                
        // Log "Submitted" to the console
        const name = document.getElementById("name").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const pincode = document.getElementById("pincode").value;
        const requestType = document.getElementById("requestType").value;
        const telecomProvider = document.getElementById("telecomProvider").value;

        // Check if all fields are filled and selected
        if (name && phone && address && pincode && requestType && telecomProvider) {
            const userUid = uid;

                const userPath2 = 'Requests/' + timestampInMilliseconds;

                
                const userData2 = {
                    Name: name,
                    Username: username,
                    Uid: uid,
                    "Phone Number": phone,
                    Address: address,
                    Pincode: pincode,
                    "Request Type": requestType,
                    Key: timestampInMilliseconds,
                    "Telecom Provider": telecomProvider
                };
                set(ref(database, userPath2), userData2)
    .then(() => {
        // Add a success message to the console
        alert("Request Submitted Successfully");
        setTimeout(() => {
            window.location.href = "main.html";
        }, 1000); 
        
         })
    .catch((error) => {
        // Display error message in the console
        console.error('Error adding user data to database:', error);
        
        });
            
            } else {
            
            alert("Please Fill all Fields");
            }
            
});