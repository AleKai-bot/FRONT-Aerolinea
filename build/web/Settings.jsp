<%-- 
    Document   : Registro
    Created on : 12-abr-2021, 0:25:09
    Author     : Alejandro-PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" href="assets/css/Header-Dark.css" />
        <link rel="stylesheet" href="assets/css/Registration-Form-with-Photo.css" />
        <%@include file="headerCliente.jsp" %>
    </head>
    <body style="background-image:url(&quot;assets/img/star-sky.jpg&quot;);background-size:cover;">
        <div class="container">
            <div class="row">
                <div class="col">
                    <section class="register-photo">
                        <div align="center">
                            <form id="formSetting" >
                                <i class="fas fa-user-tie fa-4x"></i>
                                <div class="mb-1 row">
                                    <label  class="col-sm-2 col-form-label">Correo</label>
                                    <div class="col-sm-10">
                                        <input required type="text"  class="form-control" id="correo" value="">
                                    </div>
                                </div>
                                <div class="mb-1 row">
                                    <label class="col-sm-2 col-form-label">Password</label>
                                    <div class="col-sm-10">
                                        <input required type="password" class="form-control" id="password" placeholder="Nuevo password">
                                    </div>
                                </div>
                                <div class="mb-1 row">
                                    <label for="" class="col-sm-2 col-form-label">Nombre</label>
                                    <div class="col-sm-10">
                                        <input type="text"  class="form-control" id="nombre" value="">
                                    </div>
                                </div>
                                <div class="mb-1 row">
                                    <label for="" class="col-sm-2 col-form-label">Apellidos</label>
                                    <div class="col-sm-10">
                                        <input type="text"  class="form-control" id="apellidos" value="">
                                    </div>
                                </div>
                                <div class="mb-1 row">
                                    <label for="" class="col-sm-2 col-form-label">Direccion</label>
                                    <div class="col-sm-10">
                                        <input type="text"  class="form-control" id="direccion" value="">
                                    </div>
                                </div>
                                <div class="mb-1 row">
                                    <label for="" class="col-sm-2 col-form-label">Telefono</label>
                                    <div class="col-sm-10">
                                        <input type="text"  class="form-control" id="tel" value="">
                                    </div>
                                </div>
                                <div class="mb-1 row">
                                    <label for="" class="col-sm-2 col-form-label">Nacimiento</label>
                                    <div class="col-sm-10">
                                        <input type="date"  class="form-control" id="nacimiento">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary btn-block" type="submit">
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/js/settings.js"></script>
    </body>

    <footer>
        <br> <br>
        <%@ include file="footerCliente.jsp" %>
    </footer>
</html>
