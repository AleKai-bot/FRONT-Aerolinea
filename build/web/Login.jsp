<%-- 
    Document   : Login
    Created on : 12-abr-2021, 0:24:54
    Author     : Alejandro-PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>       
        <link rel="stylesheet" href="assets/css/Login-Form-Dark.css"> 
        <link rel="stylesheet" href="assets/css/Registration-Form-with-Photo.css" />
        <%@ include file="headerCliente.jsp" %>
    </head>
    <body style="background-image:url(&quot;assets/img/star-sky.jpg&quot;);background-size:cover;">
        <section class="register-photo">
            <div align="center">
                <div class="image-holder"></div>
                <form  id="login-form">
                    <h2 class="text-center">
                        <strong>Iniciar</strong> Sesion.
                    </h2>
                    <div class="form-group"></div>
                    <div class="form-group">

                        <div class="form-group">
                            <input class="form-control" id="user" type="email" name="user" placeholder="Correo">
                        </div>

                        <div class="form-group">
                            <input class="form-control" id="password" type="password" name="password" placeholder="Password">
                        </div>

                    </div>
                    <div class="form-group">
                        <button class="btn btn-primary btn-block" type="submit">Entrar</button>
                    </div>
                    <br>
                    <a class="already" href="Login.html" >You forgot your pass? Click here.</a >
                </form>
            </div>
        </section>

        <script src="assets/bootstrap/js/jquery.min.js"></script>
        <script src="assets/js/login.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    </body>
    <footer>
        <br> <br>
        <%@ include file="footerCliente.jsp" %>
    </footer>
</html>
