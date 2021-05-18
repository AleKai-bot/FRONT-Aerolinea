<%-- 
    Document   : Asientos
    Created on : 12-abr-2021, 0:24:20
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
    <body style="background-image:url(&quot;assets/img/thun.jpg&quot;);background-size:cover;" onload="crearAsientos()">
        <div class="container ">
            <div class="row">
                <center>
                    <table>
                        <tr>
                            <td>
                                <div class="card" style="width: 18rem;">
                                    <img class="card-img-top"  src="assets/img/seat.png" alt="Card image cap">
                                    <div class="card-body">
                                        <h5 class="card-title">Te quedan por elegir: </h5>
                                        <h2  id="asientoDisp">0</h2>
                                    </div>
                                </div>
                                <br>
                        <center>
                            <div class="col"> 
                                <div class="card">
                                    <div class="card-body">
                                        <div><button id="metodoPago"  data-bs-toggle="modal" data-bs-target="#metodoPagoModal" class="btn btn-success "> Comprar</button></div>
                                    </div>
                                </div>
                            </div>
                        </center>
                        </td>
                        <td>

                        </td>

                        <td>
                            <div class="col">
                                <div class="card" style="width: 25rem;" ><img class="card-img-top w-100 d-block">
                                    <div class="card-body">
                                        <div class="table-responsive">

                                            <div class="plane">
                                                <div class="cockpit">
                                                    <h1 id="avionNom" >Boeing 747-400</h1>
                                                </div>
                                                <div class="exit exit--front fuselage">

                                                </div>
                                                <ol class="cabin fuselage" id="totalAsi">

                                                </ol>
                                                <div class="exit exit--back fuselage">

                                                </div>
                                            </div>
                                        </div>
                                        <p class="card-text"></p>
                                    </div>
                                </div>
                            </div>
                        </td>

                        </tr>
                    </table>
                </center>



            </div>

        </div>

        <div id="metodoPagoModal" class="modal bd-example-modal-m" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-m">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Compra Tiquete </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form id="user-form">
                            <div class="form-group">
                                <label>Nombre</label>
                                <input class="form-control"  type="text" id="nombrePago" placeholder="Nombre" />
                            </div>
                            <div class="form-group">
                                <label>Correo</label>
                                <input class="form-control" type="email" id="correoPago" placeholder="Correo" />
                            </div>
                            <div class="form-group">
                                <i class="fab fa-cc-mastercard fa-4x"></i>
                                <label>MM</label>
                                <input class="form-controld-inline p-2" type="text" id="mm" name="model"  placeholder=" "  style='width:3em'/>
                                <label>AA</label>
                                <input class="form-controld-inline p-2"  type="text" id="aa" name="model" placeholder=" "  style='width:3em'/>
                                <label>FV</label>
                                <input class="form-controld-inline p-2" type="text" id="fv" name="model" placeholder=" " style='width:3em' />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <hr>
                        <div align="right">
                            <button type="button"  data-bs-dismiss="modal" class="btn btn-danger">Cancelar</button>
                        </div>
                        <div align="right">
                            <button id="confirmarCompra" name="a" data-bs-dismiss="modal" type="button" class="btn btn-primary">Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
        <script src="assets/js/adminAsientos.js"></script>
    </body>
    <footer>
        <br> <br>
        <%@ include file="footerCliente.jsp" %>
    </footer>
</html>
