export default function createList(arrList) {
    const fragment = new DocumentFragment();

    for (let i = 0; i < arrList.length; i++) {
        const spanEl = document.createElement('span');
        spanEl.innerText = arrList[i].title;
        const liEl = document.createElement('li');
        liEl.appendChild(spanEl);

        const buttonList = document.createElement('button');
        buttonList.innerText = '...';

        const stringWrapper = document.createElement('div');
        stringWrapper.classList.add('string-wrapper');
        stringWrapper.appendChild(liEl);
        stringWrapper.appendChild(buttonList);

        fragment.appendChild(stringWrapper);
    }
    return fragment;
}