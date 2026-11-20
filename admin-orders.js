// =========================================
// POWFECT ADMIN ORDERS
// =========================================


// =========================================
// EMAILJS INITIALIZATION
// =========================================

emailjs.init({
    publicKey: "8QlBfdms6YAczbEDC"
});


// =========================================
// ADMIN LOGIN CHECK
// =========================================

if (
    localStorage.getItem(
        "powfectAdminLoggedIn"
    ) !== "true"
) {

    window.location.href =
        "admin-login.html";
}


// =========================================
// GET ORDERS
// =========================================

let orders = [];

try {

    orders =
        JSON.parse(
            localStorage.getItem(
                "powfectOrders"
            )
        ) || [];

} catch (error) {

    console.error(
        "Error loading orders:",
        error
    );

    orders = [];
}


// =========================================
// HTML ELEMENTS
// =========================================

const adminOrders =
    document.getElementById(
        "adminOrders"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );

const resultCount =
    document.getElementById(
        "resultCount"
    );

const totalOrders =
    document.getElementById(
        "totalOrders"
    );


// =========================================
// TRACKING STATUS
// =========================================

const trackingSteps = [

    "Order Placed",

    "Processing",

    "Shipped",

    "Out for Delivery",

    "Delivered"

];


// =========================================
// DISPLAY ORDERS
// =========================================

function displayOrders() {

    if (!adminOrders) {

        console.error(
            "adminOrders element not found."
        );

        return;
    }


    // =====================================
    // SEARCH VALUE
    // =====================================

    const searchValue =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    // =====================================
    // STATUS FILTER
    // =====================================

    let selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    if (
        !selectedStatus ||
        selectedStatus
            .toLowerCase() === "all"
    ) {

        selectedStatus =
            "all";

    } else {

        selectedStatus =
            selectedStatus
                .toLowerCase();

    }


    // =====================================
    // FILTER ORDERS
    // =====================================

    const filteredOrders =

        orders

            .map(
                function(
                    order,
                    index
                ) {

                    return {

                        order:
                            order,

                        originalIndex:
                            index

                    };

                }
            )

            .filter(
                function(item) {

                    const order =
                        item.order || {};


                    // CUSTOMER NAME

                    const customerName =
                        String(
                            order.customerName ||
                            ""
                        )
                        .toLowerCase();


                    // EMAIL

                    const email =
                        String(
                            order.email ||
                            ""
                        )
                        .toLowerCase();


                    // ORDER NUMBER

                    const orderNumber =
                        String(
                            item.originalIndex + 1
                        );


                    // ORDER STATUS

                    const orderStatus =
                        String(
                            order.status ||
                            "Order Placed"
                        )
                        .toLowerCase();


                    // =================================
                    // SEARCH MATCH
                    // =================================

                    const matchesSearch =

                        searchValue === "" ||

                        customerName.includes(
                            searchValue
                        ) ||

                        email.includes(
                            searchValue
                        ) ||

                        orderNumber.includes(
                            searchValue
                        );


                    // =================================
                    // STATUS MATCH
                    // =================================

                    const matchesStatus =

                        selectedStatus === "all" ||

                        orderStatus ===
                            selectedStatus;


                    return (
                        matchesSearch &&
                        matchesStatus
                    );

                }
            );


    // =====================================
    // NEWEST FIRST
    // =====================================

    filteredOrders.reverse();


    // =====================================
    // TOTAL ORDERS
    // =====================================

    if (totalOrders) {

        totalOrders.textContent =
            orders.length;

    }


    // =====================================
    // RESULT COUNT
    // =====================================

    if (resultCount) {

        resultCount.textContent =
            filteredOrders.length;

    }


    // =====================================
    // NO ORDERS
    // =====================================

    if (
        filteredOrders.length === 0
    ) {

        adminOrders.innerHTML = `

            <div class="no-orders">

                <i class="fa-solid fa-box-open"></i>

                <h3>
                    No Orders Found
                </h3>

                <p>
                    Try changing your search or filter.
                </p>

            </div>

        `;

        return;
    }


    // =====================================
    // ORDER CARDS
    // =====================================

    adminOrders.innerHTML =

        filteredOrders

            .map(
                function(item) {

                    const order =
                        item.order;

                    const originalIndex =
                        item.originalIndex;


                    // =================================
                    // CURRENT STEP
                    // =================================

                    let currentStep =
                        Number(
                            order.statusStep
                        );


                    if (
                        !currentStep ||
                        currentStep < 1 ||
                        currentStep >
                            trackingSteps.length
                    ) {

                        currentStep = 1;

                    }


                    // =================================
                    // CURRENT STATUS
                    // =================================

                    const currentStatus =
                        order.status ||
                        trackingSteps[
                            currentStep - 1
                        ];


                    // =================================
                    // PRODUCTS
                    // =================================

                    let productsHTML = "";


                    if (
                        Array.isArray(
                            order.products
                        ) &&
                        order.products.length > 0
                    ) {

                        productsHTML =

                            order.products

                                .map(
                                    function(
                                        product
                                    ) {

                                        const quantity =
                                            Number(
                                                product.quantity
                                            ) || 1;


                                        return `

                                            <div
                                                class="order-product"
                                            >

                                                <img
                                                    src="${
                                                        product.image ||
                                                        "Images/dog food.jfif"
                                                    }"
                                                    alt="${
                                                        product.name ||
                                                        "Product"
                                                    }"
                                                >


                                                <div
                                                    class="product-details"
                                                >

                                                    <strong>
                                                        ${
                                                            product.name ||
                                                            "Product"
                                                        }
                                                    </strong>

                                                    <span>
                                                        Qty: ${quantity}
                                                    </span>

                                                </div>

                                            </div>

                                        `;

                                    }
                                )

                                .join("");

                    } else {

                        productsHTML = `

                            <p>
                                No products found
                            </p>

                        `;

                    }


                    // =================================
                    // STATUS OPTIONS
                    // =================================

                    const statusOptions =

                        trackingSteps

                            .map(
                                function(
                                    status,
                                    index
                                ) {

                                    const step =
                                        index + 1;


                                    return `

                                        <option
                                            value="${step}"
                                            ${
                                                step ===
                                                currentStep
                                                    ? "selected"
                                                    : ""
                                            }
                                        >
                                            ${status}
                                        </option>

                                    `;

                                }
                            )

                            .join("");


                    // =================================
                    // ORDER TOTAL
                    // =================================

                    const orderTotal =

                        Number(
                            order.total || 0
                        )
                        .toLocaleString(
                            "en-IN"
                        );


                    // =================================
                    // RETURN ORDER CARD
                    // =================================

                    return `

                        <div
                            class="admin-order-card"
                        >


                            <!-- =========================
                                 ORDER HEADER
                            ========================== -->

                            <div
                                class="order-header"
                            >

                                <div>

                                    <h3>
                                        Order #${
                                            originalIndex + 1
                                        }
                                    </h3>

                                    <p>
                                        ${
                                            order.orderDate ||
                                            "N/A"
                                        }
                                    </p>

                                </div>


                                <!-- CUSTOMER -->

                                <div
                                    class="customer-info"
                                >

                                    <strong>
                                        ${
                                            order.customerName ||
                                            "Unknown Customer"
                                        }
                                    </strong>

                                    <span>
                                        ${
                                            order.email ||
                                            "No email"
                                        }
                                    </span>

                                </div>

                            </div>


                            <!-- =========================
                                 ORDER BODY
                            ========================== -->

                            <div
                                class="order-body"
                            >


                                <!-- PRODUCTS -->

                                <div
                                    class="products-section"
                                >

                                    <h4>
                                        Ordered Products
                                    </h4>


                                    <div
                                        class="products-list"
                                    >

                                        ${productsHTML}

                                    </div>

                                </div>


                                <!-- ORDER INFO -->

                                <div
                                    class="order-info"
                                >


                                    <!-- PAYMENT -->

                                    <div
                                        class="info-row"
                                    >

                                        <span>
                                            Payment
                                        </span>

                                        <strong>
                                            ${
                                                order.payment ||
                                                "N/A"
                                            }
                                        </strong>

                                    </div>


                                    <!-- TOTAL -->

                                    <div
                                        class="info-row"
                                    >

                                        <span>
                                            Total
                                        </span>

                                        <strong
                                            class="order-total"
                                        >
                                            ₹${orderTotal}
                                        </strong>

                                    </div>


                                    <!-- STATUS -->

                                    <div
                                        class="info-row"
                                    >

                                        <span>
                                            Status
                                        </span>

                                        <strong>
                                            ${currentStatus}
                                        </strong>

                                    </div>


                                </div>

                            </div>


                            <!-- =========================
                                 ORDER FOOTER
                            ========================== -->

                            <div
                                class="order-footer"
                            >


                                <!-- STATUS UPDATE -->

                                <div
                                    class="status-control"
                                >

                                    <label>
                                        Update Status
                                    </label>


                                    <select
                                        onchange="
                                            changeOrderStatus(
                                                ${originalIndex},
                                                this.value
                                            )
                                        "
                                    >

                                        ${statusOptions}

                                    </select>

                                </div>


                                <!-- VIEW DETAILS -->

                                <a
                                    href="admin-order-details.html?order=${originalIndex}"
                                    class="view-details-btn"
                                >

                                    View Details

                                    <i
                                        class="fa-solid fa-arrow-right"
                                    ></i>

                                </a>


                            </div>


                        </div>

                    `;

                }
            )

            .join("");

}


// =========================================
// CHANGE ORDER STATUS
// =========================================

function changeOrderStatus(
    orderIndex,
    selectedStep
) {

    const step =
        Number(
            selectedStep
        );


    // =====================================
    // CHECK ORDER
    // =====================================

    if (
        !orders[orderIndex]
    ) {

        return;

    }


    const order =
        orders[orderIndex];


    // =====================================
    // CHECK STEP
    // =====================================

    if (
        step < 1 ||
        step > trackingSteps.length
    ) {

        return;

    }


    // =====================================
    // OLD STATUS
    // =====================================

    const oldStatus =
        order.status ||
        "Order Placed";


    // =====================================
    // NEW STATUS
    // =====================================

    const newStatus =
        trackingSteps[
            step - 1
        ];


    // =====================================
    // SAME STATUS
    // =====================================

    if (
        oldStatus === newStatus &&
        Number(
            order.statusStep
        ) === step
    ) {

        return;

    }


    // =====================================
    // UPDATE ORDER
    // =====================================

    order.statusStep =
        step;

    order.status =
        newStatus;


    // =====================================
    // SAVE ALL ORDERS
    // =====================================

    localStorage.setItem(
        "powfectOrders",
        JSON.stringify(
            orders
        )
    );


    // =====================================
    // SAVE CURRENT ORDER
    // =====================================

    localStorage.setItem(
        "powfectOrder",
        JSON.stringify(
            order
        )
    );


    // =====================================
    // EMAIL PARAMETERS
    // =====================================

    const templateParams = {

        to_email:
            order.email || "",

        customerName:
            order.customerName || "",

        orderNumber:
            orderIndex + 1,

        status:
            order.status,

        orderDate:
            order.orderDate || "",

        total:
            order.total || 0

    };


    // =====================================
    // SEND STATUS EMAIL
    // =====================================

    emailjs.send(

        "service_fl7qfnk",

        "template_jtilalk",

        templateParams

    )

    .then(
        function(response) {

            console.log(
                "Status email sent:",
                response.status,
                response.text
            );


            // =================================
            // SUCCESS TOAST
            // =================================

            showToast(

                "Order Status Updated",

                `Order #${
                    orderIndex + 1
                } is now "${newStatus}". Customer has been notified by email.`,

                "success"

            );


            // =================================
            // REFRESH ORDERS
            // =================================

            displayOrders();

        }
    )

    .catch(
        function(error) {

            console.error(
                "Email sending failed:",
                error
            );


            // =================================
            // ERROR TOAST
            // =================================

            showToast(

                "Email Notification Failed",

                `Order #${
                    orderIndex + 1
                } status was updated, but the customer email could not be sent.`,

                "error"

            );


            // =================================
            // REFRESH ORDERS
            // =================================

            displayOrders();

        }
    );

}


// =========================================
// PROFESSIONAL TOAST
// =========================================

function showToast(
    title,
    message,
    type = "success"
) {


    // =====================================
    // REMOVE OLD TOAST
    // =====================================

    const existingToast =
        document.querySelector(
            ".powfect-toast"
        );


    if (existingToast) {

        existingToast.remove();

    }


    // =====================================
    // CREATE TOAST
    // =====================================

    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        `powfect-toast ${type}`;


    // =====================================
    // ICON
    // =====================================

    const icon =
        type === "success"
            ? "✓"
            : "⚠";


    // =====================================
    // TOAST HTML
    // =====================================

    toast.innerHTML = `

        <div
            class="toast-icon"
        >
            ${icon}
        </div>


        <div
            class="toast-content"
        >

            <div
                class="toast-title"
            >
                ${title}
            </div>


            <div
                class="toast-message"
            >
                ${message}
            </div>

        </div>


        <button
            class="toast-close"
            onclick="
                this.parentElement.remove()
            "
        >
            ×
        </button>


        <div
            class="toast-progress"
        ></div>

    `;


    // =====================================
    // ADD TO PAGE
    // =====================================

    document.body.appendChild(
        toast
    );


    // =====================================
    // AUTO REMOVE - 8 SECONDS
    // =====================================

    setTimeout(
        function() {

            if (
                document.body.contains(
                    toast
                )
            ) {

                toast.remove();

            }

        },
        8000
    );

}


// =========================================
// SEARCH EVENT
// =========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayOrders
    );

}


// =========================================
// STATUS FILTER EVENT
// =========================================

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        displayOrders
    );

}


// =========================================
// LOGOUT
// =========================================

function logout() {

    localStorage.removeItem(
        "powfectAdminLoggedIn"
    );


    window.location.href =
        "admin-login.html";

}


// =========================================
// INITIAL LOAD
// =========================================

displayOrders();