function validarFormulario() {
  // Obtener los valores ingresados por el usuario y recortar
  // los posibles espacios en blanco al principio y al final.
  var nombre = document.getElementById("nombre").value.trim();
  var celu = document.getElementById("celu").value.trim();
  var email = document.getElementById("email").value.trim();
  var texto = document.getElementById("texto").value.trim();

  // Verificar si algún campo está en blanco
  if (nombre == "" || celu == "" || email == "" || texto == "") {
    alert("Por favor, complete todos los campos del formulario.");
    return false;
  }


  // Verificar si el nombre contiene solo caracteres alfabéticos y espacios
  for (var i = 0; i < nombre.length; i++) {
    var charCode = nombre.charCodeAt(i);
    if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || charCode === 32)) {
      alert("El campo 'nombre' solo puede contener caracteres alfabéticos y espacios.");
      return false;
    }
  }

  // Verificar si el DNI contiene solo 8 dígitos numéricos
  if (celu.length !== 10) {
    alert("El campo 'celu' debe contener exactamente 10 dígitos numéricos.");
    return false;
  }
  for (var j = 0; j < celu.length; j++) {
    var digit = celu.charAt(j);
    if (digit < "0" || digit > "9") {
      alert("El campo 'celu' solo puede contener dígitos numéricos.");
      return false;
    }
  }

  // Verifica que el email contenga un arroba
  if (email.indexOf("@") === -1) {
    alert("El campo 'email' no contiene un email valido")
    return false;
  }

  // Si todas las validaciones son exitosas, enviar el formulario
  alert("Formulario enviado correctamente.");
  return true;
}

btn = document.querySelector('.btn')
btn.addEventListener('click', function (e) {
  e.preventDefault();
  validarFormulario();
})
