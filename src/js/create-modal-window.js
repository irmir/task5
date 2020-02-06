
import addText from './add-text.js'

export default function createModalWindow() {
    const background = document.body.appendChild(document.createElement('div'));
    background.classList.add('background');

    const window = background.appendChild(document.createElement('div'));
    window.classList.add('window');
    const input = window.appendChild(document.createElement('input'));

    const buttonBlock = window.appendChild(document.createElement('div'));
    buttonBlock.classList.add('button-block');

    const buttAdd = buttonBlock.appendChild(document.createElement('button'));
    buttAdd.classList.add('add');
    buttAdd.innerText = 'add';

    buttAdd.addEventListener('click', addText);

    const buttCancel = buttonBlock.appendChild(document.createElement('button'));
    buttCancel.classList.add('cancel');
    buttCancel.innerText = 'cancel';

    buttCancel.onclick = function () {
        window.parentNode.parentNode.removeChild(window.parentNode);
        window.parentNode.removeChild(window);
    }
    document.body.appendChild(background);
}