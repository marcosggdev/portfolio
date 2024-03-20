window.addEventListener('load', () => {

    const header = document.getElementById('header');
    const imagePaths = [];
    for (let i = 0; i < 6; i++) {
        imagePaths.push(`./img/headerCarousel/${i}.jpg`);
    }
    
    //image already set by default
    setTimeout(() => {carousel(header, imagePaths)}, 5000);
});

//puts image and sets timeout to put another one recursively 5s later
function carousel (container, imagePaths, i = 0) {
    container.style.background = `url('${imagePaths[i]}')`;
    setTimeout(() => {
        if (i + 1 < imagePaths.length) {
            carousel(container, imagePaths, i + 1)
        } else {
            carousel(container, imagePaths);
        }
    }, 5000);
}