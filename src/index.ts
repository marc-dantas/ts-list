// const taskName = document.getElementById("taskName");

const doneButton = document.getElementById("doneButton") as HTMLInputElement;
const list = document.getElementById("tasks") as HTMLElement;

let data: string[] = [];

function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(data));
}

function createTask(text: string): HTMLDivElement {
    const d = document.createElement("div");
    d.setAttribute("class", "notification is-white p-8");
    d.onclick = () => removeTask(text);
    d.setAttribute("id", "taskElement");
    d.appendChild(createText(text));
    return d;
}

function createText(value: string): Text {
    return document.createTextNode(value);
}

function createElement(tag: string, attrs: { [key: string]: string }, child: HTMLDivElement | Text): HTMLElement {
    const e = document.createElement(tag);
    for (const attr in attrs) {
        e.setAttribute(attr, attrs[attr]);
    }
    e.appendChild(child);
    return e;
}

function removeTask(task: string) {
    data.splice(data.indexOf(task), 1);
    updateLocalStorage();
    render();
}

function render() {
    list.innerHTML = "";
    for (const txt of data) {
        list.appendChild(
            createTask(txt)
        );
    }
    if (data.length === 0)
        list.appendChild(createElement("i", {},
            createText("Your tasks will be shown here. Click on any task to remove it.")
        ));
}

function main() {
    let storedTasks = localStorage.getItem('tasks');
    if (storedTasks !== null) {
        data = JSON.parse(storedTasks);
    }
    doneButton.addEventListener("click", (_event) => {
        const text = document.getElementById("task") as HTMLInputElement;
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
