// Define UI Variables
var form = document.querySelector("#task-form");
var taskInput = document.querySelector("#task");
var taskList = document.querySelector(".collection")
var addTaskBtn = document.querySelector("#addTask");
var inputFilter = document.querySelector("#filter");
var clearTaskBtn = document.querySelector(".clear-tasks");

loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", getTasks);
    addTaskBtn.addEventListener("click", addTasks);
    inputFilter.addEventListener("keyup", filterTasks);
    clearTaskBtn.addEventListener("click", clearTasks);
    taskList.addEventListener("click", deleteItem);
}

function getTasks() {
    let tasks;
    if( localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.forEach(function(task) {
            const li = createTaskElement(task);
            taskList.appendChild(li);
        });
    }
}

function addTasks(e) {
    const li = createTaskElement(taskInput.value);
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = "";
    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if( localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(e) {
    const textVal = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach(function(task) {
        const item = task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(textVal) !== -1) {
            task.style.display = "block";
        } else{
            task.style.display = "none";
        }
    });
}

function clearTasks(e) {
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
}

function deleteItem(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure, you want to delete this item ?")) {
            e.target.parentElement.parentElement.remove();
        }
        removeTaskfromLocalStorage(e.target.parentElement.parentElement);
    }
}

function removeTaskfromLocalStorage(taskItem) {
    let tasks;
    if( localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(text) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(text));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = "<i class='fa fa-remove'></i>";

    li.appendChild(link);
    return li;
}


