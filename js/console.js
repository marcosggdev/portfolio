window.addEventListener('load', () => {

    const console = document.getElementById('console');
    let prompt = document.createElement('span');
    prompt.textContent = 'arrow_right';
    prompt.className = "material-symbols-outlined";

    let lines = [
        'Echo \"Hello world!\"',
        'Echo \"Welcome to my portfolio\"',
        'Echo \"Here you can see general information about my web development profile\"',
        'Echo \"Education | Projects | Contact...\"'
    ];

    controller(console, lines);

});

function createLineNode () {

    let line = document.createElement('li');

    let prompt = document.createElement('div');
    prompt.className = "prompt";

    let arrow = document.createElement('span');
    arrow.textContent = 'arrow_right';
    arrow.className = "material-symbols-outlined";
    prompt.appendChild(arrow);

    let header = document.createElement('span');
    header.textContent = "PC-1A3F3 ~ Marcos | ";
    prompt.appendChild(header);

    let content = document.createElement('span');
    content.className = "content";
    line.appendChild(prompt);
    line.appendChild(content);
    return line;

}

function controller (console, lines) {
    let i = 0;
    animateLine(console, lines[i++]);
    const addLines = setInterval(() => { 
        if (i < lines.length) {
            animateLine(console, lines[i++]);
        } else {
            clearInterval(addLines);
        }
     }, 2000);
}

//animate in 2s
function animateLine (console, line) {

    let lineNode = createLineNode();
    console.appendChild(lineNode);

    for (let i = 0; i < line.length; i++) {
        setTimeout(() => {
            lineNode.querySelector('.content').textContent += line[i];      
        }, i*2000/line.length);
    }
}