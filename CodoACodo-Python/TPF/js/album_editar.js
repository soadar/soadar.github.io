//RECIBE 
// id=1&nombre=MICROONDAS&precio=50000&stock=10&imagen=https://picsum.photos/200/300?grayscale

console.log(location.search)     // lee los argumentos pasados a este formulario
var args = location.search.substr(1).split('&');
//separa el string por los “&” creando una lista
// [“id=3” , “nombre=’tv50’” , ”precio=1200”,”stock=20”]
console.log(args)

var parts = []
for (let i = 0; i < args.length; ++i) {
    parts[i] = args[i].split('=');
}
console.log(parts)

// [[“id",3] , [“name",’BOY’]]
//decodeUriComponent elimina los caracteres especiales que recibe en la URL 
document.getElementById("id").value = decodeURIComponent(parts[0][1])
document.getElementById("name").value = decodeURIComponent(parts[1][1])
document.getElementById("released_date").value = decodeURIComponent(parts[2][1])
document.getElementById("produced_by").value = decodeURIComponent(parts[3][1])
document.getElementById("label").value = decodeURIComponent(parts[4][1])
document.getElementById("recorded_at").value = decodeURIComponent(parts[5][1])
document.getElementById("tour").value = decodeURIComponent(parts[6][1])
document.getElementById("imagen").value = decodeURIComponent(parts[7][1])

function modificar() {
    let id = document.getElementById("id").value
    let n = document.getElementById("name").value
    let r = document.getElementById("released_date").value
    let p = document.getElementById("produced_by").value
    let l = document.getElementById("label").value
    let a = document.getElementById("recorded_at").value
    let t = document.getElementById("tour").value
    let i = document.getElementById("imagen").value

    let album = {
        name: n,
        released_date: r,
        produced_by: p,
        label: l,
        recorded_at: a,
        tour: t,
        imagen: i
    }

    let url = "https://soadar.pythonanywhere.com/albums/" + id

    var options = {
        body: JSON.stringify(album),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow'
    }

    fetch(url, options)
        .then(function () {
            console.log("modificado")
            alert("Registro modificado")
            window.location.href = "./albums.html";
            //NUEVO,  si les da error el fetch  comentar esta linea que puede dar error  
        })
        .catch(err => {
            //this.errored = true
            console.error(err);
            alert("Error al Modificar")
        })
}