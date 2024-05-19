let cart = [];

function addToCart(button) {
    const product = button.parentElement;
    const name = product.getAttribute('data-name');
    const price = parseFloat(product.getAttribute('data-price'));

    const cartItem = cart.find(item => item.name === name);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
        cartItems.appendChild(li);
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function resetCart() {
    cart = [];
    updateCart();
}
