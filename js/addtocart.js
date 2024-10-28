// For Menu
function addToCart(event) {
    const button = event.target;
    const productCard = button.parentElement;
    const productName = productCard.querySelector('h2').textContent;
    const productPrice = productCard.querySelector('p').textContent.replace('Php ', '');
    const productImg = productCard.querySelector('img').src;
    
    const product = {
        name: productName,
        price: parseFloat(productPrice),  
        img: productImg,
        quantity: 1
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} has been added to your cart!`);
}

const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// For Cart
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');  // Check if element exists
    const cartTotal = document.getElementById('cart-total');

    if (!cartList) {
        console.error("cart-list element not found");
        return;  // Stop the function if the cart-list element is not found
    }

    cartList.innerHTML = '';  // Clear previous items
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = '<tr><td colspan="4">Your cart is empty.</td></tr>';
    } else {
        cart.forEach((item, index) => {
            const price = parseFloat(item.price);

            const cartItem = document.createElement('tr');
            cartItem.innerHTML = `
                <td>
                    <button class="quantity-btn" data-index="${index}" data-action="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-index="${index}" data-action="increase">+</button>
                </td>
                <td>
                    <img src="${item.img}" alt="${item.name}">
                    <p>${item.name}</p>
                </td>
                <td>Php ${price.toFixed(2)}</td>
                <td>Php ${(price * item.quantity).toFixed(2)}</td>
            `;
            cartList.appendChild(cartItem);
            total += price * item.quantity;
        });
    }

    if (cartTotal) {
        cartTotal.textContent = total.toFixed(2);
    } else {
        console.error("cart-total element not found");
    }
}

function updateCartQuantity(index, action) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (action === 'increase') {
        cart[index].quantity += 1;
    } else if (action === 'decrease' && cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else if (action === 'decrease' && cart[index].quantity === 1) {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('quantity-btn')) {
        const index = event.target.getAttribute('data-index');
        const action = event.target.getAttribute('data-action');
        updateCartQuantity(index, action);
    }
});

displayCartItems();

// Checkout
document.getElementById('checkout-btn').addEventListener('click', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
    } else {
        alert('Proceeding to checkout...');
        window.location.href = 'checkout.html';
    }
});

// Checkout Form
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            const name = document.getElementById('name').value;
            const address = document.getElementById('address').value;
            const email = document.getElementById('email').value;
            const contact = document.getElementById('contact').value;
            const paymentMethod = document.getElementById('payment-method').value;

            if (!name || !address || !email || !contact || !paymentMethod) {
                alert('Please fill in all fields.');
                event.preventDefault();  
                return;
            }

            alert(`Thank you, ${name}! Your order will be delivered to ${address}. We will contact you at ${contact} for further updates. You chose ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Gcash'} as your payment method.`);
            
        });
    } else {
        console.error("checkout-form element not found");
    }
});