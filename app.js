// ==========================================
// AG PREMIUM MINI APP
// app.js
// ==========================================

// Telegram WebApp
const tg = window.Telegram?.WebApp;

// Initialize Telegram Mini App
if (tg) {
  tg.ready();
  tg.expand();

  // Use Telegram theme when available
  if (tg.setHeaderColor) {
    tg.setHeaderColor("#050907");
  }

  if (tg.setBackgroundColor) {
    tg.setBackgroundColor("#050907");
  }
}


// ==========================================
// USER DATA
// ==========================================

function loadTelegramUser() {

  const user = tg?.initDataUnsafe?.user;

  if (!user) {
    return;
  }

  const firstName = user.first_name || "";
  const lastName = user.last_name || "";

  const fullName =
    `${firstName} ${lastName}`.trim() || "AG PREMIUM USER";

  const userId =
    user.id ? `ID: ${user.id}` : "Telegram User";

  const avatar =
    firstName.charAt(0).toUpperCase() || "A";

  const nameElement =
    document.getElementById("userName");

  const idElement =
    document.getElementById("userId");

  const avatarElement =
    document.getElementById("avatar");

  if (nameElement) {
    nameElement.textContent = fullName;
  }

  if (idElement) {
    idElement.textContent = userId;
  }

  if (avatarElement) {
    avatarElement.textContent = avatar;
  }
}


// ==========================================
// NAVIGATION
// ==========================================

function openSection(section) {

  console.log("Opening section:", section);

  // Home
  if (section === "home") {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    setActiveNav(0);
    return;
  }


  // Temporary sections
  // Full pages/features will be connected later.

  if (section === "profile") {

    showMessage(
      "👤 Profile",
      "Your AG PREMIUM profile will be available here."
    );

    setActiveNav(3);
    return;
  }


  if (section === "rewards") {

    showMessage(
      "🎁 Rewards",
      "Daily rewards and reward history will be available here."
    );

    setActiveNav(2);
    return;
  }


  if (section === "tasks") {

    showMessage(
      "🎯 Tasks",
      "Available tasks will appear here."
    );

    setActiveNav(1);
    return;
  }


  if (section === "premium") {

    showMessage(
      "💎 AG PREMIUM",
      "Premium features and plans will be connected here."
    );

    return;
  }
}


// ==========================================
// NAV ACTIVE STATE
// ==========================================

function setActiveNav(index) {

  const navItems =
    document.querySelectorAll(".nav-item");

  navItems.forEach((item, i) => {

    if (i === index) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }

  });
}


// ==========================================
// MESSAGE SYSTEM
// ==========================================

function showMessage(title, message) {

  // Telegram popup
  if (tg?.showPopup) {

    tg.showPopup({
      title: title,
      message: message,
      buttons: [
        {
          type: "ok",
          text: "OK"
        }
      ]
    });

    return;
  }


  // Browser fallback
  alert(`${title}\n\n${message}`);
}


// ==========================================
// TELEGRAM MAIN BUTTON
// ==========================================

function hideTelegramMainButton() {

  if (tg?.MainButton) {
    tg.MainButton.hide();
  }

}


// ==========================================
// STARTUP
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  loadTelegramUser();

  hideTelegramMainButton();

  console.log("AG PREMIUM Mini App loaded successfully.");

});


// ==========================================
// PREVENT ACCIDENTAL DOUBLE TAP
// ==========================================

let lastClick = 0;

document.addEventListener("click", (event) => {

  const now = Date.now();

  if (now - lastClick < 150) {
    event.preventDefault();
  }

  lastClick = now;

});
