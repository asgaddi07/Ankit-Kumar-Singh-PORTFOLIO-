const firebaseConfig = {

    apiKey: "AIzaSyDiySAVaXIdb3WOVX109saZb-aMEV1L5tU",
  
    authDomain: "hostprofile-3e0df.firebaseapp.com",
  
    databaseURL: "https://hostprofile-3e0df-default-rtdb.firebaseio.com",
  
    projectId: "hostprofile-3e0df",
  
    storageBucket: "hostprofile-3e0df.appspot.com",
  
    messagingSenderId: "145393958155",
  
    appId: "1:145393958155:web:f28e233c2edd36761a760e"
  
  };
  

// initialize firebase
firebase.initializeApp(firebaseConfig);

// create reference to your database
var ContactUsDB = firebase.database().ref("ContactUs");

document.getElementById("ContactUs").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var phone = getElementVal("phone");
    var msgContent = getElementVal("msgContent");

    saveMessages(name, emailid, phone, msgContent);

    //   enable alert
    document.querySelector(".alert").style.display = "block";

    //   remove the alert
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    //   reset the form
    document.getElementById("ContactUs").reset();
}

const saveMessages = (name, emailid, phone, msgContent) => {
    var newContactUs = ContactUsDB.push();

    newContactUs.set({
        name: name,
        emailid: emailid,
        phone: phone,
        msgContent: msgContent,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
