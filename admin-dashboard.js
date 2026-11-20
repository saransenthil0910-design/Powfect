// ========================================
// POWFECT ADMIN DASHBOARD
// ========================================


// ========================================
// ADMIN LOGIN CHECK
// ========================================

const isAdminLoggedIn =
    localStorage.getItem(
        "powfectAdminLoggedIn"
    );


if (isAdminLoggedIn !== "true") {

    window.location.href =
        "admin-login.html";

}


// ========================================
// GET ORDERS
// ========================================

const orders =
    JSON.parse(
        localStorage.getItem(
            "powfectOrders"
        )
    ) || [];


// ========================================
// HTML ELEMENTS
// ========================================

const totalOrders =
    document.getElementById(
        "totalOrders"
    );


const todayOrders =
    document.getElementById(
        "todayOrders"
    );


const pendingOrders =
    document.getElementById(
        "pendingOrders"
    );


const shippedOrders =
    document.getElementById(
        "shippedOrders"
    );


const deliveredOrders =
    document.getElementById(
        "deliveredOrders"
    );


const totalSales =
    document.getElementById(
        "totalSales"
    );


const todaySales =
    document.getElementById(
        "todaySales"
    );


const recentOrders =
    document.getElementById(
        "recentOrders"
    );


// ========================================
// STATUS NAMES
// ========================================

const ORDER_PLACED =
    "Order Placed";


const PROCESSING =
    "Processing";


const SHIPPED =
    "Shipped";


const OUT_FOR_DELIVERY =
    "Out for Delivery";


const DELIVERED =
    "Delivered";


// ========================================
// LOAD DASHBOARD
// ========================================

function loadDashboard() {


    // ========================================
    // TOTAL ORDERS
    // ========================================

    if (totalOrders) {

        totalOrders.textContent =
            orders.length;

    }


    // ========================================
    // VARIABLES
    // ========================================

    let pending = 0;

    let shipped = 0;

    let delivered = 0;

    let sales = 0;

    let today = 0;

    let todaySalesAmount = 0;


    // ========================================
    // TODAY DATE
    // ========================================

    const todayDate =
        new Date();


    todayDate.setHours(
        0,
        0,
        0,
        0
    );


    // ========================================
    // CALCULATE ORDER DATA
    // ========================================

    orders.forEach(
        function(order) {


            // ========================================
            // ORDER STATUS
            // ========================================

            const status =
                order.status ||
                ORDER_PLACED;


            // ========================================
            // WAITING FOR DELIVERY
            // ========================================

            if (

                status === ORDER_PLACED ||

                status === PROCESSING ||

                status === SHIPPED ||

                status === OUT_FOR_DELIVERY

            ) {

                pending++;

            }


            // ========================================
            // SHIPPED / OUT FOR DELIVERY
            // ========================================

            if (

                status === SHIPPED ||

                status === OUT_FOR_DELIVERY

            ) {

                shipped++;

            }


            // ========================================
            // DELIVERED
            // ========================================

            if (
                status === DELIVERED
            ) {

                delivered++;

            }


            // ========================================
            // TOTAL SALES
            // ========================================

            const orderAmount =
                Number(
                    order.total
                ) || 0;


            sales +=
                orderAmount;


            // ========================================
            // TODAY ORDERS
            // ========================================

            if (
                order.orderDate
            ) {


                const orderDate =
                    new Date(
                        order.orderDate
                    );


                if (
                    !isNaN(
                        orderDate.getTime()
                    )
                ) {


                    orderDate.setHours(
                        0,
                        0,
                        0,
                        0
                    );


                    // ========================================
                    // CHECK TODAY
                    // ========================================

                    if (
                        orderDate.getTime() ===
                        todayDate.getTime()
                    ) {


                        today++;


                        // ========================================
                        // TODAY SALES
                        // ========================================

                        todaySalesAmount +=
                            orderAmount;

                    }

                }

            }

        }
    );


    // ========================================
    // DISPLAY WAITING FOR DELIVERY
    // ========================================

    if (pendingOrders) {

        pendingOrders.textContent =
            pending;

    }


    // ========================================
    // DISPLAY SHIPPED
    // ========================================

    if (shippedOrders) {

        shippedOrders.textContent =
            shipped;

    }


    // ========================================
    // DISPLAY DELIVERED
    // ========================================

    if (deliveredOrders) {

        deliveredOrders.textContent =
            delivered;

    }


    // ========================================
    // DISPLAY TODAY ORDERS
    // ========================================

    if (todayOrders) {

        todayOrders.textContent =
            today;

    }


    // ========================================
    // DISPLAY TOTAL SALES
    // ========================================

    if (totalSales) {

        totalSales.textContent =
            "₹" +
            sales.toLocaleString(
                "en-IN"
            );

    }


    // ========================================
    // DISPLAY TODAY SALES
    // ========================================

    if (todaySales) {

        todaySales.textContent =
            "₹" +
            todaySalesAmount.toLocaleString(
                "en-IN"
            );

    }


    // ========================================
    // DISPLAY RECENT ORDERS
    // ========================================

    displayRecentOrders();


    // ========================================
    // DISPLAY CHARTS
    // ========================================

    displaySalesCharts();

}


// ========================================
// DISPLAY SALES CHARTS
// ========================================

function displaySalesCharts() {


    // ========================================
    // SALES CHART ELEMENT
    // ========================================

    const salesChartElement =
        document.getElementById(
            "salesChart"
        );


    // ========================================
    // MONTHLY CHART ELEMENT
    // ========================================

    const monthlySalesChartElement =
        document.getElementById(
            "monthlySalesChart"
        );


    // ========================================
    // CHECK CHART.JS
    // ========================================

    if (
        typeof Chart === "undefined"
    ) {

        console.error(
            "Chart.js is not loaded."
        );

        return;

    }


    // ========================================
    // DESTROY OLD CHARTS
    // ========================================

    if (
        window.powfectSalesChart
    ) {

        window.powfectSalesChart.destroy();

    }


    if (
        window.powfectMonthlyChart
    ) {

        window.powfectMonthlyChart.destroy();

    }


    // ========================================
    // LAST 7 DAYS
    // ========================================

    const dailyLabels = [];

    const dailyOrders = [];


    for (
        let i = 6;
        i >= 0;
        i--
    ) {


        // ========================================
        // CREATE DATE
        // ========================================

        const date =
            new Date();


        date.setHours(
            0,
            0,
            0,
            0
        );


        date.setDate(
            date.getDate() - i
        );


        // ========================================
        // DATE LABEL
        // ========================================

        const label =
            date.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short"
                }
            );


        dailyLabels.push(
            label
        );


        // ========================================
        // COUNT ORDERS
        // ========================================

        let dayTotal = 0;


        orders.forEach(
            function(order) {


                if (
                    !order.orderDate
                ) {

                    return;

                }


                const orderDate =
                    new Date(
                        order.orderDate
                    );


                if (
                    isNaN(
                        orderDate.getTime()
                    )
                ) {

                    return;

                }


                orderDate.setHours(
                    0,
                    0,
                    0,
                    0
                );


                // ========================================
                // MATCH DATE
                // ========================================

                if (
                    orderDate.getTime() ===
                    date.getTime()
                ) {

                    dayTotal++;

                }

            }
        );


        dailyOrders.push(
            dayTotal
        );

    }


    // ========================================
    // SALES OVERVIEW LINE CHART
    // ========================================

    if (
        salesChartElement
    ) {


        window.powfectSalesChart =
            new Chart(
                salesChartElement,
                {

                    type: "line",


                    data: {

                        labels:
                            dailyLabels,


                        datasets: [

                            {

                                label:
                                    "Orders",


                                data:
                                    dailyOrders,


                                borderColor:
                                    "#6F8F7B",


                                backgroundColor:
                                    "rgba(111, 143, 123, 0.18)",


                                borderWidth:
                                    3,


                                tension:
                                    0.4,


                                fill:
                                    true,


                                pointBackgroundColor:
                                    "#6F8F7B",


                                pointBorderColor:
                                    "#ffffff",


                                pointBorderWidth:
                                    2,


                                pointRadius:
                                    5,


                                pointHoverRadius:
                                    7

                            }

                        ]

                    },


                    options: {

                        responsive:
                            true,


                        maintainAspectRatio:
                            false,


                        plugins: {

                            legend: {

                                display:
                                    false

                            },


                            tooltip: {

                                callbacks: {

                                    label:
                                        function(
                                            context
                                        ) {

                                            return (
                                                "Orders: " +
                                                context.raw
                                            );

                                        }

                                }

                            }

                        },


                        scales: {

                            x: {

                                title: {

                                    display:
                                        true,

                                    text:
                                        "Date"

                                }

                            },


                            y: {

                                beginAtZero:
                                    true,


                                ticks: {

                                    precision:
                                        0,

                                    stepSize:
                                        1

                                },


                                title: {

                                    display:
                                        true,

                                    text:
                                        "Number of Orders"

                                }

                            }

                        }

                    }

                }
            );

    }


    // ========================================
    // MONTHLY SALES DATA
    // ========================================

    const monthlyLabels = [];

    const monthlyOrders = [];


    const currentYear =
        new Date().getFullYear();


    // ========================================
    // JANUARY TO DECEMBER
    // ========================================

    for (
        let month = 0;
        month < 12;
        month++
    ) {


        // ========================================
        // MONTH DATE
        // ========================================

        const monthDate =
            new Date(
                currentYear,
                month,
                1
            );


        // ========================================
        // MONTH NAME
        // ========================================

        const monthName =
            monthDate.toLocaleDateString(
                "en-IN",
                {
                    month: "short"
                }
            );


        monthlyLabels.push(
            monthName
        );


        // ========================================
        // MONTH ORDER COUNT
        // ========================================

        let monthTotal = 0;


        orders.forEach(
            function(order) {


                if (
                    !order.orderDate
                ) {

                    return;

                }


                const orderDate =
                    new Date(
                        order.orderDate
                    );


                if (
                    isNaN(
                        orderDate.getTime()
                    )
                ) {

                    return;

                }


                // ========================================
                // MATCH YEAR + MONTH
                // ========================================

                if (

                    orderDate.getFullYear() ===
                    currentYear &&

                    orderDate.getMonth() ===
                    month

                ) {

                    monthTotal++;

                }

            }
        );


        monthlyOrders.push(
            monthTotal
        );

    }


    // ========================================
    // MONTHLY SALES BAR CHART
    // ========================================

    if (
        monthlySalesChartElement
    ) {


        window.powfectMonthlyChart =
            new Chart(
                monthlySalesChartElement,
                {

                    type: "bar",


                    data: {

                        labels:
                            monthlyLabels,


                        datasets: [

                            {

                                label:
                                    "Orders",


                                data:
                                    monthlyOrders,


                                backgroundColor:
                                    "rgba(111, 143, 123, 0.25)",


                                borderColor:
                                    "#6F8F7B",


                                borderWidth:
                                    2,


                                borderRadius:
                                    6

                            }

                        ]

                    },


                    options: {

                        responsive:
                            true,


                        maintainAspectRatio:
                            false,


                        plugins: {

                            legend: {

                                display:
                                    false

                            },


                            tooltip: {

                                callbacks: {

                                    label:
                                        function(
                                            context
                                        ) {

                                            return (
                                                "Orders: " +
                                                context.raw
                                            );

                                        }

                                }

                            }

                        },


                        scales: {

                            x: {

                                title: {

                                    display:
                                        true,

                                    text:
                                        "Month"

                                }

                            },


                            y: {

                                beginAtZero:
                                    true,


                                ticks: {

                                    precision:
                                        0,

                                    stepSize:
                                        1

                                },


                                title: {

                                    display:
                                        true,

                                    text:
                                        "Number of Orders"

                                }

                            }

                        }

                    }

                }
            );

    }

}


// ========================================
// DISPLAY RECENT ORDERS
// ========================================

function displayRecentOrders() {


    // ========================================
    // CHECK ELEMENT
    // ========================================

    if (!recentOrders) {

        return;

    }


    // ========================================
    // NO ORDERS
    // ========================================

    if (
        orders.length === 0
    ) {

        recentOrders.innerHTML = `

            <div
                class="empty-dashboard"
            >

                <i
                    class="fa-solid fa-box-open"
                ></i>

                <p>
                    No orders yet.
                </p>

            </div>

        `;

        return;

    }


    // ========================================
    // CLEAR OLD DATA
    // ========================================

    recentOrders.innerHTML = "";


    // ========================================
    // GET LATEST 5 ORDERS
    // ========================================

    const latestOrders =
        [...orders]
            .reverse()
            .slice(
                0,
                5
            );


    // ========================================
    // DISPLAY ORDERS
    // ========================================

    latestOrders.forEach(
        function(
            order,
            index
        ) {


            // ========================================
            // ORIGINAL ORDER INDEX
            // ========================================

            const originalIndex =
                orders.length -
                1 -
                index;


            // ========================================
            // CURRENT STATUS
            // ========================================

            const currentStatus =
                order.status ||
                ORDER_PLACED;


            // ========================================
            // ORDER TOTAL
            // ========================================

            const orderTotal =
                Number(
                    order.total
                ) || 0;


            // ========================================
            // ORDER DATE
            // ========================================

            let displayDate =
                "N/A";


            if (
                order.orderDate
            ) {

                const orderDate =
                    new Date(
                        order.orderDate
                    );


                if (
                    !isNaN(
                        orderDate.getTime()
                    )
                ) {

                    displayDate =
                        orderDate.toLocaleDateString(
                            "en-IN"
                        );

                } else {

                    displayDate =
                        order.orderDate;

                }

            }


            // ========================================
            // CUSTOMER NAME
            // ========================================

            const customerName =
                order.customerName ||
                "Unknown Customer";


            // ========================================
            // ADD ORDER
            // ========================================

            recentOrders.innerHTML += `

                <div
                    class="recent-order"
                >


                    <!-- =================================
                         LEFT SIDE
                    ================================== -->

                    <div
                        class="recent-order-left"
                    >

                        <h3>
                            ${customerName}
                        </h3>


                        <p>

                            <i
                                class="fa-regular fa-calendar"
                            ></i>

                            ${displayDate}

                        </p>


                    </div>


                    <!-- =================================
                         RIGHT SIDE
                    ================================== -->

                    <div
                        class="recent-order-right"
                    >


                        <!-- AMOUNT -->

                        <strong
                            class="recent-order-price"
                        >

                            ₹${orderTotal.toLocaleString(
                                "en-IN"
                            )}

                        </strong>


                        <!-- STATUS -->

                        <span
                            class="order-status"
                        >

                            ${currentStatus}

                        </span>


                        <!-- VIEW DETAILS -->

                        <a
                            href="admin-orders.html"
                            class="recent-view-btn"
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
    );

}


// ========================================
// LOGOUT ADMIN
// ========================================

function logoutAdmin() {


    localStorage.removeItem(
        "powfectAdminLoggedIn"
    );


    window.location.href =
        "admin-login.html";

}


// ========================================
// LOAD DASHBOARD
// ========================================

loadDashboard();