let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const form = document.getElementById("form");

if (localStorage.getItem("tasks")) {

    tasks.map((task) => {
        crearTarea(task);
    });
    actualizarInfo()
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let tarea = document.getElementById("input").value;
    if (tarea != "") {

        const task = {
            id: new Date().getTime(),
            tarea: e.target.input.value,
            tachado: ""
        }
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        crearTarea(task);
    }
    e.target.input.focus();
});

function crearTarea(tarea) {
    const li = document.createElement("li");
    li.innerHTML = tarea.tarea;
    li.id = tarea.id;
    li.className = tarea.tachado;
    let lista = document.getElementById("lista");
    const button = document.createElement("button");
    button.innerHTML = "x";

    button.onclick = () => {
        button.parentElement.remove();
        tasks = tasks.filter((task) => task.id !== parseInt(button.parentNode.id));
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    li.appendChild(button);
    lista.appendChild(li);
    form.reset();
}

document.getElementById("lista").addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('tachado');
        const index = tasks.findIndex(task => task.id === parseInt(e.target.id));
        tasks[index].tachado = e.target.className;
    }
    actualizarInfo()
    localStorage.setItem("tasks", JSON.stringify(tasks));
});

//className = "tachado"

function actualizarInfo() {
    let tareasTotal = tasks.length;
    let tareasHechas = document.querySelectorAll(".tachado").length;
    let tareasPendientes = tareasTotal - tareasHechas;

    document.querySelector(".tasks-total span").innerHTML = tareasTotal
    document.querySelector(".tasks-hechas span").innerHTML = tareasHechas;
    document.querySelector(".tasks-pendientes span").innerHTML = tareasPendientes;
}