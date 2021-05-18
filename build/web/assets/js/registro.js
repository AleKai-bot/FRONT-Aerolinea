let url = 'http://localhost:8080/backend/';
function loaded() {
    addUser();
}
const addUser = async () => {
    const formRegistro = document.getElementById('form-registro');
    formRegistro.onsubmit = async (e) => {
        e.preventDefault();
        const usuario = {
            nombre: formRegistro['nombre'].value,
            pass: formRegistro['password'].value,
            apellidos: formRegistro['apellidos'].value,
            correo: formRegistro['correo'].value,
            fechaNaci: formRegistro['nacimiento'].value,
            direc: formRegistro['direccion'].value,
            telefono: formRegistro['telefono'].value,
        };
        const config = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(usuario)
        };
        try {
            const request = await fetch(`${url}api/users/registrar`, config);
            loginPage();
        } catch (err) {
             paginaRegistro();
        }
    }
}
const loginPage = () => {
    window.location = "Login.html";
}
const paginaRegistro = () => {
    window.location = "Registro.html";
}
document.addEventListener("DOMContentLoaded", loaded);
