# officeEquipmentMangement
備品管理システム

firebase Hosting serviceを使用する。
１．Node.jsをInstallする
２．npm（Node js　Package Manager）を使用してfirebase-toolsをインストールする
　　npm install -g firebase-tools

firebaseでの環境の構築
１．firebaseサイトにコマンドラインでログイン
　　firebase login
２．ckgアカウントでログインをする


-- project memo
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyB1VOG0G6HHyIhcbChEAou4eojFGlyEpgE",
    authDomain: "myapp-4842c.firebaseapp.com",
    projectId: "myapp-4842c",
    storageBucket: "myapp-4842c.appspot.com",
    messagingSenderId: "729976145013",
    appId: "1:729976145013:web:b0b11c92f1c783b240243c",
    measurementId: "G-E777YC4FQP"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>
