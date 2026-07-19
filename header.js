/*==================================================
HEADER JAVASCRIPT
Code Future Academy AI
Part 1 - DOM Elements
==================================================*/

"use strict";

/*=========================================
MAIN ELEMENTS
=========================================*/

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileOverlay = document.getElementById("mobileOverlay");

/*=========================================
DESKTOP DROPDOWN
=========================================*/

const desktopDropdown = document.querySelector(".nav-dropdown");
const desktopDropdownBtn = document.querySelector(".nav-dropdown-btn");
const desktopDropdownMenu = document.getElementById("dashboardDropdown");

/*=========================================
MOBILE DROPDOWN
=========================================*/

const mobileDropdown = document.querySelector(".mobile-dropdown");
const mobileDropdownBtn = document.querySelector(".mobile-dropdown-btn");
const mobileDropdownMenu = document.getElementById("mobileDashboardDropdown");

/*=========================================
BODY
=========================================*/

const body = document.body;

/*==================================================
Part 2 - Mobile Menu Functions
==================================================*/

/*=========================================
OPEN MOBILE MENU
=========================================*/

function openMobileMenu() {

    mobileNav.classList.add("active");
    mobileOverlay.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");

    body.classList.add("menu-open");

}

/*=========================================
CLOSE MOBILE MENU
=========================================*/

function closeMobileMenu() {

    mobileNav.classList.remove("active");
    mobileOverlay.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");

    body.classList.remove("menu-open");

}

/*=========================================
TOGGLE MOBILE MENU
=========================================*/

function toggleMobileMenu() {

    if (mobileNav.classList.contains("active")) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

}

/*==================================================
Part 3 - Mobile Menu Events
==================================================*/

/*=========================================
HAMBURGER BUTTON
=========================================*/

if (menuToggle) {

    menuToggle.addEventListener("click", toggleMobileMenu);

}

/*=========================================
OVERLAY
=========================================*/

if (mobileOverlay) {

    mobileOverlay.addEventListener("click", closeMobileMenu);

}

/*=========================================
CLOSE MENU WHEN LINK IS CLICKED
=========================================*/

const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});

/*==================================================
Part 4 - Desktop Dashboard Dropdown
==================================================*/

/*=========================================
DESKTOP DROPDOWN TOGGLE
=========================================*/

if (desktopDropdownBtn) {

    desktopDropdownBtn.addEventListener("click", (event) => {

        event.stopPropagation();

        const expanded =
            desktopDropdownBtn.getAttribute("aria-expanded") === "true";

        desktopDropdownBtn.setAttribute(
            "aria-expanded",
            !expanded
        );

        desktopDropdown.classList.toggle("active");

    });

}

/*=========================================
CLOSE DROPDOWN ON OUTSIDE CLICK
=========================================*/

document.addEventListener("click", (event) => {

    if (
        desktopDropdown &&
        !desktopDropdown.contains(event.target)
    ) {

        desktopDropdown.classList.remove("active");

        if (desktopDropdownBtn) {

            desktopDropdownBtn.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

});

/*==================================================
Part 5 - Mobile Dashboard Dropdown
==================================================*/

/*=========================================
MOBILE DROPDOWN TOGGLE
=========================================*/

if (mobileDropdownBtn) {

    mobileDropdownBtn.addEventListener("click", () => {

        const expanded =
            mobileDropdownBtn.getAttribute("aria-expanded") === "true";

        mobileDropdownBtn.setAttribute(
            "aria-expanded",
            String(!expanded)
        );

        mobileDropdown.classList.toggle("active");

    });

}

/*==================================================
Part 6 - Professional Closing Logic
==================================================*/

/*=========================================
ESC KEY
=========================================*/

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeMobileMenu();

        if (desktopDropdown) {
            desktopDropdown.classList.remove("active");
        }

        if (desktopDropdownBtn) {
            desktopDropdownBtn.setAttribute("aria-expanded", "false");
        }

        if (mobileDropdown) {
            mobileDropdown.classList.remove("active");
        }

        if (mobileDropdownBtn) {
            mobileDropdownBtn.setAttribute("aria-expanded", "false");
        }

    }

});

/*=========================================
WINDOW RESIZE
=========================================*/

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        closeMobileMenu();

        if (mobileDropdown) {
            mobileDropdown.classList.remove("active");
        }

        if (mobileDropdownBtn) {
            mobileDropdownBtn.setAttribute("aria-expanded", "false");
        }

    }

});

/*==================================================
Part 7 - Final Initialization
==================================================*/

/*=========================================
INITIAL ACCESSIBILITY STATE
=========================================*/

if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
}

if (mobileNav) {
    mobileNav.setAttribute("aria-hidden", "true");
}

if (desktopDropdownBtn) {
    desktopDropdownBtn.setAttribute("aria-expanded", "false");
}

if (mobileDropdownBtn) {
    mobileDropdownBtn.setAttribute("aria-expanded", "false");
}

/*=========================================
REMOVE ACTIVE CLASSES ON LOAD
=========================================*/

mobileNav?.classList.remove("active");
mobileOverlay?.classList.remove("active");
desktopDropdown?.classList.remove("active");
mobileDropdown?.classList.remove("active");

body.classList.remove("menu-open");

/*=========================================
HEADER JS READY
=========================================*/

console.log("✅ Code Future Academy AI Header Loaded Successfully");
