/*==================================================
HEADER JAVASCRIPT PRO
Code Future Academy AI
==================================================*/
"use strict";

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const mobileOverlay = document.getElementById("mobileOverlay");

const desktopDropdown = document.querySelector(".nav-dropdown");
const desktopDropdownBtn = document.querySelector(".nav-dropdown-btn");

const mobileDropdown = document.querySelector(".mobile-dropdown");
const mobileDropdownBtn = document.getElementById("mobileDashboardButton");

const body = document.body;

function openMobileMenu() {
    mobileNav.classList.add("active");
    mobileOverlay.classList.add("active");
    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
    body.style.overflow = "hidden";
}

function closeMobileMenu() {
    mobileNav.classList.remove("active");
    mobileOverlay.classList.remove("active");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    body.style.overflow = "";
    if(mobileDropdown) mobileDropdown.classList.remove("active");
    if(mobileDropdownBtn) mobileDropdownBtn.setAttribute("aria-expanded", "false");
}

function toggleMobileMenu() {
    mobileNav.classList.contains("active") ? closeMobileMenu() : openMobileMenu();
}

if (menuToggle) menuToggle.addEventListener("click", toggleMobileMenu);
if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});

if (desktopDropdownBtn) {
    desktopDropdownBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isActive = desktopDropdown.classList.contains("active");
        desktopDropdown.classList.toggle("active");
        desktopDropdownBtn.setAttribute("aria-expanded", String(!isActive));
    });
}

document.addEventListener("click", (event) => {
    if (desktopDropdown && !desktopDropdown.contains(event.target)) {
        desktopDropdown.classList.remove("active");
        desktopDropdownBtn.setAttribute("aria-expanded", "false");
    }
});

if (mobileDropdownBtn) {
    mobileDropdownBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        const isActive = mobileDropdown.classList.contains("active");
        mobileDropdown.classList.toggle("active");
        mobileDropdownBtn.setAttribute("aria-expanded", String(!isActive));
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMobileMenu();
        if (desktopDropdown) {
            desktopDropdown.classList.remove("active");
            desktopDropdownBtn.setAttribute("aria-expanded", "false");
        }
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 992) closeMobileMenu();
});

document.addEventListener("DOMContentLoaded", () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    mobileNav?.setAttribute("aria-hidden", "true");
    desktopDropdownBtn?.setAttribute("aria-expanded", "false");
    mobileDropdownBtn?.setAttribute("aria-expanded", "false");
    console.log("✅ Code Future Academy AI Header PRO Loaded");
});
