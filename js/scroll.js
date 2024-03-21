window.addEventListener('load', () => {
    addNavScrollListener();
});

/**
 * manages nav position between relative and fixed values depending on its visibility on the screen
 */
function addNavScrollListener () {

    var lastScrollY = 0;
    var down = true;
    var nav = document.querySelector('nav');
    var navTop = window.scrollY + nav.getBoundingClientRect().top;

    //reload nav state in case window reload
    if (nav.getBoundingClientRect().top < window.scrollY) {
        setNavStyleFixed(nav);
    }

    window.addEventListener('scroll', (e) => {

        const delta = window.scrollY - lastScrollY;
        down = (delta > 0); 
        lastScrollY = window.scrollY;
        
        if (down) {
            //moving down => check if nav dissapeared from top (negative)
            if (lastScrollY > navTop) {
                //already dissapeared
                setNavStyleFixed(nav);
            }
        } else {
            //moving up => check if top already on screen (positive)
            if (lastScrollY < navTop) {
                setNavStyleRelative(nav);
            }
        }

    });
}

function setNavStyleFixed (nav) {
    nav.classList.add('fixed');
}

function setNavStyleRelative (nav) {
    nav.classList.remove('fixed');
}