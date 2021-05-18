var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));

function loaded(event) {
    if (usuarioLog != null) {
        if (usuarioLog.rol == "cliente" || usuarioLog.rol == "admin") {
            const menuLog = document.getElementById("loginOption");
            menuLog.remove();
            const logContent = document.getElementById("logContent");
            logContent.innerHTML = `<a id="logout" class="btn btn-light action-button" role="button" href="/Lab01-Front-End/index.jsp">Logout</a>`;
            document.getElementById("nombreUsuarioCliente").innerText = usuarioLog.nombre;
            document.getElementById("logout").addEventListener('click', () => {
                localStorage.clear();
            });
        }
    } else {

    }
}
document.addEventListener("DOMContentLoaded", loaded);
