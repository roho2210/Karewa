<template>
    <div>
        <!-- HEADER SECTION -->
        <header id="header" class="header clearfix">
            <div class="neutral-width topbar">
                <div class="left col-md-3 col-4 p-0">
                    <img class="img-fluid" src="@/assets/images/Logos/logo-karewa.png" alt="Logo" />
                </div>
                <div class="right col-md-9 col-8 p-0">
                    <div class="admin">
                        <ul>
                            <li><a> Inicio </a></li>
                            <li><a> Proveedores </a></li>
                            <li><a> Contratos </a></li>
                            <li><a> Comparar </a></li>
                            <li><a> Cálculos </a></li>
                            <li><a> Ligas de interés </a></li>
                            <li><a> Administrar </a></li>
                        </ul>
                        <div class="topMenuDropdown dropdown keep-open">
                            <button class="dropdown-toggle d-flex justify-content-center" type="button" id="dropdownMenuTop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <svg id="hamburguer-icon" class="" xmlns="" width="30" height="30" viewBox="0 0 30 30">
                                    <path class="line line-top" d="M0,9h30"/>
                                    <path class="line line-center" d="M0,15h30"/>
                                    <path class="line line-bottom" d="M0,21h30"/>
                                </svg>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuTop">
                                <a class="dropdown-item" href="#"> Inicio </a>
                                <a class="dropdown-item active" href="#"> Proveedores </a>
                                <a class="dropdown-item" href="#"> Contratos </a>
                                <a class="dropdown-item" href="#"> Comparar </a>
                                <a class="dropdown-item" href="#"> Cálculos </a>
                                <a href="" class="dropdown-item" href="#"> Ligas de interés </a>
                                <a class="dropdown-item" href="#"> Administrar </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- END HEADER SECTION -->

        <!-- MAIN CLIENT SECTION -->
        <section id="cover" class="client-cover">
            <div class="cover-container">
                <div class="img-container">
                    <img src="@/assets/images/Backgrounds/test-cover-page.svg" alt="">
                </div>
                <div class="neutral-width">
                    <div class=" info">
                        <h3>Bienvenido a</h3>
                        <h1>Monitor <strong>Karewa</strong></h1>
                        <div class="divider"></div>
                        <p>Aquí podrás obtener información sobre los procedimientos de licitaciones para consultar la compra, renta y contratación de servicios que se realizan en el Municipio.</p>

                    </div>
                    <div class="horizontal-center m-t-50">
                        <div class="filter-box">
                            <div class="filter">
                                <div class="filter-container row m-0">
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-4 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true" data-live-search-placeholder="Buscar administracion" title="Por administracion">
                                                <optgroup label="2016">
                                                    <option>Text 2</option>
                                                    <option>Text 3</option>
                                                </optgroup>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true" data-live-search-placeholder="Buscar año" title="Por año…">
                                                <optgroup label="2018">
                                                    <option>3º 2018</option>
                                                    <option>2º 2018</option>
                                                    <option>1º 2018</option>
                                                </optgroup>
                                                <optgroup label="2017">
                                                    <option>3º 2017</option>
                                                    <option>2º 2017</option>
                                                    <option>1º 2017</option>
                                                </optgroup>
                                            </select>

                                        </div>
                                    </div>
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-2 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true" data-live-search-placeholder="Buscar trimestre" title="Por trimestre…">
                                                <option>Text 2</option>
                                                <option>Text 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group fg-float border-select m-0 p-0 col-lg-4 col-6">
                                        <div class="fg-line m-0">
                                            <select class="form-control select selectpicker" data-live-search="true" data-live-search-placeholder="Buscar administrativa" title="Por unidad administrativa…">
                                                <option>Text 2</option>
                                                <option>Text 3</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <button class="filter-btn" type="button" name="button">Filtrar</button>
                            </div>
                            <div class="m-t-20 float-left">
                                <span class="tag-title">Filtros:</span>
                                <div class="tag">
                      <span class="">
                        DIRECCIÓN DE OBRAS PÚBLICAS MUNICIPALES
                      </span>
                                    <button>
                                        <i class="zmdi zmdi-close"></i>
                                    </button>
                                </div>
                                <div class="tag">
                      <span class="">
                        Béisbol
                      </span>
                                    <button>
                                        <i class="zmdi zmdi-close"></i>
                                    </button>
                                </div>
                                <div class="tag">
                      <span class="">
                        Béisbol
                      </span>
                                    <button>
                                        <i class="zmdi zmdi-close"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="client-content">
            <div class="neutral-width">
                <div class="col-12 p-0">
                    <div class="floating-title-panel small">
                        <h1> Adquisiciones, Arrendamientos, Contratación de Servicios y Obra Pública del Municipio de Chihuahua </h1>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-md-8 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Millones de pesos por trimestre </h1>
                            </div>

                            <div>INSERTAR AQUI GRAFICA</div>
                        </div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="card">
                            <div class="floating-title-panel small">
                                <h1> Presupuesto ejercido por tipo de procedimiento </h1>
                            </div>
                            <div>INSERTAR AQUI GRAFICA</div>
                            <div class="graph-info">
                                <div class="info">
                                    <span class="green">
                                        <label>7%</label>
                                        <p>Lic. pública</p>
                                    </span>
                                    <span class="yellow">
                                        <label>43%</label>
                                        <p>Por invitación</p>
                                    </span>
                                    <span class="red">
                                        <label>48%</label>
                                        <p>Adj. directa</p>
                                    </span>
                                </div>
                                <div class="divider-dash"></div>
                                <div class="total">
                                    <label>$2,115,000.00 MXN</label>
                                    <small>MONTO TOTAL</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- FLOATING BUTTONS FOR LINKS -->
                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <a href="" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Ir a Inicio </a>
                    <a href="" class="btn-outline text-unset m-auto-left"> Ir a Contratos <i class="zmdi zmdi-long-arrow-right m-r-0 m-l-15"></i></a>
                </div>

                <!-- CONTACT SECTION -->
                <div class="col-12 p-0">
                    <div class="card">
                        <div class="row">
                            <div class="col-12 col-md-7">
                                <div class="floating-title-panel">
                                    <h1>Contacto</h1>
                                </div>

                                <p class="d-block f-14 c-plain_text principal-font-regular m-b-40">Si necesitas ayuda, tienes dudas o comentarios puedes mandarnos un mensaje llenando el siguiente formulario:</p>

                                <div class="form-group fg-float m-b-30">
                                    <div class="fg-line basic-input">
                                        <input type="text" class="form-control fg-input" placeholder="Escribe tu nombre y apellidos">
                                        <label class="fg-label">Nombre completo <small class="c-error">*</small></label>
                                    </div>
                                </div>

                                <div class="form-group fg-float m-b-30">
                                    <div class="fg-line basic-input">
                                        <input type="text" class="form-control fg-input" placeholder="Escribe un númeto telefónico para contactarte">
                                        <label class="fg-label">Teléfono</label>
                                    </div>
                                </div>

                                <div class="form-group fg-float m-b-30">
                                    <div class="fg-line basic-input">
                                        <input type="text" class="form-control fg-input" placeholder="Escribe una dirección de correo electrónico para contactarte">
                                        <label class="fg-label">Correo electrónico <small class="c-error">*</small></label>
                                    </div>
                                </div>

                                <div class="form-group fg-float m-b-60">
                                    <div class="fg-line basic-input">
                                        <textarea class="form-control fg-textarea" placeholder="Escribe tu mensaje"></textarea>
                                        <label class="fg-label active">Mensaje <small class="c-error">*</small></label>
                                    </div>
                                </div>

                                <div class="vertical-center recaptcha-container">
                                    <div class="re-captcha">
                                        <!-- INSERTAR AQUI RE CAPTCHA -->
                                    </div>
                                    <div class="text-align-r m-auto-left">
                                        <span class="d-block m-b-25 f-12 c-primary principal-font-medium"><i class="f-16 c-error">*</i> Campos obligatorios</span>
                                        <a href="" class="btn-raised button-accent">Enviar Mensaje</a>
                                    </div>
                                </div>

                                <!-- MESSAGE SEND -->
                                <!-- <div class="img-centered">
                                  <img class="img-fluid" src="@/assets/images/Illustrations/send-message.svg" alt="" />
                                  <h1 class="">¡Tu mensaje ha sido enviado!</h1>
                                  <p>Gracias por comunicarte con nosotros, en breve te responderemos.</p>
                                </div> -->
                            </div>
                            <div class="col-12 col-md-5 m-t-25">
                                <div class="card-map-info">
                                    <div class="google-map">
                                    </div>
                                    <div class="info">
                                        <h1>Nos puedes encontrar en:</h1>
                                        <ul>
                                            <li><i class="zmdi zmdi-pin"></i> Blvd. Ortiz Mena 2807 Local 18, Quintas del Sol C.P. 31214, Chihuahua, Chih. </li>
                                            <li><i class="zmdi zmdi-time"></i> Lunes a Viernes de 9:30am a 2:00pm y de 4:00pm a 6:00pm </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card-map-info">
                                    <div class="info">
                                        <h1>Nos puedes encontrar en:</h1>
                                        <ul>
                                            <li class="c-info"><i class="zmdi zmdi-email"></i> contacto@karewa.org </li>
                                            <li class="c-info"><i class="zmdi zmdi-facebook-box"></i> @Karewacuu </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CONTRATO SECTION -->
                <div class="col-12 p-0">
                    <!-- CONTRATO INFO -->
                    <div class="card">
                        <div class="floating-title-panel long-text">
                            <h1>
                                <small>Contrato</small>
                                OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD DE CHIHUAHUA, CHIH
                            </h1>
                            <div class="side-right">
                                <a href="" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i class="zmdi zmdi-share"></i> Compartir</a>
                            </div>
                        </div>
                        <p class="f-14 c-plain_text principal-font-regular">El contrato <strong class="principal-font-semibold">OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD DE CHIHUAHUA, CHIH</strong>, a cargo del proveedor <strong class="principal-font-semibold">CONSTRUCCIONES MARRO SA DE CV</strong> obtuvo una cantidad de <strong class="c-accent">$26,327,329.17</strong>, celebrado el día <strong>20 de octubre de 2017.</strong></p>
                    </div>
                    <!-- CONTRATO FILES -->
                    <div class="card">
                        <div class="floating-title-panel small">
                            <h1>Archivos</h1>
                        </div>
                        <p class="f-14 c-plain_text principal-font-regular m-b-30">Aquí puedes consultar los documentos de la convocatoria, de aclaración y propuesta de este contrato.</p>
                        <div class="row m-b--30">
                            <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                                <div class="panel-button">
                                    <label>Contrato</label>
                                    <button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar documento</button>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                                <div class="panel-button">
                                    <label>Convocatoria / Invitación</label>
                                    <small>Documento no disponible</small>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                                <div class="panel-button">
                                    <label>Fallo de Junta de Aclaraciones</label>
                                    <button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar documento</button>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                                <div class="panel-button">
                                    <label>Presentación de Propuesta</label>
                                    <button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar documento</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- CONTRATO DETAIL INFO -->
                    <div class="card">
                        <div class="floating-title-panel small">
                            <h1>Información detallada</h1>
                        </div>
                        <div class="non-list">
                            <span> <small>Identificador de proceso</small> <i>-</i> <strong> DOPM176/2017 </strong></span>
                            <span> <small>Descripción de las obras, bienes o servicios</small> <i>-</i> <strong> OBRA CIVIL PARA LA IMPLEMENTACIÓN DE LA PLATAFORMA ESCUDO CHIHUAHUA EN LA CIUDAD DE CHIHUAHUA, CHIH </strong></span>
                            <span> <small>Monto total</small>  <i>-</i> <strong class="c-accent"> $26,327,329.17 </strong></span>
                            <span> <small>Fecha del contrato</small> <i>-</i> <strong> 20 de octubre de 2017 </strong></span>
                            <span> <small>Tipo de procedimiento</small> <i>-</i> <div class="badge badge-red"> Adjudicación Directa </div></span>
                            <span> <small>Estado del procedimiento</small> <i>-</i> <div class="badge"> Concluido </div></span>
                            <span> <small>Unidad administrativa solicitante</small> <i>-</i> <strong> DIRECCIÓN DE OBRAS PUBLICAS MUNICIPALES </strong></span>
                            <span> <small>Materia</small> <i>-</i> <strong> Obra pública </strong></span>
                            <span> <small>Nombre del proveedor</small> <i>-</i> <strong> CONSTRUCCIONES MARRO SA DE CV </strong></span>
                            <span> <small>RFC</small> <i>-</i> <strong> GMA980529MWO </strong></span>
                            <span> <small>Notas de Municipio de Chihuahua</small> <i>-</i> <strong> Hipervínculo acta de recepción física de trabajos : ESTA EN PROCESO. </strong></span>
                            <span> <small>Fecha de obtención de los datos</small> <i>-</i> <strong> 13 de marzo de 2018 </strong></span>
                        </div>
                    </div>
                </div>

                <!-- ADITIONAL INFO ONLY -->
                <p class="f-12 c-plain_text principal-font-regular">
                    Todos los datos que se presentan en este informe son única y exclusivamente obtenidos de: http://www.municipiochihuahua.gob.mx/Transparencia
                    <br>
                    Última actualización: <strong>27 de noviembre de 2018</strong>
                </p>

                <!-- ABOUT INFO -->
                <div class="col-12 p-0">
                    <div class="card">
                        <div class="floating-title-panel">
                            <h1>Acerca de</h1>
                        </div>
                        <div class="about vertical-center">
                            <p class="f-16 c-plain_text principal-font-regular"><strong class="f-24 c-accent principal-font-medium">Karewa</strong> es una agrupación ciudadana sin fines de lucro, que desde agosto de 2016 trabaja con el objetivo de <strong>prevenir la corrupción</strong> en los procesos de compra y contratación de los gobiernos de la ciudad de Chihuahua. Todo esto a través de un programa estratégico de transparencia y rendición de cuentas a fin de contar con un eficiente y mejor gobierno.</p>
                            <img class="img-fluid m-l-30 max-h-200 d-flex" src="https://i.blogs.es/c9f0b6/portada/450_1000.jpg" alt="" />
                        </div>
                    </div>
                </div>

                <!-- ABOUT PANELS -->
                <div class="row">
                    <div class="col-12 col-md-4 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Misión </h1>
                            </div>
                            <p class="f-14 c-plain_text principal-font-regular"> Eliminar la corrupción en el manejo de los recusros públicos. </p>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Visión </h1>
                            </div>
                            <p class="f-14 c-plain_text principal-font-regular"> Somos la organización más influyente en México en el combate a la corrupción del manejo de los recursos públicos. </p>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 di-flex">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Valores </h1>
                            </div>
                            <p class="f-14 c-plain_text principal-font-regular"> Nos regimos por la honestidad. el respeto. el compromiso. el trabajo en equipo y sobre todo con justicia. </p>
                        </div>
                    </div>
                </div>

                <!-- ABOUT TEAM -->
                <div class="col-12 p-0">
                    <div class="card">
                        <div class="floating-title-panel small">
                            <h1> Equipo </h1>
                        </div>
                        <div class="about vertical-center">
                            <div class="w-60 m-r-30 o-x-auto">
                                <h2 class="title-dot">Consejo:</h2>
                                <ul class="list-dots">
                                    <li>Javier Mesta Delgado <span>Consejero Presidente</span></li>
                                    <li>Gabriela Alvídrez Ruiz <span>Consejera Directiva</span></li>
                                    <li>Elías Fernando Ayub González <span>Consejero Directivo</span></li>
                                    <li>Paola Contestábile Frayre <span>Consejera Directiva</span></li>
                                    <li>César René Espinosa Lozano <span>Consejero Directivo</span></li>
                                    <li>Luis Alberto González Herrera <span>Consejero Directivo</span></li>
                                    <li>Leopoldo Rafael Lozano Cuarón <span>Consejero Directivo</span></li>
                                    <li>Guillermo Antonio Orozco Salomón <span>Consejero Directivo</span></li>
                                    <li>Luis Alonso Ramos Fernández <span>Consejero Directivo</span></li>
                                    <li>Angélica Santana Fierro <span>Consejera Directiva</span></li>
                                </ul>
                                <h2 class="title-dot">Consejo:</h2>
                                <ul class="list-dots">
                                    <li>José David Ponce de León Trejo <span>Coordinación</span></li>
                                    <li>Edgar Renteria Rivas <span>Coordinación</span></li>
                                </ul>
                            </div>
                            <img class="img-fluid m-0-auto max-h-200 d-flex" src="https://i.blogs.es/c9f0b6/portada/450_1000.jpg" alt="" />
                        </div>
                    </div>
                </div>

                <!-- AVISO DE PRIVACIDAD -->
                <div class="col-12 p-0">
                    <div class="card">
                        <div class="floating-title-panel">
                            <h1>Aviso de Privacidad</h1>
                        </div>
                        <p class="f-14 c-plain_text principal-font-regular">
                            <strong class="f-16">1.      “Responsable” del tratamiento de sus datos personales</strong>
                            <br>
                            <strong class="principal-font-semibold">KAREWA ES AMAR CHIHUAHUA, en lo sucesivo (Karewa)</strong>, que de acuerdo con la ley aplicable en México y que es la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, (LFPDPPP) se entiende como (el “Responsable”) ya que decide sobre el tratamiento de los datos personales que recaba de usted como “Titular” de los mismos, entendiéndose como tal la persona física a quien corresponden los datos personales, y por éstos últimos cualquier información concerniente a una persona física identificada o identificable. Los datos personales pueden recabarse en ciertas páginas del sitio http://karewa.org/, en lo sucesivo el (sitio web).
                            <br>
                            <br>
                            Para el “Responsable”, el tratar sus datos de manera legítima resulta un tema prioritario. Este Aviso de Privacidad complementa cualesquiera otros avisos de privacidad simplificados o cortos que el “Responsable” haya puesto a su disposición por ser el titular de sus datos personales y resulta supletorio en todo aquello que expresamente no refieran tales avisos.
                            <br>
                            <br>
                            <strong class="f-16">2.     Domicilio del “Responsable”</strong>
                            <br>
                            Blvd. Antonio Ortiz Mena  número 2807-18, colonia Quintas del Sol, código postal 31214, Chihuahua, Chih.
                            Dicho domicilio es el establecido por el “Responsable” para oír y recibir notificaciones.
                            <br>
                            <br>
                            <strong class="f-16">3.     Finalidades del tratamiento de los datos personales de los USUARIOS DEL SITIO WEB de KAREWA</strong>
                            <br>
                            El “Responsable” en este acto recaba sus datos para las siguientes <strong class="principal-font-semibold">finalidades:</strong>
                            <br>
                            <br>
                            Cuando un usuario nos proporciona datos personales los utilizaremos para los propósitos para los cuales fueron entregados.
                            <br>
                            <br>
                            El “Responsable” en este acto recaba sus datos para las siguientes <strong class="principal-font-semibold">finalidades:</strong>
                            <br>
                            <br>
                            1.   Para identificación de los correos electrónicos que los usuarios envíen por medio del sitio web.
                            <br>
                            2.   Para determinar el perfil del usuario en el sitio web, al conocer la información consultada.
                            <br>
                            3.   Para obtener métricas relacionadas con el tráfico del sitio web, tener conocimiento de las páginas más consultadas y para poder proporcionar al usuario con
                            base en lo anterior, temas de interés e información que le sea de utilidad.
                            <br>
                            <br>
                            <strong class="f-16">4.     Datos personales que recaba el “Responsable” del usuario en línea</strong>
                            <br>
                            Para llevar a cabo las finalidades descritas en el presente aviso de privacidad, el “Responsable” dependiendo de la página a la que acceda en el sitio web, puede recabar del usuario algunos o todos los siguientes datos:
                            <br>
                            <br>
                            a)   Del usuario como persona física, nombre, correo electrónico y ocupación, y b) del usuario como empleado de una sociedad o empresa, la denominación de
                            dicha sociedad o empresa, cargo o puesto desempeñado, domicilio, dirección electrónica o teléfono que le corresponda como empleado.
                            <br>
                            <br>
                            <strong class="f-16">5.     Datos personales que no se recabarán de usted</strong>
                            <br>
                            El “Responsable” le informa que para cumplir con las finalidades previstas en este aviso de privacidad, no requiere recabar de usted datos personales sensibles.
                            <br>
                            <br>
                            <strong class="f-16">6.     Uso de cookies y Web Beacons</strong>
                            <br>
                            El “Responsable” creara cookies y Web Beacons con la única finalidad  de que el usuario tenga una mejor experiencia al navegar por el sitio web.
                            <br>
                            <br>
                            <strong class="f-16">7.     Opciones y medios para limitar el uso o divulgación de sus datos personales</strong>
                            <br>
                            Para limitar el uso o divulgación de sus datos personales, por parte del “Responsable”, usted puede contactarnos a través del siguiente correo electrónico: contacto@karewa.org. En el sitio web de Karewa, no se recopilan datos de identificación personal para su divulgación o utilización comercial, ni para venta terceros con propósito de comercialización.
                            <br>
                            <br>
                            <strong class="f-16">8.    Medios para ejercer los Derechos de Acceso, Rectificación, Cancelación y Oposición (Derechos ARCO)</strong>
                            <br>
                            Respecto al acceso a sus datos personales que posea el “Responsable”, para su actualización, rectificación en caso de ser inexactos o incompletos; cancelación cuando considere que no se requieren para alguna de las finalidades señaladas en el presente aviso de privacidad, o bien para su oposición al tratamiento de los mismos para fines específicos, usted como usuario deberá contactarnos mediante el siguiente correo electrónico: contacto@karewa.org, a fin de que se le brinde toda la información necesaria, para que usted proceda al ejercicio de sus derechos de Acceso, Rectificación, Cancelación y Oposición respecto de sus datos personales.
                            <br>
                            <br>
                            <strong class="f-16">9.     Procedimiento para que el Titular (usuario del sitio web de karewa), en su caso, revoque su consentimiento para el tratamiento de sus datos personales</strong>
                            <br>
                            En cualquier momento usted puede revocar el consentimiento que, en su caso, haya otorgado al “Responsable” para el tratamiento de sus datos personales. Sin embargo, es importante que tenga en cuenta que no en todos los casos se podrá atender su solicitud o concluir el uso de forma inmediata, ya que es posible que por alguna obligación legal se requiera seguir tratando sus datos personales. Asimismo, usted deberá considerar que la revocación de su consentimiento implicará que no se pueda cumplir con los fines mencionados en el punto 3 del presente aviso de privacidad. Para revocar su consentimiento es necesario que nos contacte en el siguiente correo electrónico: contacto@karewa.org.
                            <br>
                            <br>
                            <strong class="f-16">10.Remisión y/o Transferencias de datos personales</strong>
                            <br>
                            Los datos personales que se registren en el sitio web de Karewa para efectos de su respaldo, almacenamiento y servicios de seguridad por proveedores de tecnología de la información, así como por la administración del sitio web y el análisis de dichos datos, pueden ser remitidos a encargados, o a las sociedades que se requirieran, por lo que es importante que usted esté enterado, de que sus datos se encuentran protegidos en virtud de que dichas sociedades operan y cuentan con una Política de Protección de Datos Personales y también con una Política de Protección de Datos y Privacidad; en el entendido de que en caso de remisión y/o transferencia de datos entre sociedades, no se requiere el consentimiento de usted como titular de los datos, por ser uno de los supuestos previsto en el artículo 37 de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
                            <br>
                            <br>
                            Salvo lo anterior, le reiteramos que el “Responsable” no transferirá datos personales a terceros para su divulgación o comercialización.
                            <br>
                            <br>
                            <strong class="f-16">11.  Medidas de seguridad implementadas</strong>
                            <br>
                            Para la protección de sus datos personales hemos instrumentado medidas de seguridad de carácter administrativo, físico y técnico con el objeto de evitar pérdidas, mal uso o alteración de su información.
                            <br>
                            <br>
                            <strong class="f-16">12. Modificaciones al aviso de privacidad</strong>
                            <br>
                            El presente aviso de privacidad puede sufrir modificaciones, cambios o actualizaciones derivadas de nuevos requerimientos legales o de las propias necesidades del “Responsable”, por lo que el “Responsable” se reserva el derecho de efectuar en cualquier momento las modificaciones o actualizaciones que sean necesarias al presente aviso de privacidad.
                            <br>
                            <br>
                            El “Responsable” pondrá a disposición del usuario del sitio web, la versión actualizada del aviso de privacidad, en la página de internet que a continuación se indica: http://karewa.org/
                        </p>
                    </div>
                </div>

                <div class="col-12 p-0">
                    <div class="card">
                        <div class="floating-title-panel">
                            <h1>
                                Comparación
                            </h1>
                            <div class="side-right">
                                <a href="" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i class="zmdi zmdi-share"></i> Compartir</a>
                                <a href="" class="btn-raised button-accent text-capi m-l-10" tabindex=""><i class="zmdi zmdi-download"></i> Descargar comparación</a>
                            </div>
                        </div>

                        <p class="f-14 c-plain_text principal-font-regular">A continuación te presentamos la comparación entre <strong class="principal-font-semibold">Monitor Karewa</strong> y <strong class="principal-font-semibold">Monitor Juárez:</strong></p>

                        <div class="panel-table">
                            <div class="row m-0 p-b-20">
                  <span class="border-lines col-12">
                    <label>Monitores a comparar</label>
                  </span>
                                <div class="col-4 p-30"></div>
                                <div class="col-4 p-30">
                                    <div class="logo-full lg">
                                        <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo">
                                        <div>
                                            <small>Monitor</small>
                                            <label style="color: #19babd;">Karewa</label>
                                        </div>
                                    </div>
                                    <a href="" class="btn-stroke button-primary text-unset" tabindex="">Ir a Inicio</a>
                                </div>
                                <div class="col-4 p-30">
                                    <div class="logo-full lg">
                                        <img class="img-fluid" src="@/assets/images/Logos/logo-karewa-xs.png" alt="Logo">
                                        <div>
                                            <small>Monitor</small>
                                            <label style="color: #b32530;">CD. JUÁREZ</label>
                                        </div>
                                    </div>
                                    <a href="" class="btn-stroke button-primary text-unset" tabindex="">Ir a Inicio</a>
                                </div>


                                <span class="border-lines col-12">
                    <label>Índice de riesgo de corrupción <i id="indice-tooltip" class="zmdi zmdi-help-outline"></i></label>
                                    <!-- TOOLTIP -->
                     <template id="help-tooltip-indice">
                      <div class="help-tooltip-div">
                        <label>¿Qué significa esto?</label>
                        <p>Es la sumatoria de los montos dados por cada contrato a lo largo de la administración 2016-2018.</p>
                        <p>Estos se dividen en 3 tipos de procedimientos de los contratos, los cuales son: <i>Licitación pública, Por invitación y Adquisición directa.</i></p>
                        <p class="m-b-0">Puedes consultar esta y más información en la sección de <i>Ayuda.</i></p>
                      </div>
                     </template>
                  </span>
                                <div class="col-4 p-30 vertical-center">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper m-b-0 vertical-center">Tacómetro <i id="tacometro-tooltip" class="zmdi zmdi-help-outline c-info f-18 m-l-5"></i></p>
                                    <!-- TOOLTIP -->
                                    <template id="help-tooltip-tacometro">
                                        <div class="help-tooltip-div">
                                            <label>¿Qué significa esto?</label>
                                            <p>TEXTO FALTANTE</p>
                                        </div>
                                    </template>
                                </div>
                                <div class="col-4 p-30">
                                    <div class="tacometro-container">

                                        <div class="gauge-container">
                                            <div class="gauge">
                                                <img class="left-border" src="@/assets/images/All-Icons/gauge-shape.png" alt="">
                                                <img class="right-border" src="@/assets/images/All-Icons/gauge-shape.png" alt="">
                                                <canvas id="gauge-graph-test1"></canvas>
                                                <div class="range">
                                                    <img class="" src="@/assets/images/All-Icons/tachometer-range.svg" alt="">
                                                </div>

                                            </div>
                                            <div class="text">
                                                <div id="gauge-text-test1">0</div>%
                                            </div>
                                            <div class="prob">text</div>
                                        </div>

                                    </div>
                                    <a href="" class="btn-stroke button-primary text-unset" tabindex="">¿Cómo se calcula?</a>
                                </div>
                                <div class="col-4 p-30">
                                    <div class="tacometro-container">



                                        <div class="gauge-container">
                                            <div class="gauge gauge-element">
                                                <img class="left-border" src="@/assets/images/All-Icons/gauge-shape.png" alt="">
                                                <img class="right-border" src="@/assets/images/All-Icons/gauge-shape.png" alt="">
                                                <canvas id="gauge-graph-test2"></canvas>
                                                <div class="range">
                                                    <img class="" src="@/assets/images/All-Icons/tachometer-range.svg" alt="">
                                                </div>

                                            </div>
                                            <div class="text">
                                                <div id="gauge-text-test2">0</div>%
                                            </div>
                                            <div class="prob">text</div>
                                        </div>

                                    </div>
                                    <a href="" class="btn-stroke button-primary text-unset" tabindex="">¿Cómo se calcula?</a>
                                </div>


                                <span class="border-lines col-12">
                    <label>Montos totales de la administración 2016-2018 <i id="totales-tooltip" class="zmdi zmdi-help-outline"></i></label>
                                    <!-- TOOLTIP -->
                     <template id="help-tooltip-totales">
                      <div class="help-tooltip-div">
                        <label>¿Qué significa esto?</label>
                        <p>TEXTO FALTANTE</p>
                      </div>
                     </template>
                  </span>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Licitación Pública </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> $1,055,177,509.74 = 56% </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> $1,553,903,392.98 = 68% </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Por Invitación </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> $149,337,687.59 = 16% </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> $94,761,976.88 = 4% </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Adjudicación Directa </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> $1,098,345,291.46 = 27% </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> $606,038,977.48 = 28% </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20"></div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <div class="divider"></div>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <div class="divider"></div>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Monto total </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                    <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0"> $2,302,860,488.81 </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                    <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0"> $2,254,704,347.36 </p>
                                </div>


                                <span class="border-lines col-12">
                    <label>Contratos dados de la administración 2016-2018 <i id="contratos-tooltip" class="zmdi zmdi-help-outline"></i></label>
                                    <!-- TOOLTIP -->
                     <template id="help-tooltip-contratos">
                      <div class="help-tooltip-div">
                        <label>¿Qué significa esto?</label>
                        <p>TEXTO FALTANTE</p>
                      </div>
                     </template>
                  </span>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS DE LICITACIÓN PÚBLICA </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 163 contratos </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 294 contratos </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS POR INVITACIÓN </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 68 contratos </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 59 contratos </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS DE ADJUDICACIÓN DIRECTA </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 1,537 contratos </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 328 contratos </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> CONTRATOS DE ADJUDICACIÓN DIRECTA </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 1,537 contratos </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 328 contratos </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20"></div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <div class="divider"></div>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <div class="divider"></div>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Contratos en total </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                    <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0"> 1,768 contratos </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20 p-b-20">
                                    <p class="f-16 c-accent principal-font-bold text-upper text-align-c d-block m-b-0"> 681 contratos </p>
                                </div>


                                <span class="border-lines col-12">
                    <label>Datos generales <i id="datos-tooltip" class="zmdi zmdi-help-outline"></i></label>
                                    <!-- TOOLTIP -->
                     <template id="help-tooltip-datos">
                      <div class="help-tooltip-div">
                        <label>¿Qué significa esto?</label>
                        <p>TEXTO FALTANTE</p>
                      </div>
                     </template>
                  </span>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-12 c-plain_text principal-font-medium text-upper d-block m-b-0"> Población total </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 809,232 (2010) </p>
                                </div>
                                <div class="col-4 p-l-20 p-r-20 p-t-20">
                                    <p class="f-16 c-plain_text principal-font-bold text-upper text-align-c d-block m-b-0"> 1,391,180 (2015) </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- INFO CARDS WITH IMAGE -->
                <div class="row m-t-60">
                    <div class="col-12">
                        <div class="floating-title-panel small">
                            <h1>Descubre más información</h1>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card-info">
                            <img class="img-fluid" src="@/assets/images/Cards/home-vector.svg" alt="" />
                            <div>
                                <p>Consulta la lista de todos los proveedores.</p>
                                <a href="" class="link-to" tabindex="">Ver Proveedores <i class="zmdi zmdi-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card-info">
                            <img class="img-fluid" src="@/assets/images/Cards/contracts-vector.svg" alt="" />
                            <div>
                                <p>Consulta la lista de todos los contratos.</p>
                                <a href="" class="link-to" tabindex="">Ver Contratos <i class="zmdi zmdi-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card-info">
                            <img class="img-fluid" src="@/assets/images/Cards/providers-vector.svg" alt="" />
                            <div>
                                <p>Conoce el índice de riesgo de corrupción del monitor.</p>
                                <a href="" class="link-to" tabindex="">Ver Índice <i class="zmdi zmdi-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="card-info">
                            <img class="img-fluid" src="@/assets/images/Cards/compare-vector.svg" alt="" />
                            <div>
                                <p>Compara los datos escenciales con otro monitor.</p>
                                <a href="" class="link-to" tabindex="">Comparar <i class="zmdi zmdi-chevron-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="" class="footer-client">
            <div class="neutral-width">

                <div class="row m-0">
            <span class="col-12 col-sm-8 col-md-8 col-lg-4 p-0 m-b-30">
                <ul>
                  <div class="floating-title-panel small">
                    <h1 class="f-14">Navegación</h1>
                  </div>
                  <div class="row">
                  <div class="col-6">
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Proveedores</a></li>
                    <li><a href="#">Contratos</a></li>
                    <li><a href="#">Índice de riesgo de corrupción</a></li>
                  </div>
                  <div class="col-6">

                        <li><a href="#">Comparar monitores</a></li>
                        <li><a href="#">Recursos</a></li>
                        <li><a href="#">Administrar</a></li>

                  </div>

                  </div>
                </ul>
            </span>
                    <span class="col-6 col-sm-4 col-md-4 col-lg-2 p-0 m-b-30">
                <ul>
                    <div class="floating-title-panel small">
                      <h1 class="f-14">Información</h1>
                    </div>
                    <li><a href="#">Aviso de Privacidad</a></li>
                </ul>
            </span>
                    <span class="col-6 col-sm-6 col-md-4 col-lg-2 p-0 m-b-0">
                <ul>
                    <div class="floating-title-panel small">
                      <h1 class="f-14">Nosotros</h1>
                    </div>
                    <li><a href="#">Acerca de</a></li>
                    <li><a href="#">Contacto</a></li>
                </ul>
            </span>

                    <span class="col-12 col-sm-6 col-md-8 col-lg-4 p-0 m-b-30 img-logo">
                  <img class="img-responsive" src="@/assets/images/Logos/logo-karewa.png" alt="Logo" />

              </span>
                </div>
                <div class="develop-by">
                    <div class="divider">
                    </div>
                    <p>Desarrollado por <img class="img-responsive" src="@/assets/images/Logos/logo-blacklabs-dark.png" alt="Logo" /> © 2019</p>
                </div>
            </div>
        </section>
        <!-- END MAIN CLIENT SECTION -->
    </div>
</template>

<style>
</style>

<script>
    export default {
        data () {
            return {
            }
        },
        components: {
        }
    }
</script>
