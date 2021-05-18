var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));
function loaded(event) {
    flights();
}
const renderVuelos = (flights) => {
    var listFlights = document.getElementById("tabla-misVuelos");
    listFlights.innerHTML = "";
    flights.forEach((v) => {
        vuelosCards(listFlights, v);
    });
}
const flights = async () => {
    if (usuarioLog) {
        const response = await fetch(`http://localhost:8080/backend/api/users/misvuelos/${usuarioLog.idUser}`);
        const flights = await response.json();
        console.log(flights);
        renderVuelos(flights);
    } else {
        const msg = document.getElementById("msgWarning");
        msg.removeAttribute("hidden");
        const div = document.getElementById("msgTextWarning");
        div.textContent = "Debes Estar Logeado!";
    }

}
async function  vuelosCards(ls, bit) {
    var div = document.createElement("tr");
    const date1 = new Date(bit.fecha);
    const fecha = date1.toLocaleDateString('en-US');
    div.innerHTML =
            "<div  class='card mt-2 border-dark' style='background-color: #ccebff;'>" +
            "<div class='card-header'>" +
            "<div  class=' d-inline  text-black h5 fw-bold'> No.Vuelo " + bit.idVuelo + "</div><div  class='d-inline h4 fw-bold ' style='float:right;'>" + bit.vuelo.ori + "  -  " + bit.vuelo.desti + "</div>" +
            "</div>" +
            "<div class='card-body'>" +
            "<div>" +
            "<div class='h5 d-inline'>Asientos : " + bit.asientos + " </div><br> " +
            "</div>" +
            "<div>" +
            "<div class='h5 d-inline'>Fecha : " + fecha + "</div> <br>" +
            "</div>" +
            "<div>" +
            "<div class='h5 d-inline'>Total Cancelado : $" + bit.total + "</div><br>" +
            "<div  class='h5 d-inline'>Ruta : " + bit.vuelo.ruta_vuelo.descripcion + "</div>" +
            "</div>" +
            "</div>";
    ls.appendChild(div);
}
document.addEventListener("DOMContentLoaded", loaded);





