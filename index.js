// Tasks
const newTaskInput = document.querySelector(".add-task__input");
const newTaskBtn = document.querySelector(".add-task__btn");
const taskList = document.querySelector(".tasks__list");
const taskCheckbox = document.querySelectorAll(".tasks__item__checkbox");
const taskText = document.querySelectorAll(".tasks__item__label");
const taskBtnDelete = document.querySelectorAll(".tasks__item__btn-delete");
const taskDate = document.querySelector(".tasks__item__date");
const taskTime = document.querySelector(".tasks__item__time");

let todos = [];

if (localStorage.getItem("todos")) {
    const data = JSON.parse(localStorage.getItem("todos"));
    todos.push(...data);
}

const todoItems = todos.map((item) => {
    const li = createTodo(item.id, item.description, item.isCompleted);
    return li;
});

function createDate() {
    return new Date().toLocaleDateString();
}
function createTime() {
    return new Date().toLocaleTimeString().slice(0, -3);
}

function createTodo(id, description, isCompleted) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");
    const date = document.createElement("p");
    const time = document.createElement("p");
    const button = document.createElement("button");

    li.className = isCompleted ? "tasks__item done" : "tasks__item";

    li.append(input, label, date, time, button);
    li.dataset.id = id;

    label.append(description);
    label.className = "tasks__item__label";
    

    input.type = "checkbox";
    input.className = "tasks__item__checkbox";
    input.checked = isCompleted;
    input.dataset.action = "done";
    input.id = `tasks__checkbox-${li.dataset.id}`;

    label.setAttribute("for", input.id);

    date.append(createDate());
    date.className = "tasks__item__date";

    time.append(createTime());
    time.className = "tasks__item__time";

    button.className = "tasks__item__btn-delete";
    button.innerHTML = `
    <svg
    data-action = "remove"
    class="tasks__item__svg-delete"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 16">
    <path
    fill-rule="evenodd"
    d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"
    />
    </svg>
    `;

    return li;
}

taskList.append(...todoItems);

newTaskInput.addEventListener("input", (event) => {
    newTaskBtn.disabled = event.currentTarget.value === "";
});

newTaskBtn.addEventListener("click", () => {
    const todo = {
        id: todos.length >= 1 ? todos.at(-1).id + 1 : 1,
        description: newTaskInput.value,
        isCompleted: false,
    };
    newTaskInput.value = "";
    newTaskBtn.disabled = true;

    const newTodoItem = createTodo(todo.id, todo.description, todo.isCompleted);
    taskList.append(newTodoItem);
    todos.push(todo);

    const jsonTodos = JSON.stringify(todos);
    localStorage.setItem("todos", jsonTodos);
});

taskList.addEventListener("click", (event) => {
    switch (event.target.dataset.action) {
        case "remove": {
            const li = event.target.closest(".tasks__item");
            li.remove();
            const index = todos.findIndex((todo) => todo.id === +li.dataset.id);
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            break;
        }
        case "done": {
            const li = event.target.closest(".tasks__item");
            li.classList.toggle("done");
            const todo = todos.find((todo) => todo.id === +li.dataset.id);
            todo.isCompleted = !todo.isCompleted;
            localStorage.setItem("todos", JSON.stringify(todos));
            break;
        }
        default:
            break;
    }
});

// INFO date

const infoTime = document.querySelector(".header__time");
const infoWeekDay = document.querySelector(".info__date__week-day");
const infoMonth = document.querySelector(".info__date__month");
const infoDay = document.querySelector(".info__date__num");

function createManeTime() {
    return new Date().toLocaleTimeString();
}
setInterval(() => (infoTime.innerHTML = createManeTime()), 1000);

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
];
function createWeekDay() {
    let dayNum = new Date().getDay();
    return days[dayNum - 1];
}
infoWeekDay.append(createWeekDay());

const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function createMonth() {
    let monthNum = new Date().getMonth();
    return monthes[monthNum];
}
infoMonth.append(createMonth());

function createDate() {
    return new Date().getDate();
}
infoDay.append(createDate());