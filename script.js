let loggedInUser = localStorage.getItem("user") || null;
let cart = [];

function showSection(id) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  if (id === "profileSection") updateProfile();
  if (id === "cartSection") updateCart();
}

function updateWelcome() {
  const welcomeText = document.getElementById("welcomeText");
  if (loggedInUser) {
    welcomeText.textContent = `Welcome to, 7kaya - ${loggedInUser}`;
  } else {
    welcomeText.textContent = "Welcome to, 7kaya";
  }
}

function updateProfile() {
  const profile = document.getElementById("profileContent");
  if (!loggedInUser) {
    profile.innerHTML = `
      <button onclick="loginPrompt()">Login</button>
      <button onclick="signupPrompt()">Signup</button>
    `;
  } else {
    profile.innerHTML = `
      <p>Welcome, ${loggedInUser}</p>
      <button onclick="changeName()">Change Name</button>
      <button onclick="logout()">Logout</button>
      <button onclick="deleteAccount()">Delete Account</button>
    `;
  }
}

function loginPrompt() {
  const name = prompt("Enter username:");
  if (name) {
    loggedInUser = name;
    localStorage.setItem("user", name);
    updateWelcome();
    updateProfile();
    alert("Logged in!");
  }
}

function signupPrompt() {
  loginPrompt(); // Simple for now
}

function logout() {
  loggedInUser = null;
  localStorage.removeItem("user");
  updateWelcome();
  updateProfile();
}

function deleteAccount() {
  logout();
  alert("Account deleted.");
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = "<li>Cart is empty!</li>";
  } else {
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ${item.quantity} × ${item.price} EGP`;
      cartItems.appendChild(li);
    });
  }
}

function openPopup(productId) {
  const products = {
    pyramid: { name: "Pyramid T-shirt", price: 550 },
    underground: { name: "Underground T-shirt", price: 500 },
  };
  const p = products[productId];
  const quantity = prompt(`Add ${p.name}. Quantity?`);
  if (!loggedInUser) {
    alert("Please login first!");
    return;
  }
  if (quantity && !isNaN(quantity)) {
    cart.push({ name: p.name, quantity: quantity, price: p.price });
    alert("Added to cart!");
  }
}

function searchProducts() {
  const val = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".product").forEach(p => {
    const name = p.getAttribute("data-name").toLowerCase();
    p.style.display = name.includes(val) ? "block" : "none";
  });
}

updateWelcome();
showSection("homeSection");
