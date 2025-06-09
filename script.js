let cart = [];
let loggedInUser = localStorage.getItem('user') || null;

function updateWelcome() {
  const welcomeText = document.getElementById('welcomeText');
  if (loggedInUser) {
    welcomeText.textContent = `Welcome to, 7kaya - ${loggedInUser}`;
  } else {
    welcomeText.textContent = 'Welcome to, 7kaya';
  }
}

function toggleDropdown() {
  document.getElementById('dropdownMenu').classList.toggle('show');
}

function openLogin() {
  if (loggedInUser) {
    alert('You are already logged in!');
    return;
  }
  closeSignUp();
  document.getElementById('loginForm').style.display = 'flex';
}

function closeLogin() {
  document.getElementById('loginForm').style.display = 'none';
  document.getElementById('dropdownMenu').classList.remove('show');
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  if (username && password) {
    loggedInUser = username;
    localStorage.setItem('user', loggedInUser);
    alert(`Login successful! Welcome, ${loggedInUser}`);
    closeLogin();
    updateWelcome();
  } else {
    alert('Please enter username and password!');
  }
}

function openSignUp() {
  if (loggedInUser) {
    alert('You are already logged in!');
    return;
  }
  closeLogin();
  document.getElementById('signUpForm').style.display = 'flex';
}

function closeSignUp() {
  document.getElementById('signUpForm').style.display = 'none';
  document.getElementById('dropdownMenu').classList.remove('show');
}

function signUp() {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;
  if (username && password) {
    alert(`Sign up successful! Welcome, ${username}. Please log in.`);
    closeSignUp();
    document.getElementById('loginForm').style.display = 'flex';
    document.getElementById('loginUsername').value = username;
    document.getElementById('loginPassword').value = password;
  } else {
    alert('Please enter username and password!');
  }
}

function openCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = '<li>Cart is empty!</li>';
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - Size: ${item.size} - Quantity: ${item.quantity} - Price: ${item.price} EGP`;
      cartItems.appendChild(li);
    });
  }
  document.getElementById('cartPopup').style.display = 'flex';
}

function closeCart() {
  document.getElementById('cartPopup').style.display = 'none';
}

function checkoutCart() {
  if (!loggedInUser) {
    alert('Please log in to proceed with the purchase!');
    openLogin();
    return;
  }
  if (cart.length === 0) {
    alert('Cart is empty!');
    return;
  }
  alert('Purchase successful! Thank you for shopping with 7kaya.');
  cart = [];
  closeCart();
}

function openProductDetails(productId) {
  const popup = document.getElementById('productDetails');
  const products = {
    'pyramid': { name: 'Pyramid T-shirt', price: 650 },
    'underground': { name: 'Underground T-shirt', price: 600 }
  };
  const product = products[productId];
  document.getElementById('productTitle').textContent = product.name;
  document.getElementById('productPrice').textContent = product.price;
  popup.style.display = 'flex';
}

function closeProductDetails() {
  document.getElementById('productDetails').style.display = 'none';
}

function addToCart() {
  if (!loggedInUser) {
    alert('Please log in to add items to cart!');
    openLogin();
    return;
  }
  const size = document.getElementById('size').value;
  const quantity = document.getElementById('quantity').value;
  const name = document.getElementById('productTitle').textContent;
  const price = document.getElementById('productPrice').textContent;
  cart.push({ name, price, size, quantity });
  alert(`${name} added to cart!`);
  closeProductDetails();
}

function buyNow() {
  if (!loggedInUser) {
    alert('Please log in to proceed with the purchase!');
    openLogin();
    return;
  }
  const size = document.getElementById('size').value;
  const quantity = document.getElementById('quantity').value;
  const name = document.getElementById('productTitle').textContent;
  const price = document.getElementById('productPrice').textContent;
  cart.push({ name, price, size, quantity });
  alert(`Purchased ${name} successfully!`);
  cart = [];
  closeProductDetails();
}

function searchProducts() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    const productName = product.getAttribute('data-name').toLowerCase();
    if (productName.includes(input)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}

// Initial call to set welcome message
updateWelcome();

// Close dropdown when clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.login-btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
