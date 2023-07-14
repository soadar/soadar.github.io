document.getElementById("header").innerHTML = `

<nav class="navbar navbar-expand-sm navbar-dark bg-dark ">
    <a class="navbar-brand ms-5" href="https://www.metro951.com/wp-content/uploads/2023/02/U2.jpeg">U2home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
            <li class="nav-item active">
                <a class=" nav-link  dropdown-item" href="albums.html"> Albums </a>
            </li>
            <li class="nav-item">
                <a class="nav-link dropdown-item" href="singles.html"> Singles </a>
            </li>
            <li class="nav-item">
                <a class="nav-link dropdown-item" href="#"> Tours </a>
            </li>
            <li class="nav-item">
            <a class="nav-link dropdown-item" href="#"> News </a>
            </li>
        </ul>
        <form class="d-flex" role="search">
            <input class="form-control me-2" id="search" type="search" placeholder="Buscar por nombre" aria-label="Search" onkeyup="buscador()">
        </form>
    </div>
</nav>

`

function buscador() {
    var filter, tr, td, i, txtValue;
    filter = document.getElementById("search").value.toUpperCase();
    tr = document.getElementById("table").getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}