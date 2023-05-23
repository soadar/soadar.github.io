//Default
jQuery.datetimepicker.setLocale("es");

var defaultDatetime = "2020-01-01T19:30:00.000Z"; //'2020-03-29 19:30';

if (!JSON.parse(localStorage.getItem("user"))) {
  alert("Debe iniciar sesion primero");
  window.location.replace("index.html");
}

let user = JSON.parse(localStorage.getItem("user")) || [];
let tasks = JSON.parse(localStorage.getItem("horas")) || [];

console.log(tasks);

if (localStorage.getItem("horas")) {
  crearTarea()
}

let localTzName = moment.tz.guess();
$.datetimepicker.setDateFormatter("moment");


$("#pickerDateTime1").datetimepicker({
  timepicker: false,
  format: "DD-MM-YYYY",
  value: new Date(),
  step: 15,
  language: 'es',
  locale: 'es',
  minDate: '01-01-2023', formatDate: 'DD-MM-YYYY',
  startDate: '01-01-2023', formatDate: 'DD-MM-YYYY',
  // months: [
  //   "Enero",
  //   "Febrero",
  //   "Marzo",
  //   "Abril",
  //   "Mayo",
  //   "Junio",
  //   "Julio",
  //   "Agosto",
  //   "Septiembre",
  //   "Octubre",
  //   "Noviembre",
  //   "Diciembre",
  // ],
  // dayOfWeek: ["Dom.", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"],
});
$("#pickerDateTime2").datetimepicker({
  datepicker: false,
  value: "09:45",
  maxTime: "09:46",
  format: "HH:mm",
  step: 15,
});
$("#pickerDateTime3").datetimepicker({
  timepicker: false,
  datepicker: false,
  value: "09:45",
  format: "HH:mm",
  step: 15,
});
$("#pickerDateTime4").datetimepicker({
  timepicker: false,
  datepicker: false,
  value: "17:15",
  format: "HH:mm",
  step: 15,
});
$("#pickerDateTime5").datetimepicker({
  datepicker: false,
  minTime: "17:15",
  value: "17:15",
  format: "HH:mm",
  step: 15,
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const tarea = new Tarea();
  var horas = tarea.diferenciaTotal();
  tarea.horas = horas;


  if (horas != "00:00") {
    tasks.push(tarea);
    localStorage.setItem("horas", JSON.stringify(tasks));
    crearTarea();
  } else {
    alert("No se registraron horas extras.");
  }
});

function actualizarHoras() {
  let totalHoras = moment.duration();
  let divhoras = document.getElementById("horas");

  if (localStorage.getItem("horas")) {
    tasks.map((task) => {
      totalHoras.add(moment.duration(task.horas.toString()));
    });
    divhoras.innerHTML = horas(totalHoras);
  } else {
    divhoras.innerHTML = "00:00";
  }
  divhoras.innerHTML += ` - ${user.charAt(0).toUpperCase() + user.slice(1)
    } - Cenas: ${Math.floor(totalHoras.hours() / 4)}`;
}

function horas(tiempo) {
  return [
    tiempo.hours().toString().padStart(2, "0"),
    tiempo.minutes().toString().padStart(2, "0"),
  ].join(":");
}

function crearTarea() {
  renderizarLista(crearTabla(tasks), document.getElementById("divLista"));
  actualizarHoras();
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
  tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTbody(items));
  //tabla.setAttribute("style", "border:1px solid black; border-collapse:collapse");
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

    const button = document.createElement("button");
    button.innerHTML = "x";
    button.classList = "btnX";
    button.onclick = () => {
      button.parentElement.remove();
      tasks = tasks.filter(
        (task) => task.id !== parseInt(button.parentNode.id)
      );
      localStorage.setItem("horas", JSON.stringify(tasks));
      actualizarHoras();
    };
    tr.appendChild(button);
    tbody.appendChild(tr);
  });
  return tbody;
}

////////////////////////////////////////////////////////

function downloadXLSX(type, fn, dl) {
  //sheetjs
  var elt = document.getElementById("tablax");
  var wb = XLSX.utils.table_to_book(elt, { sheet: "Libro1" });
  return dl
    ? XLSX.write(wb, { bookType: type, bookSST: true, type: "base64" })
    : XLSX.writeFile(wb, fn || "Horas_Extras." + (type || "xlsx"));
}

document.querySelector("#toexcel").addEventListener("click", () => {
  downloadXLSX("xlsx");
});

function downloadJson(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

document.querySelector("#tojson").addEventListener("click", () => {
  downloadJson(JSON.stringify(tasks), "json.json", "text/json");
});

function downloadPDF() {
  var doc = new jsPDF("p", "pt", "letter");
  var res = doc.autoTableHtmlToJson(document.getElementById("tablax"));

  doc.autoTable(res.columns, res.data, {
    styles: { halign: "center" },
    margin: { top: 80 },
    beforePageContent: function (data) {
      doc.text("Horas Extras", 40, 50);
    },
  });
  doc.save("table.pdf");
}

document.querySelector("#topdf").addEventListener("click", () => {
  downloadPDF();
});

//function Tarea(fecha, horaEntrada, horaSalida, motivo, prefijo) {
function Tarea() {
  const fecha = document.querySelector("#pickerDateTime1").value;
  const horaExtraEntrada = document.querySelector("#pickerDateTime2").value;
  const horaEntrada = document.querySelector("#pickerDateTime3").value;
  const horaSalida = document.querySelector("#pickerDateTime4").value;
  const horaExtraSalida = document.querySelector("#pickerDateTime5").value;
  const motivo = document.getElementById("motivoArea").value;
  const prefijoOp = document.getElementById("prefijo");
  const prefijo = prefijoOp.options[prefijoOp.selectedIndex].text;

  this.id = new Date().getTime();
  this.dia = fecha;
  this.horaEntrada = horaExtraEntrada;
  this.horaSalida = horaExtraSalida;
  this.motivo = motivo;
  this.prefijo = prefijo;

  this.diferenciaTemprano = () => {
    var extra = moment(horaExtraEntrada, "HH:mm");
    var entrada = moment(horaEntrada, "HH:mm");
    return horas(moment.duration(entrada.diff(extra)));
  };

  this.diferenciaNoche = () => {
    var extra = moment(horaExtraSalida, "HH:mm");
    var salida = moment(horaSalida, "HH:mm");
    return horas(moment.duration(extra.diff(salida)));
  };

  this.diferenciaTotal = function () {
    var totalTemprano = moment(this.diferenciaTemprano(), "HH:mm");
    var totalNoche = moment(this.diferenciaNoche(), "HH:mm");
    return horas(moment.duration(totalTemprano._i).add(totalNoche._i));
  };
}
