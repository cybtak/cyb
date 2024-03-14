import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyAKfH8Z1GAt7kR7pizPrZ_Xfz_Th1mHYfU",
    authDomain: "simservicesind.firebaseapp.com",
    projectId: "simservicesind",
    storageBucket: "simservicesind.appspot.com",
    messagingSenderId: "133180748200",
    appId: "1:133180748200:web:b03dd7408e1bd17fd16d9d",
    measurementId: "G-P1BGZJ8QJV"
  };


const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();
  console.log(app);
  

  

      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("User is logged in");
          console.log(user);
          const uid = user.uid;
          var usr_mail = user.email;
         
          
          var emailVerified = user.emailVerified;
          
          if(emailVerified){
          console.log("Email Verified");

        }else{
            
                window.location.href = "verify_mail.html";
                }
              } else {
                console.log("User is not logged in");
                
              }
              });
          
         // Assuming 'Users' is the collection name
         firebase.initializeApp(firebaseConfig);

document.getElementById('logoutButton').addEventListener('click', function() {
    firebase.auth().signOut().then(() => {
        console.log('User signed out successfully');
        window.location.href = "index.html"; // Redirect to the login page after logout
    }).catch((error) => {
        console.error('Sign out error:', error);
    });
});