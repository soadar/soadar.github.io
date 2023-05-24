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