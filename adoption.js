/* =====================================================
   ADOPTION PAGE JAVASCRIPT
===================================================== */


/* ================= NAVBAR ================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

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


    /* Close menu after clicking a link */

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });

}


/* =====================================================
   FLIP CARDS
===================================================== */


/*
   IMPORTANT:

   Training design uses:

   .flip-card-inner.flipped

   So here also we are using:

   classList.toggle("flipped")

   NOT "flip".
*/


const viewButtons = document.querySelectorAll(".view-btn");


viewButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.stopPropagation();


        const card = button.closest(".flip-card");

        if (!card) return;


        const inner = card.querySelector(".flip-card-inner");

        if (!inner) return;


        /* Flip the card */

        inner.classList.toggle("flipped");

    });

});


/* =====================================================
   DESKTOP - FLIP BACK WHEN MOUSE LEAVES
===================================================== */


const flipCards = document.querySelectorAll(".flip-card");


flipCards.forEach(function (card) {

    card.addEventListener("mouseleave", function () {

        if (window.innerWidth > 700) {

            const inner = card.querySelector(".flip-card-inner");

            if (inner) {

                inner.classList.remove("flipped");

            }

        }

    });

});


/* =====================================================
   MOBILE - TAP OUTSIDE TO FLIP BACK
===================================================== */


document.addEventListener("click", function (event) {

    if (window.innerWidth <= 700) {

        flipCards.forEach(function (card) {

            const inner = card.querySelector(".flip-card-inner");

            if (!inner) return;


            /*
               If clicked outside the card,
               flip it back.
            */

            if (
                !card.contains(event.target) &&
                inner.classList.contains("flipped")
            ) {

                inner.classList.remove("flipped");

            }

        });

    }

});


/* =====================================================
   MOBILE - FLIP BACK ON SCROLL
===================================================== */


window.addEventListener(
    "scroll",
    function () {

        if (window.innerWidth <= 700) {

            flipCards.forEach(function (card) {

                const inner =
                    card.querySelector(".flip-card-inner");

                if (inner) {

                    inner.classList.remove("flipped");

                }

            });

        }

    },
    { passive: true }
);


/* =====================================================
   ADOPTION SERVICE SELECTION
===================================================== */


const serviceOptions =
    document.querySelectorAll(".program-option");


let selectedService = "";


serviceOptions.forEach(function (option) {

    option.addEventListener("click", function () {

        /* Remove selected from all */

        serviceOptions.forEach(function (item) {

            item.classList.remove("selected");

        });


        /* Add selected to clicked option */

        option.classList.add("selected");


        /* Store selected service */

        selectedService =
            option.getAttribute("data-service");

    });

});


/* =====================================================
   BOOKING / REQUEST
===================================================== */


const bookBtn =
    document.getElementById("bookBtn");

const successCard =
    document.getElementById("successCard");

const selectedServiceText =
    document.getElementById("selectedService");


if (bookBtn) {

    bookBtn.addEventListener("click", function () {

        /* Check whether service is selected */

        if (selectedService === "") {

            alert(
                "Please select a service before submitting your request."
            );

            return;

        }


        /* Show selected service */

        selectedServiceText.textContent =
            selectedService;


        /* Hide booking button */

        bookBtn.style.display = "none";


        /* Show success message */

        successCard.classList.add("show");


        /*
           EmailJS can be connected here later.

           Keep your actual:
           PUBLIC KEY
           SERVICE ID
           TEMPLATE ID

           when you are ready.
        */

    });

}