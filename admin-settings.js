// ========================================
// POWFECT ADMIN SETTINGS
// ========================================


// ========================================
// ADMIN LOGIN CHECK
// ========================================

if (
    localStorage.getItem("powfectAdminLoggedIn") !== "true"
) {

    window.location.href = "admin-login.html";

}


// ========================================
// DEFAULT ADMIN PASSWORD
// ========================================

if (
    !localStorage.getItem("powfectAdminPassword")
) {

    localStorage.setItem(
        "powfectAdminPassword",
        "admin123"
    );

}


// ========================================
// LOAD STORE DETAILS
// ========================================

const savedStoreDetails =
    JSON.parse(
        localStorage.getItem("powfectStoreDetails")
    ) || {};


// ========================================
// HTML ELEMENTS
// ========================================

const storeName =
    document.getElementById("storeName");

const storeEmail =
    document.getElementById("storeEmail");

const storePhone =
    document.getElementById("storePhone");

const saveStoreBtn =
    document.getElementById("saveStoreBtn");

const storeMessage =
    document.getElementById("storeMessage");

const passwordForm =
    document.getElementById("passwordForm");

const currentPassword =
    document.getElementById("currentPassword");

const newPassword =
    document.getElementById("newPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const passwordMessage =
    document.getElementById("passwordMessage");


// ========================================
// PROFILE IMAGE ELEMENTS
// ========================================

const profileImageInput =
    document.getElementById(
        "profileImageInput"
    );

const adminProfileImage =
    document.getElementById(
        "adminProfileImage"
    );


// ========================================
// DISPLAY SAVED STORE DETAILS
// ========================================

if (savedStoreDetails.name) {

    storeName.value =
        savedStoreDetails.name;

}

if (savedStoreDetails.email) {

    storeEmail.value =
        savedStoreDetails.email;

}

if (savedStoreDetails.phone) {

    storePhone.value =
        savedStoreDetails.phone;

}


// ========================================
// SAVE STORE DETAILS
// ========================================

saveStoreBtn.addEventListener(
    "click",
    function () {

        const storeDetails = {

            name:
                storeName.value.trim(),

            email:
                storeEmail.value.trim(),

            phone:
                storePhone.value.trim()

        };


        if (!storeDetails.name) {

            showMessage(
                storeMessage,
                "Please enter store name.",
                "error"
            );

            return;

        }


        localStorage.setItem(
            "powfectStoreDetails",
            JSON.stringify(storeDetails)
        );


        showMessage(
            storeMessage,
            "Store details saved successfully.",
            "success"
        );

    }
);


// ========================================
// CHANGE PASSWORD
// ========================================

passwordForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const current =
            currentPassword.value;

        const newPass =
            newPassword.value;

        const confirmPass =
            confirmPassword.value;


        const savedPassword =
            localStorage.getItem(
                "powfectAdminPassword"
            );


        // -------------------------------
        // CHECK CURRENT PASSWORD
        // -------------------------------

        if (current !== savedPassword) {

            showMessage(
                passwordMessage,
                "Current password is incorrect.",
                "error"
            );

            return;

        }


        // -------------------------------
        // CHECK PASSWORD LENGTH
        // -------------------------------

        if (newPass.length < 6) {

            showMessage(
                passwordMessage,
                "New password must contain at least 6 characters.",
                "error"
            );

            return;

        }


        // -------------------------------
        // CHECK CONFIRM PASSWORD
        // -------------------------------

        if (newPass !== confirmPass) {

            showMessage(
                passwordMessage,
                "New password and confirm password do not match.",
                "error"
            );

            return;

        }


        // -------------------------------
        // SAVE NEW PASSWORD
        // -------------------------------

        localStorage.setItem(
            "powfectAdminPassword",
            newPass
        );


        showMessage(
            passwordMessage,
            "Password changed successfully.",
            "success"
        );


        passwordForm.reset();

    }
);


// ========================================
// PASSWORD SHOW / HIDE
// ========================================

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(inputId);

    const icon =
        button.querySelector("i");


    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove(
            "fa-eye"
        );

        icon.classList.add(
            "fa-eye-slash"
        );

    } else {

        input.type = "password";

        icon.classList.remove(
            "fa-eye-slash"
        );

        icon.classList.add(
            "fa-eye"
        );

    }

}


// ========================================
// MESSAGE FUNCTION
// ========================================

function showMessage(
    element,
    message,
    type
) {

    element.textContent =
        message;

    element.className =
        "message " + type;


    setTimeout(
        function () {

            element.className =
                "message";

            element.textContent =
                "";

        },
        3000
    );

}


// ========================================
// ADMIN PROFILE IMAGE
// ========================================

// DEFAULT PROFILE IMAGE

const defaultProfileImage =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";


// LOAD SAVED PROFILE IMAGE

const savedProfileImage =
    localStorage.getItem(
        "powfectAdminProfileImage"
    );


if (savedProfileImage) {

    adminProfileImage.src =
        savedProfileImage;

} else {

    adminProfileImage.src =
        defaultProfileImage;

}


// ========================================
// CHANGE PROFILE IMAGE
// ========================================

profileImageInput.addEventListener(
    "change",
    function () {

        const file =
            this.files[0];


        if (!file) {

            return;

        }


        // CHECK IMAGE FILE

        if (
            !file.type.startsWith("image/")
        ) {

            alert(
                "Please select an image file."
            );

            this.value = "";

            return;

        }


        // FILE READER

        const reader =
            new FileReader();


        reader.onload =
            function (event) {

                const imageData =
                    event.target.result;


                // DISPLAY IMAGE

                adminProfileImage.src =
                    imageData;


                // SAVE IMAGE

                localStorage.setItem(
                    "powfectAdminProfileImage",
                    imageData
                );

            };


        reader.readAsDataURL(
            file
        );

    }
);


// ========================================
// PROFILE IMAGE VIEWER
// ========================================

function openProfileImage() {

    const profileImage =
        document.getElementById(
            "adminProfileImage"
        );

    const largeProfileImage =
        document.getElementById(
            "largeProfileImage"
        );

    const profileImageViewer =
        document.getElementById(
            "profileImageViewer"
        );


    largeProfileImage.src =
        profileImage.src;


    profileImageViewer.classList.add(
        "active"
    );

}


// ========================================
// CLOSE PROFILE IMAGE
// ========================================

function closeProfileImage(event) {

    if (event) {

        event.stopPropagation();

    }


    const profileImageViewer =
        document.getElementById(
            "profileImageViewer"
        );


    profileImageViewer.classList.remove(
        "active"
    );

}


// ========================================
// LOGOUT
// ========================================

function logoutAdmin() {

    localStorage.removeItem(
        "powfectAdminLoggedIn"
    );

    window.location.href =
        "admin-login.html";

}


// ========================================
// MOBILE MENU
// ========================================

const menuToggle =
    document.getElementById("menuToggle");

const adminNavLinks =
    document.getElementById("adminNavLinks");


menuToggle.addEventListener(
    "click",
    function () {

        adminNavLinks.classList.toggle(
            "active"
        );

    }
);


adminNavLinks
    .querySelectorAll("a")
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    adminNavLinks.classList.remove(
                        "active"
                    );

                }
            );

        }
    );