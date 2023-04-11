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

//console.log(tasks);

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

let prefijo = document.getElementById("prefijo");

//prefijo.addEventListener("change", function() {
//var mylist = document.getElementById("myList");
//console.log(prefijo.options[prefijo.selectedIndex].text);
//var mylist = document.getElementById("myList");
//document.getElementById("favourite").value =
//mylist.options[mylist.selectedIndex].text;
//})

function crearTarea(tarea) {

  const li = document.createElement("li");
  //console.log(Math.floor(tarea.horas / 4));
  li.innerHTML = `
    ${tarea.dia} - ${tarea.horas} hs - ${tarea.prefijo} - ${tarea.motivo} - cenas: ${Math.floor(tarea.horas.substring(0, 2) / 4)};
    `

  li.id = tarea.id;
  let lista = document.getElementById("lista");
  const button = document.createElement("button");
  button.classList = "btnX";
  button.innerHTML = "x";

  button.onclick = () => {
    button.parentElement.remove();
    tasks = tasks.filter((task) => task.id !== parseInt(button.parentNode.id));
    localStorage.setItem("horas", JSON.stringify(tasks));
    actualizarHoras();
  };
  li.appendChild(button);
  lista.appendChild(li);
  form.reset();
  actualizarHoras();
  console.log(tarea.horas.substring(0, 2));
}

let totalHoras = moment.duration();

function actualizarHoras() {
  let totalHoras = moment.duration();
  let horas = document.getElementById("horas");

  if (localStorage.getItem("horas")) {
    tasks.map((task) => {
      totalHoras.add(moment.duration(task.horas.toString()));
      //console.log(task);
    });
    if (totalHoras.hours() > 0 || totalHoras.minutes() > 0) {
      horas.innerHTML = [
        totalHoras.hours().toString().padStart(2, "0"),
        totalHoras.minutes().toString().padStart(2, "0"),
      ].join(":");
      //horas.style.border = "5px solid lightgreen"
      //console.log("1")
    } else {
      horas.innerHTML = "00:00";
      //console.log("2")
    }
  } else {
    horas.innerHTML = "00:00";
  }
  horas.innerHTML += " - " + user.charAt(0).toUpperCase() + user.slice(1);
}
//console.log(totalHoras);
