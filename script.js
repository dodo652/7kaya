let lang = 'ar';
let cart = [];

document.getElementById('langToggle').addEventListener('click', () => {
  lang = lang === 'ar' ? 'en' : 'ar';
  document.getElementById('langToggle').textContent = lang === 'ar' ? 'العربية' : 'English';
  updateLanguage();
});

function updateLanguage() {
  const welcomeText = document.getElementById('welcomeText');
  const productsTitle = document.getElementById('productsTitle');
  if (lang === 'ar') {
    welcomeText.textContent = 'مرحبًا بكم في، 7kaya';
    productsTitle.textContent = 'هنا ستجد جميع منتجاتنا';
  } else {
    welcomeText.textContent = 'Welcome to, 7kaya';
    productsTitle.textContent = 'Here will you find all our products';
  }
}

function openLogin() {
  document.getElementById('loginForm').style.display = 'flex';
}

function closeLogin() {
  document.getElementById('loginForm').style.display = 'none';
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  if (username && password) {
    alert(`Login successful! Welcome, ${username}`);
    localStorage.setItem('user', username);
    closeLogin();
  } else {
    alert('Please enter username and password!');
  }
}

function openCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Size: ${item.size} - Quantity: ${item.quantity} - Price: ${item.price} EGP`;
    cartItems.appendChild(li);
  });
  document.getElementById('cartPopup').style.display = 'flex';
}

function closeCart() {
  document.getElementById('cartPopup').style.display = 'none';
}

function checkoutCart() {
  if (cart.length === 0) {
    alert('Cart is empty!');
    return;
  }
  alert('Purchase successful! Thank you for shopping with 7kaya.');
  cart = [];
  closeCart();
}

function openPopup(productId) {
  const popup = document.getElementById('productPopup');
  const products = {
    'pyramid': { name: 'Pyramid T-shirt', price: 650 },
    'underground': { name: 'Underground T-shirt', price: 600 }
  };
  const product = products[productId];
  document.getElementById('popupTitle').textContent = product.name;
  document.getElementById('popupPrice').textContent = product.price;
  popup.style.display = 'flex';
}

function closePopup() {
  document.getElementById('productPopup').style.display = 'none';
}

function addToCart() {
  const size = document.getElementById('size').value;
  const quantity = document.getElementById('quantity').value;
  const name = document.getElementById('popupTitle').textContent;
  const price = document.getElementById('popupPrice').textContent;
  cart.push({ name, price, size, quantity });
  alert(`${name} added to cart!`);
  closePopup();
}

function searchProducts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    const productName = product.querySelector('h3').textContent.toLowerCase();
    if (productName.includes(input)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}
