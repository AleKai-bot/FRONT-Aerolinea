const socket = {}
let websocket = null;
const wsURI = 'ws://localhost:8080/backend/user';
var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));

function socketConnect(id) {
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
        var mensaje = ["conexion", id,0];
        console.log('Msg: ',mensaje );
        websocket.send(JSON.stringify(mensaje));
    });
    websocket.addEventListener("message", function (event) {//recibe desde el servidor

        const res = JSON.parse(event.data);
        console.log("from server:  ", res);
        if (res[0] === "conexion") {
            renderTickets(res);
        }else if(res[0] === "Desconectando"){
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
}
;
const mostrarCarrito = (arr, cant) => {
    const car = document.getElementById("itemsCarrito");
    car.innerHTML = '';
    const div = document.createElement("div");
    if (arr != null) {
        arr.forEach((t) => {
            div.innerHTML += `
                <div class="card text-white border-light  mb-1 p-0" style=" border-radius: 10px;  background-color:#006bb3;">
                <div class="card-body">
                <div id="cantRem">${cant}</div>` +
                    "<div style='float:right;' onclick='socketDelete(\"" + "remove" + "\", \"" + t.idTiquete + "\", \"" + cant + "\");'><i class='fas fa-times-circle fa-2x'></i></div>" +
                    `<img src="assets/img/vuelo-3.jpg" class="card-img" style="max-height: 50px">
                        <p>No.${t.idTiquete} - USA-FRANCIA - $ ${t.precio}</p>
                        <p style="text-align: ">${t.descrip}</p>
                        </div>
                </div>`;
        });
    }
    car.appendChild(div);
}

function rowTicket(listado, ticket) {
    const div = document.createElement("div");
    div.innerHTML =
            `<div class="card text-white  mt-1" style="max-width:auto">` +
            `<img src="assets/img/vuelo-1.jpg" class="card-img" style="max-height: 250px">
            <div class="card-img-overlay" >
            <h5>No.${ticket.idTiquete}</h5> <h5>Disponibles  : <div id="disponible" class="d-inline p-2 text-white ml-auto"  style="border-radius: 20px;  background-color:#00cc00;">0</div> </h5>
                    <h4 style="text-align: center">USA-FRANCIA</h4>
                    <h4 style="text-align: center">Precio: ${ticket.precio}</h4>
                   <h4 style="text-align: center">${ticket.descrip}</h4>` +
            "<div style='border: none; float:right;' class=' d-inline p-2 text-white'><input id=\"" + ticket.idTiquete + "\" type='number' max='10' min='1' value='1' style='width:3em'> </div>" +
            "<div id='agregarCar' style='border: none; float:right;' class=' d-inline p-2 text-white' onclick='agregarCarrito(\"" + ticket.idTiquete + "\"); ' > <i class='fas fa-cart-plus fa-2x'></i></div>" +
            `</div>`;
    listado.appendChild(div);
}
document.addEventListener("DOMContentLoaded", async() => {
    //socketDisconnect();
    const id = localStorage.getItem('idVuelo');
    console.log(id);
    console.log('socket',websocket);
    if (websocket === null) {
        socketConnect(id);
    } else {
        // socketSend("reconect",id);
      console.log('reconect')
    }
    document.getElementById("metodoPago").addEventListener('click',()=>{
         window.location = "Asientos.html";
    })
});
window.addEventListener("unload", function (event) {
    console.log('abandono de pagina ');  
    socketSend("disconect",0);
    websocket.close();
});
window.onbeforeunload = function (e) {
    alert('Texto de aviso');
};

