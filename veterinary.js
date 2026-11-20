
/* =========================================
   MOBILE NAVIGATION
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

const viewButtons = document.querySelectorAll(".view-btn");

viewButtons.forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".flip-card");

        const inner = card.querySelector(".flip-card-inner");

        inner.classList.toggle("flipped");

    });

});



/* =========================================
   DESKTOP - RESET CARD
========================================= */

document.querySelectorAll(".flip-card").forEach(card => {

    card.addEventListener("mouseleave", () => {

        if (window.innerWidth > 700) {

            const inner =
                card.querySelector(".flip-card-inner");

            inner.classList.remove("flipped");

        }

    });

});



/* =========================================
   MOBILE - CLICK OUTSIDE
========================================= */

document.addEventListener("click", function (event) {

    if (window.innerWidth <= 700) {

        const clickedCard =
            event.target.closest(".flip-card");

        if (!clickedCard) {

            document
                .querySelectorAll(".flip-card-inner")
                .forEach(inner => {

                    inner.classList.remove("flipped");

                });

        }

    }

});



/* =========================================
   MOBILE - SCROLL RESET
========================================= */

window.addEventListener("scroll", () => {

    if (window.innerWidth <= 700) {

        document
            .querySelectorAll(".flip-card-inner")
            .forEach(inner => {

                inner.classList.remove("flipped");

            });

    }

});



/* =========================================
   VETERINARY BOOKING
========================================= */

const programOptions =
    document.querySelectorAll(".program-option");

const veterinaryForm =
    document.getElementById("veterinaryForm");

const bookBtn =
    document.getElementById("bookBtn");

const bookingSuccess =
    document.getElementById("bookingSuccess");

const selectedVeterinary =
    document.getElementById("selectedVeterinary");


let selectedService = "";



/* SELECT SERVICE */

programOptions.forEach(option => {

    option.addEventListener("click", () => {

        programOptions.forEach(item => {

            item.classList.remove("selected");

        });


        option.classList.add("selected");


        const radio =
            option.querySelector("input");

        radio.checked = true;


        selectedService =
            radio.value;

    });

});



/* =========================================
   SUBMIT BOOKING
========================================= */

veterinaryForm.addEventListener("submit", function (event) {

    event.preventDefault();


    if (!selectedService) {

        alert(
            "Please select a veterinary service."
        );

        return;

    }


    selectedVeterinary.textContent =
        selectedService;


    bookingSuccess.classList.add("show");


    bookBtn.disabled = true;

    bookBtn.innerHTML =
        '<i class="fa-solid fa-check"></i> Appointment Submitted';


    programOptions.forEach(option => {

        option.style.pointerEvents = "none";

    });

});