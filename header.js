const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileDropdownBtn = document.getElementById('mobileDashboardButton');
const mobileDropdownMenu = document.getElementById('mobileDashboardDropdown');

if(menuToggle) {
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  mobileNav.classList.toggle('active');
  mobileOverlay.classList.toggle('active');
});

mobileOverlay.addEventListener('click', () => {
  menuToggle.classList.remove('active');
  mobileNav.classList.remove('active');
  mobileOverlay.classList.remove('active');
});

mobileDropdownBtn.addEventListener('click', () => {
  mobileDropdownMenu.classList.toggle('active');
});
}
