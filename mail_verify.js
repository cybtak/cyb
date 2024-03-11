import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";

      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";

      import { getAuth, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

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
      console.log(app);
      
      const auth = getAuth();
    
    const user = auth.currentUser;
      
      
      
      
      
      
      
var resend = document.getElementById("resend");
var verify = document.getElementById("verify");

      
verify.addEventListener("click", function () {
   window.location.href = "check_verify.html";

});

resend.addEventListener("click", function () {
    
      
    sendEmailVerification(auth.currentUser)

  .then(() => {

    // Email verification sent!
    // ...
    console.log(auth.currentUser);
    var popup = document.createElement("div");





			popup.classList.add("popup");

			popup.innerHTML = "Verification Email Send Successfully, Please Check Your Email.";
			document.body.appendChild(popup);
			setTimeout(function() {
				popup.remove();
			}, 4000);
  })
  .catch((error) => {
    var popup = document.createElement("div");



                        popup.classList.add("popup2");

                        popup.innerHTML = error;
                        document.body.appendChild(popup);
                        setTimeout(function() {
                                popup.remove();
                        }, 4000);
    
  });
        
        var popup = document.createElement("div");



			popup.classList.add("popup");

			popup.innerHTML = "Sending Verification Email...";
			document.body.appendChild(popup);
			setTimeout(function() {
				popup.remove();
			}, 3000);
      

    
    
    
});