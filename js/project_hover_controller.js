window.addEventListener('load', () => {

    var projects = document.querySelectorAll('.project');

    for (let i = 0; i < projects.length; i++) {

        projects[i].addEventListener('mouseenter', () => {
            let content = projects[i].querySelector('.project-content');
            if (content !== null) {
                content.classList.add('unfolded');
            }
        });

        projects[i].addEventListener('mouseleave', () => {
            let content = projects[i].querySelector('.project-content');
            if (content !== null) {
                content.classList.remove('unfolded');
            }
        });

    }
});