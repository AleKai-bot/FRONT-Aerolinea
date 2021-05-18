<%-- 
    Document   : Administracion
    Created on : 12-abr-2021, 0:26:06
    Author     : Alejandro-PC
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Bitter:400,700">
        <link rel="stylesheet" href="assets/fonts/font-awesome.min.css">
        <link rel="stylesheet" href="assets/css/Header-Dark.css">
        <link rel="stylesheet" href="assets/css/Registration-Form-with-Photo.css">
        <link rel="stylesheet" href="assets/css/styles.css">
        <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <title>JSP Page</title>
    </head>
    <body style="background-image:url(&quot;assets/img/thun.jpg&quot;);background-size:cover;">

        <header class="header-dark">
            <nav class="navbar navbar-dark navbar-expand-lg navigation-clean-search">
                <div class=" fst-italic fs-4 text-center m-2" style="width: 6rem; border-radius: 3px; background-color: #0086b3;"   id="nombreUsuarioAdmin"></div>
                <div id="userConfig" hidden>   <a href="Settings.jsp" > <i class="fas fa-user-cog fa-2x"> </i></a></div>
                <div class="container"><a class="navbar-brand" href="/Lab01-Front-End/index.jsp">AEROLINEA</a><button data-toggle="collapse" class="navbar-toggler" data-target="#navcol-1"><span class="sr-only">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
                    <div class="collapse navbar-collapse" id="navcol-1">
                        <ul class="navbar-nav">
                            <li class="nav-item" ><a class="nav-link" id="adminUsuarios" href="#">Usuarios</a></li>
                            <li class="nav-item" ><a class="nav-link" id="adminVuelos" href="#">Vuelos</a></li>
                            <li class="nav-item" ><a class="nav-link" id="adminRutas" href="#">Rutas</a></li>
                            <li class="nav-item" ><a class="nav-link" id="adminAviones" href="#">Aviones</a></li>
                            <li class="nav-item" ><a class="nav-link" id="adminHorarios" href="#">Horarios</a></li>

                        </ul>
                        <form class="form-inline mr-auto" target="_self">
                            <div class="form-group"><label for="search-field"><i class="fa fa-search"></i></label>
                                <input class="form-control search-field light-table-filter" data-table="order-table" type="search" id="search-field" name="search">
                            </div>
                        </form>
                        <span class="navbar-text"></span><a href="/Lab01-Front-End/index.jsp" class="btn btn-light action-button" role="button" id="logout" >Logout</a>
                    </div>
                </div>
            </nav>

        </header>
        <br>
        <br>
        <div class="container" >
            <div class="row" >
                <div class="col">
                    <div class="card" ><img class="card-img-top w-100 d-block" >
                        <div class="card-body">
                            <h4 class="card-title" id="titulo-dato" ></h4>
                            <div class="table-responsive">
                                <table class="table order-table" >
                                    <thead id="titulo-tabla" >

                                    </thead>
                                    <tbody id="lista-admin" >

                                    </tbody>
                                </table>
                            </div>

                            <div class="row" >
                                <div class="col" >
                                    <div  role="group" ></div><button  id="btnAg" onclick="addObject()" class='btn btn-primary m-2 btn-group'   type="button" > Agregar &nbsp;<i class="fas fa-plus" ></i> </button>
                                </div>
                            </div>  
                        </div>

                    </div>
                </div>
            </div>
        </div>


        <div id="user-id-1" class="modal bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form id="user-form">
                            <div class="form-group">
                                <label>Id</label>
                                <input class="form-control"  type="text" id="idUser" name="idUser" placeholder="ID" />
                            </div>

                            <div class="form-group">
                                <label>Nombre</label>
                                <input class="form-control"  type="text" id="nomU" name="nomU" placeholder="Nombre" />
                            </div>

                            <div class="form-group">
                                <label>Apellidos</label>
                                <input class="form-control"  type="text" id="apeU" name="apeU" placeholder="Apellidos" />
                            </div>

                            <div class="form-group">
                                <label>Correo</label>
                                <input class="form-control"  type="text" id="mail" name="mail" placeholder="Correo" />
                            </div>

                            <div class="form-group">
                                <label>F.Nacimiento</label>
                                <input class="form-control"  type="date" id="naci" name="naci" placeholder="Nacimiento" />
                            </div>

                            <div class="form-group">
                                <label>Direccion</label>
                                <input class="form-control"  type="text" id="direc" name="direc" placeholder="Direccion" />
                            </div>

                            <div class="form-group">
                                <label>Teléfono</label>
                                <input class="form-control"  type="text" id="tel" name="tel" placeholder="Teléfono" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <hr>
                        <div align="right">
                            <button type="button"  data-bs-dismiss="modal" class="btn btn-danger">Cancelar</button>
                        </div>
                        <div align="right">
                            <button id="listoUE" name="listoUE" onclick="actualizarUser()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Editar</button>
                            <button id="listoUA" name="listoUA" onclick="agregarU()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="user-id-2" class="modal bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Avión</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form id="user-form">
                            <div class="form-group">
                                <label>Id</label>
                                <input class="form-control"  type="text" id="idAvion" name="idAvion" placeholder="ID" />
                            </div>

                            <div class="form-group">
                                <label>Año</label>
                                <input class="form-control" type="text" id="annooo" name="annooo" placeholder="Año" />
                            </div>

                            <div class="form-group">
                                <label>Modelo</label>
                                <input class="form-control" type="text" id="model" name="model"placeholder="Modelo" />
                            </div>

                            <div class="form-group">
                                <label>Marca</label>
                                <input class="form-control" type="text" id="marcaaa" name="marcaaa"placeholder="Marca" />
                            </div>

                            <div class="form-group">
                                <label>Cantidad de Filas</label>
                                <input class="form-control" type="text" id="cantFila" name="cantFila"placeholder="Filas" />
                            </div>

                            <div class="form-group">
                                <label>Cantidad de Ascientos</label>
                                <input class="form-control" type="text" id="cantAsci" name="cantAsci"placeholder="Ascientos" />
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <hr>
                        <div align="right">
                            <button type="button"  data-bs-dismiss="modal" class="btn btn-danger">Cancelar</button>
                        </div>
                        <div align="right">
                            <button id="listo" name="listo" onclick="actualizarA()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Editar</button>
                            <button id="listoA" name="listoA" onclick="agregarA()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="user-id-3" class="modal bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Horario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form id="user-form">
                            <div class="form-group">
                                <label>Id</label>
                                <input class="form-control"   type="text" id="idH" name="idH" placeholder="ID" />
                            </div>

                            <div class="form-group">
                                <label>Fecha Salida</label>
                                <input class="form-control" type="date" id="fi" name="fi" placeholder="Salida" />
                            </div>
                           
                            <div class="form-group">
                                <label>Fecha Llegada</label>
                                <input class="form-control"  type="date" id="fre" name="fre" placeholder="Llegada" />
                            </div> 
                            <div class="form-group">
                                <label for="example-time-input" >Hora Salida</label>
                                <input class="form-control" type="time" value="13:45:00" id="hsalida">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <hr>
                        <div align="right">
                            <button type="button"  data-bs-dismiss="modal" class="btn btn-danger">Cancelar</button>
                        </div>
                        <div align="right">
                            <button id="listoHE" onclick="actualizarH()" name="listoHE"  data-bs-dismiss="modal" type="button" class="btn btn-primary">Editar</button>
                            <button id="listoHA" onclick="agregarH()" name="listoHA" data-bs-dismiss="modal" type="button" class="btn btn-primary">Agregar</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div id="user-id-4" class="modal bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Vuelo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form id="user-form">
                            <div class="form-group">
                                <label>Id</label>
                                <input   class="form-control" disabled type="text" id="idVuelo" name="idVuelo" placeholder="ID" />
                            </div>

                            <div class="form-group">
                                <label>Origen</label>
                                <input class="form-control" type="text" id="ori" name="ori" placeholder="Origen" />
                            </div>

                            <div class="form-group">
                                <label>Destino</label>
                                <input class="form-control" type="text" id="desti" name="desti" placeholder="Destino" />
                            </div>

                            <div class="form-group">
                                <label>Cant.Pasajeros	</label>
                                <input class="form-control" type="text" id="cantPasa" name="cantPasa" placeholder="CantPasa" />
                            </div>

                            <div class="form-group">
                                <label>Duracion en días	</label>
                                <input class="form-control" disabled type="text" id="duracion" name="duracion" placeholder="Duración" />
                            </div>




                            <div class="form-group">
                                <label>Rutas	</label>
                                <select class="form-select form-control" id="rutasOpcion">
                                    <option value=""> Seleccione </option>
                                </select>
                            </div>



                        </form>
                    </div>
                    <div class="modal-footer">
                        <hr>
                        <div align="right">
                            <button type="button"  data-bs-dismiss="modal" class="btn btn-danger">Cancelar</button>
                        </div>
                        <div align="right">
                            <button id="listoVE" name="listoVA" onclick="editVE()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Editar</button>
                            <button id="listoVA" name="listoVE" onclick="agregarVA()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="user-id-5" class="modal bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Rutas</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <form id="user-form">
                            <div class="form-group">
                                <label>Id</label>
                                <input   class="form-control" disabled type="text" id="idRuta" name="idRuta" placeholder="ID" />
                            </div>

                            <div class="form-group">
                                <label>Origen</label>
                                <input class="form-control" type="text" id="orig" name="orig" placeholder="Origen" />
                            </div>

                            <div class="form-group">
                                <label>Destino</label>
                                <input class="form-control" type="text" id="des" name="des" placeholder="Destino" />
                            </div>

                            <div class="form-group">
                                <label>Descripción</label>
                                <input class="form-control" type="text" id="descrip" name="descrip" placeholder="Descrip" />
                            </div>

                            <div class="form-group">
                                <label>Duración	Aprox</label>
                                <input class="form-control" type="text" id="aprox" name="aprox" placeholder="Duracion" />
                            </div>

                            <div class="form-group">
                                <label>Aviones	</label>
                                <select class="form-select form-control" id="avionOpcion">
                                    <option value=""> Seleccione </option>
                                </select>
                            </div>

                            <div class="form-group">
                                <label>Horarios	</label>
                                <select class="form-select form-control" id="horaOpcion">
                                    <option value=""> Seleccione </option>
                                </select>

                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <hr>
                        <div align="right">
                            <button type="button"  data-bs-dismiss="modal" class="btn btn-danger">Cancelar</button>
                        </div>
                        <div align="right">
                            <button id="listoRE" name="listoRE" onclick="editRE()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Editar</button>
                            <button id="listoRA" name="listoRA" onclick="agregarRA()" data-bs-dismiss="modal" type="button" class="btn btn-primary">Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br>
        <br>
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

        <script src="assets/js/administracion.js"></script>
        <script src="assets/bootstrap/js/jquery.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="assets/bootstrap/js/bootstrap.min.js"></script>
    </body>  
    <footer>
        <br> <br> <br><br>  
        <%@ include file="footerCliente.jsp" %>
    </footer>

</html>
