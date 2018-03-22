var menuIcon = document.querySelector('#menu-icon');
var menuOverlay = document.querySelector('.site-navigation.overlay');
var menuOverlayCloseIcon = document.querySelector('.site-navigation .close-icon');
var scrollElements = document.querySelectorAll('.scroll');
var scrollInterval;

menuIcon.addEventListener('click', openMenu);

for(var i = 0; i < scrollElements.length; i++) {
    scrollElements[i].addEventListener('click', handleNavigationItemClick);
}

function handleNavigationItemClick(e) {
    e.preventDefault();
    var target = e.currentTarget.getAttribute('href') || e.currentTarget.children[0].getAttribute('href');
    if(history.pushState) {
        history.pushState(null, null, target);
    }
    var targetElPos = document.querySelector(target).offsetTop;
    scrollTo(targetElPos, 1000);
    closeMenu();
}

function openMenu() {
    menuOverlay.className += ' open';
    menuOverlay.className = menuOverlay.className.replace(/\bhidden\b/g, '');
    menuOverlayCloseIcon.addEventListener('click', closeMenu);
}

function closeMenu() {
    menuOverlay.className = menuOverlay.className.replace(/\bopen\b/g, '');
}

/**
 * Function to animate smooth scrolling to the destination. 
 * inspired by http://stackoverflow.com/a/24559613/728480.
 */
function scrollTo(destinationInPixel, durationInMs) {
    if(scrollInterval) clearInterval(scrollInterval);

    startingPos =   document.documentElement.scrollTop 
                    || document.body.scrollTop 
                    || 0;

    var headerHeight = document.querySelector('header').offsetHeight;
    destinationInPixel = destinationInPixel - headerHeight < 0 ? 0 : destinationInPixel - headerHeight;

    if(destinationInPixel === startingPos) return;

    var diff = destinationInPixel - startingPos;
    var scrollStep = Math.PI / (durationInMs / 10);
    var count = 0, currentPos;

    scrollInterval = setInterval(function() {
        if((document.documentElement.scrollTop || document.body.scrollTop) != destinationInPixel) {
            count++;
            currentPos = startingPos + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
            document.documentElement.scrollTop = currentPos;
            document.body.scrollTop = currentPos;
        } else {
            clearInterval(scrollInterval);
        }
    }, 10)
}
