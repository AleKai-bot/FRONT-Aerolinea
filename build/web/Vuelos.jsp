<%-- 
    Document   : Vuelos
    Created on : 12-abr-2021, 0:25:21
    Author     : Alejandro-PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <%@include file="headerCliente.jsp" %>
    </head>
    <body style="background-image:url(&quot;assets/img/thun.jpg&quot;);background-size:cover;">
        <div class="container">
            <div class="row">
                <div id="content"></div>
                <div class="col">
                    <div class="card"><img class="card-img-top w-100 d-block">
                        <div class="card-body">
                            <h4 class="card-title">Vuelos</h4>
                            <div class="table-responsive">
                                <table id="tablaV" class="table order-table">

                                    <tbody id = "tabla-vuelos">
                                    </tbody>

                                </table>
                                <div id="pager">
                                    <ul id="pagination" class="pagination-sm"></ul>
                                </div>
                            </div>
                            <p class="card-text"> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/vuelos.js"></script>
        <script src="assets/js/paginacion.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    </body>


    <footer>
        <br> <br>
        <%@ include file="footerCliente.jsp" %>
    </footer>
</html>
