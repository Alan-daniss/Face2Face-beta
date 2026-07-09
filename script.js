/*Loader*/
window.addEventListener("DOMContentLoaded", () => {
    showLoader();
})

window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader();
    }, 200);
})

const loader = document.getElementById("loaderPagina");
const showLoader = () => {
    loader.classList.add("show_loader");
}
const hideLoader = () => {
    const loader = document.getElementById("loaderPagina");
    loader.classList.remove("show_loader");
}
/*loader*/








/*logica principal*/

document.addEventListener("DOMContentLoaded", () => {
const paginaActual = window.location.pathname;

// ==========================================
// FASE 2: LÓGICA PARA LAS PREGUNTAS
// ==========================================
if (paginaActual.includes("pregunta")) { // Asegúrate que tus html se llamen pregunta1, pregunta2, etc.
const btnGuardar = document.querySelector('.guardado');
const inputs = document.querySelectorAll('input[name="prefiere"]');
const votoGuardado = localStorage.getItem('voto_' + paginaActual);

// Bloquear si ya había votado
if (votoGuardado) {
const radioElegido = document.getElementById(votoGuardado);
if (radioElegido) radioElegido.checked = true;
inputs.forEach(input => input.disabled = true);
const btnSiguiente = document.querySelector('.bot-pag-siguiente');
if(btnSiguiente) btnSiguiente.disabled = false;
if (btnGuardar) {
btnGuardar.disabled = true;
btnGuardar.innerText = "¡Ya guardado!";
}
}

// Guardar voto nuevo
if (btnGuardar) {
btnGuardar.addEventListener('click', () => {
const seleccion = document.querySelector('input[name="prefiere"]:checked');

if (seleccion) {
localStorage.setItem('voto_' + paginaActual, seleccion.id);
localStorage.setItem('puntos_' + paginaActual, seleccion.value); // Aquí guardamos 'mexico' o 'inglaterra'

location.reload();
} else {
alert("Por favor, selecciona una opción primero.");
}
});
}
}

// ==========================================
// FASE 4: LÓGICA PARA LOS RESULTADOS
// ==========================================
if (paginaActual.includes("resultado")) {
let totalMexico = 0;
let totalInglaterra = 0;

// 1. Contar los votos recorriendo el localStorage
for (let i = 0; i < localStorage.length; i++) {
const key = localStorage.key(i);
if (key.includes('puntos_')) {
const paisElegido = localStorage.getItem(key);
if (paisElegido === 'mexico') totalMexico++;
if (paisElegido === 'inglaterra') totalInglaterra++;
}
}

// 2. Matemáticas (Cada voto = 20%)
const porcentajeMexico = totalMexico * 20;
const porcentajeInglaterra = totalInglaterra * 20;

// 3. Seleccionar los elementos del HTML
const titulo = document.getElementById('titulo-ganador');
const textoPorcentaje = document.getElementById('texto-porcentaje');
const textoPais = document.getElementById('texto-pais');
const resMexico = document.getElementById('res-mexico');
const resInglaterra = document.getElementById('res-inglaterra');
const grafico = document.getElementById('grafico');

// 4. Actualizar textos de detalles
if (resMexico) resMexico.innerText = `${totalMexico} respuestas México`;
if (resInglaterra) resInglaterra.innerText = `${totalInglaterra} respuestas Inglaterra`;

// 5. Determinar Ganador y pintar el círculo
if (porcentajeMexico > porcentajeInglaterra) {
titulo.innerText = "¡Le vas a México!";
titulo.style.color = "#10B991"; // Verde
textoPorcentaje.innerText = `${porcentajeMexico}%`;
textoPais.innerText = "México";
grafico.style.background = `conic-gradient(#10B991 ${porcentajeMexico}%, #333 0)`;

} else if (porcentajeInglaterra > porcentajeMexico) {
titulo.innerText = "¡Le vas a Inglaterra!";
titulo.style.color = "#EF4444"; // Rojo
textoPorcentaje.innerText = `${porcentajeInglaterra}%`;
textoPais.innerText = "Inglaterra";
grafico.style.background = `conic-gradient(#EF4444 ${porcentajeInglaterra}%, #333 0)`;

} else {
// Por si acaso no hay votos
titulo.innerText = "Aún no hay votos suficientes";
textoPorcentaje.innerText = "0%";
textoPais.innerText = "???";
}
}
});


function limpiarEncuesta (){
    for (let i = localStorage.length - 1; i >= 0; i--){
        const key = localStorage.key(i);
        if (key.includes('voto_') || key.includes('puntos_')) {
            localStorage.removeItem(key);
        }
    }
}

/*logica principal*/





