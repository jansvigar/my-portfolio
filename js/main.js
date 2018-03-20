var menuIcon = document.querySelector('#menu-icon');
var menuOverlay = document.querySelector('.site-navigation.overlay');
var menuOverlayCloseIcon = document.querySelector('.site-navigation .close-icon');

menuIcon.addEventListener("click", handleMenuOpen);

function handleMenuOpen() {
    menuOverlay.className += ' open';
    menuOverlay.className = menuOverlay.className.replace(/\bhidden\b/g, '');
    menuOverlayCloseIcon.addEventListener("click", handleMenuClose);
}

function handleMenuClose() {
    menuOverlay.className = menuOverlay.className.replace(/\bopen\b/g, '');
}

