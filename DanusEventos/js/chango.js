
function crearTarea(listaDelUsuario) {
    renderizarLista(crearTabla(listaDelUsuario), document.getElementById("divLista"));
}

function renderizarLista(lista, contenedor) {
    while (contenedor.hasChildNodes()) {
        contenedor.removeChild(contenedor.firstChild);
    }
    if (lista) contenedor.appendChild(lista);
}

function crearTabla(items) {
    const tabla = document.createElement("table");
    tabla.id = "tablax";
    tabla.classList.add("table", "table-info", "table-striped", "table-bordered");
    tabla.appendChild(crearThead(items[0]));
    tabla.appendChild(crearTbody(items));
    //tabla.setAttribute("style", "border:1px solid black; border-collapse:collapse");

    const tfoot = document.createElement("tfoot");
    const trfoot = document.createElement("tr");
    const tdfoot = document.createElement("td");
    const tdfoot2 = document.createElement("td");
    const btnWp = document.createElement("button");
    btnWp.id = 'pagar'
    btnWp.classList.add("btn", "btn-success")
    btnWp.onclick = () => {
        let productosParaWsp = listaDelUsuario.map((producto) => '* ' + producto.nombre);
        productosConFormatoAmigable = productosParaWsp.join('%0a')
        console.log(productosConFormatoAmigable);
        let a = document.createElement('a');
        a.target = '_blank';
        a.href = 'https://wa.me/5491136825679?text=Me%20interesan%20los%20siguientes%20productos%0a%0a' + ' ' + productosConFormatoAmigable;
        a.click();
    }
    const imgWp = document.createElement("img");
    imgWp.src = 'https://static.whatsapp.net/rsrc.php/v3/yz/r/ujTY9i_Jhs1.png'
    imgWp.setAttribute("width", "32");
    imgWp.setAttribute("height", "32");

    tdfoot.innerHTML = 'Enviar productos por whatsapp';
    btnWp.appendChild(imgWp);
    tdfoot2.appendChild(btnWp);
    trfoot.appendChild(tdfoot);
    trfoot.appendChild(tdfoot2);
    tfoot.appendChild(trfoot);
    tabla.appendChild(tfoot);

    return tabla;
}

function crearThead(item) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
    tr.style.backgroundColor = "purple";

    for (const key in item) {
        if (typeof (item[key]) !== "function") {

            if (key !== "id") {
                const th = document.createElement("th");
                th.textContent = key;
                tr.appendChild(th);
            }
        }
    }
    const th2 = document.createElement("th");
    th2.textContent = "";
    tr.appendChild(th2);
    thead.appendChild(tr);
    return thead;
}

function crearTbody(items) {
    const tbody = document.createElement("tbody");
    items.forEach((item) => {
        const tr = document.createElement("tr");
        for (const key in item) {
            if (typeof (item[key]) !== "function") {
                if (key === "id") {
                    tr.setAttribute("id", item[key]);
                } else {
                    const td = document.createElement("td");
                    td.innerHTML = item[key];
                    tr.appendChild(td);
                }
            }
        }

        const tdBoton = document.createElement("td");
        const button = document.createElement("button");
        button.innerHTML = "x";
        button.classList.add("btn", "btn-danger");
        button.onclick = () => {
            button.parentElement.parentElement.remove();
            console.log(button.parentNode.parentNode.id);
            listaDelUsuario = listaDelUsuario.filter(
                (prod) => prod.id !== parseInt(button.parentNode.parentNode.id)
            );
            localStorage.setItem("lista", JSON.stringify(listaDelUsuario));
        };
        tdBoton.appendChild(button);
        tr.appendChild(tdBoton);
        tbody.appendChild(tr);

    });
    return tbody;
}

let listaDelUsuario = JSON.parse(localStorage.getItem("lista")) || [];

console.log(listaDelUsuario);

if (listaDelUsuario.length !== 0) {
    crearTarea(listaDelUsuario);
}

const btnsComprarProducto = document.querySelectorAll('.btn');

btnsComprarProducto.forEach((btn) => {
    btn.addEventListener('click', function (e) {
        console.log("mmmmm");

        listaProductos.forEach(function (element) {
            let flag = 0;
            if (element.id == e.target.id) {
                console.log(element.nombre);
                listaDelUsuario.forEach(function (element) {
                    if (element.id == e.target.id) {
                        console.log("aca");
                        flag = 1;
                    }
                })
                if (flag === 0) {
                    const producto = {
                        id: element.id,
                        nombre: element.nombre,
                    };
                    listaDelUsuario.push(producto);
                    localStorage.setItem("lista", JSON.stringify(listaDelUsuario));
                    crearTarea(listaDelUsuario);
                    flag = 0
                }
            }
        });
    });
});