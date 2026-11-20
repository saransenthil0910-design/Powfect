// ========================================
// GET ORDERS
// ========================================

let orders =
    JSON.parse(localStorage.getItem("powfectOrders")) || [];


// ========================================
// GET HTML ELEMENT
// ========================================

const ordersContainer =
    document.getElementById("ordersContainer");


// ========================================
// DISPLAY ORDERS
// ========================================

function displayOrders() {

    // ========================================
    // NO ORDERS
    // ========================================

    if (orders.length === 0) {

        ordersContainer.innerHTML = `

            <div class="empty-orders">

                <i class="fa-solid fa-box-open"></i>

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    You haven't placed any orders yet.
                </p>

                <a href="products.html">
                    Start Shopping
                </a>

            </div>

        `;

        return;
    }


    // Clear old content

    ordersContainer.innerHTML = "";


    // ========================================
    // LATEST ORDER FIRST
    // ========================================

    const reversedOrders =
        [...orders].reverse();


    reversedOrders.forEach(
        function(order, reversedIndex) {


            // Original index

            const originalIndex =
                orders.length - 1 - reversedIndex;


            // ========================================
            // OLD ORDERS SUPPORT
            // ========================================

            const currentStep =
                order.statusStep || 1;


            const currentStatus =
                order.status || "Order Placed";


            // ========================================
            // PRODUCTS
            // ========================================

            let productsHTML = "";


            order.products.forEach(
                function(product) {

                    const itemTotal =
                        product.price *
                        product.quantity;


                    productsHTML += `

                        <div class="order-product">

                            <img
                                src="${product.image}"
                                alt="${product.name}"
                            >


                            <div class="order-product-info">

                                <h3>
                                    ${product.name}
                                </h3>

                                <p>
                                    Quantity:
                                    ${product.quantity}
                                </p>

                            </div>


                            <strong>
                                ₹${itemTotal}
                            </strong>

                        </div>

                    `;

                }
            );


            // ========================================
            // TRACKING TIMELINE
            // ========================================

            const trackingSteps = [

                "Order Placed",

                "Processing",

                "Shipped",

                "Out for Delivery",

                "Delivered"

            ];


            let trackingHTML = "";


            trackingSteps.forEach(
                function(step, index) {


                    const stepNumber =
                        index + 1;


                    let stepClass = "";


                    // Completed

                    if (stepNumber < currentStep) {

                        stepClass =
                            "completed";

                    }


                    // Current

                    else if (stepNumber === currentStep) {

                        stepClass =
                            "current";

                    }


                    // Future

                    else {

                        stepClass =
                            "pending";

                    }


                    trackingHTML += `

                        <div class="tracking-step ${stepClass}">

                            <div class="tracking-circle">

                                ${
                                    stepNumber < currentStep
                                    ? "✓"
                                    : stepNumber
                                }

                            </div>


                            <div class="tracking-label">

                                ${step}

                            </div>

                        </div>

                    `;


                    // Connector

                    if (
                        index <
                        trackingSteps.length - 1
                    ) {

                        trackingHTML += `

                            <div class="tracking-line ${
                                stepNumber < currentStep
                                ? "completed-line"
                                : ""
                            }"></div>

                        `;

                    }

                }
            );


            // ========================================
            // ORDER CARD
            // ========================================

            ordersContainer.innerHTML += `

                <div class="order-card">


                    <!-- ORDER HEADER -->

                    <div class="order-card-header">

                        <div>

                            <h2>
                                Order #${originalIndex + 1}
                            </h2>

                            <p>
                                ${order.orderDate}
                            </p>

                        </div>


                        <span class="order-status">

                            ${currentStatus}

                        </span>

                    </div>


                    <!-- CUSTOMER -->

                    <div class="order-customer">

                        <p>

                            <strong>
                                Customer:
                            </strong>

                            ${order.customerName}

                        </p>


                        <p>

                            <strong>
                                Payment:
                            </strong>

                            ${order.payment}

                        </p>

                    </div>


                    <!-- ========================================
                         ORDER TRACKING
                    ======================================== -->

                    <div class="tracking-section">

                        <h3>
                            Order Tracking
                        </h3>


                        <div class="tracking-container">

                            ${trackingHTML}

                        </div>

                    </div>


                    <!-- PRODUCTS -->

                    <div class="order-products">

                        ${productsHTML}

                    </div>


                    <!-- ORDER BOTTOM -->

                    <div class="order-bottom">


                        <div>

                            <strong>
                                Total:
                            </strong>


                            <span class="order-total">

                                ₹${order.total}

                            </span>

                        </div>


                        <button
                            type="button"
                            class="view-details-btn"
                            onclick="viewOrder(${originalIndex})"
                        >

                            View Details

                            <i class="fa-solid fa-arrow-right"></i>

                        </button>


                    </div>


                </div>

            `;

        }
    );

}


// ========================================
// VIEW ORDER DETAILS
// ========================================

function viewOrder(index) {

    window.location.href =
        "order-details.html?order=" + index;

}


// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    let cart =
        JSON.parse(
            localStorage.getItem("powfectCart")
        ) || [];


    let total = 0;


    cart.forEach(
        function(product) {

            total += product.quantity;

        }
    );


    if (cartCount) {

        cartCount.textContent =
            total;

    }

}


// ========================================
// INITIAL LOAD
// ========================================

updateCartCount();

displayOrders();