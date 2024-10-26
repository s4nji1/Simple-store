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

let productCount = 0;

        function addProduct(name = `Product ${productCount + 1}`, price = (Math.random() * 20 + 1).toFixed(2)) {
            productCount++;
            const productsDiv = document.getElementById('products');

            const product = document.createElement('div');
            product.classList.add('product');
            product.setAttribute('data-name', name);
            product.setAttribute('data-price', price);

            product.innerHTML = `
                <button class="delete-btn" onclick="deleteProduct(this)">X</button>
                <h2 onclick="editName(this)">${name}</h2>
                <p onclick="editPrice(this)">$${price}</p>
                <button class="btn btn-custom btn-block" onclick="addToCart(this)">Add to Cart</button>
            `;

            productsDiv.appendChild(product);
        }

        function deleteProduct(button) {
            const product = button.closest('.product');
            product.remove();
        }

        function addToCart(button) {
            const product = button.closest('.product');
            const name = product.getAttribute('data-name');
            const price = parseFloat(product.getAttribute('data-price'));
            const cartItems = document.getElementById('cartItems');
            const totalPriceElem = document.getElementById('totalPrice');

            const item = document.createElement('li');
            item.textContent = `${name} - $${price.toFixed(2)}`;
            cartItems.appendChild(item);

            let totalPrice = parseFloat(totalPriceElem.textContent);
            totalPrice += price;
            totalPriceElem.textContent = totalPrice.toFixed(2);
        }

        function resetCart() {
            document.getElementById('cartItems').innerHTML = '';
            document.getElementById('totalPrice').textContent = '0';
        }

        function editName(element) {
            const currentName = element.innerText;
            const newName = prompt("Enter new product name:", currentName);
            if (newName) {
                element.innerText = newName;
                element.closest('.product').setAttribute('data-name', newName);
            }
        }

        function editPrice(element) {
            const currentPrice = parseFloat(element.innerText.replace('$', ''));
            const newPrice = prompt("Enter new price:", currentPrice);
            if (newPrice && !isNaN(newPrice)) {
                element.innerText = `$${parseFloat(newPrice).toFixed(2)}`;
                element.closest('.product').setAttribute('data-price', parseFloat(newPrice));
            }
        }

        // Add initial products
        for (let i = 1; i <= 20; i++) {
            addProduct(`Product ${i}`, (Math.random() * 20 + 1).toFixed(2));
        }