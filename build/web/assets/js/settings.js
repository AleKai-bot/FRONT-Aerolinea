let url = 'http://localhost:8080/backend/';
var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));

function loaded(event) {
    setting();
    actualizarUser();
}
const setting = async() => {
    console.log("User ",usuarioLog);
    const response = await fetch(`${url}api/users/edit/${usuarioLog.idUser}`);
    const data = await response.json();
    console.log("Data "+data);
    editarSetting(data);
}
function editarSetting(user) {
    document.getElementById("nombre").value = user.nombre;
    document.getElementById("apellidos").value = user.apellidos;
    document.getElementById("correo").value = user.correo;
    document.getElementById("nacimiento").value = user.fechaNaci;
    document.getElementById("direccion").value = user.direc;
    document.getElementById("tel").value = user.telefono;

}
const actualizarUser = () => {
    document.getElementById("formSetting").onsubmit = async(e) => {
        e.preventDefault();
        const user = {
            idUser: usuarioLog.idUser,
            pass: document.getElementById("password").value,
            nombre: document.getElementById("nombre").value,
            apellidos: document.getElementById("apellidos").value,
            correo: document.getElementById("correo").value,
            fechaNaci: document.getElementById("nacimiento").value,
            direc: document.getElementById("direccion").value,
            telefono: document.getElementById("tel").value,
            rol: usuarioLog.rol
        };
        const config = {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(user)
        };
        try {
            const request = await fetch(`${url}api/users/actualizar`, config);
            const msg = document.getElementById("msgSuccess");
            msg.removeAttribute("hidden");
            const div = document.getElementById("msgTextSuccess");
            div.textContent = "Datos actualizados con exito!";
        } catch (err) {
            const msg = document.getElementById("msgWarning");
            msg.removeAttribute("hidden");
            const div = document.getElementById("msgTextWarning");
            div.textContent = "Ha ocurrido un error!";
        }
    }

};
//
document.addEventListener("DOMContentLoaded", loaded);
