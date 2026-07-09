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
inputs.forEach(input => {
    input.disabled = true;
});

if (btnGuardar) {
btnGuardar.disabled = true;
btnGuardar.innerText = "\u2713";
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
const bandera=document.getElementById('bandera-ganadora')
if (porcentajeMexico > porcentajeInglaterra) {
bandera.src ="img-finalVersion/banderaMexico.jpg"
titulo.innerText = "¡Le vas a México!";
titulo.style.color = "#10B991"; // Verde
textoPorcentaje.innerText = `${porcentajeMexico}%`;
textoPais.innerText = "México";
grafico.style.background = `conic-gradient(#10B991 ${porcentajeMexico}%, #333 0)`;

} else if (porcentajeInglaterra > porcentajeMexico) {
bandera.src = "img-finalVersion/banderaEng.jpg"
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

function actualizarBarraProgreso() {
const paginaActual = window.location.pathname;
const barra = document.getElementById('barraProg');
const texto = document.getElementById('pag');

// Mapeo: ¿En qué página estamos?
// Ajusta los nombres de tus archivos si son distintos
const mapeo = {
"/preguntas1.html": { porcentaje: "20%", texto: "1/5" },
"/preguntas2.html": { porcentaje: "40%", texto: "2/5" },
"/preguntas3.html": { porcentaje: "60%", texto: "3/5" },
"/preguntas4.html": { porcentaje: "80%", texto: "4/5" },
"/preguntas5.html": { porcentaje: "100%", texto: "5/5" }
};

// Buscamos la configuración según la página
const info = Object.keys(mapeo).find(key => paginaActual.includes(key));

if (info && barra) {
barra.style.width = mapeo[info].porcentaje;
texto.innerText = mapeo[info].texto;
}
}

// Llamar a la función dentro de tu DOMContentLoaded principal
// (Asegúrate de ponerla donde ya tienes tus otras llamadas)
actualizarBarraProgreso();


/*logica principal*/





