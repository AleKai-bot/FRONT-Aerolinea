
const compra = JSON.parse(localStorage.getItem('compra'));
var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));
let websocket = null;
const wsURI = 'ws://localhost:8080/backend/asientos';

document.addEventListener("DOMContentLoaded", () => {
    var num = compra.idTk
    console.log();
    console.log(compra);
    socketConnect(num.toString());
    document.getElementById("asientoDisp").innerText = compra.cantAsientos;
    document.getElementById("confirmarCompra").addEventListener("click", comprar);

});

function socketConnect(id) {//idVuelo
    if ('WebSocket' in window) {
        websocket = new WebSocket(wsURI);
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket(wsURI);
    } else {
        alert('Tu navegador no soporta WebSockets');
        return;
    }
    websocket.addEventListener("open", function (event) {//envia al server
        var mensaje = ["conexion", id];
        console.log("msj ", mensaje);
        websocket.send(JSON.stringify(mensaje));
    });
    websocket.addEventListener("message", function (event) {//recibe desde el servidor
        const res = JSON.parse(event.data);
        console.log("From Server ", res);
        var method = res[0];
        switch (method) {
            case "conexion":
                crearAsientos(res[1], res[2]);
                break;
            case "Desconectando":
                websocket.close();
                break;
            case "ocupar":
                crearAsientos(res[1], res[2]);//enviado lista de asientos
                break;
            case "liberar":
                crearAsientos(res[1], res[2]);
                break;
        }
    });
}

Set.prototype.difference = function (setB) {
    var difference = new Set(this);
    for (var elem of setB) {
        difference.delete(elem);
    }
    return difference;
};

const crearAsientos = (reservaDb, asientos) => {//crearAsientosAvion
    console.log();
    var arrayAsientos = [];
    var avionT = document.getElementById("totalAsi");
    avionT.innerHTML = '';
    if (reservaDb !== undefined) {
        var filas = "ABCDEF";
        var k = 6;
        var p = 6;
        arrayAsientos = reservaDb.split(',');
        const setA = new Set(arrayAsientos);//asientos desde DB
        const setB = new Set(asientos);//asientos seleccionados
        const setC = setA.difference(setB);//Resta set A-B 

        const arrayCleaned = Array.from(setC);

        document.getElementById("avionNom").innerText = "Boeing 747-400";
        for (i = 1; i <= k; i++) {
            var li = document.createElement("li");
            li.className = "row";
            var ol = document.createElement("ol");
            ol.className = "seats";
            ol.type = "A";
            li.appendChild(ol);
            for (j = 0; j < p; j++) {
                var f = filas.charAt(j);
                asiento(ol, i, f, arrayCleaned, setB);
                avionT.appendChild(li);
            }
        }
    } else {
        return;
    }
};

function asiento(ol, i, f, arr, misAsientos) {
    var idA = f + i.toString();
    var li = document.createElement("li");
    li.className = "seat";
    if (arr.includes(idA)) {
        li.innerHTML =
                `<input disabled type="checkbox" id="${idA}"/>` +
                `<label for='${idA}'>${idA}</label>`;
    } else if (misAsientos.has(idA)) {
        li.innerHTML =
                "<input checked type='checkbox' id='" + idA + "'/>" +
                "<label onclick='seleccion(" + idA + ")'for='" + idA + "'>" + idA + "</label>";

    } else {
        li.innerHTML =
                "<input type='checkbox' id='" + idA + "'/>" +
                "<label onclick='seleccion(" + idA + ")'for='" + idA + "'>" + idA + "</label>";
    }
    ol.appendChild(li);
}

const mySet = new Set();//seleccionados
const asientos = new Set();//lista de asientos

const seleccion = (e) => {//idAsiento
    if (!mySet.has(e.id) && mySet.size < compra.cantAsientos) {
        mySet.add(e.id);
        asientos.add(e.id);
        ocupar("ocupar", e.id);
        document.getElementById("asientoDisp").innerText = compra.cantAsientos - mySet.size;
        if (mySet.size === compra.cantAsientos)
            document.getElementById("asientoDisp").innerText = 0;
    } else {
        if (mySet.has(e.id)) {
            e.checked = true;
            mySet.delete(e.id);
            asientos.delete(e.id);
            liberar("liberar", e.id);
            document.getElementById("asientoDisp").innerText = compra.cantAsientos - mySet.size;
        }
        e.checked = true;
        return;
    }
};
const comprar = () => {

    const list = Array.from(asientos).join(',');
    const nombre = document.getElementById("nombrePago").value;
    const correo = document.getElementById("correoPago").value;
    compra.correo = correo;
    compra.asientos = list;
    const arrTotal = compra.totalPagar.split('$');
    var num = compra.idTk;
    const bitacora = {
        idUser: usuarioLog.idUser,
        correo: correo,
        idVuelo: num.toString(),
        asientos: list,
        total: arrTotal[1]
    };
    socketSend("confirmado", JSON.stringify(bitacora));
    window.location = "Vuelos.jsp";
};

// ====================== SOCKET ===============================================
function socketSend(method, message) {
    var cant = compra.cantAsientos;
    var mensaje = [method, message,cant.toString()];
    console.log("msj ", mensaje);
    websocket.send(JSON.stringify(mensaje));
}
function ocupar(method, idA) {
    var arr = Array.from(asientos);
    var num = compra.idTk;
    var jarr = arr.join(",");
    var mensaje = [method, idA, num.toString(), jarr];
    console.log("msj ", mensaje);
    websocket.send(JSON.stringify(mensaje));
}

function liberar(method, idA) {
    var arr = Array.from(asientos);
    var jarr = arr.join(",");
    var num = compra.idTk;
    var mensaje = [method, idA, num.toString(), jarr];
    console.log("msj ", mensaje);
    websocket.send(JSON.stringify(mensaje));
}

function closeSocket() {
    websocket.close();
}

function socketDisconnect() {
    if (websocket !== null) {
        websocket.close();
        websocket = null;
    }
}



