console.log('gola');
//dom
// devuelve el primer elemento
/*
let tabla = document.querySelector(".tabla");

let links = document.querySelectorAll("a");

links.forEach(function (link) {
    console.log(link);

})
*/
/* click en las celdas
let celdas = document.querySelectorAll("td");
celdas.forEach(function (td) {
    td.addEventListener('click', function () {
        //console.log("click en " + td.textContent);
        console.log(this);
    })
})
*/
// clase 8 y 9 falta
let links = document.querySelectorAll(".volver");

links.forEach(function (link) {
    link.addEventListener('click', function (evento) {
        evento.preventDefault(); //previene evento click
        let contenido = document.querySelector('.contenido');
        contenido.classList.remove("animate__bounceInRight")
        contenido.classList.remove("animate__animated")
        contenido.classList.add("animate__bounceInLeft")
        contenido.classList.add("animate__animated")

        setTimeout(() => {
            location.href = "./CF-Pizzeria/";

        }, 600);
        return false
    })
})
/*
let iconos = document.querySelectorAll("i");
iconos.forEach(function (icono) {
    icono.classList.remove("fa-pizza-slice");
    icono.classList.add("fa-hotdog");
})
*/
