const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


/* ========================================
   MOBILE MENU
======================================== */

if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("active");

        }
    );


    /* ====================================
       CLOSE MENU AFTER LINK CLICK
    ==================================== */

    navLinks
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove("active");

                }
            );

        });


    /* ====================================
       CLOSE MENU OUTSIDE CLICK
    ==================================== */

    document.addEventListener(
        "click",
        function (event) {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navLinks.classList.remove("active");

            }

        }
    );

}