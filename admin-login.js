// ========================================
// ADMIN LOGIN
// ========================================

const adminLoginForm =
    document.getElementById(
        "adminLoginForm"
    );

const loginError =
    document.getElementById(
        "loginError"
    );


// ========================================
// DEMO ADMIN CREDENTIALS
// ========================================

const ADMIN_USERNAME =
    "admin";


// ========================================
// GET ADMIN PASSWORD
// ========================================

// If password was changed from
// Admin Settings, use the new password.
//
// If no password exists yet,
// use default password: admin123

const ADMIN_PASSWORD =
    localStorage.getItem(
        "powfectAdminPassword"
    ) || "admin123";


// ========================================
// LOGIN FORM SUBMIT
// ========================================

adminLoginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const username =
            document
                .getElementById("username")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value
                .trim();


        // ========================================
        // CHECK LOGIN
        // ========================================

        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            // ========================================
            // SAVE ADMIN LOGIN
            // ========================================

            localStorage.setItem(
                "powfectAdminLoggedIn",
                "true"
            );


            // ========================================
            // GO TO ADMIN DASHBOARD
            // ========================================

            window.location.href =
                "admin-dashboard.html";

        }

        else {

            // ========================================
            // SHOW LOGIN ERROR
            // ========================================

            loginError.classList.add(
                "show"
            );

        }

    }
);