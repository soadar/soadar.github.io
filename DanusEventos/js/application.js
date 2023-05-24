$(function () {

    let navbar = `
    <nav class="navbar navbar-expand-sm bg-body-tertiary bg-dark " data-bs-theme="dark">
        <div class="container-fluid">
            <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav ">
                    <li class="nav-item m-1">
                        <a class="nav-link" id="inicio">Inicio</a>
                    </li>
                    <li class="nav-item m-1">
                        <a class="nav-link" id="productos">Productos</a>
                    </li>
                    <li class="nav-item m-1">
                        <button id="carrito" class="btn btn-success float-end" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                            Carrito
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav >
    `

    let footer = `
    <footer class="d-flex justify-content-between flex-wrap p-2 bg-dark">
        <div class="container pt-3">
            <div class="row social-buttons container-fluid">
                <div class="col-sm-4 ml-auto text-center">
                    <a href="https://www.facebook.com/DanusEventos" target="blank" class="social-margin">
                        <div class="social-icon facebook">
                            <i class="fa-brands fa-facebook"></i>
                        </div>
                        <p class="text-light">/DanusEventos</p>
                    </a>
                </div>
                </a>

                <div class="col-sm-4 mr-auto text-center">
                    <a href="mailto:contact@yourdomain.com" target="blank" class="social-margin">
                        <div class="social-icon instagram">
                            <i class="fa-regular fa-envelope"></i>
                        </div>
                        <p class="text-light">contact@yourdomain.com</p>
                    </a>
                </div>
                <div class="col-sm-4 ml-auto text-center">
                    <a href="https://wa.me/5491150500147" target="blank" class="social-margin">
                        <div class="social-icon wp">
                            <i class="fa-brands fa-instagram"></i>
                        </div>
                        <p class="text-light">+5491155555555</p>
                    </a>
                </div>
            </div>
        </div>
        <div class="container ">
            <span class="copyright-text text-white-50">Copyright &copy; <span id="year"></span> Todos los derechos
                reservados
            </span>
            <span class="float-end text-white-50">
                Diseñado por <a href="#">RDS</a>.
            </span>
        </div>
    </footer>
    `
    document.getElementById('navbar').innerHTML = navbar;
    document.getElementById('footer').innerHTML = footer;
    //<img src="./images-portada/logo-mini.jpg" width="32" height="32">
    $('#inicio').on('click', function () {
        $('#content').load('portal.html')
    })

    $('#productos').on('click', function () {
        $('#content').load('productos.html')
    })

    var listaProductos = []

    prueba()

    function prueba() {
        for (let index = 1; index < 9; index++) {
            const producto = {
                id: index,
                nombre: 'producto' + index,
                imagen: '/DanusEventos/images/' + index + ".jpg",
            };
            listaProductos.push(producto);
        }
    }

    const DOMitems = document.querySelector('#items');
    if (DOMitems) {
        renderizarProductos()
    }

    function renderizarProductos() {
        listaProductos.forEach((item) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'm-2', 'box');
            // Body
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body', 'text-center');
            // Titulo
            const miNodoTitle = document.createElement('h5');
            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = item.nombre;
            // Imagen
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('card-img-top');
            miNodoImagen.setAttribute('src', item.imagen);

            const input = document.createElement('input');
            input.id = item.id
            input.type = 'checkbox';
            input.classList.add('btn-check');
            input.id = 'btn-check-outlined' + item.id
            input.setAttribute('data-id', item.id)
            input.autocomplete = 'off'

            const label = document.createElement('label');
            label.classList.add('btn', 'btn-outline-success');
            label.setAttribute('for', 'btn-check-outlined' + item.id)
            label.innerText = 'agregar'

            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);

            miNodoCardBody.appendChild(input)
            miNodoCardBody.appendChild(label)

            miNodo.appendChild(miNodoCardBody);
            DOMitems.appendChild(miNodo);
        });
    }

    $(".animated").on("click", function () {
        $(this).toggleClass("pulse");
    });

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
            //console.log(productosConFormatoAmigable);
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
                //console.log(button.parentNode.parentNode.id);
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

    if (listaDelUsuario.length !== 0) {
        crearTarea(listaDelUsuario);
    }

    const btnsComprarProducto = document.querySelectorAll('.btn-check');

    btnsComprarProducto.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            listaProductos.forEach(function (element) {
                let flag = 0;
                //console.log(e.target.dataset.id);
                if (element.id == e.target.dataset.id) {
                    //console.log(element.nombre);
                    listaDelUsuario.forEach(function (element) {
                        if (element.id == e.target.dataset.id) {
                            //console.log("aca");
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

    const year = document.querySelector('#year')
    if (year) {
        year.innerHTML = new Date().getFullYear();
    }

    const form = document.getElementById("form");
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
        })
    }
})

