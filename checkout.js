// ========================================
// POWFECT CHECKOUT
// ========================================


// ========================================
// EMAILJS INITIALIZATION
// ========================================

emailjs.init({
    publicKey: "8QlBfdms6YAczbEDC"
});


// ========================================
// GET CART
// ========================================

let cart =
    JSON.parse(
        localStorage.getItem("powfectCart")
    ) || [];


// ========================================
// GET HTML ELEMENTS
// ========================================

const orderItems =
    document.getElementById("orderItems");

const subtotalElement =
    document.getElementById("subtotal");

const totalElement =
    document.getElementById("total");

const checkoutForm =
    document.getElementById("checkoutForm");

const cartCount =
    document.getElementById("cartCount");


// ========================================
// MOBILE NAVBAR
// ========================================

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "active"
            );

        }
    );


    navLinks
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.classList.remove(
                        "active"
                    );

                }
            );

        });


    document.addEventListener(
        "click",
        function (event) {

            if (
                !navLinks.contains(
                    event.target
                )
                &&
                !menuToggle.contains(
                    event.target
                )
            ) {

                navLinks.classList.remove(
                    "active"
                );

            }

        }
    );

}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    let totalQuantity = 0;


    cart.forEach(function (product) {

        totalQuantity +=
            Number(product.quantity) || 0;

    });


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


// ========================================
// DISPLAY ORDER
// ========================================

function displayOrder() {

    // ========================================
    // CHECK CART
    // ========================================

    if (cart.length === 0) {

        orderItems.innerHTML = `

            <p
                style="
                    text-align:center;
                    color:#777;
                    padding:10px 0;
                "
            >
                Your cart is empty.
            </p>

        `;


        subtotalElement.textContent =
            "₹0";


        totalElement.textContent =
            "₹0";


        updateCartCount();

        return;
    }


    // ========================================
    // CALCULATE SUBTOTAL
    // ========================================

    let subtotal = 0;


    orderItems.innerHTML = "";


    // ========================================
    // DISPLAY PRODUCTS
    // ========================================

    cart.forEach(function (product) {

        const price =
            Number(product.price) || 0;


        const quantity =
            Number(product.quantity) || 0;


        const itemTotal =
            price * quantity;


        subtotal += itemTotal;


        const item =
            document.createElement("div");


        item.className =
            "order-item";


        item.innerHTML = `

            <div>

                <strong
                    class="order-item-name"
                >
                    ${product.name}
                </strong>

                <p
                    style="
                        margin-top:5px;
                        color:#777;
                        font-size:14px;
                    "
                >
                    Quantity: ${quantity}
                </p>

            </div>


            <div
                class="order-item-price"
            >
                ₹${itemTotal.toLocaleString(
                    "en-IN"
                )}
            </div>

        `;


        orderItems.appendChild(item);

    });


    // ========================================
    // UPDATE TOTALS
    // ========================================

    subtotalElement.textContent =
        "₹" +
        subtotal.toLocaleString(
            "en-IN"
        );


    totalElement.textContent =
        "₹" +
        subtotal.toLocaleString(
            "en-IN"
        );


    updateCartCount();

}


// ========================================
// CHECKOUT FORM SUBMIT
// ========================================

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ========================================
        // CHECK CART
        // ========================================

        if (cart.length === 0) {

            alert(
                "Your cart is empty!"
            );

            return;

        }


        // ========================================
        // GET CUSTOMER DETAILS
        // ========================================

        const customerName =
            document
                .getElementById("name")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const phone =
            document
                .getElementById("phone")
                .value
                .trim();


        const address =
            document
                .getElementById("address")
                .value
                .trim();


        const city =
            document
                .getElementById("city")
                .value
                .trim();


        const pincode =
            document
                .getElementById("pincode")
                .value
                .trim();


        const payment =
            document
                .getElementById("payment")
                .value;


        // ========================================
        // CALCULATE TOTAL
        // ========================================

        let total = 0;


        cart.forEach(function (product) {

            const price =
                Number(product.price) || 0;


            const quantity =
                Number(product.quantity) || 0;


            total +=
                price * quantity;

        });


        // ========================================
        // CREATE PRODUCT LIST
        // ========================================

        let productList = "";


        cart.forEach(function (product) {

            const price =
                Number(product.price) || 0;


            const quantity =
                Number(product.quantity) || 0;


            const itemTotal =
                price * quantity;


            productList +=
                product.name +
                " | Qty: " +
                quantity +
                " | ₹" +
                itemTotal +
                "\n";

        });


        // ========================================
        // ORDER DATE
        // ========================================

        const orderDate =
            new Date().toLocaleString(
                "en-IN"
            );


        // ========================================
        // CREATE ORDER ID
        // ========================================

        const orderId =
            "PF" +
            Date.now();


        // ========================================
        // CREATE ORDER OBJECT
        // ========================================

        const order = {

            orderId:
                orderId,

            customerName:
                customerName,

            email:
                email,

            phone:
                phone,

            address:
                address,

            city:
                city,

            pincode:
                pincode,

            payment:
                payment,

            products:
                cart,

            total:
                total,

            orderDate:
                orderDate,

            status:
                "Order Placed",

            statusStep:
                1

        };


        // ========================================
        // EMAILJS TEMPLATE DATA
        // ========================================

        const templateParams = {

            to_email:
                email,

            customerName:
                customerName,

            email:
                email,

            phone:
                phone,

            address:
                address,

            city:
                city,

            pincode:
                pincode,

            payment:
                payment,

            products:
                productList,

            total:
                total,

            orderDate:
                orderDate

        };


        // ========================================
        // CONSOLE
        // ========================================

        console.log(
            "ORDER EMAIL DATA:",
            templateParams
        );


        console.log(
            "ORDER DATA:",
            order
        );


        // ========================================
        // DISABLE BUTTON
        // ========================================

        const button =
            checkoutForm.querySelector(
                "button[type='submit']"
            );


        if (button) {

            button.disabled = true;

            button.textContent =
                "Placing Order...";

        }


        // ========================================
        // SEND EMAIL
        // ========================================

        emailjs.send(

            "service_fl7qfnk",

            "template_6b0su1f",

            templateParams

        )

        .then(function (response) {

            console.log(
                "Order email sent successfully!",
                response.status
            );


            // ========================================
            // GET EXISTING ORDERS
            // ========================================

            let orders =
                JSON.parse(
                    localStorage.getItem(
                        "powfectOrders"
                    )
                ) || [];


            // ========================================
            // ADD NEW ORDER
            // ========================================

            orders.push(order);


            // ========================================
            // SAVE ALL ORDERS
            // ========================================

            localStorage.setItem(

                "powfectOrders",

                JSON.stringify(
                    orders
                )

            );


            // ========================================
            // SAVE LATEST ORDER
            // ========================================

            localStorage.setItem(

                "powfectOrder",

                JSON.stringify(
                    order
                )

            );


            // ========================================
            // CLEAR CART
            // ========================================

            localStorage.removeItem(
                "powfectCart"
            );


            // ========================================
            // GO TO SUCCESS PAGE
            // ========================================

            window.location.href =
                "order-success.html";

        })


        // ========================================
        // EMAIL ERROR
        // ========================================

        .catch(function (error) {

            console.error(
                "EMAILJS ERROR:",
                error
            );


            alert(

                "Email sending failed!\n\n" +

                "Status: " +

                (
                    error.status ||
                    "Unknown"
                ) +

                "\n\nMessage: " +

                (
                    error.text ||
                    error.message ||
                    "Unknown error"
                )

            );


            // ========================================
            // ENABLE BUTTON AGAIN
            // ========================================

            if (button) {

                button.disabled = false;

                button.innerHTML =
                    '<i class="fa-solid fa-check"></i> Place Order';

            }

        });

    }
);


// ========================================
// INITIAL LOAD
// ========================================

displayOrder();

updateCartCount();