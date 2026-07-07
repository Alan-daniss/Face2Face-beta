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