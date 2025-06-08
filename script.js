let lang = 'ar';
document.getElementById('langToggle').addEventListener('click', () => {
  lang = lang === 'ar' ? 'en' : 'ar';
  document.getElementById('langToggle').textContent = lang === 'ar' ? 'العربية' : 'English';
  updateLanguage();
});

function updateLanguage() {
  document.querySelector('h1').textContent = lang === 'ar' ? '7kaya' : '7kaya';
  document.querySelectorAll('.form-popup h2, .popup h2').forEach(h2 => {
    h2.textContent = lang === 'ar' ? 'Sign Up' : 'Sign Up';
  });
}

function openSignUp() {
  document.getElementById('signUpForm').style.display = 'flex';
  document.getElementById('signUpForm').style.animation = 'slideDown 0.5s';
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
  }, (error) => {
    alert('Sign up failed!');
  });
}

function openPopup(productId) {
  const popup = document.getElementById('productPopup');
  const products = {
    'pyramid': { name: 'Pyramid T-shirt', price: 550, image: 'https://i.imgur.com/URL_DA_SORAH.jpg' }
  };
  const product = products[productId];
  document.getElementById('popupTitle').textContent = product.name;
  document.getElementById('popupImage').src = product.image;
  document.getElementById('popupPrice').textContent = product.price;
  popup.style.display = 'flex';
  popup.style.animation = 'slideUp 0.5s';
}

function closePopup() {
  document.getElementById('productPopup').style.display = 'none';
}

function buyNow() {
  if (!localStorage.getItem('user')) {
    openSignUp();
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
    openSignUp();
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
