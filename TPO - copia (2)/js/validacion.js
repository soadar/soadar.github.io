// function validarFormulario() {
//   var nombre = document.getElementById("nombre").value.trim();
//   var celu = document.getElementById("celu").value.trim();
//   var email = document.getElementById("email").value.trim();
//   var texto = document.getElementById("texto").value.trim();

//   for (var i = 0; i < nombre.length; i++) {
//     var charCode = nombre.charCodeAt(i);
//     if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
//       document.getElementById("nombre").classList.add("is-invalid");
//     }
//   }

//   if (celu.length !== 10) {
//     document.getElementById("celu").classList.add("is-invalid");
//   }
//   for (var j = 0; j < celu.length; j++) {
//     var digit = celu.charAt(j);
//     if (digit < "0" || digit > "9") {
//       document.getElementById("celu").classList.add("is-invalid");
//     }
//   }

//   if (email.indexOf("@") === -1) {
//     document.getElementById("email").classList.add("is-invalid");
//   }

//   if (document.getElementById("texto").value.length === 0) {
//     //return false;
//     document.getElementById("texto").classList.add("is-invalid");
//   }

//   return true;
// }


const msg = document.createElement('div')
msg.className = 'alert alert-danger'
msg.role = 'alert'
msg.innerText = 'sasasas'

function validar() {

  var nombre = document.getElementById("nombre");
  var celu = document.getElementById("celu");
  var email = document.getElementById("email");
  var texto = document.getElementById("texto");

  var nombreText = nombre.value.trim();
  var celuText = celu.value.trim();
  var emailText = email.value.trim();
  var textoText = texto.value.trim();

  if (nombreText === '') {
    //nombre.parentElement.append(msg);
    //nombre.classList.toggle("is-invalid");
    nombre.parentElement.append(msg);

  } else {
    //nombre.classList.toggle("is-valid");
  }
  if (celuText === '') {

  } else {

  }


}


btn = document.querySelector('.btn')
btn.addEventListener('click', function (e) {
  e.preventDefault();
  //document.querySelector("form").classList.add("was-validated");
  //validarFormulario();
  validar()
});

