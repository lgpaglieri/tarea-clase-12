let datosJson;
let $confirmar = document.querySelector("#confirmar");
let divisasDisponibles;
let $fechaConsulta = document.querySelector("#fecha-consulta");
let $divisaBase = document.querySelector("#divisa-base");

cargarMenuDivisasBase();

async function cargarMenuDivisasBase() {
  await obtenerDivisasDisponibles();
  let $listadoDivisasBase = document.querySelector("#divisa-base");
  divisasDisponibles.forEach((element) => {
    let $divisa = document.createElement("option");
    $divisa.innerText = `${element}`;
    $divisa.value = `${element}`;
    $listadoDivisasBase.appendChild($divisa);
  });
}

function obtenerDivisasDisponibles() {
  return fetch(`https://api.frankfurter.app/latest`)
    .then((response) => response.json())
    .then((datosObtenidos) => {
      divisasDisponibles = Object.keys(datosObtenidos.rates);
    });
}

function obtenerDatos(fechaConsulta) {
  let divisaBaseValor = $divisaBase.value;
  return fetch(
    `https://api.frankfurter.app/${fechaConsulta}?base=${divisaBaseValor}`
  )
    .then((response) => response.json())
    .then((datosObtenidos) => {
      datosJson = datosObtenidos;
    })
    .catch((error) => console.error(error));
}

$confirmar.onclick = () => {
  let fechaConsulta = $fechaConsulta.value;
  limpiarDatos();
  obtenerDatos(fechaConsulta)
    .then(agregarDatos)
    .catch((error) => console.error(error));

  manejarErrores();
};

function manejarErrores() {
  if (!$fechaConsulta.value) {
    $fechaConsulta.classList.add("is-invalid");
    $fechaConsulta.classList.remove("is-valid");
  } else {
    $fechaConsulta.classList.add("is-valid");
    $fechaConsulta.classList.remove("is-invalid");
  }

  if (!$divisaBase.value || $divisaBase.value === "") {
    $divisaBase.classList.add("is-invalid");
    $divisaBase.classList.remove("is-valid");
  } else {
    $divisaBase.classList.add("is-valid");
    $divisaBase.classList.remove("is-invalid");
  }
}

function agregarDatos() {
  const $cuerpoTabla = document.querySelector("#cuerpo-tabla");
  const cotizaciones = datosJson.rates;
  for (let i = 0; i < Object.keys(cotizaciones).length; i++) {
    let cotizacion = document.createElement("tr");
    let divisa = document.createElement("td");
    let valor = document.createElement("td");
    divisa.innerText = Object.keys(datosJson.rates)[i];
    valor.innerText = Object.values(datosJson.rates)[i];
    $cuerpoTabla.appendChild(cotizacion);
    cotizacion.appendChild(divisa);
    cotizacion.appendChild(valor);
  }
}

function limpiarDatos() {
  const datosMostrados = document.querySelectorAll("td");
  for (let i = 0; i < datosMostrados.length; i++) {
    datosMostrados[i].remove();
  }
}
