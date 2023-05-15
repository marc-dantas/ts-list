"use strict";
// const taskName = document.getElementById("taskName");
var doneButton = document.getElementById("doneButton");
var list = document.getElementById("tasks");
var data = [];
function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(data));
}
function createTask(text) {
    var d = document.createElement("div");
    d.setAttribute("class", "notification is-white p-8");
    d.onclick = function () { return removeTask(text); };
    d.setAttribute("id", "taskElement");
    d.appendChild(createText(text));
    return d;
}
function createText(value) {
    return document.createTextNode(value);
}
function createElement(tag, attrs, child) {
    var e = document.createElement(tag);
    for (var attr in attrs) {
        e.setAttribute(attr, attrs[attr]);
    }
    e.appendChild(child);
    return e;
}
function removeTask(task) {
    data.splice(data.indexOf(task), 1);
    updateLocalStorage();
    render();
}
function render() {
    list.innerHTML = "";
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var txt = data_1[_i];
        list.appendChild(createTask(txt));
    }
    if (data.length === 0)
        list.appendChild(createElement("i", {}, createText("Your tasks will be shown here. Click on any task to remove it.")));
}
function main() {
    var storedTasks = localStorage.getItem('tasks');
    if (storedTasks !== null) {
        data = JSON.parse(storedTasks);
    }
    doneButton.addEventListener("click", function (_event) {
        var text = document.getElementById("task");
        if (text.value === "") {
            alert("You can't add an empty task to the list.");
            return;
        }
        data.push(text.value);
        text.value = "";
        updateLocalStorage();
        render();
    });
    render();
}
main();
