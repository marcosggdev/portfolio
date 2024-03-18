/*adds a scrolls listener that updates the margin left of the element depending on the scroll in the page*/
window.addEventListener('load', () => {

    var elements = document.querySelectorAll('section#education li.education');
    var lastScrollY = 0;
    
    window.addEventListener('scroll', () => {
        updateStates(elements, lastScrollY);
        lastScrollY = window.scrollY;
    });

});

/**
 * Updates elements state depending on window scroll
 */
function updateStates (elements, lastScrollY) {

    for (let i = 0; i < elements.length; i++) {
        const top = elements[i].getBoundingClientRect().top;
        const offset = window.innerHeight / 2;

        if (window.scrollY - lastScrollY > 0) {
            //down
            if (top - offset < 0) {
                elements[i].classList.add('animation-scroll');
            }
        }

    }

}