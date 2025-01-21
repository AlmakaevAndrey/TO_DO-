const input = document.querySelector("[data-text-field]");
const addTodoBtn = document.querySelector("[data-add-todo-btn]");
const container = document.querySelector("[data-todo-container]");
const clock = document.querySelector("#clock");
const dateElement = document.querySelector("#date");

const todoList = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = (key = "todos") => {
    localStorage.setItem(key, JSON.stringify(todoList));
}

const getCurrentDateTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedTime = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;

    return formattedTime;
};

addTodoBtn.addEventListener("click", () => {
    if (input.value.trim()) {
        let newTodo = {
            text: input.value,
            date: getCurrentDateTime()
        };
        todoList.push(newTodo);
        input.value = "";

        saveToLocalStorage();
        render();
    }
});

const createElement = (tagName, textContent) => {
    const element = document.createElement(tagName);
    element.textContent = textContent;
    return element;
};

const removeTodo = (index) => {
    todoList.splice(index, 1);
    saveToLocalStorage();
    render();
};

const render = () => {
    container.innerHTML = "";

    todoList.forEach((todo, index) => {
        const todoElement = createElement("div", "");

        const todoText = createElement("h2", `${todo.text} (added: ${todo.date})`);

        const removeBtn = createElement("button", "❌");

        removeBtn.addEventListener("click", () => removeTodo(index));

        todoElement.classList.add("todo-item");
        todoText.classList.add("todo-item-text");

        todoElement.append(todoText);
        todoElement.append(removeBtn);

        removeBtn.classList.add("todo-btn");

        container.append(todoElement);
    });
};


render();

function update() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    clock.textContent = `${hours}:${minutes}`;
}

update();
setInterval(update, 60000);

function updateDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    dateElement.textContent = `${day}.${month}.${year}`;
}

updateDate();
setInterval(updateDate, 60000);
