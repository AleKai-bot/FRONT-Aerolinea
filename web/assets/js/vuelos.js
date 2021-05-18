var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));

function loaded(event) {
    flights();
 
}
function apply_pagination() {
    $pagination.twbsPagination({
        totalPages: totalPages,
        visiblePages: 6,
        onPageClick: function (event, page) {
            displayRecordsIndex = Math.max(page - 1, 0) * recPerPage;
            endRec = (displayRecordsIndex) + recPerPage;
            displayRecords = records.slice(displayRecordsIndex, endRec);
            renderVuelos(displayRecords);
        }
    });
}
var $pagination = $('#pagination'),
        totalRecords = 0,
        records = [],
        displayRecords = [],
        recPerPage = 4,
        page = 1,
        totalPages = 0;
function paginacion(data) {
    records = data;
    console.log(records);
    totalRecords = records.length;
    totalPages = Math.ceil(totalRecords / recPerPage);
    apply_pagination();
}

const renderVuelos = (flights) => {
    var listFlights = document.getElementById("tabla-vuelos");
    listFlights.innerHTML = "";
    flights.forEach((v) => {
        vuelosCards(listFlights, v);
    });
}
const flights = async () => {
    const response = await fetch(`http://localhost:8080/backend/api/vuelos/list`);
    const flights = await response.json();
    paginacion(flights);
}
const fechaSalidaRegreso = async(idR) => {
    const response = await fetch(`http://localhost:8080/backend/api/vuelos/horario/${idR}`);
    const horario = await response.json();
    return horario;
}
const rutaVuelo = async(idR) => {
    const response = await fetch(`http://localhost:8080/backend/api/vuelos/ruta/${idR}`);
    const  ruta = await response.json();
    return ruta;
}
async function  vuelosCards(ls, u) {
    var div = document.createElement("tr");
    const date1 = new Date(u.ruta_vuelo.horario.fechaLlega);
    const date2 = new Date(u.ruta_vuelo.horario.fechaSali);
    const salida = date1.toLocaleDateString('en-US');
    const regreso = date2.toLocaleDateString('en-US');
 
 
    var difference = Math.abs(date2 - date1);
    const days = difference / (1000 * 3600 * 24);
    console.log();
    div.innerHTML =
            "<div  class='card mt-2 border-dark' style='background-color: #e6faff;'>" + //e6faff
                "<div class='card-header'>" +
                "<div  class=' d-inline  text-black h5 fw-bold'> No." + u.idVuelo + "</div><div  class='d-inline h4 fw-bold ' style='float:right;'>" + u.ori + "  -  " + u.desti + "</div>" +
            "</div>" +
            "<div class='card-body'>" +
                "<div >" +
                    "<div class='h6 d-inline '>Origen : " + u.ori + " </div>  ---> " +
                    "<div  class='h6 d-inline'>Destino : " + u.desti + "</div>" +
                "</div>" +
                "<div>" +
                    "<div class='h6 d-inline'>Cant Pasajeros : " + u.cantPasa + "</div> <br>" +
                    "<div  class='h6 d-inline'>Duracion en dias: " + days + "</div><br>" +
                "</div>" +
                "<div>" +
                "<div class='h6 d-inline'>Horario : <br>" + "Salida :  " + salida +"       a las :  "+ u.ruta_vuelo.horario.hora_salida+" </div><div class='h6 d-inline'>         Regreso :   " + regreso + "</div><br>" +
                "<div  class='h6 d-inline'>Ruta : " + u.ruta_vuelo.descripcion + "</div>" +
                "</div>" +
                "<div class='mt-3'>" +
                "<a class='btn btn-success' style=' cursor: pointer' onclick='comprarTik(\"" + u.idVuelo + "\")'>Comprar</a>" +
                "</div>" +
                "</div>" +
            "</div>";
    ls.appendChild(div);
}
const comprarTik = (id) => {
    console.log(usuarioLog);
    if (usuarioLog !== null) {
        localStorage.setItem('idVuelo', id);
        window.location = "CompraTiquete.jsp";
    } else {

        localStorage.setItem('idVuelo', id);
        window.location = "Login.jsp";
    }
};
document.addEventListener("DOMContentLoaded", loaded);



