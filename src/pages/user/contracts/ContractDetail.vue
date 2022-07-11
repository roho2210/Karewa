<template>

    <section class="client-content">
        <div class="neutral-width">

            <!--Titulo-->
            <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                <a href="/contracts" class="btn-outline text-unset"><i class="zmdi zmdi-long-arrow-left"></i> Regreso a Contratos </a>
            </div>

            <!-- CONTRATO SECTION -->
            <div class="col-12 p-0">
                <!-- CONTRATO INFO -->
                <div class="card">
                    <div class="floating-title-panel long-text">
                        <h1>
                            <small>Contrato</small>
                            <span class="text-upper"> {{contract.servicesDescription}}</span>
                        </h1>
                        <div class="side-right">
                            <a @click="copyUrlToClipBoard()" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i class="zmdi zmdi-share"></i> Compartir</a>
                        </div>
                    </div>
                    <p class="f-14 c-plain_text principal-font-regular">El contrato <strong class="principal-font-semibold"><span class="text-upper"> {{contract.servicesDescription}}</span></strong>, a cargo del proveedor <strong class="principal-font-semibold">{{contract.supplier ? contract.supplier.name : ""}}</strong> obtuvo una cantidad de <strong class="c-accent">{{contract.totalOrMaxAmount | currency}}</strong>, celebrado el día <strong>{{contract.contractDate | date }}</strong></p>
                </div>
                <!-- CONTRATO FILES -->
                <div class="card">
                    <div class="floating-title-panel small">
                        <h1>Archivos</h1>
                    </div>
                    <p class="f-14 c-plain_text principal-font-regular m-b-30">Aquí puedes consultar los documentos de la convocatoria, de aclaración y propuesta de este contrato.</p>
                    <div class="row m-b--30">
                        <FileWithBackup title="Contrato" :url="contract.contractUrl" :urlBackup="contract.contractUrlBackup"/>
                        <FileWithBackup title="Convocatoria / Invitación" :url="contract.announcementUrl" :urlBackup="contract.announcementUrlBackup"/>
                        <FileWithBackup title="Fallo de Junta de Aclaraciones" :url="contract.clarificationMeetingJudgmentUrl" :urlBackup="contract.clarificationMeetingJudgmentUrlBackup"/>
                        <FileWithBackup title="Presentación de Propuesta" :url="contract.presentationProposalsDocUrl" :urlBackup="contract.presentationProposalsDocUrlBackup"/>
                        <!--<div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">-->
                            <!--<div class="panel-button">-->
                                <!--<label>Contrato</label>-->
                                <!--<button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar documento</button>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">-->
                            <!--<div class="panel-button">-->
                                <!--<label>Convocatoria / Invitación</label>-->
                                <!--<small>Documento no disponible</small>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">-->
                            <!--<div class="panel-button">-->
                                <!--<label>Fallo de Junta de Aclaraciones</label>-->
                                <!--<button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar documento</button>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">-->
                            <!--<div class="panel-button">-->
                                <!--<label>Presentación de Propuesta</label>-->
                                <!--<button class="btn-raised xs button-accent"><i class="zmdi zmdi-download"></i>Descargar documento</button>-->
                            <!--</div>-->
                        <!--</div>-->
                    </div>
                </div>
                <!-- CONTRATO DETAIL INFO -->
                <div class="card">
                    <div class="floating-title-panel small">
                        <h1>Información detallada</h1>
                    </div>
                    <div class="non-list">
                        <span> <small>Identificador de proceso</small> <i>-</i> <strong>{{contract.contractId}}</strong></span>
                        <span> <small>Descripción de las obras, bienes o servicios</small> <i>-</i> <strong>{{contract.servicesDescription}}</strong></span>
                        <span> <small>Monto total</small>  <i>-</i> <strong class="c-accent"> {{contract.totalOrMaxAmount | currency}} </strong></span>
                        <span> <small>Fecha del contrato</small> <i>-</i> <strong>{{contract.contractDate | date}}</strong></span>
                        <span> <small>Tipo de procedimiento</small> <i>-</i> <div class="badge" :class="{ 'badge-yellow' : contract.procedureType == 'INVITATION', 'badge-green' : contract.procedureType == 'PUBLIC', 'badge-red' : contract.procedureType == 'NO_BID'}">{{$t(contract.procedureType)}}</div></span>

                        <span> <small>Estado del procedimiento</small> <i>-</i>
                            <div class="badge" :class="{ 'badge-yellow' : contract.procedureState === 'IN_PROGRESS', 'badge-green' : contract.procedureState === 'COMPLETED', 'badge-red' : contract.procedureState === 'CANCELED' || contract.procedureState === 'DESERTED'}">
                                {{$t(contract.procedureState)}}
                            </div>
                        </span>
                        <span> <small>Unidad administrativa solicitante</small> <i>-</i> <strong>{{contract.applicantAdministrativeUnit ? contract.applicantAdministrativeUnit.name : ""}}</strong></span>
                        <span> <small>Materia</small> <i>-</i> <strong>{{$t(contract.category)}}</strong></span>
                        <span> <small>Nombre del proveedor</small> <i>-</i> <strong>{{contract.supplier ? contract.supplier.name : ""}}</strong></span>
                        <!--<span> <small>RFC</small> <i>-</i> <strong>{{contract}}</strong></span>-->
                        <span> <small>Notas</small> <i>-</i> <strong>{{contract.notes}}</strong></span>
                        <span> <small>Fecha de obtención de los datos</small> <i>-</i> <strong>{{contract.informationDate | date}}</strong></span>
                    </div>
                </div>
            </div>

            <!-- ADITIONAL INFO ONLY -->
            <p class="f-12 c-plain_text principal-font-regular">
                Todos los datos que se presentan en este informe son única y exclusivamente obtenidos de: {{fuenteInformacion}}
                <br>
                Última actualización: <strong>{{contract.updateDate | moment}}</strong>
            </p>

            <more-info></more-info>

        </div>

    </section>

</template>

<script>
    import MoreInfo from '@/components/general/MoreInfo';
    import FileWithBackup from '@/components/files/FileWithBackup';
    const storeModule = "publicContracts";
    import moment from 'moment';
    import {mapState,vm} from 'vuex';
    import aboutInfo from '@/karewaPlatform.info';


    export default {
        data() {
            return {
                fuenteInformacion: aboutInfo.infoFuenteInformacion.fuenteInformacion || "https://www.plataformadetransparencia.org.mx"
            };
        },
        name: "SupplierContract",
        components: {
            MoreInfo,
            FileWithBackup
        },
        beforeMount(){
            let contractId = this.$route.params.id;
            this.$store.dispatch(`${storeModule}/loadContractDetail`, contractId);
        },
        mounted(){
            let contractId = this.$route.params.id;
            this.$store.dispatch(`${storeModule}/loadContractDetail`, contractId);
        },
        methods : {
            copyUrlToClipBoard(){
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value =  window.location.href;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(tempTextArea);
                tShow('Se ha copiado el enlace correctamente', 'info');

            }
        },
        filters: {
            moment: function (date) {
                return moment(date).format('DD/MM/YYYY');
            }
        },
        computed : {
            ...mapState({
                    contract: function (state) {
                        return state[storeModule].contractDetail || {};
                    }
                }
            )
        }
    }
</script>

<style scoped>

</style>
