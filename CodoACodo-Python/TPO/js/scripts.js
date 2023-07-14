const navbar = `
<div class="box box_izq">
<img class="animate__animated animate__rotateIn" src="img/cross-arrows.png" alt="">
</div>

<div class="box box_der">
<navbar class="">
    <ul>
        <li><a href="index.html">Inicio</a></li>
        <li><a href="chombas.html">Chombas</a></li>
        <li><a href="remeras.html">Remeras</a></li>
        <li><a href="joggings.html">Jogging</a></li>
        <li><a href="ubicacion.html">Ubicación</a></li>
        <li><a href="contacto.html">Contacto</a></li>
    </ul>
</navbar>
</div>
`

const footer = `
<div class="linea1">
<a href="https://www.facebook.com" target="_blank">
    <img src="./img/facebook.png" alt="icono Fb">

</a>
<a href="https://www.instagram.com" target="_blank">
    <img src="./img/instagram.png" alt="icono instagram">
</a>
<a href="https://twitter.com" target="_blank">
    <img src="./img/gorjeo.png" alt="icono twitter">
</a>
</div>

<div class="linea2">
<div class="contacto">
    <i class="fa-solid fa-location-dot"></i>
    <a href="ubicacion.html">Nazca y Avellaneda - C.A.B.A.</a>
</div>
<div class="contacto">
    <i class="fa-solid fa-phone"></i>
    <span>12345678</span>
</div>
<div class="contacto">
    <i class="fa-solid fa-envelope"></i>
    <a href="mailto:flechacruz@gmail.com">flechacruz@gmail.com</a>
</div>
</div>
`

const header = document.getElementById('header')
header.innerHTML = navbar;

const footer_e = document.getElementById('footer')
footer_e.innerHTML = footer;
