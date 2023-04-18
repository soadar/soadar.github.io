//Default
jQuery.datetimepicker.setLocale("es");

var defaultDatetime = "2020-01-01T19:30:00.000Z"; //'2020-03-29 19:30';

if (!JSON.parse(localStorage.getItem("user"))) {
  alert("Debe iniciar sesion primero");
  window.location.replace("index.html");
}

let user = JSON.parse(localStorage.getItem("user")) || [];
let tasks = JSON.parse(localStorage.getItem("horas")) || [];

if (localStorage.getItem("horas")) {
  tasks.map((task) => {
    crearTarea(task);
  });
}

let localTzName = moment.tz.guess();
let defaultTzEl = $("#selectDefaultTimezone");
let localTzEl = $("#selectLocalTimezone");
$.datetimepicker.setDateFormatter("moment");

$("#pickerDateTime1").datetimepicker({
  timepicker: false,
  value: new Date(),
  format: "DD-MM-YYYY", //'dddd MMMM DD, hh:mm A',//'Y-m-d H:i',
  step: 15,
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  dayOfWeek: ["Dom.", "Lun", "Mar", "Mier", "Jue", "Vier", "Sab"],
});
$("#pickerDateTime2").datetimepicker({
  datepicker: false,
  value: "09:45",
  maxTime: "09:46",
  format: "HH:mm",
  step: 15,
});
$("#pickerDateTime3").datetimepicker({
  datepicker: false,
  value: "09:45",
  format: "HH:mm",
  step: 15,
});
$("#pickerDateTime4").datetimepicker({
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
  //console.log(event.target)
  var fecha = moment($("#pickerDateTime1").val(), "DD-MM-YYYY");

  var HoraExtraEntrada = moment($("#pickerDateTime2").val(), "HH:mm");
  var HoraEntrada = moment($("#pickerDateTime3").val(), "HH:mm");
  var HoraSalida = moment($("#pickerDateTime4").val(), "HH:mm");
  var HoraExtraSalida = moment($("#pickerDateTime5").val(), "HH:mm");

  var diffStart = moment.duration(HoraEntrada.diff(HoraExtraEntrada));
  diffTotalStart = [
    diffStart.hours().toString().padStart(2, "0"),
    diffStart.minutes().toString().padStart(2, "0"),
  ].join(":");
  //console.log(diffTotalStart);

  var diffEnd = moment.duration(HoraExtraSalida.diff(HoraSalida));
  diffTotalEnd = [
    diffEnd.hours().toString().padStart(2, "0"),
    diffEnd.minutes().toString().padStart(2, "0"),
  ].join(":");
  //console.log(diffTotalEnd);

  diffTotal = diffStart.add(diffTotalEnd);
  //console.log(diffTotal);

  diffTotalTotal = [
    diffTotal.hours().toString().padStart(2, "0"),
    diffTotal.minutes().toString().padStart(2, "0"),
  ].join(":");

  //let select = document.createElement('motivoArea');
  //
  //console.log(HoraExtraEntrada._i)
  if (diffTotalTotal != "00:00") {
    const task = {
      id: new Date().getTime(),
      dia: fecha._i,
      horas: diffTotalTotal,
      horaEntrada: HoraExtraEntrada._i,
      horaSalida: HoraExtraSalida._i,
      motivo: document.getElementById("motivoArea").value,
      prefijo: prefijo.options[prefijo.selectedIndex].text,
    };
    tasks.push(task);
    //console.log(task);
    localStorage.setItem("horas", JSON.stringify(tasks));
    //console.log(JSON.stringify(task));
    crearTarea(task);
  }
});

function crearTarea(tarea) {
  renderizarLista(crearTabla(tasks), document.getElementById("divLista"));
  actualizarHoras()
}

let totalHoras = moment.duration();

function actualizarHoras() {
  let totalHoras = moment.duration();
  let divhoras = document.getElementById("horas");

  if (localStorage.getItem("horas")) {
    tasks.map((task) => {
      totalHoras.add(moment.duration(task.horas.toString()));
      //console.log(task);
    });
    divhoras.innerHTML = [
      totalHoras.hours().toString().padStart(2, "0"),
      totalHoras.minutes().toString().padStart(2, "0"),
    ].join(":");
  } else {
    divhoras.innerHTML = "00:00";
  }
  divhoras.innerHTML += ` - ${user.charAt(0).toUpperCase() + user.slice(1)
    } - Cenas: ${Math.floor(totalHoras.hours() / 4)}`;
}

////////////////////////////////////////////////////////

function renderizarLista(lista, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (lista)
    contenedor.appendChild(lista);
}

function crearTabla(items) {
  const tabla = document.createElement("table");
  tabla.id = 'tablax'
  tabla.appendChild(crearThead(items[0]));
  tabla.appendChild(crearTbody(items));
  //tabla.setAttribute("style", "border:1px solid black; border-collapse:collapse");
  return tabla;
}


function crearThead(item) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  tr.style.backgroundColor = "blue";

  for (const key in item) {
    if (key !== "id") {
      const th = document.createElement("th");
      th.textContent = key;
      tr.appendChild(th);
    }
  }
  thead.appendChild(tr);
  return thead;
}

function crearTbody(items) {
  const tbody = document.createElement("tbody");
  items.forEach(item => {
    const tr = document.createElement("tr");
    for (const key in item) {
      if (key === "id") {
        tr.setAttribute("id", item[key]);
      }
      else {
        const td = document.createElement("td");
        // td.style.setProperty("border", "1px solid black");
        // td.style.border = "1px solid black";
        td.textContent = item[key];
        tr.appendChild(td);
      }
    }

    const button = document.createElement("button");
    button.innerHTML = "x";
    button.classList = "btnX";
    button.onclick = () => {
      button.parentElement.remove();
      tasks = tasks.filter((task) => task.id !== parseInt(button.parentNode.id));
      localStorage.setItem("horas", JSON.stringify(tasks));
      actualizarHoras();
    };
    tr.appendChild(button);
    tbody.appendChild(tr);
  });
  return tbody;
}


function ExportToExcel(type, fn, dl) {
  var elt = document.getElementById('tablax');
  var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
  return dl ?
    XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }) :
    XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
}

document.querySelector('#toexcel').addEventListener('click', () => {
  ExportToExcel('xlsx');
})

function ExportToJson() {
  var fileToSave = new Blob([JSON.stringify(tasks)], {
    type: 'application/json'
  });
  saveAs(fileToSave, 'horas.json');
}

document.querySelector('#tojson').addEventListener('click', () => {
  onDownload();
})


function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function onDownload() {
  download(JSON.stringify(tasks), "yourfile.json", "text/json");
}


var specialElementHandlers = {
  // element with id of "bypass" - jQuery style selector
  '.no-export': function (element, renderer) {
    // true = "handled elsewhere, bypass text extraction"
    return true;
  }
};

function exportPDF(id) {
  var doc = new jsPDF('p', 'pt', 'a4');
  var source = document.getElementById(id);
  var margins = {
    top: 10,
    bottom: 10,
    left: 10,
    width: 595
  };

  doc.fromHTML(
    source, // HTML string or DOM elem ref.
    margins.left,
    margins.top, {
    'width': margins.width,
    'elementHandlers': specialElementHandlers
  },

    function (dispose) {
      doc.save('Test.pdf');
    }, margins);
}

document.querySelector('#topdf').addEventListener('click', () => {
  let pdf = new jsPDF('p', 'pt', 'letter');
  pdf.html(document.getElementById('tablax'), {
    callback: function (pdf) {
      pdf.save('test.pdf');
    }
  });
})