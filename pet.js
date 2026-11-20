/* =========================================
   MOBILE NAVBAR
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuBtn.querySelector("i");


    if (navLinks.classList.contains("show")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    }

});


/* CLOSE MENU AFTER CLICK */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");

        icon.classList.add("fa-bars");

    });

});



/* =========================================
   FLIP CARDS
========================================= */

const cards = document.querySelectorAll(".flip-card");


cards.forEach(card => {

    const inner = card.querySelector(".flip-card-inner");

    const viewButton = card.querySelector(".view-btn");


    /* VIEW DETAILS */

    viewButton.addEventListener("click", (event) => {

        event.stopPropagation();

        inner.classList.add("flipped");

    });


    /* MOBILE CLICK OUTSIDE BUTTON */

    card.addEventListener("click", (event) => {

        if (window.innerWidth <= 700) {

            if (!event.target.closest(".view-btn")) {

                inner.classList.remove("flipped");

            }

        }

    });

});


/* =========================================
   SERVICE SELECTION
========================================= */

const serviceOptions =
    document.querySelectorAll(".program-option");


let selectedService = "";


serviceOptions.forEach(option => {

    option.addEventListener("click", () => {


        /* REMOVE OLD SELECTED */

        serviceOptions.forEach(item => {

            item.classList.remove("selected");

        });


        /* SELECT CURRENT */

        option.classList.add("selected");


        const radio =
            option.querySelector("input");

        radio.checked = true;


        selectedService =
            radio.value;

    });

});



/* =========================================
   BOOKING BUTTON
========================================= */

const openBookingBtn =
    document.getElementById("openBookingBtn");

const bookingForm =
    document.getElementById("petBookingForm");


openBookingBtn.addEventListener("click", () => {


    if (selectedService === "") {

        alert("Please select a pet care service first.");

        return;

    }


    bookingForm.classList.add("show");


    bookingForm.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});



/* =========================================
   DATE - MINIMUM TODAY
========================================= */

const bookingDate =
    document.getElementById("bookingDate");


const today =
    new Date();


const year =
    today.getFullYear();


const month =
    String(today.getMonth() + 1).padStart(2, "0");


const day =
    String(today.getDate()).padStart(2, "0");


bookingDate.min =
    `${year}-${month}-${day}`;



/* =========================================
   PHONE NUMBER
========================================= */

const phoneInput =
    document.getElementById("phone");


phoneInput.addEventListener("input", () => {

    phoneInput.value =
        phoneInput.value.replace(/\D/g, "");

});



/* =========================================
   BOOKING FORM SUBMIT
========================================= */

const petBookingForm =
    document.getElementById("petBookingForm");


const bookingSuccess =
    document.getElementById("bookingSuccess");


petBookingForm.addEventListener("submit", (event) => {

    event.preventDefault();


    /* GET VALUES */

    const customerName =
        document.getElementById("customerName").value.trim();


    const phone =
        document.getElementById("phone").value.trim();


    const petName =
        document.getElementById("petName").value.trim();


    const petType =
        document.getElementById("petType").value;


    const date =
        document.getElementById("bookingDate").value;


    const time =
        document.getElementById("bookingTime").value;


    /* PHONE VALIDATION */

    if (phone.length !== 10) {

        alert("Please enter a valid 10-digit phone number.");

        return;

    }


    /* DATE FORMAT */

    const dateObject =
        new Date(date + "T00:00:00");


    const formattedDate =
        dateObject.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


    /* DISPLAY SUCCESS */

    document.getElementById("selectedService").innerHTML =
        `🐾 Service: ${selectedService}`;


    document.getElementById("selectedCustomer").innerHTML =
        `👤 Customer: ${customerName} | Pet: ${petName} (${petType})`;


    document.getElementById("selectedDate").innerHTML =
        `📅 Date: ${formattedDate}`;


    document.getElementById("selectedTime").innerHTML =
        `⏰ Time: ${time}`;


    /* HIDE FORM */

    petBookingForm.style.display = "none";


    /* HIDE BOOK BUTTON */

    openBookingBtn.style.display = "none";


    /* SHOW SUCCESS */

    bookingSuccess.classList.add("show");


    bookingSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});



/* =========================================
   RESET AFTER PAGE RELOAD
========================================= */

window.addEventListener("load", () => {

    bookingForm.classList.remove("show");

});