
// ===============================
// POWFECT CART PAGE
// ===============================


// ===============================
// GET CART FROM LOCAL STORAGE
// ===============================

let cart =
    JSON.parse(
        localStorage.getItem(
            "powfectCart"
        )
    ) || [];


// ===============================
// GET HTML ELEMENTS
// ===============================

const cartContent =
    document.getElementById(
        "cartContent"
    );


const cartCount =
    document.getElementById(
        "cartCount"
    );


// ===============================
// MOBILE MENU
// ===============================

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


// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartCount() {

    let totalQuantity = 0;


    cart.forEach(
        function (product) {

            totalQuantity +=
                Number(
                    product.quantity
                ) || 0;

        }
    );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }

}


// ===============================
// DISPLAY CART
// ===============================

function displayCart() {


    // =========================
    // EMPTY CART
    // =========================

    if (
        cart.length === 0
    ) {

        cartContent.innerHTML = `

            <div class="empty-cart">

                <i
                    class="fa-solid fa-cart-shopping"
                ></i>


                <h2>
                    Your Cart is Empty
                </h2>


                <p>
                    You haven't added any products yet.
                </p>


                <a
                    href="products.html"
                    class="continue-shopping"
                >
                    Continue Shopping
                </a>

            </div>

        `;


        updateCartCount();


        return;

    }


    // =========================
    // CALCULATE SUBTOTAL
    // =========================

    let subtotal = 0;


    // =========================
    // CART ITEMS HTML
    // =========================

    let itemsHTML = "";


    cart.forEach(
        function (
            product,
            index
        ) {


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


            subtotal +=
                itemTotal;


            itemsHTML += `

                <div class="cart-item">


                    <!-- PRODUCT IMAGE -->

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >


                    <!-- PRODUCT DETAILS -->

                    <div class="cart-item-details">


                        <h2>
                            ${product.name}
                        </h2>


                        <div
                            class="cart-item-price"
                        >
                            ₹${price.toLocaleString(
                                "en-IN"
                            )}
                        </div>


                        <!-- QUANTITY -->

                        <div
                            class="quantity-box"
                        >


                            <button
                                type="button"
                                onclick="decreaseQuantity(${index})"
                            >
                                −
                            </button>


                            <span
                                class="quantity-number"
                            >
                                ${quantity}
                            </span>


                            <button
                                type="button"
                                onclick="increaseQuantity(${index})"
                            >
                                +
                            </button>


                        </div>


                        <!-- REMOVE -->

                        <button
                            type="button"
                            class="remove-btn"
                            onclick="removeProduct(${index})"
                        >

                            <i
                                class="fa-solid fa-trash"
                            ></i>

                            Remove

                        </button>


                    </div>


                    <!-- ITEM TOTAL -->

                    <div
                        class="item-total"
                    >

                        ₹${itemTotal.toLocaleString(
                            "en-IN"
                        )}

                    </div>


                </div>

            `;

        }
    );


    // =========================
    // CART CONTENT
    // =========================

    cartContent.innerHTML = `

        <div class="cart-layout">


            <!-- =====================
                 CART ITEMS
            ====================== -->

            <div class="cart-items">

                ${itemsHTML}

            </div>


            <!-- =====================
                 CART SUMMARY
            ====================== -->

            <div class="cart-summary">


                <h2>
                    Order Summary
                </h2>


                <div
                    class="summary-row"
                >

                    <span>
                        Subtotal
                    </span>


                    <span>
                        ₹${subtotal.toLocaleString(
                            "en-IN"
                        )}
                    </span>

                </div>


                <div
                    class="summary-row"
                >

                    <span>
                        Delivery
                    </span>


                    <span>
                        Free
                    </span>

                </div>


                <div
                    class="
                        summary-row
                        summary-total
                    "
                >

                    <span>
                        Total
                    </span>


                    <span>
                        ₹${subtotal.toLocaleString(
                            "en-IN"
                        )}
                    </span>

                </div>


                <button
                    type="button"
                    class="checkout-btn"
                    onclick="goToCheckout()"
                >

                    Proceed to Checkout

                </button>


            </div>


        </div>

    `;


    // UPDATE BADGE

    updateCartCount();

}


// ===============================
// INCREASE QUANTITY
// ===============================

function increaseQuantity(index) {

    if (
        !cart[index]
    ) {

        return;

    }


    cart[index].quantity =
        Number(
            cart[index].quantity
        ) + 1;


    saveCart();

}


// ===============================
// DECREASE QUANTITY
// ===============================

function decreaseQuantity(index) {

    if (
        !cart[index]
    ) {

        return;

    }


    const quantity =
        Number(
            cart[index].quantity
        ) || 0;


    if (
        quantity > 1
    ) {

        cart[index].quantity =
            quantity - 1;

    } else {

        cart.splice(
            index,
            1
        );

    }


    saveCart();

}


// ===============================
// REMOVE PRODUCT
// ===============================

function removeProduct(index) {

    if (
        !cart[index]
    ) {

        return;

    }


    cart.splice(
        index,
        1
    );


    saveCart();

}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "powfectCart",
        JSON.stringify(
            cart
        )
    );


    displayCart();

}


// ===============================
// CHECKOUT
// ===============================

function goToCheckout() {

    if (
        cart.length === 0
    ) {

        return;

    }


    window.location.href =
        "checkout.html";

}


// ===============================
// INITIAL LOAD
// ===============================

displayCart();

updateCartCount();
