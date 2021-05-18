<%-- 
    Document   : headerCliente
    Created on : 12-abr-2021, 0:29:02
    Author     : Alejandro-PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>

<link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bitter:400,700" />
<link rel="stylesheet" href="assets/fonts/font-awesome.min.css" />
<link rel="stylesheet" href="assets/css/Header-Dark.css"/>
<link rel="stylesheet" href="assets/css/styles.css" />
<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
<script src="assets/bootstrap/js/jquery.min.js"></script>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bitter:400,700">
<link rel="stylesheet" href="assets/css/Registration-Form-with-Photo.css">
<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
<link href="assets/css/asientosStyle.css" rel="stylesheet" type="text/css"/>
<script src="assets/bootstrap/js/jquery.min.js"></script>
<script src="assets/bootstrap/js/bootstrap.min.js"></script>  

<header class="header-dark ">

    <nav class="navbar navbar-dark navbar-expand-lg navigation-clean-search">
        <div class=" fst-italic fs-4 text-center m-2" style="width: 6rem; border-radius: 3px; background-color: #0086b3;"  id="nombreUsuarioCliente"></div>
        <div id="userConfig" hidden> <a href="Settings.jsp" ><i class="fas fa-user-cog fa-2x"></i> </a></div>

        <div class="container">
            <a class="navbar-brand" href="/Lab01-Front-End/index.jsp">AEROLINEA</a >
            <button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1">
                <span class="sr-only">Toggle navigation</span
                ><span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav">
                    <li class="nav-item" hidden id="optionAdmin"><a class="nav-link" href="/Lab01-Front-End/Administracion.jsp">Administracion</a> </li>
                    <li class="nav-item">
                        <a class="nav-link" href="Vuelos.jsp">Vuelos</a>
                    </li>
                    <li class="nav-item"><a class="nav-link" href="MisVuelos.jsp">Mis Vuelos</a></li>
                </ul>
                <form class="form-inline mr-auto" target="_self">
                    <div class="form-group">
                        <label for="search-field"><i class="fa fa-search"></i></label>
                        <input class="form-control search-field light-table-filter" data-table="order-table" id="search-field"  name="search" />

                    </div>
                </form>
                <div id="logContent">
                    <!--<i class="fas fa-sign-in-alt fa-2x"></i>  <i class="fas fa-sign-in-alt fa-3x"></i> <i class="fas fa-sign-out-alt fa-3x"></i>-->
                    <div id="loginOption">
                        <span class="navbar-text">
                            <a class="login" href="Login.jsp">Iniciar Sesion</a>
                        </span> 
                        <a class="btn btn-light action-button"role="button" href="Registro.jsp">Registarse</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <script>
        document.addEventListener("DOMContentLoaded", () => {
            var usuarioLog = JSON.parse(localStorage.getItem('userCliente')) || JSON.parse(localStorage.getItem('userAdmin'));
            if (usuarioLog != null) {
                if (usuarioLog.rol == "cliente" || usuarioLog.rol == "admin") {
                    const menuLog = document.getElementById("loginOption");
                    if (menuLog != null) {
                        menuLog.remove();
                    }
                    const logContent = document.getElementById("logContent");
                    logContent.innerHTML = `<a id="logout" class="btn btn-light action-button" role="button" href="/Lab01-Front-End/index.jsp">Logout</a>`;
                    document.getElementById("nombreUsuarioCliente").innerText = usuarioLog.nombre;
                    const sett = document.getElementById("userConfig");
                    sett.removeAttribute("hidden");
                    document.getElementById("logout").addEventListener('click', () => {
                        localStorage.clear();
                    });
                }
                if (usuarioLog.rol == "admin") {
                    const logContent = document.getElementById("logContent");
                    const sett = document.getElementById("optionAdmin");
                    sett.removeAttribute("hidden");
                }
            } else {

                usuarioLog = null;
            }
        });
    </script>
    <script>
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

    </script>
</header>
<div class="container-fluid mt-2">
    <div class="row">
        <div id="msgWarning"  hidden class="alert alert-danger" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <div class="d-inline" id="msgTextWarning"></div>
        </div>
        <div id="msgSuccess" hidden class="alert alert-success" role="alert">
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            <div class="d-inline" id="msgTextSuccess"></div>
        </div>
    </div>
</div>
<br>
<br>
