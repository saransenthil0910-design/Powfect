// ========================================
// GET ORDER INDEX FROM URL
// ========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const orderIndex =
    urlParams.get("order");


// ========================================
// GET ORDERS
// ========================================

let orders =
    JSON.parse(
        localStorage.getItem(
            "powfectOrders"
        )
    ) || [];


// ========================================
// HTML ELEMENT
// ========================================

const orderDetails =
    document.getElementById(
        "orderDetails"
    );


// ========================================
// MOBILE MENU
// ========================================

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navLinks =
    document.getElementById(
        "navLinks"
    );


if (
    menuToggle &&
    navLinks
) {

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
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        navLinks.classList.remove(
                            "active"
                        );

                    }
                );

            }
        );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !navLinks.contains(
                    event.target
                ) &&
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

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    let cart =
        JSON.parse(
            localStorage.getItem(
                "powfectCart"
            )
        ) || [];


    let total = 0;


    cart.forEach(
        function (product) {

            total +=
                Number(
                    product.quantity
                ) || 0;

        }
    );


    if (cartCount) {

        cartCount.textContent =
            total;

    }

}


// ========================================
// TRACKING STEPS
// ========================================

const trackingSteps = [

    "Order Placed",

    "Processing",

    "Shipped",

    "Out for Delivery",

    "Delivered"

];


// ========================================
// CHECK ORDER
// ========================================

if (

    orderIndex === null ||

    !orders[orderIndex]

) {

    orderDetails.innerHTML = `

        <div class="empty-order">

            <i
                class="fa-solid fa-box-open"
            ></i>

            <h2>
                Order Not Found
            </h2>

            <p>
                We couldn't find the
                selected order.
            </p>

            <a href="my-orders.html">

                Back to My Orders

            </a>

        </div>

    `;

}

else {

    displayOrder(
        orders[orderIndex]
    );

}


// ========================================
// DISPLAY ORDER
// ========================================

function displayOrder(order) {

    const currentStep =
        Number(
            order.statusStep
        ) || 1;


    const currentStatus =
        order.status ||
        "Order Placed";


    // ========================================
    // TRACKING HTML
    // ========================================

    let trackingHTML = "";


    trackingSteps.forEach(
        function (step, index) {

            const stepNumber =
                index + 1;

            let stepClass = "";


            if (
                stepNumber <
                currentStep
            ) {

                stepClass =
                    "completed";

            }

            else if (
                stepNumber ===
                currentStep
            ) {

                stepClass =
                    "current";

            }

            else {

                stepClass =
                    "pending";

            }


            trackingHTML += `

                <div
                    class="tracking-step ${stepClass}"
                >

                    <div
                        class="tracking-circle"
                    >

                        ${
                            stepNumber < currentStep
                            ? "✓"
                            : stepNumber
                        }

                    </div>


                    <div
                        class="tracking-label"
                    >

                        ${step}

                    </div>

                </div>

            `;


            if (
                index <
                trackingSteps.length - 1
            ) {

                trackingHTML += `

                    <div
                        class="tracking-line ${
                            stepNumber < currentStep
                            ? "completed-line"
                            : ""
                        }"
                    ></div>

                `;

            }

        }
    );


    // ========================================
    // PRODUCTS
    // ========================================

    let productsHTML = "";


    order.products.forEach(
        function (product) {

            const price =
                Number(
                    product.price
                ) || 0;


            const quantity =
                Number(
                    product.quantity
                ) || 0;


            const itemTotal =
                price * quantity;


            productsHTML += `

                <div
                    class="product-item"
                >

                    <div
                        class="product-left"
                    >

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >


                        <div
                            class="product-info"
                        >

                            <h3>
                                ${product.name}
                            </h3>


                            <p>
                                Price:
                                ₹${price.toLocaleString("en-IN")}
                            </p>


                            <p>
                                Quantity:
                                ${quantity}
                            </p>

                        </div>

                    </div>


                    <div
                        class="product-price"
                    >

                        ₹${itemTotal.toLocaleString("en-IN")}

                    </div>

                </div>

            `;

        }
    );


    // ========================================
    // STATUS MESSAGE
    // ========================================

    let deliveryMessage = "";


    if (
        currentStep ===
        trackingSteps.length
    ) {

        deliveryMessage = `

            <div class="delivered-message">

                <i
                    class="fa-solid fa-circle-check"
                ></i>

                Order Delivered Successfully

            </div>

        `;

    }

    else {

        deliveryMessage = `

            <div class="tracking-info-message">

                <i
                    class="fa-solid fa-truck"
                ></i>

                Your order is currently:

                <strong>
                    ${currentStatus}
                </strong>

            </div>

        `;

    }


    // ========================================
    // DISPLAY ORDER
    // ========================================

    orderDetails.innerHTML = `

        <div class="order-card">


            <!-- ORDER HEADER -->

            <div class="order-header">

                <div>

                    <h2>
                        Order #${
                            Number(orderIndex) + 1
                        }
                    </h2>

                    <p>
                        ${order.orderDate}
                    </p>

                </div>


                <span class="order-status">

                    ${currentStatus}

                </span>

            </div>


            <!-- CUSTOMER DETAILS -->

            <h2 class="details-title">

                Customer Details

            </h2>


            <div class="customer-details">


                <div class="detail-box">

                    <strong>
                        Name
                    </strong>

                    <span>
                        ${order.customerName}
                    </span>

                </div>


                <div class="detail-box">

                    <strong>
                        Email
                    </strong>

                    <span>
                        ${order.email}
                    </span>

                </div>


                <div class="detail-box">

                    <strong>
                        Phone
                    </strong>

                    <span>
                        ${order.phone}
                    </span>

                </div>


                <div class="detail-box">

                    <strong>
                        Payment Method
                    </strong>

                    <span>

                        ${
                            order.payment === "cod"
                            ? "Cash on Delivery"
                            : "Online Payment"
                        }

                    </span>

                </div>


                <div class="detail-box">

                    <strong>
                        Address
                    </strong>

                    <span>
                        ${order.address}
                    </span>

                </div>


                <div class="detail-box">

                    <strong>
                        City
                    </strong>

                    <span>
                        ${order.city}
                    </span>

                </div>


                <div class="detail-box">

                    <strong>
                        Pincode
                    </strong>

                    <span>
                        ${order.pincode}
                    </span>

                </div>


            </div>


            <!-- TRACKING -->

            <div class="tracking-section">

                <h2>
                    Order Tracking
                </h2>


                <div class="tracking-container">

                    ${trackingHTML}

                </div>


                <div class="status-update-area">

                    ${deliveryMessage}

                </div>

            </div>


            <!-- PRODUCTS -->

            <div class="products-section">

                <h2 class="details-title">

                    Products Ordered

                </h2>


                ${productsHTML}

            </div>


            <!-- TOTAL -->

            <div class="total-section">

                <div class="total-row">

                    <span>
                        Subtotal
                    </span>

                    <span>
                        ₹${Number(order.total).toLocaleString("en-IN")}
                    </span>

                </div>


                <div class="total-row">

                    <span>
                        Delivery
                    </span>

                    <span>
                        FREE
                    </span>

                </div>


                <div class="grand-total">

                    <span>
                        Total
                    </span>

                    <span>
                        ₹${Number(order.total).toLocaleString("en-IN")}
                    </span>

                </div>

            </div>


            <!-- BUTTONS -->

            <div class="action-buttons">

                <a
                    href="my-orders.html"
                    class="back-orders"
                >

                    <i
                        class="fa-solid fa-arrow-left"
                    ></i>

                    Back to My Orders

                </a>


                <a
                    href="products.html"
                    class="continue-shopping"
                >

                    <i
                        class="fa-solid fa-cart-shopping"
                    ></i>

                    Continue Shopping

                </a>

            </div>


        </div>

    `;

}


// ========================================
// UPDATE CART COUNT
// ========================================

updateCartCount();