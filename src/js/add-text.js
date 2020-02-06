import createList from './create-list'

export default function addText(event) {
        const text = event.target.parentNode.previousElementSibling.value;
        if (text.length === 0) {
            alert('Please fill in the field');
        } else {
            event.target.parentNode.previousElementSibling.value = '';
            const array = [];
            const obj = {};
            obj.title = text;
            array.push(obj);
    
            const ulEl = document.getElementById('ul-elem');
            ulEl.appendChild(createList(array));
        }
    }
