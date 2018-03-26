var menuIcon = document.querySelector('#menu-icon');
var menuOverlay = document.querySelector('.site-navigation.overlay');
var menuOverlayCloseIcon = document.querySelector('.site-navigation .close-icon');
var scrollElements = document.querySelectorAll('.scroll');
var scrollInterval;

var modalElements = document.querySelectorAll('.modal');

for(var i = 0; i < modalElements.length; i++) {
    var modal = modalElements[i];
    var modalCloseBtn = modal.querySelector('.modal-close-icon');
    var viewDetailBtn = document.getElementById(modal.dataset.projectid).querySelector('button');
    
    (function(modal){
        viewDetailBtn.addEventListener('click', function(){
            showModal(modal);
        });

        modalCloseBtn.addEventListener('click', function(){
            closeModal(modal);
        });
    })(modal); 
}

window.addEventListener('click', function(e){
    if(e.target.className === 'modal open'){
        e.target.className = 'modal';
    }
});

menuIcon.addEventListener('click', openMenu);

for(var i = 0; i < scrollElements.length; i++) {
    scrollElements[i].addEventListener('click', handleNavigationItemClick);
}

function showModal(modal) {
    modal.className = 'modal open';
}

function closeModal(modal) {
    modal.className = 'modal';
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
 * inspired by https://gist.github.com/andjosh/6764939.
 */
function scrollTo(to, duration) {
    var to = (to - 90) < 0 ? 0 : (to - 90),
        start = document.documentElement.scrollTop || document.body.scrollTop || 0,
        change = to - start,
        currentTime = 0,
        increment = 20;
        
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, duration);
        document.documentElement.scrollTop = val;
        document.body.scrollTop = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
};
