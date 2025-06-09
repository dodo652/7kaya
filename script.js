let lang = 'ar';
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
