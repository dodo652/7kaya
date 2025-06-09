let currentUser = localStorage.getItem("username") || null;

function showPage(id) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => {
    p.classList.add("hidden");
  });

  const selected = document.getElementById(id);
  selected.classList.remove("hidden");

  if (id === "home") updateWelcome();
  if (id === "profile") updateProfile();
}

function updateWelcome() {
  const welcome = document.getElementById("welcome-user");
  if (currentUser) {
    welcome.textContent = currentUser;
  } else {
    welcome.textContent = "";
  }
}

function updateProfile() {
  const profileContent = document.getElementById("profile-content");
  if (!currentUser) {
    profileContent.innerHTML = `
      <button onclick="login()">Login</button>
      <button onclick="signup()">Signup</button>
    `;
  } else {
    profileContent.innerHTML = `
      <p>Username: ${currentUser}</p>
      <button onclick="changeName()">Change Name</button><br><br>
      <button onclick="deleteAccount()">Delete Account</button><br>
      <button onclick="logout()">Logout</button>
    `;
  }
}

function login() {
  const name = prompt("Enter your username:");
  if (name) {
    currentUser = name;
    localStorage.setItem("username", name);
    updateWelcome();
    showPage("profile");
  }
}

function signup() {
  login();
}

function changeName() {
  const newName = prompt("Enter new username:");
  if (newName) {
    currentUser = newName;
    localStorage.setItem("username", newName);
    updateProfile();
    updateWelcome();
  }
}

function deleteAccount() {
  if (confirm("Are you sure you want to delete your account?")) {
    localStorage.removeItem("username");
    currentUser = null;
    updateProfile();
    updateWelcome();
  }
}

function logout() {
  localStorage.removeItem("username");
  currentUser = null;
  updateProfile();
  updateWelcome();
}
