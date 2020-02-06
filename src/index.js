import './styles/style.css'
import createList from './js/create-list'
import createModalWindow from './js/create-modal-window'

async function getList() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const list = await response.json();
    return list;
}

(async function () {

    const ulMenu = document.body.appendChild(document.createElement('ul'));
    ulMenu.style.display = 'none';
    ulMenu.classList.add('menu');
    const ulEl = document.createElement('ul');
    ulEl.setAttribute('id', 'ul-elem');

    const list = await getList();
    createHtml(list);

    document.getElementById('butt-elem').addEventListener('click', createModalWindow);
    ulEl.addEventListener('click', showMenu);

    function createHtml(arrList) {
        const wrapper = document.body.appendChild(document.createElement('div'));
        wrapper.classList.add('wrapper');
        const buttonEl = wrapper.appendChild(document.createElement('button'));
        buttonEl.setAttribute('id', 'butt-elem');
        buttonEl.innerText = 'add';
        buttonEl.classList.add('add')

        wrapper.appendChild(ulEl);

        ulEl.appendChild(createList(arrList));

        createMenu();
    }

    function createMenu() {
        const options = [];
        const optionNames = ['change', 'delete', 'save'];
        optionNames.forEach(item => {
            const option = document.createElement('li');
            const innerButt = option.appendChild(document.createElement('button'));
            innerButt.classList.add(item);
            if (innerButt.className === 'save') {
                innerButt.disabled = true;
            }
            innerButt.innerText = item;
            options.push(option);
        })

        ulMenu.append(...options);
        document.body.appendChild(ulMenu);
    }

    function showMenu(event) {
        const target = event.target;

        if (event.target.tagName === 'BUTTON') {
            if (ulMenu.style.display === 'none') {
                const coord = target.getBoundingClientRect();
                ulMenu.style.cssText = `display:block; top: ${coord.bottom}px; left: ${coord.left}px`;

            } else {
                ulMenu.style.cssText = `display:none`;
            }

            const inputEl = document.createElement('input');

            ulMenu.onclick = function doChangeOrSaveOrDelete(event) {
                if (event.target.className === 'change') {
                    inputEl.value = target.previousElementSibling.innerText;
                    const coord = target.previousElementSibling.getBoundingClientRect();
                    inputEl.style.width = `${coord.width}px`;
                    const divEl = target.previousElementSibling.parentNode;
                    divEl.insertBefore(inputEl, target);
                    target.parentNode.firstElementChild.parentNode.removeChild(target.parentNode.firstElementChild);


                    inputEl.focus();
                    ulMenu.lastElementChild.firstElementChild.disabled = false;
                    event.target.disabled = true;
                    event.target.parentNode.nextElementSibling.firstElementChild.disabled = true

                }
                if (event.target.className === 'save') {
                    const liEl = document.createElement('li');
                    const spanEl = liEl.appendChild(document.createElement('span'));
                    spanEl.innerText = inputEl.value;
                    liEl.style.width = "auto";

                    const divEl = target.previousElementSibling.parentNode;
                    divEl.insertBefore(liEl, target);
                    target.parentNode.firstElementChild.parentNode.removeChild(target.parentNode.firstElementChild);
                    ulMenu.style.display = "none";
                    event.target.disabled = true;
                    ulMenu.firstElementChild.firstElementChild.disabled = false;
                    ulMenu.firstElementChild.nextElementSibling.firstElementChild.disabled = false;


                }
                if (event.target.className === 'delete') {
                    const liEl = target.previousElementSibling;
                    liEl.parentNode.parentNode.removeChild(liEl.parentNode);
                    ulMenu.style.display = "none";
                }

            }
        }
    }
}
)();
