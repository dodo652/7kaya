let lang = localStorage.getItem('lang') || 'ar';
let users = JSON.parse(localStorage.getItem('users') || '[]');
const t = {
  ar: {
    login: 'تسجيل الدخول',
    register: 'تسجيل حساب جديد',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    noAccount: 'ما عندكش حساب؟',
    haveAccount: 'عندك حساب؟',
    registerHere: 'سجل هنا',
    loginHere: 'ادخل هنا',
    welcome: 'مرحبًا',
    logout: 'تسجيل خروج',
    size: 'اختر الحجم',
    quantity: 'العدد',
    unitPrice: 'السعر للوحدة: ',
    totalPrice: 'السعر الإجمالي: ',
    addCart: 'إضافة إلى السلة',
    buyNow: 'اشترِ الآن'
  },
  en: {
    login: 'Login',
    register: 'Register',
    username: 'Username',
    password: 'Password',
    noAccount: "Don't have an account?",
    haveAccount: 'Have an account?',
    registerHere: 'Register here',
    loginHere: 'Login here',
    welcome: 'Welcome',
    logout: 'Logout',
    size: 'Select size',
    quantity: 'Quantity',
    unitPrice: 'Unit price: ',
    totalPrice: 'Total price: ',
    addCart: 'Add to Cart',
    buyNow: 'Buy Now'
  }
};

function _(key) {
  return t[lang][key];
}

function setTexts() {
  document.documentElement.lang = lang;
  document.getElementById('langBtn').textContent = 'غير اللغة';
  ['login-container', 'register-container'].forEach(i => {
    const e = document.getElementById(i);
    if (i === 'login-container') {
      e.innerHTML = `<h2>${_('login')}</h2>
        <label>${_('username')}</label><input id="username" type="text" placeholder="">
        <label>${_('password')}</label><input id="password" type="password" placeholder="">
        <button onclick="login()">${_('login')}</button>
        <p>${_('noAccount')} <a href="#" onclick="showRegister()">${_('registerHere')}</a></p>
        <p class="error" id="login-error"></p>`;
    } else {
      e.innerHTML = `<h2>${_('register')}</h2>
        <label>${_('username')}</label><input id="reg-username" type="text" placeholder="">
        <label>${_('password')}</label><input id="reg-password" type="password" placeholder="">
        <button onclick="register()">${_('register')}</button>
        <p>${_('haveAccount')} <a href="#" onclick="showLogin()">${_('loginHere')}</a></p>
        <p class="error" id="register-error"></p>`;
    }
  });
  document.getElementById('welcome-text').textContent = _('welcome');
  document.getElementById('btn-logout').textContent = _('logout');
}

document.getElementById('langBtn').onclick = () => {
  lang = lang === 'ar' ? 'en' : 'ar';
  localStorage.setItem('lang', lang);
  loadPage();
};

function initProducts() {
  const productsData = [
    { id: 'pyramid', nameAr: 'تيشرت بيراميد', nameEn: 'Pyramid T-shirt', price: 650, img: 'pyramid-tshirt.jpg' },
    { id: 'underground', nameAr: 'تيشرت أندERGROUND', nameEn: 'Underground T-shirt', price: 600, img: 'underground-tshirt.jpg' }
  ];
  const wrapper = document.getElementById('products-wrapper');
  wrapper.innerHTML = '';
  productsData.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.dataset.img = product.img;
    div.dataset.nameAr = product.nameAr;
    div.dataset.nameEn = product.nameEn;
    div.dataset.price = product.price;
    div.innerHTML = `<img src="${product.img}" alt="${product.nameEn}"><h3></h3><p></p>`;
    div.onclick = () => openModal(div);
    wrapper.appendChild(div);
  });
  document.querySelectorAll('.product').forEach(el => {
    el.querySelector('img').src = el.dataset.img;
    el.querySelector('h3').textContent = lang === 'ar' ? el.dataset.nameAr : el.dataset.nameEn;
    el.querySelector('p').textContent = (lang === 'ar' ? 'السعر: ' : 'Price: ') + el.dataset.price + (lang === 'ar' ? ' جنيه' : ' EGP');
  });
}

function openModal(el) {
  const price = +el.dataset.price;
  document.getElementById('modalImg').src = el.dataset.img;
  document.getElementById('modalName').textContent = lang === 'ar' ? el.dataset.nameAr : el.dataset.nameEn;
  document.getElementById('unitPriceText').textContent = _('unitPrice') + price;
  document.getElementById('label-size').textContent = _('size');
  document.getElementById('label-qty').textContent = _('quantity');
  document.getElementById('quantityInput').value = 1;
  updateTotal(price);
  document.getElementById('productModal').style.display = 'flex';
  document.getElementById('quantityInput').oninput = () => updateTotal(price);
}

function updateTotal(price) {
  const qty = Math.max(1, +document.getElementById('quantityInput').value);
  document.getElementById('totalPriceText').textContent = _('totalPrice') + (price * qty);
}

document.querySelector('.closeBtn').onclick = () => document.getElementById('productModal').style.display = 'none';

function showLogin() {
  document.getElementById('login-container').style.display = 'block';
  document.getElementById('register-container').style.display = 'none';
  document.getElementById('shop-container').style.display = 'none';
}

function showRegister() {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('register-container').style.display = 'block';
  document.getElementById('shop-container').style.display = 'none';
}

function showShop(u) {
  document.getElementById('user-display').textContent = u;
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('register-container').style.display = 'none';
  document.getElementById('shop-container').style.display = 'block';
  localStorage.setItem('loggedInUser', u);
}

function register() {
  const u = document.getElementById('reg-username').value.trim();
  const p = document.getElementById('reg-password').value.trim();
  const err = document.getElementById('register-error');
  if (!u || !p) {
    err.textContent = _('register');
    return;
  }
  if (users.find(x => x.username === u)) {
    err.textContent = _('register');
    return;
  }
  users.push({ username: u, password: p });
  localStorage.setItem('users', JSON.stringify(users));
  alert(lang === 'ar' ? 'تم التسجيل' : 'Registered');
  showLogin();
}

function login() {
  const u = document.getElementById('username').value.trim();
  const p = document.getElementById('password').value.trim();
  const err = document.getElementById('login-error');
  if (!users.find(x => x.username === u && x.password === p)) {
    err.textContent = _('login');
    return;
  }
  showShop(u);
}

function logout() {
  localStorage.removeItem('loggedInUser');
  showLogin();
}

function loadPage() {
  setTexts();
  initProducts();
  const user = localStorage.getItem('loggedInUser');
  if (user) showShop(user);
  else showLogin();
}

window.onload = loadPage;

function addToCart() {
  const size = document.getElementById('size').value;
  const quantity = document.getElementById('quantityInput').value;
  const name = document.getElementById('modalName').textContent;
  const price = +document.getElementById('unitPriceText').textContent.split(' ')[1];
  cart.push({ name, price, size, quantity });
  alert(`${name} added to cart!`);
  document.getElementById('productModal').style.display = 'none';
}

function buyNow() {
  const size = document.getElementById('size').value;
  const quantity = document.getElementById('quantityInput').value;
  const name = document.getElementById('modalName').textContent;
  const price = +document.getElementById('unitPriceText').textContent.split(' ')[1];
  cart.push({ name, price, size, quantity });
  alert(`Purchased ${name} successfully!`);
  cart = [];
  document.getElementById('productModal').style.display = 'none';
}
