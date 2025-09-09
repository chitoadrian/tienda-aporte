const pages = document.querySelectorAll('.page-content');
const cartMessage = document.getElementById('cart-message');
const formMessage = document.getElementById('form-message');
let cart = [];

function showPage(pageId) {
    pages.forEach(page => {
        page.classList.toggle('hidden', page.id !== pageId);
    });
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center">El carrito está vacío. ¡Añade algunos productos!</p>';
        return;
    }

    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'flex items-center space-x-4 border-b pb-4';
        itemDiv.innerHTML = `
            <img src="${item.imageSrc}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
            <div class="flex-1">
                <h4 class="text-xl font-semibold">${item.name}</h4>
                <p class="text-gray-600">$${item.price.toFixed(2)}</p>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
}

showPage('home-page');

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const name = productCard.querySelector('h3').textContent;
        const price = parseFloat(productCard.querySelector('.text-lg.font-bold').textContent.replace('$', ''));
        const imageSrc = productCard.querySelector('img').src;

        const product = { name, price, imageSrc };
        cart.push(product);

        cartMessage.textContent = `"${name}" ha sido añadido al carrito.`;
        cartMessage.classList.remove('hidden');
        
        renderCart();
        showPage('cart-page');
    });
});

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '' || email === '' || message === '') {
        formMessage.textContent = 'Por favor, rellena todos los campos.';
        formMessage.classList.remove('hidden');
    } else {
        formMessage.textContent = '¡Mensaje enviado con éxito!';
        formMessage.classList.remove('text-red-600', 'hidden');
        formMessage.classList.add('text-green-600');
        
        contactForm.reset();

        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 3000);
    }
});
