// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener('DOMContentLoaded', getLocal);
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions 
function addToDo(event) {
    // Prevent from form submitting
    event.preventDefault();
    
    // To do div
    const todoDiv = document.createElement("div"); 
    todoDiv.classList.add("todo");
    
    // Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Save to local storage
    saveLocal(todoInput.value);

    // Completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    // Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    // Append to list
    todoList.appendChild(todoDiv);
    
    // Clear input value
    todoInput.value = "";
}

// Deletes and completes list items
function deleteCheck(e) {
    const item = e.target;
    // Delete to do 
    if (item.classList[0] == 'trash-btn') {
        const todo = item.parentElement;
        // Animation
        todo.classList.add("fall");
        removeLocalStorage(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }

    // Complete task
    if (item.classList[0] == 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

// Filters shown tasks based on 
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        if (todo.classList !== undefined) {
            switch(e.target.value) {
                case "all":
                    todo.style.display = "flex";
                    break;
                case "completed":
                    if (todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } 
                    else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!todo.classList.contains("completed")) {
                        todo.style.display = "flex";
                    } 
                    else {
                        todo.style.display = "none";
                    }
                    break;
                default:
                    break;
            }
        }
        return;
    });
}

function saveLocal(todo) {
    let todos;
    // Check if local to do exist
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocal() {
    let todos;
    // Check if local to do exist
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        // To do div
        const todoDiv = document.createElement("div"); 
        todoDiv.classList.add("todo");
        
        // Create list
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // Completed button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class = "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        
        // Trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        
        // Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalStorage(todo){
    let todos;
    // Check if local to do exist
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}