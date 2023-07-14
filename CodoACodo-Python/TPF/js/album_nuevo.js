function guardar() {
    let n = document.getElementById("name").value
    let r = document.getElementById("released_date").value
    let p = document.getElementById("produced_by").value
    let l = document.getElementById("label").value
    let a = document.getElementById("recorded_at").value
    let t = document.getElementById("tour").value
    let i = document.getElementById("imagen").value

    /* {
         "id": 7,
         "imagen": "https://cdn.ontourmedia.io/u2/non_secure/images/20140418/discography/thejoshuatree_cover/600.jpg",
         "label": "Island Records",
         "name": "THE JOSHUA TREE",
         "produced_by": "Daniel Lanois & Brian Eno",
         "recorded_at": "Windmill Lane, Dublin",
         "released_date": "1987-03-09T00:00:00",
         "tour": "Joshua Tree Tour, 1987"
        }
    */

    let album = {
        name: n,
        released_date: r,
        produced_by: p,
        label: l,
        recorded_at: a,
        tour: t,
        imagen: i
    }
    let url = "https://soadar.pythonanywhere.com/albums"
    var options = {
        body: JSON.stringify(album),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            window.location.href = "./albums.html";
            // Handle response we get from the API
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar")
            console.error(err);
        })
}