// ========================================
// POWFECT BLOG PAGE
// ========================================


// ========================================
// MOBILE MENU
// ========================================

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle("active");

        }
    );


    // Close menu after clicking a link

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


    // Close menu when clicking outside

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


// ========================================
// READ MORE
// ========================================

const readMoreButtons =
    document.querySelectorAll(".read-more");


readMoreButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const details =
                    button.nextElementSibling;


                if (!details) {
                    return;
                }


                details.classList.toggle("show");


                if (
                    details.classList.contains("show")
                ) {

                    button.innerHTML = `
                        Read Less
                        <i class="fa-solid fa-arrow-up"></i>
                    `;

                } else {

                    button.innerHTML = `
                        Read More
                        <i class="fa-solid fa-arrow-right"></i>
                    `;

                }

            }
        );

    }
);