<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" href="assets/css/Header-Dark.css" />
        <link rel="stylesheet" href="assets/css/Registration-Form-with-Photo.css" />
        <%@ include file="headerCliente.jsp" %>
    </head>
    <body style="background-image:url(&quot;assets/img/star-sky.jpg&quot;);background-size:cover;">
        <div class="container">
            <div class="row">
                <div class="col">
                    <section class="register-photo">
                        <div align="center">
                            <div class="image-holder"></div>
                            <form id="form-registro">
                                <i class="fas fa-user-tie fa-4x"></i>
                                <div class="form-group">
                                    <input
                                        class="form-control"
                                        id="correo"
                                        type="email"
                                        name="correo"
                                        placeholder="Email"
                                        />
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        />
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        placeholder="Nombre"
                                        />
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="apellidos"
                                        name="apellidos"
                                        placeholder="Apellidos"
                                        />
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="direccion"
                                        name="direccion"
                                        placeholder="Direccion"
                                        />
                                    <input
                                        class="form-control"
                                        type="text"
                                        id="telefono"
                                        name="telefono"
                                        placeholder="Telefono"
                                        /><br>
                                    <label>Fecha de nacimiento</label
                                    ><input
                                        class="form-control"
                                        type="text"
                                        id="nacimiento"
                                        name="nacimiento"
                                        placeholder="YY/MM/DD"
                                        />
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary btn-block" type="submit">
                                        Save
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
        <script src="assets/js/registro.js"></script>
    </body>
    <footer>
        <br> <br>
        <%@ include file="footerCliente.jsp" %>
    </footer>
</html>
