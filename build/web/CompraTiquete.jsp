<%-- 
    Document   : CompraTiquete
    Created on : 12-abr-2021, 0:24:41
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
    <body style="background-image:url(&quot;assets/img/thun.jpg&quot;);background-size:cover;"><br> <br>
        <div class="container " >
            <div class="row ">
                <div class="col-md-9 ml-auto" >
                    <div id="tickets" >


                    </div>
                </div>
                <div  style="background-color: #000;" class="col-md-3" >
                    <div class="card-colunms">
                        <br>
                        <div class="h1 text-white" style="align-content: center;border:1px solid white">
                            <center>
                                CARRITO
                            </center>
                        </div>
                        <!--  <div data-bs-offset="0"  tabindex="0"  style="width:auto; height:550px; overflow: scroll; overflow-x: hidden;">-->
                        <div id="itemsCarrito" >

                        </div>
                        <!--  </div>   id="metodoPago"  data-bs-toggle="modal" data-bs-target="#metodoPagoModal"  -->
                        <div id="metodoPago" style="border:1px solid white; cursor: pointer" >
                            <div class="d-inline p-2 text-white text-white"><i class="fab fa-cc-mastercard fa-3x"></i></div>
                            <div class="d-inline p-2  text-white h2">Total</div>
                            <div id="totalCompra" class="d-inline p-2 text-white h2">0</div>
                            <div id="irAsientos" style="background-color: #FBD603;"class=" text-black" style="border:1px solid white; cursor: pointer" >
                                <center>
                                    Seleccionar Asientos
                                </center>
                            </div>

                        </div>  

                        <br>

                    </div>
                </div>
            </div>
        </div>
        <script src="assets/js/ticketsSocket.js"></script>
    </body>
    <footer>
        <br> <br> <br><br>  <br><br> <br><br> 
        <%@ include file="footerCliente.jsp" %>
    </footer>
</html>
