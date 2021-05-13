const TodoInput = document.getElementById('todo-text');
const TodoBtn = document.getElementById('todo-btn');
const list = document.getElementById('list');
const done = document.getElementById('done');

function addTodo() {
    const todoText = TodoInput.value
// mark to do item complete
    const doneBtn = document.createElement('button');
    doneBtn.innerText = '\u2713';
    doneBtn.addEventListener('click', function() {
        done.appendChild(this.parentElement);
        this.parentElement.style.textDecoration = 'line-through';
        this.remove();
        li.appendChild(relistBtn);
    })
// delete to do item
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'X';
    removeBtn.addEventListener('click', function() {
        this.parentElement.remove();
    })
// reinstate to do item
    const relistBtn = document.createElement('button');
    relistBtn.innerText = '\u293D';
    relistBtn.addEventListener('click', function() {
        list.appendChild(this.parentElement);
        this.parentElement.style.textDecoration = 'none';
        this.remove();
        li.removeChild(removeBtn);
        li.appendChild(doneBtn);
        li.appendChild(removeBtn);
    })
// add buttons to to do items
    const li = document.createElement('li')
    li.innerText = todoText;
    li.appendChild(doneBtn);
    li.appendChild(removeBtn);
    list.appendChild(li);

    TodoInput.value = '';
}

TodoBtn.addEventListener('click', addTodo);
TodoInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
})