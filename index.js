 
/* Certificate Item Filter */
const filterContainer = document.querySelector(".boxC-filter"),
    filterBtns = filterContainer.children,
    totalFilterBtns = filterBtns.length,
    boxCItems = document.querySelectorAll(".boxC-items"),
    totalboxCItem = boxCItems.length;

for (let i = 0; i < totalFilterBtns; i++) {
    filterBtns[i].addEventListener("click", function () {
        filterContainer.querySelector(".active").classList.remove("active")
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");
        for (let k = 0; k < totalboxCItem; k++) {
            if (filterValue === boxCItems[k].getAttribute("data-category")) {
                boxCItems[k].classList.add("show");
                boxCItems[k].classList.remove("hide");
            }
            else {
                boxCItems[k].classList.add("hide");
                boxCItems[k].classList.remove("show");
            }
            if (filterValue === "all") {
                boxCItems[k].classList.add("show");
                boxCItems[k].classList.remove("hide");
            }
        }
    })
}


/* boxC lightBox */
const lightbox = document.querySelector(".lightbox"),
    lightboxImg = lightbox.querySelector(".lightbox-img"),
    lightboxClose = lightbox.querySelector(".lightbox-close"),
    lightboxText = lightbox.querySelector(".caption-text"),
    lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;

for (let i = 0; i < totalboxCItem; i++) {
    boxCItems[i].addEventListener("click", function () {
        itemIndex = i;
        changeItem();
        toggleLightbox();
    })
}

function nextItem() {
    if (itemIndex === totalboxCItem - 1) {
        itemIndex = 0;
    }
    else {
        itemIndex++;
    }
    changeItem();
}
function prevItem() {
    if (itemIndex === 0) {
        itemIndex = totalboxCItem - 1;
    }
    else {
        itemIndex--;
    }
    changeItem();
}

function toggleLightbox() {
    lightbox.classList.toggle("open");
}

function changeItem() {
    imgSrc = boxCItems[itemIndex].querySelector(".port-img img").getAttribute("src");
    console.log(imgSrc);
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = boxCItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalboxCItem;
}

/* Close Lightbox */
lightbox.addEventListener("click", function (event) {
    if (event.target === lightboxClose || event.target === lightbox) {
        toggleLightbox();
    }
})

/* Aside Navbar */
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section");
totalSection = allSection.length;

for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () {
        // Remove Back Section Class
        for (let i = 0; i < totalSection; i++) {
            allSection[i].classList.remove("back-section")
        }
        for (let j = 0; j < totalNavList; j++) {
            // Add Back Section Class
            if (navList[j].querySelector("a").classList.contains("active")) {
                allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active")
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active");
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];

        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active")
        }
    }
}

const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open")
    }
}

/* style switcher */

const links=document.querySelectorAll(".alternate-style"); 
      totalLinks=links.length;

function setActiveStyle(color){ 
    for(let i = 0; i<totalLinks; i++){
        if(color === links[i].getAttribute("title")){
            links[i].removeAttribute("disabled");
            chn=links[i];
            document.body.className="chn";
        }
        else{
            links[i].setAttribute("disabled","true");
        }
    }
}

// Body Theme

const bodySkin=document.querySelectorAll(".body-skin");
      totalBodySkin=bodySkin.length;

for(let i = 0; i<totalBodySkin; i++){
    bodySkin[i].addEventListener("change",function(){ 
        if(this.value === "dark"){
            document.body.className="dark";
        }
        else{
            document.body.className="";
        }
    })
}



document.querySelector(".toggle-switcher").addEventListener("click",() =>{
    // console.log("hi")
    document.querySelector(".style-switcher").classList.toggle("open");
})


/* Firebase Connectivity */
const firebaseConfig = {

    apiKey: "AIzaSyDiySAVaXIdb3WOVX109saZb-aMEV1L5tU",
  
    authDomain: "hostprofile-3e0df.firebaseapp.com",
  
    databaseURL: "https://hostprofile-3e0df-default-rtdb.firebaseio.com",
  
    projectId: "hostprofile-3e0df",
  
    storageBucket: "hostprofile-3e0df.appspot.com",
  
    messagingSenderId: "145393958155",
  
    appId: "1:145393958155:web:f28e233c2edd36761a760e"
  
  };
  
  /* Firebase Connectivity */

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
}


