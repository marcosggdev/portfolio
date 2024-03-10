window.addEventListener('load', () => {

    var projects_right_menu = document.getElementById('projects_right_menu');
    var left_arrow_container = document.getElementById('left_arrow_container');
    var header = document.getElementById('projects_header');
    var arrow = left_arrow_container.querySelector('img');

    left_arrow_container.addEventListener('mouseenter', () => {
        arrow.classList.add('bounce');
    });
    left_arrow_container.addEventListener('mouseleave', () => {
        arrow.classList.remove('bounce');
    });
    left_arrow_container.addEventListener('click', () => {
        projects_right_menu.classList.toggle('unfolded');
        header.classList.toggle('unfolded');
    });
});