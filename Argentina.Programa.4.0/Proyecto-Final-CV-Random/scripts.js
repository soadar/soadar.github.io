function traerPerfil() {
    const api = 'https://randomuser.me/api/';
    return fetch(api)
        .then((resp) => {
            return resp.json();
        });
}

const botonRandom = document.getElementById("play")
botonRandom.addEventListener('click', function () {
    traerPerfil().then((result) => {

        // console.log(result.results[0]);
        let {
            name,
            email,
            location,
            picture,
            phone
        } = result.results[0];

        document.getElementById("image").src = picture.medium;
        let fullname = name.title + " " + name.first + " " + name.last;
        document.getElementById("fullName").innerHTML = fullname
        document.getElementById("list-nom").innerHTML = fullname
        document.getElementById("list-tel").innerHTML = phone
        let fullDire = location.street.name + " " + location.street.number + " - " + location.city
        document.getElementById("list-dire").innerHTML = fullDire
        document.getElementById("list-email").innerHTML = email

        let barritas = document.querySelectorAll('.progress-bar');
        barritas.forEach(element => {
            let random = Math.floor(Math.random() * 100)
            element.style.width = random + "%"
        })

        let circulitos = document.querySelectorAll('.habilities li i')
        circulitos.forEach(element => element.remove())

        let hab = document.querySelectorAll('.habilities li')
        hab.forEach(element => {
            let random = Math.floor(Math.random() * 5)
            addCircle(element, random, 'regular')
            let newRandom = 5 - random
            if (newRandom > 0) {
                addCircle(element, newRandom, 'solid')
            }
        });
    });
});

function addCircle(element, contador, dibujo) {

    for (var i = 0; i < contador; i++) {
        const newElement = document.createElement("i");
        newElement.classList = "fa-" + dibujo + " fa-circle"
        element.appendChild(newElement);
    }
}

window.onload = function () {
    document.getElementById("play").click();
};