// ========================================
// POWFECT CUSTOMER PRODUCT SYSTEM
// ========================================


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


    // Close menu after clicking link

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


    // Close menu when clicking outside

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
// GET HTML ELEMENTS
// ========================================

const productContainer =
    document.querySelector(
        ".product-container"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


const cartCount =
    document.getElementById(
        "cartCount"
    );


const cartLink =
    document.querySelector(
        ".cart-link"
    );


// ========================================
// CART
// ========================================

let cart =
    JSON.parse(
        localStorage.getItem(
            "powfectCart"
        )
    ) || [];


// ========================================
// DEFAULT PRODUCTS
// ========================================

const defaultProducts = [

    {
        id: "1",

        name:
            "Premium Dog Food",

        category:
            "food",

        price: 599,

        stock: 25,

        image:
            "Images/dog food.jfif",

        description:
            "Healthy and nutritious food for your lovely dogs."
    },


    {
        id: "2",

        name:
            "Dog Treats",

        category:
            "treats",

        price: 299,

        stock: 30,

        image:
            "Images/treats.jfif",

        description:
            "Delicious treats for rewarding your pets."
    },


    {
        id: "3",

        name:
            "Pet Chew Toy",

        category:
            "toys",

        price: 249,

        stock: 20,

        image:
            "Images/chew.jfif",

        description:
            "Fun and safe toys to keep your pet active."
    },


    {
        id: "4",

        name:
            "Comfort Pet Bed",

        category:
            "comfort",

        price: 899,

        stock: 15,

        image:
            "Images/bed.jfif",

        description:
            "Soft and comfortable sleeping bed for pets."
    },


    {
        id: "5",

        name:
            "Pet Food Bowl",

        category:
            "accessories",

        price: 199,

        stock: 35,

        image:
            "Images/bowl.jfif",

        description:
            "Durable and easy-to-clean food bowl."
    },


    {
        id: "6",

        name:
            "Pet Shampoo",

        category:
            "grooming",

        price: 349,

        stock: 18,

        image:
            "Images/shampoo2.jfif",

        description:
            "Gentle shampoo for clean and healthy fur."
    },


    {
        id: "7",

        name:
            "Pet Collar",

        category:
            "accessories",

        price: 279,

        stock: 22,

        image:
            "Images/coller.jfif",

        description:
            "Stylish and comfortable collar for your pet."
    },


    {
        id: "8",

        name:
            "Pet Grooming Brush",

        category:
            "grooming",

        price: 229,

        stock: 12,

        image:
            "Images/cone2.jfif",

        description:
            "Keep your pet's fur soft, clean and healthy."
    },


    {
        id: "9",

        name:
            "Pet Walking Leash",

        category:
            "accessories",

        price: 399,

        stock: 10,

        image:
            "Images/waliking leashh.jfif",

        description:
            "Strong and comfortable leash for daily walks."
    }

];


// ========================================
// LOAD PRODUCTS FROM ADMIN
// ========================================

function getProducts() {

    const savedProducts =
        localStorage.getItem(
            "powfectProducts"
        );


    if (savedProducts) {

        try {

            const products =
                JSON.parse(
                    savedProducts
                );


            if (
                Array.isArray(products)
                &&
                products.length > 0
            ) {

                return products;

            }

        } catch (error) {

            console.log(
                "Error loading admin products:",
                error
            );

        }

    }


    return defaultProducts;

}


// ========================================
// PRODUCT DATA
// ========================================

let products =
    getProducts();


// ========================================
// CATEGORY NAME
// ========================================

function getCategoryName(
    category
) {

    const categories = {

        food:
            "Food",

        treats:
            "Treats",

        toys:
            "Toys",

        accessories:
            "Accessories",

        grooming:
            "Grooming",

        comfort:
            "Comfort"

    };


    return categories[category]
        ||
        category
        ||
        "Other";

}


// ========================================
// RENDER PRODUCTS
// ========================================

function renderProducts() {

    if (!productContainer) {

        return;

    }


    productContainer.innerHTML =
        "";


    products.forEach(
        function(product) {

            createProductCard(
                product
            );

        }
    );


    attachAddToCartEvents();

    applyFilters();

}


// ========================================
// CREATE PRODUCT CARD
// ========================================

function createProductCard(
    product
) {

    const article =
        document.createElement(
            "article"
        );


    article.className =
        "product-card";


    article.dataset.id =
        product.id;


    article.dataset.category =
        product.category;


    article.dataset.name =
        product.name;


    article.dataset.price =
        product.price;


    const stock =
        Number(product.stock)
        || 0;


    const isOutOfStock =
        stock <= 0;


    article.innerHTML = `

        <div class="product-image">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <div class="product-details">

            <span class="product-category">

                ${getCategoryName(
                    product.category
                )}

            </span>


            <h2>

                ${product.name}

            </h2>


            <p>

                ${
                    product.description
                    ||
                    "Quality product for your beloved pet."
                }

            </p>


            <div class="price">

                ₹${Number(
                    product.price
                ).toLocaleString("en-IN")}

            </div>


            ${
                isOutOfStock

                ?

                `

                    <button
                        class="add-cart out-of-stock"
                        type="button"
                        disabled
                    >

                        <i
                            class="fa-solid fa-ban"
                        ></i>

                        Out of Stock

                    </button>

                `

                :

                `

                    <button
                        class="add-cart"
                        type="button"
                    >

                        <i
                            class="fa-solid fa-cart-plus"
                        ></i>

                        Add to Cart

                    </button>

                `
            }

        </div>

    `;


    productContainer.appendChild(
        article
    );

}


// ========================================
// ATTACH ADD TO CART EVENTS
// ========================================

function attachAddToCartEvents() {

    const buttons =
        document.querySelectorAll(
            ".add-cart:not(.out-of-stock)"
        );


    buttons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    addProductToCart(
                        button
                    );

                }
            );

        }
    );

}


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addProductToCart(
    button
) {

    const card =
        button.closest(
            ".product-card"
        );


    if (!card) {

        return;

    }


    const id =
        String(
            card.dataset.id
        );


    const name =
        card.dataset.name;


    const price =
        Number(
            card.dataset.price
        );


    const category =
        card.dataset.category;


    const imageElement =
        card.querySelector(
            "img"
        );


    const image =
        imageElement
            ?
            imageElement.getAttribute(
                "src"
            )
            :
            "";


    const selectedProduct =
        products.find(
            function(product) {

                return String(
                    product.id
                ) === id;

            }
        );


    if (
        selectedProduct
        &&
        Number(
            selectedProduct.stock
        ) <= 0
    ) {

        alert(
            "This product is out of stock."
        );

        return;

    }


    const existingProduct =
        cart.find(
            function(product) {

                return String(
                    product.id
                ) === id;

            }
        );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id:
                id,

            name:
                name,

            price:
                price,

            category:
                category,

            image:
                image,

            quantity:
                1

        });

    }


    localStorage.setItem(
        "powfectCart",
        JSON.stringify(
            cart
        )
    );


    updateCartCount();


    if (imageElement) {

        flyToCart(
            imageElement
        );

    }


    const oldButtonHTML =
        button.innerHTML;


    button.innerHTML =
        '<i class="fa-solid fa-check"></i> Added';


    button.disabled =
        true;


    setTimeout(
        function() {

            button.innerHTML =
                oldButtonHTML;

            button.disabled =
                false;

        },
        1000
    );

}


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    if (!cartCount) {

        return;

    }


    let total = 0;


    cart.forEach(
        function(product) {

            total +=
                Number(
                    product.quantity
                )
                ||
                0;

        }
    );


    cartCount.textContent =
        total;

}


// ========================================
// CART IMAGE ANIMATION
// ========================================

function flyToCart(
    imageElement
) {

    if (
        !imageElement
        ||
        !cartLink
    ) {

        return;

    }


    const flyingImage =
        imageElement.cloneNode(
            true
        );


    const imagePosition =
        imageElement.getBoundingClientRect();


    const cartPosition =
        cartLink.getBoundingClientRect();


    flyingImage.style.position =
        "fixed";


    flyingImage.style.left =
        imagePosition.left
        +
        "px";


    flyingImage.style.top =
        imagePosition.top
        +
        "px";


    flyingImage.style.width =
        imagePosition.width
        +
        "px";


    flyingImage.style.height =
        imagePosition.height
        +
        "px";


    flyingImage.style.objectFit =
        "cover";


    flyingImage.style.zIndex =
        "9999";


    flyingImage.style.borderRadius =
        "10px";


    flyingImage.style.pointerEvents =
        "none";


    flyingImage.style.transition =
        "all 0.8s cubic-bezier(0.4, 0, 1, 1)";


    document.body.appendChild(
        flyingImage
    );


    setTimeout(
        function() {

            flyingImage.style.left =
                cartPosition.left
                +
                (
                    cartPosition.width
                    /
                    2
                )
                -
                20
                +
                "px";


            flyingImage.style.top =
                cartPosition.top
                +
                (
                    cartPosition.height
                    /
                    2
                )
                -
                20
                +
                "px";


            flyingImage.style.width =
                "40px";


            flyingImage.style.height =
                "40px";


            flyingImage.style.borderRadius =
                "50%";


            flyingImage.style.opacity =
                "0.5";

        },
        50
    );


    setTimeout(
        function() {

            flyingImage.remove();


            cartLink.classList.add(
                "cart-bounce"
            );


            setTimeout(
                function() {

                    cartLink.classList.remove(
                        "cart-bounce"
                    );

                },
                400
            );

        },
        850
    );

}


// ========================================
// SEARCH PRODUCTS
// ========================================

function applyFilters() {

    const searchValue =
        searchInput
            ?
            searchInput.value
                .trim()
                .toLowerCase()
            :
            "";


    const selectedCategory =
        categoryFilter
            ?
            categoryFilter.value
            :
            "all";


    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    cards.forEach(
        function(card) {

            const productName =
                card.dataset.name
                    .toLowerCase();


            const productCategory =
                card.dataset.category
                    .toLowerCase();


            const matchesSearch =
                productName.includes(
                    searchValue
                );


            const matchesCategory =
                selectedCategory === "all"
                ||
                productCategory ===
                selectedCategory;


            if (
                matchesSearch
                &&
                matchesCategory
            ) {

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        }
    );

}


// ========================================
// SEARCH INPUT
// ========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function() {

            applyFilters();

        }
    );

}


// ========================================
// CATEGORY FILTER
// ========================================

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        function() {

            applyFilters();

        }
    );

}


// ========================================
// UPDATE PRODUCTS WHEN ADMIN CHANGES
// ========================================

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key ===
            "powfectProducts"
        ) {

            products =
                getProducts();


            renderProducts();

        }

    }
);


// ========================================
// INITIAL LOAD
// ========================================

renderProducts();

updateCartCount();