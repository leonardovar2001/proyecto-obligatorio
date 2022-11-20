    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"
  
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBpxo41hR-Y9Z1Ey--C1esrnBoRjqsGOsY",
      authDomain: "e-mercado-368918.firebaseapp.com",
      projectId: "e-mercado-368918",
      storageBucket: "e-mercado-368918.appspot.com",
      messagingSenderId: "718645188342",
      appId: "1:718645188342:web:868daedf7a7cf6583bfed7"
    };
  
    // Initialize Firebase
    export const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app)