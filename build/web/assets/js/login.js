var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));
const  loaded = (event) => {
    renderLogin();
    
};

const renderLogin = () => {
    const loginForm = document.getElementById('login-form');
    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        const correo = document.getElementById('user').value;
        const pass = document.getElementById('password').value;
        const config = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({correo, pass})
        };
        try {
            const request = await fetch('http://localhost:8080/backend/api/users/login', config);
            const res = await request.json();
            if (res.rol == "cliente") {
                localStorage.setItem('userCliente', JSON.stringify(res));
                paginaVuelos();
            } else {
                localStorage.setItem('userAdmin', JSON.stringify(res));
                paginaAdmin();
            }
        } catch (err) {
            paginaLogin();
        }

    };
};

const paginaLogin = () => {
    window.location = "Login.jsp";
};
const paginaAdmin = () => {
    window.location = "Administracion.jsp";
};
const paginaVuelos = () => {
    window.location = "Vuelos.jsp";
};
function errorMessage(status) {
    switch (status) {
        case 404:
            return "Registro no encontrado";
        case 403:
        case 405:
            return "Usuario no autorizado";
        case 406:
            return "Registro duplicado";
    }
}


document.addEventListener("DOMContentLoaded", loaded);
