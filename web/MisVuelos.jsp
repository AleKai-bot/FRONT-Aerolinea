<%-- 
    Document   : MisVuelos
    Created on : 15-abr-2021, 0:47:30
    Author     : Alejandro-PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <%@ include file="headerCliente.jsp" %>

    </head>
    <body style="background-image:url(&quot;assets/img/thun.jpg&quot;);background-size:cover;"><br> <br>
        <div class="container">
            <div class="row">
                <div id="content"></div>
                <div class="col">
                    <div class="card"><img class="card-img-top w-100 d-block">
                        <div class="card-body">
                            <h4 class="card-title">Mis Vuelos</h4>
                            <div class="table-responsive">
                                <table id="tablamisV" class="table">

                                    <tbody id = "tabla-misVuelos">
                                    </tbody>

                                </table>
                            </div>
                            <p class="card-text"> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    <script src="assets/js/misVuelos.js"></script>
    <footer>
        <br> <br> <br><br>  <br><br> <br><br> 
        <%@ include file="footerCliente.jsp" %>
    </footer>
</html>
