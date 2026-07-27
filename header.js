*==================================================
HEADER JAVASCRIPT
Code Future Academy AI
==================================================*/

"use strict";

// PART 1 - DOM ELEMENTS
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileOverlay = document.getElementById("mobileOverlay");

const desktopDropdown = document.querySelector(".nav-dropdown");
const desktopDropdownBtn = document.querySelector(".nav-dropdown-btn");
const desktopDropdownMenu = document.getElementById("dashboardDropdown");

const mobileDropdown = document.querySelector(".mobile-dropdown");
const mobileDropdownBtn = document.querySelector(".mobile-dropdown-btn");
const mobileDropdownMenu = document.getElementById("mobileDashboardDropdown");

const body = document.body;

// PART 2 - MOBILE MENU FUNCTIONS
function openMobileMenu() {
    mobileNav.classList.add("active");
    mobileOverlay.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
    body.classList.add("menu-open");
}

function closeMobileMenu() {
    mobileNav.classList.remove("active");
    mobileOverlay.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    body.classList.remove("menu-open");
}

function toggleMobileMenu() {
    if (mobileNav.classList.contains("active")) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

// PART 3 - MOBILE MENU EVENTS
if (menuToggle) {
    menuToggle.addEventListener("click", toggleMobileMenu);
}

if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMobileMenu);
}

const mobileLinks = document.querySelectorAll(".mobile-nav a");
mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
        closeMobileMenu();
    });
});

// PART 4 - DESKTOP DROPDOWN
if (desktopDropdownBtn) {
    desktopDropdownBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const expanded = desktopDropdownBtn.getAttribute("aria-expanded") === "true";
        desktopDropdownBtn.setAttribute("aria-expanded", !expanded);
        desktopDropdown.classList.toggle("active");
    });
}

document.addEventListener("click", (event) => {
    if (desktopDropdown && !desktopDropdown.contains(event.target)) {
        desktopDropdown.classList.remove("active");
        if (desktopDropdownBtn) {
            desktopDropdownBtn.setAttribute("aria-expanded", "false");
        }
    }
});

// PART 5 - MOBILE DROPDOWN
if (mobileDropdownBtn) {
    mobileDropdownBtn.addEventListener("click", () => {
        const expanded = mobileDropdownBtn.getAttribute("aria-expanded") === "true";
        mobileDropdownBtn.setAttribute("aria-expanded", String(!expanded));
        mobileDropdown.classList.toggle("active");
    });
}

// PART 6 - ESC + RESIZE
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
        if (desktopDropdown) desktopDropdown.classList.remove("active");
        if (desktopDropdownBtn) desktopDropdownBtn.setAttribute("aria-expanded", "false");
        if (mobileDropdown) mobileDropdown.classList.remove("active");
        if (mobileDropdownBtn) mobileDropdownBtn.setAttribute("aria-expanded", "false");
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
        closeMobileMenu();
        if (mobileDropdown) mobileDropdown.classList.remove("active");
        if (mobileDropdownBtn) mobileDropdownBtn.setAttribute("aria-expanded", "false");
    }
});

// PART 7 - INITIALIZATION
if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
if (mobileNav) mobileNav.setAttribute("aria-hidden", "true");
if (desktopDropdownBtn) desktopDropdownBtn.setAttribute("aria-expanded", "false");
if (mobileDropdownBtn) mobileDropdownBtn.setAttribute("aria-expanded", "false");

mobileNav?.classList.remove("active");
mobileOverlay?.classList.remove("active");
desktopDropdown?.classList.remove("active");
mobileDropdown?.classList.remove("active");
body.classList.remove("menu-open");

console.log("✅ Code Future Academy AI Header Loaded Successfully");
