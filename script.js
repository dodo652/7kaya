let lang = 'ar';
document.getElementById('langToggle').addEventListener('click', () => {
  lang = lang === 'ar' ? 'en' : 'ar';
  document.getElementById('langToggle').textContent = lang === 'ar' ? 'العربية' : 'English';
  updateLanguage();
});

function updateLanguage() {
  const welcomeText = document.getElementById('welcomeText');
  const storeDescription = document.getElementById('storeDescription');
  const productsTitle = document.getElementById('productsTitle');
  if (lang === 'ar') {
    welcomeText.textContent = 'مرحبًا بكم في 7kaya';
    storeDescription.textContent = '7kaya، متجر ملابس عصري يملكه 3 مراهقين. كنا نحاول إيجاد ملابس تناسبنا لكن لم نجد، لذا أنشأنا هذا المتجر للأشخاص الذين يواجهون نفس المشكلة مثلنا.';
    productsTitle.textContent = 'هنا ستجد جميع منتجاتنا';
  } else {
    welcomeText.textContent = 'Welcome to 7kaya';
    storeDescription.textContent = '7kaya, is a trendy cloth shop owned by 3 teenagers. We were trying to find a cloth that can fit on us but we didn’t, so we did that store for people that have that problem like us.';
    productsTitle.textContent = 'Here will you find all our products';
  }
}

function goHome() {
  document.getElementById('homeSection').style.display = 'block';
  document.getElementById('productsSection').style.display = 'none';
}

function goProducts() {
  document.getElementById('productsSection').style.display = 'block';
  document.getElementById('homeSection').style.display = 'none';
}

function openLoginSignup() {
  document.getElementById('signUpForm').style.display = 'flex';
}

function closeSignUp() {
  document.getElementById('signUpForm').style.display = 'none';
}

function submitSignUp() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  emailjs.send("service_kp5co8s", "template_ypw8u6w", {
    username: username,
    email: email,
    password: password
  }, "u8Pf4ndlt7rs6AbKB").then(() => {
    alert('Sign up successful! Check your email.');
    closeSignUp();
    localStorage.setItem('user', username);
  }, (error) => {
    alert('Sign up failed!');
  });
}

function openPopup(productId) {
  const popup = document.getElementById('productPopup');
  const products = {
    'pyramids': { name: 'Pyramids T-shirt', price: 650, image: 'https://i.imgur.com/4zL7e5h.jpg' }
  };
  const product = products[productId];
  document.getElementById('popupTitle').textContent = product.name;
  document.getElementById('popupImage').src = product.image;
  document.getElementById('popupPrice').textContent = product.price;
  popup.style.display = 'flex';
}

function closePopup() {
  document.getElementById('productPopup').style.display = 'none';
}

function buyNow() {
  if (!localStorage.getItem('user')) {
    openLoginSignup();
    return;
  }
  const size = document.getElementById('size').value;
  const quantity = document.getElementById('quantity').value;
  const product = {
    name: document.getElementById('popupTitle').textContent,
    price: document.getElementById('popupPrice').textContent,
    size: size,
    quantity: quantity
  };
  emailjs.send("service_kp5co8s", "template_ypw8u6w", {
    product: JSON.stringify(product)
  }, "u8Pf4ndlt7rs6AbKB").then(() => {
    alert('Purchase successful! Check your email.');
    closePopup();
  }, (error) => {
    alert('Purchase failed!');
  });
}

function addToCart() {
  if (!localStorage.getItem('user')) {
    openLoginSignup();
    return;
  }
  const size = document.getElementById('size').value;
  const quantity = document.getElementById('quantity').value;
  const product = {
    name: document.getElementById('popupTitle').textContent,
    price: document.getElementById('popupPrice').textContent,
    size: size,
    quantity: quantity
  };
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Added to cart!');
  closePopup();
}

function openCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
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
  if (!localStorage.getItem('user')) {
    openLoginSignup();
    return;
  }
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (cart.length === 0) {
    alert('Cart is empty!');
    return;
  }
  emailjs.send("service_kp5co8s", "template_ypw8u6w", {
    cart: JSON.stringify(cart)
  }, "u8Pf4ndlt7rs6AbKB").then(() => {
    alert('Checkout successful! Check your email.');
    localStorage.removeItem('cart');
    closeCart();
  }, (error) => {
    alert('Checkout failed!');
  });
}

function openProfile() {
  const profilePopup = document.getElementById('profilePopup');
  const user = localStorage.getItem('user');
  const profileUsername = document.getElementById('profileUsername');
  if (user) {
    profileUsername.textContent = `Username: ${user}`;
    document.getElementById('newUsername').value = '';
    profilePopup.style.display = 'flex';
  } else {
    openLoginSignup();
  }
}

function closeProfile() {
  document.getElementById('profilePopup').style.display = 'none';
}

function updateUsername() {
  const newUsername = document.getElementById('newUsername').value;
  if (newUsername) {
    localStorage.setItem('user', newUsername);
    alert('Username updated successfully!');
    closeProfile();
  } else {
    alert('Please enter a new username!');
  }
}
