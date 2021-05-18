<%-- 
    Document   : index
    Created on : 12-abr-2021, 0:25:46
    Author     : Alejandro-PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head >
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <%@include file="headerCliente.jsp" %>
    </head>
    <body style="background-image:url(&quot;assets/img/thun.jpg&quot;);background-size:cover;">
        <div style=""  class="container ">
            <div class="row">
                <div class="col">
                    <div  class="carousel slide" data-ride="carousel" id="carousel-1">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img 
                                    class="w-100 d-block inicio"
                                    src="assets/img/plane.png"
                                    alt="Slide Image"
                                    />
                                <div class="carousel-caption d-none d-md-block">
                                    <FONT COLOR="black">
                                    <h3>"Si tu lo deseas puedes volar, solo tienes que confiar"</h3>
                                    <p id="infodescuento1">
                                        Gracias por preferirnos
                                    </p>
                                    </FONT>

                                </div>
                            </div>

                            <div class="carousel-item">
                                <img
                                    class="w-100 d-block inicio"
                                    src="assets/img/plane2.png"
                                    alt="Slide Image"
                                    />

                            </div>
                        </div>
                        <div>
                            <a
                                class="carousel-control-prev"
                                href="#carousel-1"
                                role="button"
                                data-slide="prev"
                                ><span class="carousel-control-prev-icon"></span
                                ><span class="sr-only">Previous</span></a
                            ><a
                                class="carousel-control-next"
                                href="#carousel-1"
                                role="button"
                                data-slide="next"
                                ><span class="carousel-control-next-icon"></span
                                ><span class="sr-only">Next</span></a
                            >
                        </div>
                        <ol class="carousel-indicators">
                            <li
                                data-target="#carousel-1"
                                data-slide-to="0"
                                class="active"
                                ></li>
                            <li data-target="#carousel-1" data-slide-to="1"></li>
                            <li data-target="#carousel-1" data-slide-to="2"></li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <!-- 
         <div class="container ">
             <div class="col">
                 <div class="row">
                     <p class="text-center text-white fw-bol h1">Vuelos</p>
                 </div>
                 <div class="row">
                     <div class="card " id = "tabla-vuelos" >
                     </div>
                 </div>
             </div>
         </div>-->
    </body>
    <footer>  
        <br>
        <br>
        <br>
        <%@ include file="footerCliente.jsp" %>
    </footer>
</html>
