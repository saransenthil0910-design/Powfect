// ========================================
// POWFECT ADMIN PRODUCT MANAGEMENT
// STEP 4 - INVENTORY / STOCK MANAGEMENT
// ========================================


// ========================================
// ADMIN LOGIN CHECK
// ========================================

if (
    localStorage.getItem("powfectAdminLoggedIn") !== "true"
) {

    window.location.href =
        "admin-login.html";

}


// ========================================
// DEFAULT PRODUCTS
// ========================================

const defaultProducts = [

    {
        id: 1,
        name: "Premium Dog Food",
        category: "food",
        price: 599,
        stock: 25,
        image: "Images/dog food.jfif"
    },

    {
        id: 2,
        name: "Dog Treats",
        category: "treats",
        price: 299,
        stock: 30,
        image: "Images/treats.jfif"
    },

    {
        id: 3,
        name: "Pet Chew Toy",
        category: "toys",
        price: 249,
        stock: 20,
        image: "Images/chew.jfif"
    },

    {
        id: 4,
        name: "Comfort Pet Bed",
        category: "comfort",
        price: 899,
        stock: 15,
        image: "Images/bed.jfif"
    },

    {
        id: 5,
        name: "Pet Food Bowl",
        category: "accessories",
        price: 199,
        stock: 35,
        image: "Images/bowl.jfif"
    },

    {
        id: 6,
        name: "Pet Shampoo",
        category: "grooming",
        price: 349,
        stock: 18,
        image: "Images/shampoo2.jfif"
    },

    {
        id: 7,
        name: "Pet Collar",
        category: "accessories",
        price: 279,
        stock: 22,
        image: "Images/coller.jfif"
    },

    {
        id: 8,
        name: "Pet Grooming Brush",
        category: "grooming",
        price: 229,
        stock: 12,
        image: "Images/cone2.jfif"
    },

    {
        id: 9,
        name: "Pet Walking Leash",
        category: "accessories",
        price: 399,
        stock: 10,
        image: "Images/waliking leashh.jfif"
    }

];


// ========================================
// LOAD PRODUCTS
// ========================================

let storedProducts =
    localStorage.getItem(
        "powfectProducts"
    );


let products;


if (storedProducts) {

    try {

        products =
            JSON.parse(
                storedProducts
            );


        if (!Array.isArray(products)) {

            products =
                [...defaultProducts];

            saveProducts();

        }

    } catch (error) {

        console.error(
            "Error loading products:",
            error
        );

        products =
            [...defaultProducts];

        saveProducts();

    }

} else {

    products =
        [...defaultProducts];

    saveProducts();

}


// ========================================
// EDIT PRODUCT ID
// ========================================

let editingProductId = null;


// ========================================
// DELETE PRODUCT ID
// ========================================

let deletingProductId = null;


// ========================================
// HTML ELEMENTS
// ========================================

const productTableBody =
    document.getElementById(
        "productTableBody"
    );


const totalProducts =
    document.getElementById(
        "totalProducts"
    );


const resultCount =
    document.getElementById(
        "resultCount"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const categoryFilter =
    document.getElementById(
        "categoryFilter"
    );


const emptyState =
    document.getElementById(
        "emptyState"
    );


const addProductBtn =
    document.getElementById(
        "addProductBtn"
    );


const productModal =
    document.getElementById(
        "productModal"
    );


const closeModalBtn =
    document.getElementById(
        "closeModalBtn"
    );


const cancelModalBtn =
    document.getElementById(
        "cancelModalBtn"
    );


const addProductForm =
    document.getElementById(
        "addProductForm"
    );


const productName =
    document.getElementById(
        "productName"
    );


const productCategory =
    document.getElementById(
        "productCategory"
    );


const productPrice =
    document.getElementById(
        "productPrice"
    );


const productStock =
    document.getElementById(
        "productStock"
    );


const productImage =
    document.getElementById(
        "productImage"
    );


const imagePreview =
    document.getElementById(
        "imagePreview"
    );


const previewImage =
    document.getElementById(
        "previewImage"
    );


const toast =
    document.getElementById(
        "toast"
    );


const toastMessage =
    document.getElementById(
        "toastMessage"
    );


// ========================================
// DELETE POPUP ELEMENTS
// ========================================

const deleteConfirmOverlay =
    document.getElementById(
        "deleteConfirmOverlay"
    );


const deleteProductName =
    document.getElementById(
        "deleteProductName"
    );


const deleteCancelBtn =
    document.getElementById(
        "deleteCancelBtn"
    );


const deleteOkBtn =
    document.getElementById(
        "deleteOkBtn"
    );


// ========================================
// SAVE PRODUCTS
// ========================================

function saveProducts() {

    localStorage.setItem(
        "powfectProducts",
        JSON.stringify(
            products
        )
    );

}


// ========================================
// GET STOCK STATUS
// ========================================

function getStockStatus(stock) {

    const quantity =
        Number(stock);


    if (quantity <= 0) {

        return {

            text: "Out of Stock",

            className:
                "out-of-stock"

        };

    }


    if (quantity <= 10) {

        return {

            text: "Low Stock",

            className:
                "low-stock"

        };

    }


    return {

        text: "In Stock",

        className:
            "in-stock"

    };

}


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(
    productList
) {

    productTableBody.innerHTML =
        "";


    if (
        productList.length === 0
    ) {

        emptyState.style.display =
            "block";


        resultCount.textContent =
            "0";


        return;

    }


    emptyState.style.display =
        "none";


    productList.forEach(
        function(product) {

            const row =
                document.createElement(
                    "tr"
                );


            const categoryName =
                product.category
                    .charAt(0)
                    .toUpperCase()
                +
                product.category.slice(1);


            const stockStatus =
                getStockStatus(
                    product.stock
                );


            row.innerHTML = `

                <td>

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        class="product-table-image"
                    >

                </td>


                <td>

                    <strong
                        class="product-name"
                    >
                        ${product.name}
                    </strong>

                </td>


                <td>

                    <span
                        class="category-badge"
                    >
                        ${categoryName}
                    </span>

                </td>


                <td>

                    ₹${Number(
                        product.price
                    ).toLocaleString("en-IN")}

                </td>


                <td>

                    <div
                        class="stock-control"
                    >

                        <button
                            type="button"
                            class="stock-btn decrease-stock"
                            data-id="${product.id}"
                            title="Decrease stock"
                            ${
                                Number(
                                    product.stock
                                ) <= 0
                                    ? "disabled"
                                    : ""
                            }
                        >

                            <i
                                class="fa-solid fa-minus"
                            ></i>

                        </button>


                        <span
                            class="stock-number"
                        >
                            ${Number(
                                product.stock
                            )}
                        </span>


                        <button
                            type="button"
                            class="stock-btn increase-stock"
                            data-id="${product.id}"
                            title="Increase stock"
                        >

                            <i
                                class="fa-solid fa-plus"
                            ></i>

                        </button>

                    </div>

                </td>


                <td>

                    <span
                        class="stock-badge ${stockStatus.className}"
                    >
                        ${stockStatus.text}
                    </span>

                </td>


                <td>

                    <button
                        class="action-btn edit-btn"
                        data-id="${product.id}"
                    >

                        <i
                            class="fa-solid fa-pen"
                        ></i>

                        Edit

                    </button>


                    <button
                        class="action-btn delete-btn"
                        data-id="${product.id}"
                    >

                        <i
                            class="fa-solid fa-trash"
                        ></i>

                        Delete

                    </button>

                </td>

            `;


            productTableBody.appendChild(
                row
            );

        }
    );


    resultCount.textContent =
        productList.length;

}


// ========================================
// UPDATE TOTAL PRODUCTS
// ========================================

function updateTotalProducts() {

    totalProducts.textContent =
        products.length;

}


// ========================================
// SEARCH + CATEGORY FILTER
// ========================================

function filterProducts() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedCategory =
        categoryFilter.value;


    const filteredProducts =
        products.filter(
            function(product) {

                const matchesSearch =
                    product.name
                        .toLowerCase()
                        .includes(
                            searchText
                        );


                const matchesCategory =
                    selectedCategory ===
                        "all"
                    ||
                    product.category ===
                        selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    displayProducts(
        filteredProducts
    );

}


// ========================================
// INCREASE STOCK
// ========================================

function increaseStock(
    productId
) {

    const product =
        products.find(
            function(item) {

                return (
                    String(item.id) ===
                    String(productId)
                );

            }
        );


    if (!product) {

        showToast(
            "Product not found."
        );

        return;

    }


    product.stock =
        Number(product.stock) + 1;


    saveProducts();


    filterProducts();


    showToast(
        `${product.name} stock increased to ${product.stock}.`
    );

}


// ========================================
// DECREASE STOCK
// ========================================

function decreaseStock(
    productId
) {

    const product =
        products.find(
            function(item) {

                return (
                    String(item.id) ===
                    String(productId)
                );

            }
        );


    if (!product) {

        showToast(
            "Product not found."
        );

        return;

    }


    if (
        Number(product.stock) <= 0
    ) {

        showToast(
            `${product.name} is already out of stock.`
        );

        return;

    }


    product.stock =
        Number(product.stock) - 1;


    saveProducts();


    filterProducts();


    if (
        product.stock === 0
    ) {

        showToast(
            `${product.name} is now out of stock.`
        );

    }

    else if (
        product.stock <= 10
    ) {

        showToast(
            `${product.name} is now low stock (${product.stock}).`
        );

    }

    else {

        showToast(
            `${product.name} stock decreased to ${product.stock}.`
        );

    }

}


// ========================================
// OPEN ADD PRODUCT MODAL
// ========================================

function openProductModal() {

    editingProductId =
        null;


    addProductForm.reset();


    imagePreview.classList.remove(
        "show"
    );


    previewImage.src =
        "";


    const modalTitle =
        document.querySelector(
            ".modal-title"
        );


    if (modalTitle) {

        modalTitle.innerHTML = `

            <i
                class="fa-solid fa-box-open"
            ></i>

            Add New Product

        `;

    }


    const saveButton =
        addProductForm.querySelector(
            ".save-btn"
        );


    if (saveButton) {

        saveButton.innerHTML = `

            <i
                class="fa-solid fa-plus"
            ></i>

            Add Product

        `;

    }


    productModal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";


    setTimeout(
        function() {

            productName.focus();

        },
        100
    );

}


// ========================================
// CLOSE PRODUCT MODAL
// ========================================

function closeProductModal() {

    productModal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";


    addProductForm.reset();


    imagePreview.classList.remove(
        "show"
    );


    previewImage.src =
        "";


    editingProductId =
        null;

}


// ========================================
// SHOW TOAST
// ========================================

function showToast(
    message
) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


// ========================================
// IMAGE PREVIEW
// ========================================

productImage.addEventListener(
    "change",
    function() {

        const file =
            productImage.files[0];


        if (!file) {

            return;

        }


        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please select a valid image file."
            );


            productImage.value =
                "";


            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                previewImage.src =
                    event.target.result;


                imagePreview.classList.add(
                    "show"
                );

            };


        reader.readAsDataURL(
            file
        );

    }
);


// ========================================
// ADD / EDIT PRODUCT
// ========================================

addProductForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            productName.value.trim();


        const category =
            productCategory.value;


        const price =
            Number(
                productPrice.value
            );


        const stock =
            Number(
                productStock.value
            );


        const imageFile =
            productImage.files[0];


        // ========================================
        // VALIDATION
        // ========================================

        if (!name) {

            alert(
                "Please enter product name."
            );

            productName.focus();

            return;

        }


        if (!category) {

            alert(
                "Please select a category."
            );

            productCategory.focus();

            return;

        }


        if (
            !price ||
            price <= 0
        ) {

            alert(
                "Please enter a valid price."
            );

            productPrice.focus();

            return;

        }


        if (
            stock < 0 ||
            Number.isNaN(stock)
        ) {

            alert(
                "Please enter a valid stock quantity."
            );

            productStock.focus();

            return;

        }


        // ========================================
        // EDIT PRODUCT
        // ========================================

        if (
            editingProductId !== null
        ) {

            const productIndex =
                products.findIndex(
                    function(product) {

                        return (
                            String(
                                product.id
                            ) ===
                            String(
                                editingProductId
                            )
                        );

                    }
                );


            if (
                productIndex === -1
            ) {

                alert(
                    "Product not found."
                );

                return;

            }


            const oldImage =
                products[
                    productIndex
                ].image;


            if (imageFile) {

                if (
                    !imageFile.type.startsWith(
                        "image/"
                    )
                ) {

                    alert(
                        "Please select a valid image file."
                    );

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    function(event) {

                        products[
                            productIndex
                        ].name =
                            name;


                        products[
                            productIndex
                        ].category =
                            category;


                        products[
                            productIndex
                        ].price =
                            price;


                        products[
                            productIndex
                        ].stock =
                            stock;


                        products[
                            productIndex
                        ].image =
                            event.target.result;


                        saveProducts();


                        updateTotalProducts();


                        filterProducts();


                        closeProductModal();


                        showToast(
                            "Product updated successfully."
                        );

                    };


                reader.readAsDataURL(
                    imageFile
                );

            }

            else {

                products[
                    productIndex
                ].name =
                    name;


                products[
                    productIndex
                ].category =
                    category;


                products[
                    productIndex
                ].price =
                    price;


                products[
                    productIndex
                ].stock =
                    stock;


                products[
                    productIndex
                ].image =
                    oldImage;


                saveProducts();


                updateTotalProducts();


                filterProducts();


                closeProductModal();


                showToast(
                    "Product updated successfully."
                );

            }


            return;

        }


        // ========================================
        // ADD NEW PRODUCT
        // ========================================

        if (!imageFile) {

            alert(
                "Please select a product image."
            );

            productImage.focus();

            return;

        }


        if (
            !imageFile.type.startsWith(
                "image/"
            )
        ) {

            alert(
                "Please select a valid image file."
            );

            return;

        }


        const reader =
            new FileReader();


        reader.onload =
            function(event) {

                const newProduct = {

                    id:
                        Date.now(),

                    name:
                        name,

                    category:
                        category,

                    price:
                        price,

                    stock:
                        stock,

                    image:
                        event.target.result

                };


                products.push(
                    newProduct
                );


                saveProducts();


                updateTotalProducts();


                filterProducts();


                closeProductModal();


                showToast(
                    "Product added successfully."
                );

            };


        reader.readAsDataURL(
            imageFile
        );

    }
);


// ========================================
// EDIT PRODUCT
// ========================================

function editProduct(
    productId
) {

    const product =
        products.find(
            function(item) {

                return (
                    String(item.id) ===
                    String(productId)
                );

            }
        );


    if (!product) {

        alert(
            "Product not found."
        );

        return;

    }


    editingProductId =
        product.id;


    productName.value =
        product.name;


    productCategory.value =
        product.category;


    productPrice.value =
        product.price;


    productStock.value =
        product.stock;


    /*
       IMPORTANT:

       Existing image file cannot be
       placed inside <input type="file">.

       So we clear the file input
       and show the existing image
       separately in the preview.

       User DOES NOT need to select
       the image again when editing
       name / price / stock / category.
    */

    productImage.value = "";


    if (product.image) {

        previewImage.src =
            product.image;


        imagePreview.classList.add(
            "show"
        );

    }


    const modalTitle =
        document.querySelector(
            ".modal-title"
        );


    if (modalTitle) {

        modalTitle.innerHTML = `

            <i
                class="fa-solid fa-pen"
            ></i>

            Edit Product

        `;

    }


    const saveButton =
        addProductForm.querySelector(
            ".save-btn"
        );


    if (saveButton) {

        saveButton.innerHTML = `

            <i
                class="fa-solid fa-check"
            ></i>

            Save Changes

        `;

    }


    productModal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


// ========================================
// OPEN DELETE POPUP
// ========================================

function openDeletePopup(
    productId
) {

    const product =
        products.find(
            function(item) {

                return (
                    String(item.id) ===
                    String(productId)
                );

            }
        );


    if (!product) {

        showToast(
            "Product not found."
        );

        return;

    }


    deletingProductId =
        product.id;


    deleteProductName.textContent =
        product.name;


    deleteConfirmOverlay.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


// ========================================
// CLOSE DELETE POPUP
// ========================================

function closeDeletePopup() {

    deleteConfirmOverlay.classList.remove(
        "show"
    );


    deletingProductId =
        null;


    document.body.style.overflow =
        "";

}


// ========================================
// CONFIRM DELETE PRODUCT
// ========================================

function confirmDeleteProduct() {

    if (
        deletingProductId === null
    ) {

        return;

    }


    const productIndex =
        products.findIndex(
            function(product) {

                return (
                    String(
                        product.id
                    ) ===
                    String(
                        deletingProductId
                    )
                );

            }
        );


    if (
        productIndex === -1
    ) {

        closeDeletePopup();


        showToast(
            "Product not found."
        );


        return;

    }


    products.splice(
        productIndex,
        1
    );


    saveProducts();


    updateTotalProducts();


    filterProducts();


    closeDeletePopup();


    showToast(
        "Product deleted successfully."
    );

}


// ========================================
// TABLE BUTTON EVENTS
// ========================================

productTableBody.addEventListener(
    "click",
    function(event) {

        // EDIT

        const editButton =
            event.target.closest(
                ".edit-btn"
            );


        if (editButton) {

            editProduct(
                editButton.dataset.id
            );

            return;

        }


        // DELETE

        const deleteButton =
            event.target.closest(
                ".delete-btn"
            );


        if (deleteButton) {

            openDeletePopup(
                deleteButton.dataset.id
            );

            return;

        }


        // INCREASE STOCK

        const increaseButton =
            event.target.closest(
                ".increase-stock"
            );


        if (increaseButton) {

            increaseStock(
                increaseButton.dataset.id
            );

            return;

        }


        // DECREASE STOCK

        const decreaseButton =
            event.target.closest(
                ".decrease-stock"
            );


        if (decreaseButton) {

            decreaseStock(
                decreaseButton.dataset.id
            );

        }

    }
);


// ========================================
// BUTTON EVENTS
// ========================================

addProductBtn.addEventListener(
    "click",
    openProductModal
);


closeModalBtn.addEventListener(
    "click",
    closeProductModal
);


cancelModalBtn.addEventListener(
    "click",
    closeProductModal
);


// ========================================
// PRODUCT MODAL OUTSIDE CLICK
// ========================================

productModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            productModal
        ) {

            closeProductModal();

        }

    }
);


// ========================================
// DELETE CANCEL
// ========================================

deleteCancelBtn.addEventListener(
    "click",
    closeDeletePopup
);


// ========================================
// DELETE OK
// ========================================

deleteOkBtn.addEventListener(
    "click",
    confirmDeleteProduct
);


// ========================================
// DELETE POPUP OUTSIDE CLICK
// ========================================

deleteConfirmOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            deleteConfirmOverlay
        ) {

            closeDeletePopup();

        }

    }
);


// ========================================
// ESC KEY
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        if (
            deleteConfirmOverlay.classList.contains(
                "show"
            )
        ) {

            closeDeletePopup();

            return;

        }


        if (
            productModal.classList.contains(
                "show"
            )
        ) {

            closeProductModal();

        }

    }
);


// ========================================
// SEARCH
// ========================================

searchInput.addEventListener(
    "input",
    filterProducts
);


// ========================================
// CATEGORY FILTER
// ========================================

categoryFilter.addEventListener(
    "change",
    filterProducts
);


// ========================================
// INITIAL LOAD
// ========================================

updateTotalProducts();


displayProducts(
    products
);