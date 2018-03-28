var body = document.querySelector("body");
var menuIcon = document.querySelector("#menu-icon");
var menuOverlay = document.querySelector(".site-navigation.overlay");
var menuOverlayLinks = document.querySelectorAll(".site-navigation.overlay > ul > li > a");
var menuOverlayCloseIcon = document.querySelector(
  ".site-navigation .close-icon"
);
var lastFocus;

for(var i = 0; i < menuOverlayLinks.length; i++) {
    var link = menuOverlayLinks[i];
    link.addEventListener("click", function() {
        closeMenu();
    });
}

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
    closeModal(e.target);
  }
});

document.addEventListener("keydown", function(e) {
    if(!e.keyCode || e.keyCode === 27) {
        var openedModal = e.currentTarget.querySelector(".modal.open");
        if(openedModal) closeModal(openedModal);
        var openedMenu = e.currentTarget.querySelector(".site-navigation.overlay.open");
        if(openedMenu) closeMenu();
    }
});

menuIcon.addEventListener("click", openMenu);

menuIcon.addEventListener("keyup", function(e) {
    e.preventDefault();
    if(!e.keyCode || e.keyCode === 13) {
        menuIcon.click();
    }
})

menuOverlayCloseIcon.addEventListener("keyup", function(e) {
    e.preventDefault();
    if(!e.keyCode || e.keyCode === 13) {
        closeMenu();
    }
})

function showModal(modal) {
  modal.className = "modal open";
  lastFocus = document.activeElement;
  modal.querySelector(".modal-content").focus();
  body.className = "noscroll";
  body.addEventListener("touchmove", function(e) {
        e.preventDefault();
  });
}

function closeModal(modal) {
  modal.className = "modal";
  body.className = "";
  body.removeEventListener("touchmove", function(e) {
    e.preventDefault();
  });
  lastFocus.focus();
}

function openMenu() {
  menuOverlay.className += " open";
  menuOverlay.className = menuOverlay.className.replace(/\bhidden\b/g, "");
  body.className = "noscroll";
  menuOverlayCloseIcon.addEventListener("click", closeMenu);
  body.addEventListener("touchmove", function(e) {
    e.preventDefault();
});
}

function closeMenu() {
  menuOverlay.className = menuOverlay.className.replace(/\bopen\b/g, "");
  body.className = "";
  body.removeEventListener("touchmove", function(e) {
    e.preventDefault();
  });
}
