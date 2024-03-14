/*adds a scrolls listener that updates the margin left of the element depending on the scroll in the page*/
function addRightScrollAnimation (element) {
    window.addEventListener('scroll', () => {

    });
}

window.addEventListener('load', () => {

    var lastScrollY = 0;
    var elements = document.querySelectorAll('section#education li.education');

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        updatePositions(elements, lastScrollY);
    });

});

function updatePositions (elements, lastScrollY) {
    //0 in the middle of the element. 100% when element dissapears
    
}