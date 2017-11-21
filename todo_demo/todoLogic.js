const input = document.querySelector('#input')
const submit = document.querySelector('#submit');

let todos = [];
let counter = 0;
submit.addEventListener('click', event => {
    // grab text in input
    let currentTodo = document.getElementById('input').value;
    if(currentTodo){
    // create new list item to put the text in
    let node = document.createElement('li')
    todos[counter] = document.createTextNode(currentTodo)
    node.className = 'todo-item';
    node.setAttribute("id", counter)
    node.appendChild(todos[counter])
    document.getElementById('list-section').appendChild(node)
    counter++;
    }
})

