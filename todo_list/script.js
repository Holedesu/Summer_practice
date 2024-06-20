document.addEventListener('DOMContentLoaded', () => {
    const MAX_LENGTH = 100;
    const newTodoInput = document.getElementById('new-todo');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const errorMessage = document.getElementById('error-message');

    const addTodo = () => {
        const newTodoText = newTodoInput.value.trim();
        if (newTodoText.length > MAX_LENGTH) {
            errorMessage.textContent = `Task cannot be longer than ${MAX_LENGTH} characters.`;
        } else if (newTodoText.length === 0) {
            errorMessage.textContent = 'Task cannot be empty.';
        } else {
            const todoItem = document.createElement('li');
            todoItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            todoItem.textContent = newTodoText;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = (e) => {
                e.stopPropagation();
                todoList.removeChild(todoItem);
            };

            todoItem.appendChild(deleteButton);
            todoItem.onclick = () => {
                todoItem.classList.toggle('completed');
            };

            todoList.appendChild(todoItem);
            newTodoInput.value = '';
            errorMessage.textContent = '';
        }
    };

    addTodoButton.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
});
