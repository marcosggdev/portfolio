window.addEventListener('load', () => {
    let stack = document.querySelectorAll('.stack ul li');
    for (let i = 0; i < stack.length; i++) {
        stack[i].addEventListener('mouseenter', () => {
            stack[i].querySelector('div').classList.add('rotateY');
        });
        stack[i].addEventListener('mouseleave', () => {
            stack[i].querySelector('div').classList.remove('rotateY');
        });
    }
});