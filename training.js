/* =========================================
   MOBILE NAVBAR
========================================= */

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


    /* CLOSE MENU AFTER CLICK */

    document
        .querySelectorAll(".nav-links a")
        .forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("show");

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

}



/* =========================================
   FLIP CARDS
========================================= */

const flipCards =
    document.querySelectorAll(".flip-card");

let activeMobileCard = null;


flipCards.forEach(function (card) {

    const flipInner =
        card.querySelector(".flip-card-inner");

    const viewButton =
        card.querySelector(".view-btn");


    /* VIEW DETAILS */

    viewButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            flipInner.classList.add("flipped");


            /* MOBILE */

            if (window.innerWidth <= 700) {

                activeMobileCard = card;

            }

        }
    );


    /* =====================================
       DESKTOP

       MOUSE LEAVE
       FLIP BACK
    ===================================== */

    card.addEventListener(
        "mouseleave",
        function () {

            if (window.innerWidth > 700) {

                flipInner.classList.remove(
                    "flipped"
                );

            }

        }
    );

});



/* =========================================
   MOBILE
   OUTSIDE TOUCH = FRONT
========================================= */

document.addEventListener(
    "touchstart",
    function (event) {

        if (
            window.innerWidth <= 700 &&
            activeMobileCard
        ) {

            if (
                !activeMobileCard.contains(
                    event.target
                )
            ) {

                const inner =
                    activeMobileCard.querySelector(
                        ".flip-card-inner"
                    );

                inner.classList.remove(
                    "flipped"
                );

                activeMobileCard = null;

            }

        }

    },
    {
        passive: true
    }
);



/* =========================================
   MOBILE
   SCROLL = FRONT
========================================= */

window.addEventListener(
    "scroll",
    function () {

        if (
            window.innerWidth <= 700 &&
            activeMobileCard
        ) {

            const inner =
                activeMobileCard.querySelector(
                    ".flip-card-inner"
                );

            inner.classList.remove(
                "flipped"
            );

            activeMobileCard = null;

        }

    },
    {
        passive: true
    }
);



/* =========================================
   EMAILJS INITIALIZATION
========================================= */

emailjs.init({

    publicKey: "YOUR_PUBLIC_KEY"

});



/* =========================================
   BOOKING
========================================= */

const trainingForm =
    document.getElementById("trainingForm");

const programOptions =
    document.querySelectorAll(
        ".program-option"
    );

const bookingSuccess =
    document.getElementById(
        "bookingSuccess"
    );

const selectedTraining =
    document.getElementById(
        "selectedTraining"
    );

const bookBtn =
    document.getElementById("bookBtn");



/* =========================================
   PROGRAM SELECTION
========================================= */

programOptions.forEach(function (option) {

    option.addEventListener(
        "click",
        function () {

            programOptions.forEach(
                function (item) {

                    item.classList.remove(
                        "selected"
                    );

                }
            );


            option.classList.add(
                "selected"
            );


            const radio =
                option.querySelector(
                    'input[type="radio"]'
                );


            radio.checked = true;

        }
    );

});



/* =========================================
   BOOKING FORM
========================================= */

trainingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const selected =
            document.querySelector(
                'input[name="training_program"]:checked'
            );


        if (!selected) {

            alert(
                "Please select a training program."
            );

            return;

        }


        const trainingProgram =
            selected.value;


        bookBtn.disabled = true;


        bookBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            &nbsp;
            Sending Booking...
        `;


        const templateParams = {

            training_program:
                trainingProgram,

            booking_status:
                "New Training Booking Request",

            booking_date:
                new Date().toLocaleString(
                    "en-IN"
                )

        };


        emailjs.send(

            "YOUR_SERVICE_ID",

            "YOUR_TEMPLATE_ID",

            templateParams

        )

        .then(function (response) {

            console.log(
                "Booking email sent:",
                response.status,
                response.text
            );


            selectedTraining.textContent =
                trainingProgram;


            trainingForm.style.display =
                "none";


            bookingSuccess.classList.add(
                "show"
            );

        })

        .catch(function (error) {

            console.error(
                "EmailJS Error:",
                error
            );


            alert(
                "Booking could not be sent. Please try again."
            );


            bookBtn.disabled = false;


            bookBtn.innerHTML = `
                <i class="fa-solid fa-calendar-check"></i>
                &nbsp;
                Book Training Session
            `;

        });

    }
);