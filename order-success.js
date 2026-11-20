// ===============================
// POWFECT ORDER SUCCESS
// ===============================


// Get saved order
const order = JSON.parse(
    localStorage.getItem("powfectOrder")
);


// Get HTML elements
const orderDetails =
    document.getElementById("orderDetails");

const orderedProducts =
    document.getElementById("orderedProducts");

const orderTotal =
    document.getElementById("orderTotal");

const cartCount =
    document.getElementById("cartCount");


// ===============================
// CHECK ORDER
// ===============================

if (!order) {

    orderDetails.innerHTML = `

        <h2>
            No Order Found
        </h2>

        <p>
            Please place an order first.
        </p>

    `;

}
else {


    // ===============================
    // CUSTOMER DETAILS
    // ===============================

    orderDetails.innerHTML = `

        <h2>
            Delivery Details
        </h2>


        <div class="detail-row">

            <span class="detail-label">
                Name
            </span>

            <span class="detail-value">
                ${order.customerName}
            </span>

        </div>


        <div class="detail-row">

            <span class="detail-label">
                Email
            </span>

            <span class="detail-value">
                ${order.email}
            </span>

        </div>


        <div class="detail-row">

            <span class="detail-label">
                Phone
            </span>

            <span class="detail-value">
                ${order.phone}
            </span>

        </div>


        <div class="detail-row">

            <span class="detail-label">
                Address
            </span>

            <span class="detail-value">
                ${order.address},
                ${order.city} -
                ${order.pincode}
            </span>

        </div>


        <div class="detail-row">

            <span class="detail-label">
                Payment
            </span>

            <span class="detail-value">

                ${
                    order.payment === "cod"
                        ? "Cash on Delivery"
                        : "Online Payment"
                }

            </span>

        </div>


        <div class="detail-row">

            <span class="detail-label">
                Order Date
            </span>

            <span class="detail-value">
                ${order.orderDate}
            </span>

        </div>

    `;


    // ===============================
    // ORDERED PRODUCTS
    // ===============================

    let productsHTML = "";

    let total = 0;


    order.products.forEach(function(product) {


        const price =
            Number(product.price) || 0;


        const quantity =
            Number(product.quantity) || 0;


        const itemTotal =
            price * quantity;


        total += itemTotal;


        productsHTML += `

            <div class="ordered-product">


                <div class="ordered-product-left">


                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >


                    <div>


                        <div class="ordered-product-name">

                            ${product.name}

                        </div>


                        <div class="ordered-product-quantity">

                            Quantity:
                            ${quantity}

                        </div>


                    </div>


                </div>


                <div class="ordered-product-price">

                    ₹${itemTotal.toLocaleString("en-IN")}

                </div>


            </div>

        `;

    });


    orderedProducts.innerHTML = `

        <h2>
            Ordered Products
        </h2>

        ${productsHTML}

    `;


    // ===============================
    // TOTAL
    // ===============================

    orderTotal.innerHTML = `

        <span>
            Total
        </span>

        <span>
            ₹${total.toLocaleString("en-IN")}
        </span>

    `;


    // ===============================
    // CART SHOULD BE EMPTY
    // ===============================

    if (cartCount) {

        cartCount.textContent = "0";

    }

}