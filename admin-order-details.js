
/* =========================================
   POWFECT ADMIN ORDER DETAILS
========================================= */


/* ADMIN LOGIN CHECK */

if (localStorage.getItem("powfectAdminLoggedIn") !== "true") {
    window.location.href = "admin-login.html";
}


/* GET ORDER INDEX FROM URL */

const params = new URLSearchParams(window.location.search);
const orderIndex = params.get("order");


/* GET ORDERS */

const orders = JSON.parse(
    localStorage.getItem("powfectOrders")
) || [];


/* MAIN CONTAINER */

const orderContent = document.getElementById("orderContent");


/* CHECK ORDER */

if (
    orderIndex === null ||
    !orders[orderIndex]
) {

    orderContent.innerHTML = `
        <div class="error-box">

            <h2>Order Not Found</h2>

            <p>
                The requested order could not be found.
            </p>

            <br>

            <a href="admin-orders.html" class="back-btn">
                Back to Orders
            </a>

        </div>
    `;

} else {

    const order = orders[orderIndex];

    displayOrder(order, Number(orderIndex));
}


/* DISPLAY ORDER */

function displayOrder(order, index) {

    const trackingSteps = [
        "Order Placed",
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered"
    ];


    const currentStep = Number(order.statusStep) || 1;


    /* PRODUCTS */

    let productsHTML = "";

    if (order.products && order.products.length > 0) {

        productsHTML = order.products.map(product => {

            const quantity = Number(product.quantity) || 1;

            const price = Number(product.price) || 0;

            const productTotal = price * quantity;

            return `
                <div class="product-item">

                    <img
                        src="${product.image || "Images/dog food.jfif"}"
                        alt="${product.name}"
                        class="product-image"
                    >

                    <div class="product-info">

                        <div class="product-name">
                            ${product.name}
                        </div>

                        <div class="product-qty">
                            Quantity: ${quantity}
                        </div>

                    </div>

                    <div class="product-price">
                        ₹${productTotal.toLocaleString("en-IN")}
                    </div>

                </div>
            `;

        }).join("");

    } else {

        productsHTML = `
            <p>No products found for this order.</p>
        `;
    }


    /* TRACKING */

    const trackingHTML = trackingSteps.map((step, i) => {

        const stepNumber = i + 1;

        let className = "";

        if (stepNumber < currentStep) {
            className = "completed";
        }

        else if (stepNumber === currentStep) {
            className = "active";
        }

        return `
            <div class="tracking-step ${className}">

                <div class="circle">
                    ${stepNumber <= currentStep ? "✓" : stepNumber}
                </div>

                <div class="step-title">
                    ${step}
                </div>

            </div>
        `;

    }).join("");


    /* MAIN HTML */

    orderContent.innerHTML = `

        <!-- ORDER HEADER -->

        <div class="order-top">

            <div class="order-top-row">

                <div>

                    <div class="order-number">
                        Order #${index + 1}
                    </div>

                    <div class="order-date">
                        Ordered on ${order.orderDate || "N/A"}
                    </div>

                </div>

                <div class="status-badge">
                    ${order.status || "Order Placed"}
                </div>

            </div>

        </div>


        <!-- CUSTOMER + PAYMENT -->

        <div class="details-grid">


            <!-- CUSTOMER INFORMATION -->

            <div class="card">

                <h2>Customer Information</h2>

                <div class="info-row">

                    <span class="info-label">
                        Name
                    </span>

                    <span class="info-value">
                        ${order.customerName || "N/A"}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Email
                    </span>

                    <span class="info-value">
                        ${order.email || "N/A"}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Phone
                    </span>

                    <span class="info-value">
                        ${order.phone || "N/A"}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Address
                    </span>

                    <span class="info-value address">

                        ${order.address || "N/A"}<br>

                        ${order.city || ""}<br>

                        ${order.pincode || ""}

                    </span>

                </div>

            </div>


            <!-- PAYMENT -->

            <div class="card">

                <h2>Payment Information</h2>

                <div class="info-row">

                    <span class="info-label">
                        Payment Method
                    </span>

                    <span class="info-value">
                        ${order.payment || "N/A"}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Order Status
                    </span>

                    <span class="info-value">
                        ${order.status || "Order Placed"}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Order Date
                    </span>

                    <span class="info-value">
                        ${order.orderDate || "N/A"}
                    </span>

                </div>


                <div class="info-row">

                    <span class="info-label">
                        Order Number
                    </span>

                    <span class="info-value">
                        #${index + 1}
                    </span>

                </div>

            </div>

        </div>


        <!-- PRODUCTS -->

        <div class="card products-card">

            <h2>Ordered Products</h2>

            ${productsHTML}

            <div class="total-box">

                <span>
                    Order Total
                </span>

                <span>
                    ₹${Number(order.total || 0).toLocaleString("en-IN")}
                </span>

            </div>

        </div>


        <!-- TRACKING -->

        <div class="card tracking-card">

            <h2>Order Tracking</h2>

            <div class="tracking-wrapper">

                <div class="tracking">

                    ${trackingHTML}

                </div>

            </div>

        </div>

    `;
}


/* LOGOUT */

function logout() {

    localStorage.removeItem("powfectAdminLoggedIn");

    window.location.href = "admin-login.html";
}
