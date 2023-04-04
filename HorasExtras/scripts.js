//Default
var defaultDatetime = "2020-01-01T19:30:00.000Z"; //'2020-03-29 19:30';


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  //console.log(totalHoras)
  tasks.map((task) => {

    crearTarea(task);
    //console.log(task.horas);
    //let hora = moment((task.horas.toString()), "HH:mm");
    //console.log(hora);

  });
  //console.log([totalHoras.hours().toString().padStart(2, '0'), totalHoras.minutes().toString().padStart(2, '0')].join(':'));
}
actualizarHoras()
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
  event.preventDefault()
  //console.log(event.target)
  var fecha = moment($('#pickerDateTime1').val(), 'DD-MM-YYYY');

  var HoraExtraEntrada = moment($('#pickerDateTime2').val(), 'HH:mm');
  var HoraEntrada = moment($('#pickerDateTime3').val(), 'HH:mm');
  var HoraSalida = moment($('#pickerDateTime4').val(), 'HH:mm');
  var HoraExtraSalida = moment($('#pickerDateTime5').val(), 'HH:mm');


  var diffStart = moment.duration(HoraEntrada.diff(HoraExtraEntrada));
  diffTotalStart = [diffStart.hours().toString().padStart(2, '0'), diffStart.minutes().toString().padStart(2, '0')].join(':')
  //console.log(diffTotalStart);

  var diffEnd = moment.duration(HoraExtraSalida.diff(HoraSalida));
  diffTotalEnd = [diffEnd.hours().toString().padStart(2, '0'), diffEnd.minutes().toString().padStart(2, '0')].join(':')
  //console.log(diffTotalEnd);

  diffTotal = diffStart.add(diffTotalEnd);
  //console.log(diffTotal);

  diffTotalTotal = [diffTotal.hours().toString().padStart(2, '0'), diffTotal.minutes().toString().padStart(2, '0')].join(':')

  const task = {
    id: new Date().getTime(),
    dia: fecha._i,
    horas: diffTotalTotal,
  }
  tasks.push(task);
  //console.log(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  //console.log(JSON.stringify(task));
  crearTarea(task);

});

function crearTarea(tarea) {
  const li = document.createElement("li");
  li.innerHTML = tarea.dia + " - " + tarea.horas + " hs";
  li.id = tarea.id;
  let lista = document.getElementById("lista");
  const button = document.createElement("button");
  button.classList = 'btnX'
  button.innerHTML = "x";

  button.onclick = () => {
    button.parentElement.remove();
    tasks = tasks.filter((task) => task.id !== parseInt(button.parentNode.id));
    localStorage.setItem("tasks", JSON.stringify(tasks));
    actualizarHoras();
  }
  li.appendChild(button);
  lista.appendChild(li);
  form.reset();
  actualizarHoras();
}
let totalHoras = moment.duration();

function actualizarHoras() {
  let totalHoras = moment.duration();
  let horas = document.getElementById("horas");

  if (localStorage.getItem("tasks")) {
    tasks.map((task) => {
      totalHoras.add(moment.duration(task.horas.toString()));
    });
    if (totalHoras.hours() > 0 || totalHoras.minutes() > 0) {
      horas.innerHTML = [totalHoras.hours().toString().padStart(2, '0'), totalHoras.minutes().toString().padStart(2, '0')].join(':');
      //horas.style.border = "5px solid lightgreen"
      //console.log("1")
    } else {
      horas.innerHTML = '00:00';
      //console.log("2")
    }
  } else {
    horas.innerHTML = '00:00';
  }
  let user = JSON.parse(localStorage.getItem("user")) || [];
  horas.innerHTML += " - " + user.charAt(0).toUpperCase() + user.slice(1)
}
//console.log(totalHoras);

