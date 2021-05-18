var idTiq = 0;
let websocket = null;
const wsURI = 'ws://localhost:8080/backend/user';
var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));
const  loaded = (event) => {
     hideButton();
    const id = localStorage.getItem('idVuelo');
    if (websocket === null) {
        socketConnect(id);
    } else {
        console.log('reconect');
    }
   
    const bt = document.getElementById("irAsientos").addEventListener("click", seleccionAsiento);
};

function hideButton() {
    var x = document.getElementById("irAsientos");
    x.style.display = "none";
}

function showButton() {
    var x = document.getElementById("irAsientos");
    x.style.display = "block";
}

function socketConnect(id) {//idTiquete
    if ('WebSocket' in window) {
        websocket = new WebSocket(wsURI);
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket(wsURI);
    } else {
        alert('Tu navegador no soporta WebSockets');
        return;
    }
    websocket.addEventListener("open", function (event) {//envia al server
        console.log('conneccted...');
        var mensaje = ["conexion", id, 0];
        console.log('Msg: ', mensaje);
        websocket.send(JSON.stringify(mensaje));
    });
    websocket.addEventListener("message", function (event) {//recibe desde el servidor

        const res = JSON.parse(event.data);
        console.log("from server:  ", res);
        if (res[0] === "Desconectando") {
            console.log("Desconectando");
            websocket.close();
        } else {
            
            renderTicketsCar(res);
        }
    });
}
function socketSend(method, message) {
    var mensaje = [method, message];
    console.log('enviando : ', mensaje);
    websocket.send(JSON.stringify(mensaje));
}
function socketDelete(method, message, cant) {
    hideButton();
    var message = [method, message, cant];
    websocket.send(JSON.stringify(message));
}
function socketInsert() {
    var message = ["/insert", JSON.stringify(objeto)];
    websocket.send(JSON.stringify(message));
}
function socketUpdate() {
    var message = ["/update", JSON.stringify(objeto)];
    websocket.send(JSON.stringify(message));
}
function closeSocket() {
    websocket.close();
}
function socketDisconnect() {
    if (websocket != null) {
        websocket.close();
        websocket = null;
    }
}

const renderTickets = (data) => {
    
    const total = document.getElementById("totalCompra");
    const listado = document.getElementById("tickets");
    listado.innerHTML = '';
    data[1].forEach((t) => {
        rowTicket(listado, t);
    });
    const disponible = document.getElementById("disponible");

    if (data[2] === 0) {
        disponible.style = "border-radius: 10px; background-color:red";
        document.getElementById("agregarCar").removeAttribute("onclick");
        document.getElementById("agregarCar").addEventListener('click', () => {
            alert("No disponible, Gracias por preferirnos...");
        })
    } else {
        disponible.style = "border-radius: 10px; background-color:#00cc00";
    }
    disponible.textContent = data[2];
};

const renderTicketsCar = (data) => {
    const dataarr = data[0];
    idTiq = dataarr[0].idTiquete;
    const total = document.getElementById("totalCompra");
    total.textContent = '$' + data[1];

    const listado = document.getElementById("tickets");
    listado.innerHTML = '';

    data[0].forEach((t) => {
        rowTicket(listado, t);
    });

    const disponible = document.getElementById("disponible");

    if (data[3] === 0) {//disponible
        console.log('disp : 0');
        disponible.textContent = data[3];
        document.getElementById("agregarCar").removeAttribute("onclick");
        disponible.style = "border-radius: 10px; background-color:red";
        document.getElementById("agregarCar").addEventListener('click', () => {
            alert("No disponible, Gracias por preferirnos...");
        })
    } else {
        disponible.style = "border-radius: 10px; background-color:#00cc00";
        disponible.textContent = data[3];

    }
    if (data[1] !== 0) {//total
        mostrarCarrito(data[0], data[2]);
    } else {
        const car = document.getElementById("itemsCarrito");
        car.innerHTML = '';
    }
};

function agregarCarrito(id) {

    const cant = document.getElementById(id.toString()).value;
    var mensaje = ["addToCar", id, cant];
    console.log('Add carrito :', mensaje);
    websocket.send(JSON.stringify(mensaje));
    showButton();
}
;
const mostrarCarrito = (arr, cant) => {
    const car = document.getElementById("itemsCarrito");
    car.innerHTML = '';
    const div = document.createElement("div");
    if (arr != null) {
        arr.forEach((t) => {
            div.innerHTML += `
                <div class="card text-white border-light  mb-1 p-0" style=" border-radius: 10px;  background-color:#000;">
                <div class="card-body">
                <div id="cantRem">${cant}</div>` +
                    "<div style='float:right;' onclick='socketDelete(\"" + "remove" + "\", \"" + t.idTiquete + "\", \"" + cant + "\");'><i class='fas fa-times-circle fa-2x'></i></div>" +
                    `<img src="assets/img/planeTicket.png" class="card-img" style="max-height: 150px">
                        <p>No.${t.idTiquete} - USA-FRANCIA - $ ${t.precio}</p>
                        <p style="text-align: ">${t.descrip}</p>
                        </div>
                </div>`;
        });
    }
    car.appendChild(div);
};

function rowTicket(listado, ticket) {
    const div = document.createElement("div");
    div.innerHTML =
            `<div class="card text-black  mt-1" style="max-width:auto">` +
            `<img src="assets/img/tiquete.png" class="card-img" style="max-height: 250px">
            <div class="card-img-overlay" >
            <h5>No.${ticket.idTiquete}</h5> <h5>Disponibles  : <div id="disponible" class="d-inline p-2 text-white ml-auto"  style="border-radius: 20px;  background-color:#00cc00;">0</div> </h5>
                    <h4 style="text-align: center">USA-FRANCIA</h4>
                    <h4 style="text-align: center">Precio: ${ticket.precio}</h4>
                   <h4 style="text-align: center">${ticket.descrip}</h4>` +
            "<div style='border: none; float:right;' class=' d-inline p-2 text-white'><input id=\"" + ticket.idTiquete + "\" type='number' max='10' min='1' value='1' style='width:3em'> </div>" +
            "<div id='agregarCar' style='border: none; float:right;' class=' d-inline p-2 text-white' onclick='agregarCarrito(\"" + ticket.idTiquete + "\"); ' > <i style='color:#000;'class='fas fa-cart-plus fa-2x' ></i></div>" +
            `</div>`;
    listado.appendChild(div);
}

window.addEventListener("unload", function (event) {
    console.log('abandono de pagina ');
    socketSend("disconect", 0);
    websocket.close();
});
window.onbeforeunload = function (e) {
    alert('Texto de aviso');
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const seleccionAsiento = () => {
    const compra = {
        idU: usuarioLog.idUser,
        idTk: idTiq,
        totalPagar: document.getElementById("totalCompra").textContent,
        cantAsientos: document.getElementById("cantRem").textContent,
    }
    localStorage.setItem('compra', JSON.stringify(compra));
    window.location = "Asientos.jsp"
}
document.addEventListener("DOMContentLoaded", loaded);