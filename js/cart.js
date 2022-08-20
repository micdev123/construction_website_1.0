// Toggle menu
// Targetting elements
const menu = document.querySelector('#menu_btn');
const close_btn = document.querySelector('#close_btn');
const nav_lists = document.querySelector('.nav_lists');

// Toggle menu
menu.addEventListener('click', () => {
   nav_lists.style.display = 'flex';
   close_btn.style.display = 'inline-block';
   menu.style.display = 'none';
});

// Toggle close_btn
close_btn.addEventListener('click', () => {
   nav_lists.style.display = 'none';
   close_btn.style.display = 'none';
   menu.style.display = 'inline-block';
})


const inCart = document.querySelector('incart');


function productInCart() {
    // Getting products in localstorage
    let getProductInCart = JSON.parse(localStorage.getItem('products')) || [];
    // console.log(getProductInCart);

    // Showing the number of item in cart
    document.querySelector('.incart').innerText = getProductInCart.reduce((a, c) => a + c.qty, 0)

    // Checking
    getProductInCart.length === 0 ? 
    document.querySelector('.container').innerHTML = `<h1 class="empty">Your Cart Is Empty: <a href="../pages/index.html">Go Shopping</a></h1>` : 
    document.querySelector('.container').innerHTML = `
    <h1>Your Cart</h1>
    <div class="cart_container">
        <div class="cart_content">
            <div class="content_header">
                <h2></h2>
                <h2>Product</h2> 
                <h2>SubTotal</h2>
            </div>
            <div class="contents">
            ${getProductInCart.map((product) => `
            <div class="content">
                <button type="button" class="delete_btn" id="${product.product_id}">
                    <img src="../imgs/delete_btn.svg" alt="delete_btn">
                </button>
                <div class="product">
                    <img src="${product.productImg}" alt="${product.productName}">
                    <div>
                        <p>${product.productName}</p>
                        <div class="price">
                            <p>$${product.productPrice}</p>
                        </div>
                        <div class="quantity">
                        <select class="qtySelect" id="${product.product_id}">
                        ${[...Array(product.countInStock).keys()].map((x) =>
                            product.qty === x + 1 
                            ? `<option selected value="${x + 1}">${x + 1}</option>`
                            : `<option value="${x + 1}">${x + 1}</option>`
                        )}
                        </select>
                    </div>
                    </div>
                </div>
               
               
                <div class="subtotal">
                    <p>$<span class="sub_total" id="${product.product_id}">${product.productPrice * product.qty}</span></p>
                </div>
            </div>
            `).join('')}
            </div>
        </div>
        <div class="cart_action">
            <h2>Cart Total</h2>
            <div>
                <div>
                    <p>Products In Cart</p>
                    <p>${getProductInCart.reduce((a, c) => a + c.qty, 0)} Items</p>
                </div>
                <div>
                    <p>Cart Subtotal</p>
                    <p>$${getProductInCart.reduce((a, c) => a + c.productPrice * c.qty, 0)}</p>
                </div>
                <div>
                    <p>Shipping</p>
                    <p>$0.00</p>
                </div>
                <div class="total">
                    <h2>Total</h2>
                    <p>$${getProductInCart.reduce((a, c) => a + c.productPrice * c.qty, 0)}</p>
                </div>
            </div>
            <button class="checkout_btn"><a href="../pages/billingInfo.html">Proceed to checkout</a></button>
        </div>
    </div>
    `
    //  Calling the updateQty_subtotal()
    updateQty_subtotal()
    // Calling the deleteProduct()
    deleteProduct()
}

// When a quantity is selected it update the qty in localstorage and the subtotal for that product
function updateQty_subtotal () {
    // Getting products in localstorage
    let getProductInCart = JSON.parse(localStorage.getItem('products')) || [];
    // Targetting all qtySelects element
    const qtySelects = document.getElementsByClassName('qtySelect');
    // Targetting all subTotals element
    let subTotals = document.getElementsByClassName('sub_total');
    // Forming an array of qtySelects
    Array.from(qtySelects).forEach((qtySelect) => {
        // console.log(qtySelect);
        qtySelect.addEventListener('change', (e) => {
            // Target product in localstorage with the same id
            const product = getProductInCart.find((item) => item.product_id === Number(qtySelect.id));
            // console.log(product);
            product.qty = Number(e.target.value);
            // console.log(e.target.value);
            // if(product) {
                
            // set localstorage
            localStorage.setItem('products', JSON.stringify(getProductInCart));
            // }
            // console.log(product);
            productInCart();
        })
    })
}

// Delete the targetted product
function deleteProduct() {
    // Getting products in localstorage
    let getProductInCart = JSON.parse(localStorage.getItem('products')) || [];
    // Targeting all delete_btns
    const delete_btns = document.getElementsByClassName('delete_btn');
    Array.from(delete_btns).forEach((delete_btn) => {
        delete_btn.addEventListener('click', (e) => {
            // console.log(delete_btn.id);
            // Filtering 
            getProductInCart = getProductInCart.filter((x) => x.product_id !== Number(delete_btn.id))

            // set localstorage
            localStorage.setItem('products', JSON.stringify(getProductInCart));

            // Calling the productInCart() to update when an item is deleted
            productInCart();
        })
    })
}

productInCart();
updateQty_subtotal();
deleteProduct();