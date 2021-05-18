let statusEditForm = false;
var seccion = 0;
let url = 'http://localhost:8080/backend/';
var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));

const  loaded = (event) => {

    document.getElementById("btnAg").style.display = "none";
    if (usuarioLog != null) {
        document.getElementById("nombreUsuarioAdmin").innerText = usuarioLog.nombre;
    }
    const sett = document.getElementById("userConfig");
    sett.removeAttribute("hidden");

    document.getElementById("logout").addEventListener('click', () => {
        localStorage.clear();
    });
    getUsers();
    getRutas();
    getVuelos();
    getAviones();
    getHorarios();
};

function addObject() {
    switch (seccion)
    {
        case 1 :

            addUser();

            break;
        case 2 :

            addAvion();
            break;

        case 3 :
            addHorario();
            break;

        case 4 :
            addRuta();
            break;
        case 5 :
            addVuelo();
            break;
        default :
        // Declaraciones
    }
}


// ==============================USUARIOS 1=================================================
var accionU = 1;

const getUsers = () => {
    const select = document.getElementById("adminUsuarios").addEventListener("click", async () => {
        document.getElementById("btnAg").style.display = "block";
        seccion = 1;
        changeTitle();
        const response = await fetch(`${url}api/users/list`);
        const data = await response.json();
        renderUsers(data);
    });
};

const listarUsuarios = async() => {

    const response = await fetch(`${url}api/users/list`);
    const data = await response.json();
    renderUsersAux(data);
};

const renderUsers = (data) => {
    changeTitle();
    titulosUsuarios();
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    data.forEach((user) => {
        rowUsuario(listado, user);
    });
};

const renderUsersAux = (data) => {
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    data.forEach((user) => {
        rowUsuario(listado, user);
    });
};

function titulosUsuarios() {
    const titulo = document.getElementById("titulo-dato").innerText = "Usuarios";
    const tabla = document.getElementById("titulo-tabla");
    const tr = document.createElement("tr");
    tr.innerHTML =
            "<th class='th'>" + "Id" + "</th>" +
            "<th class='th'>" + "Nombre" + "</th>" +
            "<th class='th'>" + "Apellidos" + "</th>" +
            "<th class='th'>" + "Correo" + "</th>" +
            "<th class='th'>" + "F.Nacimiento" + "</th>" +
            "<th class='th'>" + "Direccion" + "</th>" +
            "<th class='th'> " + "Telefono" + "</th>";
    tabla.appendChild(tr);
}
;

function rowUsuario(listado, user) {
    var tr = document.createElement("tr");
    tr.innerHTML =
            "<td id=\"idenUser\" >" + user.idUser + "</td>" +
            "<td>" + user.nombre + "</td>" +
            "<td>" + user.apellidos + "</td>" +
            "<td>" + user.correo + "</td>" +
            "<td>" + user.fechaNaci + "</td>" +
            "<td>" + user.direc + "</td>" +
            "<td>" + user.telefono + "</td>" +
            "<div><button class='btn-sm btn-success m-2 btn-edit' onclick= 'editU(\"" + user.idUser + "\", \"" + user.nombre + "\", \"" + user.apellidos + "\", \"" + user.correo + "\", \"" + user.fechaNaci + "\", \"" + user.direc + "\", \"" + user.telefono + "\");'><i class='far fa-edit'></i></button></div>" +
            "<div><button class='btn-sm btn-danger m-2 btn-delete'  onclick='deleteUser(\"" + user.idUser + "\"); '><i class='fas fa-trash-alt'></i></button></div>" +
            "</td>";
    listado.appendChild(tr);
}
;

function editU(id, nom, ape, co, fe, di, tel) {
    accionU = 1;
    document.getElementById("idUser").disabled = true;
    document.getElementById("idUser").value = id;
    document.getElementById("nomU").value = nom;
    document.getElementById("apeU").value = ape;
    document.getElementById("mail").value = co;
    document.getElementById("naci").value = fe;
    document.getElementById("direc").value = di;
    document.getElementById("tel").value = tel;
    if (accionU) {
        document.getElementById("listoUE").style.display = "block";
        document.getElementById("listoUA").style.display = "none";
    }
    $('#user-id-1').modal('show');
}
;

const actualizarUser = async() => {
    const user = {
        idUser: document.getElementById("idUser").value,
        nombre: document.getElementById("nomU").value,
        apellidos: document.getElementById("apeU").value,
        correo: document.getElementById("mail").value,
        fechaNaci: document.getElementById("naci").value,
        direc: document.getElementById("direc").value,
        telefono: document.getElementById("tel").value
    };
    const config = {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    };
    try {
        const request = await fetch(`${url}api/users/actualizar`, config);
        listarUsuarios();
    } catch (err) {
        console.log(err);
    }
};

function addUser() {


    accionU = 0;
    document.getElementById("idUser").disabled = true;
    document.getElementById("idUser").value = "Valor por defecto...";
    document.getElementById("nomU").value = "";
    document.getElementById("apeU").value = "";
    document.getElementById("mail").value = "";
    document.getElementById("naci").value = "";
    document.getElementById("direc").value = "";
    document.getElementById("tel").value = "";
    if (!accionU) {
        document.getElementById("listoUA").style.display = "block";
        document.getElementById("listoUE").style.display = "none";
    }
    $('#user-id-1').modal('show');
}
;

const agregarU = async () => {
    const user = {
        nombre: document.getElementById("nomU").value,
        apellidos: document.getElementById("apeU").value,
        correo: document.getElementById("mail").value,
        fechaNaci: document.getElementById("naci").value,
        direc: document.getElementById("direc").value,
        telefono: document.getElementById("tel").value
    };
    const config = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(user)
    };
    try {
        const request = await fetch(`${url}api/users/registrar`, config);
        listarUsuarios();
    } catch (err) {
        console.log(err);
    }
};

const  deleteUser = async (idUser) => {
    const config = {
        method: 'DELETE'
    };
    try {
        const request = await fetch(`${url}api/users/delete/` + idUser, config);
        listarUsuarios();
    } catch (err) {
        console.log(err);
    }
};


const changeTitle = () => {
    const titulos = document.getElementById("titulo-tabla").querySelectorAll(".th");
    const arr = Array.from(titulos);
    arr.map((e) => {
        e.remove();
    });
};

// ==============================AVIONES 2==================================================


var accion = 1;

const getAviones = () => {
    const selectA = document.getElementById("adminAviones").addEventListener("click", async () => {
        document.getElementById("btnAg").style.display = "block";
        seccion = 2;
        changetitle();
        const rsA = await fetch(`${url}api/aviones/list`);
        const dataA = await rsA.json();
        renderAviones(dataA);
    });
};

const renderAviones = (data) => {
    changetitle();
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    data.forEach((v) => {
        rowAvion(listado, v);
    });
    titulosAviones();
};

const renderAvionesAux = (data) => {
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    data.forEach((v) => {
        rowAvion(listado, v);
    });
};

function titulosAviones() {
    var titulo = document.getElementById("titulo-dato");
    titulo.innerText = "Aviones";
    var titulos = document.getElementById("titulo-tabla");
    var tr = document.createElement("tr");
    tr.innerHTML =
            "<th class='th'>" + "Id" + "</th>" +
            "<th class='th'>" + "Año" + "</th>" +
            "<th class='th'>" + "Modelo" + "</th>" +
            "<th class='th'>" + "Marca" + "</th>" +
            "<th class='th'>" + "Cant.Fila" + "</th>" +
            "<th class='th'>" + "Cant.Asientos" + "</th>";
    titulos.appendChild(tr);
}
;

function rowAvion(listado, user) {
    var tr = document.createElement("tr");
    tr.innerHTML =
            "<td id=\"tdEdit\" >" + user.idAvion + "</td>" +
            "<td id=\"anno\">" + user.anno + "</td>" +
            "<td id=\"modelo\">" + user.model + "</td>" +
            "<td id=\"marca\">" + user.marca + "</td>" +
            "<td id=\"cantF\">" + user.cantFila + "</td>" +
            "<td id=\"cantAs\">" + user.cantAsci + "</td>" +
            "<td>" +
            "<div><button class='btn-sm btn-success m-2 btn-editA' onclick= 'editA(\"" + user.idAvion + "\", \"" + user.anno + "\", \"" + user.model + "\", \"" + user.marca + "\", \"" + user.cantFila + "\", \"" + user.cantAsci + "\");'><i class='far fa-edit'></i></button></div>" +
            "<div><button class='btn-sm btn-danger m-2 btn-deleteA'  onclick= 'deleteAvion(\"" + user.idAvion + "\");' ><i class='fas fa-trash-alt'></i></button></div>" +
            "</td>";
    listado.appendChild(tr);
}
;

function editA(id, an, mo, ma, fi, as) {
    accion = 1;
    document.getElementById("idAvion").disabled = true;
    document.getElementById("idAvion").value = id;
    document.getElementById("annooo").value = an;
    document.getElementById("model").value = mo;
    document.getElementById("marcaaa").value = ma;
    document.getElementById("cantFila").value = fi;
    document.getElementById("cantAsci").value = as;
    if (accion) {
        document.getElementById("listo").style.display = "block";
        document.getElementById("listoA").style.display = "none";
    }
    $('#user-id-2').modal('show');
}
;


function addAvion() {
    accion = 0;
    document.getElementById("idAvion").disabled = false;
    document.getElementById("idAvion").value = "";
    document.getElementById("annooo").value = "";
    document.getElementById("model").value = "";
    document.getElementById("marcaaa").value = "";
    document.getElementById("cantFila").value = "";
    document.getElementById("cantAsci").value = "";
    if (!accion) {
        document.getElementById("listoA").style.display = "block";
        document.getElementById("listo").style.display = "none";
    }
    $('#user-id-2').modal('show');
}
;

const actualizarA = async() => {
    const avion = {
        idAvion: document.getElementById("idAvion").value,
        anno: document.getElementById("annooo").value,
        model: document.getElementById("model").value,
        marca: document.getElementById("marcaaa").value,
        cantFila: document.getElementById("cantFila").value,
        cantAsci: document.getElementById("cantAsci").value
    };
    const config = {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(avion)
    };
    try {
        const request = await fetch(`${url}api/aviones/actualizar`, config);
        listarAviones();
    } catch (err) {
        console.log(err);
    }
};

const listarAviones = async() => {
    const response = await fetch(`${url}api/aviones/list`);
    const data = await response.json();
    renderAvionesAux(data);
};


const  deleteAvion = async (idAvion) => {

    const config = {
        method: 'DELETE'
    };
    try {
        const request = await fetch(`${url}api/aviones/delete/` + idAvion, config);
        listarAviones();
    } catch (err) {
        console.log(err);
    }
};


const agregarA = async () => {
    const avion = {
        idAvion: document.getElementById("idAvion").value,
        anno: document.getElementById("annooo").value,
        model: document.getElementById("model").value,
        marca: document.getElementById("marcaaa").value,
        cantFila: document.getElementById("cantFila").value,
        cantAsci: document.getElementById("cantAsci").value
    };
    const config = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(avion)
    };
    try {
        const request = await fetch(`${url}api/aviones/registrar`, config);
        listarAviones();
    } catch (err) {
        console.log(err);
    }

};

// ===========================HORARIOS 3====================================================

var accionH = 1;

const getHorarios = () => {
    const select = document.getElementById("adminHorarios").addEventListener("click", async () => {
        document.getElementById("btnAg").style.display = "block";
        seccion = 3;
        changetitle();
        const response = await fetch(`${url}api/horarios/list`);
        const data = await response.json();
        renderHorarios(data);
    });
};


const renderHorarios = (data) => {
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    data.forEach((v) => {
        rowHorario(listado, v);
    });
    titulosHorarios();
};

const renderHorariosAux = (data) => {
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    data.forEach((v) => {
        rowHorario(listado, v);
    });
};


const listarHorarios = async() => {
    const response = await fetch(`${url}api/horarios/list`);
    const data = await response.json();
    renderHorariosAux(data);
};

const listarHorariosAux = async() => {
    const response = await fetch(`${url}api/horarios/list`);
    const data = await response.json();
    renderHorariosEnRuta(data);
};

const listarAvionesAux = async() => {
    const response = await fetch(`${url}api/aviones/list`);
    const data = await response.json();
    renderAvionesEnRuta(data);
};

function titulosHorarios() {
    var titulo = document.getElementById("titulo-dato");
    titulo.innerText = "Horarios";
    var titulos = document.getElementById("titulo-tabla");
    var tr = document.createElement("tr");
    tr.innerHTML =
            "<th class='th'>" + "Id" + "</th>" +
            "<th class='th'>" + "F.Salida" + "</th>" +
            "<th class='th'>" + "F.Llegada" + "</th>" +
            "<th class='th'>" + "Hora Salida" + "</th>";
    ;
    titulos.appendChild(tr);
}
;

function rowHorario(ls, u) {

    var tr = document.createElement("tr");
    tr.innerHTML =
            "<td >" + u.idHora + "</td>" +
            "<td >" + u.fechaSali + "</td>" +
            "<td >" + u.fechaLlega + "</td>" +
            "<td >" + u.hora_salida + "</td>" +
            "<div><button class='btn-sm btn-success m-2' onclick= 'editH(\"" + u.idHora + "\", \"" + u.fechaSali + "\", \"" + u.fechaLlega + "\", \"" + u.hora_salida + "\");'><i class='far fa-edit'></i></button></div>" +
            "<div><button class='btn-sm btn-danger m-2' onclick= 'deleteHorario(\"" + u.idHora + "\")' ><i class='fas fa-trash-alt'></i></button></div>" +
            "</td>";
    ls.appendChild(tr);
}
;

function editH(id, fi, fre, hsalida) {
    accionH = 1;
    document.getElementById("idH").disabled = true;
    document.getElementById("idH").value = id;
    document.getElementById("fi").value = fi;
    document.getElementById("fre").value = fre;
    document.getElementById("hsalida").value = hsalida;

    if (accionH) {
        document.getElementById("listoHE").style.display = "block";
        document.getElementById("listoHA").style.display = "none";
    }
    $('#user-id-3').modal('show');
}
;

function addHorario() {
    accionH = 0;
    document.getElementById("idH").disabled = false;
    document.getElementById("idH").value = "";
    document.getElementById("fi").value = "";
    document.getElementById("fre").value = "";
    document.getElementById("hsalida").value = "";
    if (!accionH) {
        document.getElementById("listoHA").style.display = "block";
        document.getElementById("listoHE").style.display = "none";
    }
    $('#user-id-3').modal('show');
}
;

const actualizarH = async() => {
    const horario = {
        idHora: document.getElementById("idH").value,
        fechaSali: document.getElementById("fre").value,
        fechaLlega: document.getElementById("fi").value,
        hora_salida: document.getElementById("hsalida").value
    };
    const config = {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(horario)
    };
    try {
        const request = await fetch(`${url}api/horarios/actualizar`, config);
        listarHorarios();
    } catch (err) {
        console.log(err);
    }
};

const agregarH = async () => {
    const horario = {
        idHora: document.getElementById("idH").value,
        fechaSali: document.getElementById("fi").value,
        fechaLlega: document.getElementById("fre").value,
        hora_salida: document.getElementById("hsalida").value
    };
    const config = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(horario)
    };
    try {
        const request = await fetch(`${url}api/horarios/registrar`, config);
        listarHorarios();
    } catch (err) {
        console.log(err);
    }
};

const  deleteHorario = async (idHora) => {
    const config = {
        method: 'DELETE'
    };
    try {
        const request = await fetch(`${url}api/horarios/delete/` + idHora, config);
        listarHorarios();
    } catch (err) {
        console.log(err);
    }
};


// ==============================RUTAS 4================================================

var accionR = 1;
var limpia = 1;

const getRutas = () => {
    const select = document.getElementById("adminRutas").addEventListener("click", async () => {
        document.getElementById("btnAg").style.display = "block";
        seccion = 4;
        changeTitle();
        const response = await fetch(`${url}api/rutas/list`);
        const data = await response.json();
        renderRutas(data);
    });
};
const renderRutas = (rutas) => {
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    rutas.forEach((v) => {
        rowRuta(listado, v);
    });
    titulosRuta();
};
function titulosRuta() {
    document.getElementById("titulo-dato").innerText = "Rutas";
    var titulos = document.getElementById("titulo-tabla");
    var tr = document.createElement("tr");
    tr.innerHTML =
            "<th class='th'>" + "Id" + "</th>" +
            "<th class='th'>" + "Origen" + "</th>" +
            "<th class='th'>" + "Destino" + "</th>" +
            "<th class='th'>" + "Descripción" + "</th>" +
            "<th class='th'>" + "Duración Aprox" + "</th>" +
            "<th class='th'>" + "Avión" + "</th>" +
            "<th class='th'>" + "Horario" + "</th>";
    titulos.appendChild(tr);
}
;

function rowRuta(ls, u) {
    var tr = document.createElement("tr");

    const date1 = new Date(u.horario.fechaLlega);
    const date2 = new Date(u.horario.fechaSali);
    const salida = date1.toLocaleDateString('en-US');
    const regreso = date2.toLocaleDateString('en-US');
    var difference = Math.abs(date2 - date1);
    days = difference / (1000 * 3600 * 24);

    tr.innerHTML =
            "<td >" + u.idRut + "</td>" +
            "<td >" + u.ori + "</td>" +
            "<td >" + u.des + "</td>" +
            "<td >" + u.descripcion + "</td>" +
            "<td >  Dias: " + days + "</td>" +
            "<td >Placa:" + u.avion.idAvion + " Modelo: " + u.avion.model + "</td>" +
            "<td >Salida: " + salida + " Regreso: " + regreso + "</td>" +
            "<div><button class='btn-sm btn-success m-2'  onclick= 'editR(\"" + u.idRut + "\", \"" + u.ori + "\", \"" + u.des + "\", \"" + u.descripcion + "\", \"" + days + "\",  \"" + u.idAvion + "\", \"" + u.horario.idHora + "\", \"" + u.horario.fechaLlega + "\" );'><i class='far fa-edit'></i></button></div>" +
            "<div><button class='btn-sm btn-danger m-2' onclick= 'deleteRuta(\"" + u.idRut + "\")'><i class='fas fa-trash-alt'></i></button></div>" +
            "</td>";
    ls.appendChild(tr);
}
;

const  deleteRuta = async (idRut) => {
    const config = {
        method: 'DELETE'
    };
    try {
        const request = await fetch(`${url}api/rutas/delete/` + idRut, config);
        listarRutas();
    } catch (err) {
        console.log(err);
    }
};


function editR(id, orig, des, descripcion, duracion, avion, horario) {
    accionR = 1;
    document.getElementById("idRuta").disabled = true;
    document.getElementById("idRuta").value = id;
    document.getElementById("orig").value = orig;
    document.getElementById("des").value = des;
    document.getElementById("descrip").value = descripcion;
    document.getElementById("aprox").value = duracion;
    document.getElementById("avionOpcion").value = avion;
    document.getElementById("horaOpcion").value = horario;
    if (accionR) {
        document.getElementById("listoRE").style.display = "block";
        document.getElementById("listoRA").style.display = "none";
    }
    document.getElementById("avionOpcion").innerHTML = "";
    document.getElementById("horaOpcion").innerHTML = "";
    listarHorariosAux();
    listarAvionesAux();
    $('#user-id-5').modal('show');
}
;
const renderHorariosEnRuta = (data) => {
    data.forEach(horario => {
        var option = "Salida : " + horario.fechaSali + " a las : " + horario.hora_salida + " Llegada : " + horario.fechaLlega;
        $("#horaOpcion").append("<option value='" + horario.idHora + "'>" + option + " </option>");
    });
};

const renderAvionesEnRuta = (data) => {
    data.forEach(avion => {
        var option = "Placa: " + avion.idAvion + " Modelo: " + avion.model;
        $("#avionOpcion").append("<option value='" + avion.idAvion + "'>" + option + " </option>");
    });
};

const editRE = async() => {
    const ruta = {
        idRut: document.getElementById("idRuta").value,
        ori: document.getElementById("orig").value,
        des: document.getElementById("des").value,
        descripcion: document.getElementById("descrip").value,
        duracion: document.getElementById("aprox").value,
        idAvion: document.getElementById("avionOpcion").value,
        idHorario: document.getElementById("horaOpcion").value
    };
    const config = {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(ruta)
    };
    try {
        const request = await fetch(`${url}api/rutas/actualizar`, config);
        listarRutas();
    } catch (err) {
        console.log(err);
    }
};

const agregarRA = async() => {
    const ruta = {
        idRut: document.getElementById("idRuta").value,
        ori: document.getElementById("orig").value,
        des: document.getElementById("des").value,
        descripcion: document.getElementById("descrip").value,
        duracion: document.getElementById("aprox").value,
        idAvion: document.getElementById("avionOpcion").value,
        idHorario: document.getElementById("horaOpcion").value
    };
    const config = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(ruta)
    };
    try {
        const request = await fetch(`${url}api/rutas/registrar`, config);
        listarRutas();
    } catch (err) {
        console.log(err);
    }
};


const renderRutasAux = (data) => {
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    data.forEach((v) => {
        rowRuta(listado, v);
    });
};

const listarRutas = async() => {
    const response = await fetch(`${url}api/rutas/list`);
    const data = await response.json();
    renderRutasAux(data);
};

function addRuta() {
    accionR = 0;
    document.getElementById("idRuta").disabled = false;
    document.getElementById("idRuta").value = "";
    document.getElementById("orig").value = "";
    document.getElementById("des").value = "";
    document.getElementById("descrip").value = "";
    document.getElementById("aprox").disabled = true;
    document.getElementById("aprox").value = "";
    document.getElementById("avionOpcion").disabled = false;
    document.getElementById("avionOpcion").value = "";
    document.getElementById("horaOpcion").value = "";
    if (!accionR) {
        document.getElementById("listoRA").style.display = "block";
        document.getElementById("listoRE").style.display = "none";
    }
    document.getElementById("avionOpcion").innerHTML = "";
    document.getElementById("horaOpcion").innerHTML = "";
    listarHorariosAux();
    listarAvionesAux();
    $('#user-id-5').modal('show');
}
;







// =================================VUELOS 5==========================================

var accionV = 1;

const getVuelos = () => {
    const select = document.getElementById("adminVuelos").addEventListener("click", async () => {
        document.getElementById("btnAg").style.display = "block";
        seccion = 5;
        changeTitle();
        const response = await fetch(`${url}api/vuelos/list`);
        const data = await response.json();
        renderVuelos(data);
    });
};
const renderVuelos = (data) => {
    titulosVuelos();
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    data.forEach((v) => {
        rowVuelos(listado, v);
    });

};

const renderVuelosAux = (data) => {
    var listado = document.getElementById("lista-admin");
    listado.innerHTML = "";
    data.forEach((v) => {
        rowVuelos(listado, v);
    });
};

const listarVuelos = async() => {
    const response = await fetch(`${url}api/vuelos/list`);
    const data = await response.json();
    renderVuelosAux(data);
};

function titulosVuelos() {
    var titulo = document.getElementById("titulo-dato");
    titulo.innerText = "Vuelos";
    var titulos = document.getElementById("titulo-tabla");
    var tr = document.createElement("tr");
    tr.innerHTML =
            "<th class='th'>" + "Id" + "</th>" +
            "<th class='th'>" + "Origen" + "</th>" +
            "<th class='th'>" + "Destino" + "</th>" +
            "<th class='th'>" + "Cant.Pasajeros" + "</th>" +
            "<th class='th'> " + "Duracion " + "</th>" +
            "<th class='th'>" + "Horario" + "</th>" +
            "<th class='th'>" + "Ruta" + "</th>";
    titulos.appendChild(tr);
}
;

function rowVuelos(ls, u) {
    var tr = document.createElement("tr");
    const date1 = new Date(u.ruta_vuelo.horario.fechaLlega);
    const date2 = new Date(u.ruta_vuelo.horario.fechaSali);
    const salida = date1.toLocaleDateString('en-US');
    const regreso = date2.toLocaleDateString('en-US');

    var difference = Math.abs(date2 - date1);
    const days = difference / (1000 * 3600 * 24);

     
    tr.innerHTML =
            "<td  >" + u.idVuelo + "</td>" +
            "<td >" + u.ori + "</td>" +
            "<td >" + u.desti + "</td>" +
            "<td >" + u.cantPasa + "</td>" +
            "<td > Dias: " + days + "</td>" +
            "<td >Salida: " + salida + " Regreso: " + regreso + "</td>" +
            "<td >" + u.ruta_vuelo.descripcion + "</td>" +
            "<div><button class='btn-sm btn-success m-2' onclick= 'editV(\"" + u.idVuelo + "\", \"" + u.ori + "\", \"" + u.desti + "\",  \"" + u.cantPasa + "\", \"" + days + "\", \"" + u.horario + "\", \"" + u.ruta + "\");'><i class='far fa-edit'></i></button></div>" +
            "<div><button class='btn-sm btn-danger m-2'  onclick= 'deleteVuelo(\"" + u.idVuelo + "\")' ><i class='fas fa-trash-alt'></i></button></div>" +
            "</td>";
    ls.appendChild(tr);
}
;

async function editV(id, ori, desti, cantPasa, duracion, horario, ruta) {
    accionV = 1;
    document.getElementById("idVuelo").disabled = true;
    document.getElementById("idVuelo").value = id;
    document.getElementById("ori").value = ori;
    document.getElementById("desti").value = desti;
    document.getElementById("cantPasa").value = cantPasa;
    document.getElementById("duracion").value = duracion;
    document.getElementById("horaOpcion").value = horario;
    document.getElementById("rutasOpcion").value = ruta;
    if (accionV) {
        document.getElementById("listoVE").style.display = "block";
        document.getElementById("listoVA").style.display = "none";
    }
    document.getElementById("rutasOpcion").innerHTML = "";
    var txt = {
        x: ori,
        y: desti
    };
    await listarRutasAux(txt);

    $('#user-id-4').modal('show');
}
;

const listarRutasAux = async(obj) => {

    if (obj) {
        const response = await fetch(`${url}api/rutas/byOriDes/` + obj.x + `/` + obj.y);
        const data = await response.json();
        renderRutasEnVuelos(data);
    } else {

        const response = await fetch(`${url}api/rutas/list`);
        const data = await response.json();
        renderRutasEnVuelos(data);
    }
};
const renderRutasEnVuelos = (data) => {



    data.forEach(ruta => {
        console.log(ruta);
        const date1 = new Date(ruta.horario.fechaLlega);
        const date2 = new Date(ruta.horario.fechaSali);
        const salida = date1.toLocaleDateString('en-US');
        const regreso = date2.toLocaleDateString('en-US');

        var difference = Math.abs(date2 - date1);
        const days = difference / (1000 * 3600 * 24);

        var option = "" + ruta.descripcion + " / Dias de Duración: " + days;
        $("#rutasOpcion").append("<option value='" + ruta.idRut + "'>" + option + " </option>");
    });
};
function addVuelo() {
    accionV = 0;
    document.getElementById("idVuelo").disabled = true;
    document.getElementById("idVuelo").value = "Valor por defecto";
    document.getElementById("ori").value = "";
    document.getElementById("desti").value = "";
    document.getElementById("cantPasa").value = "";
    document.getElementById("duracion").value = "";
    document.getElementById("horaOpcion").value = "";
    document.getElementById("rutasOpcion").value = "";
    if (!accionV) {
        document.getElementById("listoVA").style.display = "block";
        document.getElementById("listoVE").style.display = "none";
    }
    document.getElementById("rutasOpcion").innerHTML = "";
    listarRutasAux();
    $('#user-id-4').modal('show');
}
;

const editVE = async() => {

    const vuelo = {
        idVuelo: document.getElementById("idVuelo").value,
        ori: document.getElementById("ori").value,
        desti: document.getElementById("desti").value,
        cantPasa: document.getElementById("cantPasa").value,
        horario: document.getElementById("horaOpcion").value,
        ruta: document.getElementById("rutasOpcion").value
    };
    const config = {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(vuelo)
    };
    try {
        const request = await fetch(`${url}api/vuelos/actualizar`, config);
        listarVuelos();
    } catch (err) {
        console.log(err);
    }
};

const  deleteVuelo = async (idVuelo) => {
    const config = {
        method: 'DELETE'
    };
    try {
        const request = await fetch(`${url}api/vuelos/delete/` + idVuelo, config);
        listarVuelos();
    } catch (err) {
        console.log(err);
    }
};


const agregarVA = async () => {
    const vuelo = {
        idVuelo: document.getElementById("idVuelo").value,
        ori: document.getElementById("ori").value,
        desti: document.getElementById("desti").value,
        cantPasa: document.getElementById("cantPasa").value,
        horario: document.getElementById("horaOpcion").value,
        ruta: document.getElementById("rutasOpcion").value
    };
    const config = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(vuelo)
    };
    try {
        const request = await fetch(`${url}api/vuelos/registrar`, config);
        listarVuelos();
    } catch (err) {
        console.log(err);
    }
};



const changetitle = () => {
    var titulos = document.getElementById("titulo-tabla").querySelectorAll(".th");
    const arr = Array.from(titulos);
    arr.map((e) => {
        e.remove();
    });
};

document.addEventListener("DOMContentLoaded", loaded);
// Barra de busqueda
(function (document) {
    'use strict';
    var LightTableFilter = (function (Arr) {
        var _input;
        function _onInputEvent(e) {
            _input = e.target;
            var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
            Arr.forEach.call(tables, function (table) {
                Arr.forEach.call(table.tBodies, function (tbody) {
                    Arr.forEach.call(tbody.rows, _filter);
                });
            });
        }
        function _filter(row) {
            var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
            row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
        }
        return {
            init: function () {
                var inputs = document.getElementsByClassName('light-table-filter');
                Arr.forEach.call(inputs, function (input) {
                    input.oninput = _onInputEvent;
                });
            }
        };
    })(Array.prototype);
    document.addEventListener('readystatechange', function () {
        if (document.readyState === 'complete') {
            LightTableFilter.init();
        }
    });

})(document);