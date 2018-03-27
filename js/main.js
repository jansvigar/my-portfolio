var menuIcon = document.querySelector("#menu-icon");
var menuOverlay = document.querySelector(".site-navigation.overlay");
var menuOverlayCloseIcon = document.querySelector(
  ".site-navigation .close-icon"
);

var modalElements = document.querySelectorAll(".modal");

for (var i = 0; i < modalElements.length; i++) {
  var modal = modalElements[i];
  var modalCloseBtn = modal.querySelector(".modal-close-icon");
  var viewDetailBtn = document
    .getElementById(modal.dataset.projectid)
    .querySelector("button");

  (function(modal) {
    viewDetailBtn.addEventListener("click", function() {
      showModal(modal);
    });

    modalCloseBtn.addEventListener("click", function() {
      closeModal(modal);
    });
  })(modal);
}

window.addEventListener("click", function(e) {
  if (e.target.className === "modal open") {
    e.target.className = "modal";
  }
});

menuIcon.addEventListener("click", openMenu);

function showModal(modal) {
  modal.className = "modal open";
}

function closeModal(modal) {
  modal.className = "modal";
}

function openMenu() {
  menuOverlay.className += " open";
  menuOverlay.className = menuOverlay.className.replace(/\bhidden\b/g, "");
  menuOverlayCloseIcon.addEventListener("click", closeMenu);
}

function closeMenu() {
  menuOverlay.className = menuOverlay.className.replace(/\bopen\b/g, "");
}
