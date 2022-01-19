<template>
    <div>

        <!-- MODAL AUTO DISMISS-->
        <ModalAutoDismiss :message="$t('general.modal.wait.message')" ></ModalAutoDismiss>

        <!-- MODAL ALERT SUCCESS -->
        <ModalAlert :title="$t('general.modal-alert.download.title')"
                    :message="$t('general.modal-alert.download.message')"
                    :question="$t('general.modal-alert.download.question')">
            <button type="button" @click.prevent="downloadFile(false)"
                    class="btn-stroke button-accent" data-dismiss="modal">{{$t('general.modal-alert.download.all')}}
            </button>
            <button type="button" @click.prevent="downloadFile(true)"
                    class="btn-stroke button-accent" data-dismiss="modal">{{$t('general.modal-alert.download.filtered')}}
            </button>
        </ModalAlert>

        <section class="client-content">
            <div class="neutral-width">

                <div class="col-12 p-0 m-t-20 m-b-20 d-flex">
                    <router-link to="/suppliers" class="btn-outline text-unset">
                        <i class="zmdi zmdi-long-arrow-left"></i>Ir a Proveedores
                    </router-link>
                    <router-link to="/calculations/corruption-index" class="btn-outline text-unset m-auto-left">
                        Ir a Índice de Riesgo de Corrupción <i class="zmdi zmdi-long-arrow-right m-r-0 m-l-15"></i>
                    </router-link>
                </div>

                <div class="col-12 p-0">
                    <div class="card o-visible">
                        <div class="floating-title-panel">
                            <h1 m-t-0>
                                Contratos
                            </h1>
                            <div class="side-right d-flex">
                                <a @click="copyUrlToClipBoard()" class="btn-stroke button-primary text-capi b-shadow-none" tabindex=""><i
                                        class="zmdi zmdi-share"></i> Compartir</a>

                                <div class="dropdown p-l-10">
                                    <button class="btn-raised button-accent" type="button" id="dropdownDownloadOptions"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="zmdi zmdi-download"></i> DESCARGAR DATOS DE CONTRATOS
                                    </button>
                                    <div class="dropdown-menu dropdown-options dropdown-menu-right"
                                         aria-labelledby="dropdownDownloadOptions">
                                        <span>Descargar datos con formato:</span>
                                        <div class="container-dropdown">
                                            <a class="dropdown-item" @click.prevent="openModalAndSetFormat('pdf')" target="_blank">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-pdf.svg"
                                                     alt="Empty"/>
                                            </a>
                                            <a class="dropdown-item" @click.prevent="openModalAndSetFormat('xls')">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-xls.svg"
                                                     alt="Empty"/>
                                            </a>
                                            <a class="dropdown-item" @click.prevent="openModalAndSetFormat('json')">
                                                <img class="img-fluid" src="@/assets/images/Illustrations/icon-file-json.svg"
                                                     alt="Empty"/>
                                            </a>
                                        </div>
                                    </div>
                                </div>



                                <!--<a href="" class="btn-raised button-accent text-capi m-l-10" tabindex=""><i-->
                                        <!--class="zmdi zmdi-download"></i> DESCARGAR DATOS DE CONTRATOS</a>-->
                            </div>
                        </div>

                        <p class="f-14 c-plain_text principal-font-regular">Aquí podrás encontrar la lista de todos los contratos que han sido firmados por el Municipio<br/>
                            Si quieres consultar los detalles de un contraro haz clic en “Ver más”.</p>

                        <!--filters-->
                        <PublicFilter
                                :storeModule="storeModule"
                                :administrativeUnits="adminstrativeUnitsForFilter"
                                :fiscalYears="fiscalYears"
                                :trimonths="trimonths"
                                :administrationPeriods="administrationPeriods"
                                :procedureTypes="procedureTypes"
                                :suppliers="suppliers"

                        >

                        </PublicFilter>

                    </div>
                </div>

                <!-- Cantidades -->
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color accent">
                            <span class="f-25">{{totals.totalAmount | currency}}</span>
                            <!--label>MONTO TOTAL</label-->
                            <label class="c-primary f-bold">MONTO TOTAL</label> <!-- TODO: Estilo provisional ---->
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color green">
                            <span class="f-25">{{totals.PUBLIC | currency}}</span>
                            <!--label>Monto total de contratos por Licitación pública</label-->
                            <label class="c-primary f-bold">Monto total de contratos por Licitación pública</label> <!-- TODO: Estilo provisional ---->
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color yellow">
                            <span class="f-25">{{totals.INVITATION | currency}}</span>
                            <!--label>Monto total de contratos por Invitación</label-->
                            <label class="c-primary f-bold">Monto total de contratos por Invitación</label> <!-- TODO: Estilo provisional ---->
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-3 di-flex m-b-30">
                        <div class="panel-simple-color red">
                            <span class="f-25">{{totals.NO_BID | currency}}</span>
                            <!--label>Monto total de contratos por Adjudicación Directa</label-->
                            <label class="c-primary f-bold">Monto total de contratos por Adjudicación Directa</label> <!-- TODO: Estilo provisional ---->
                        </div>
                    </div>
                </div>


                <div class="row">
                    <div class="col-12">
                        <div class="card regular-table">
                            <div class="default-scrollbar ">
                                <table class="table form-table m-b-0">
                                    <thead>
                                    <tr>
                                        <th class="" style="min-width:0px;">Opciones</th>
                                        <th class="text-align-l">Nombre Del Proveedor</th>
                                        <th class="text-align-l">Id. proceso</th>
                                        <th class="text-align-l">Id. Contrato</th>
                                        <th class="text-align-l">Descripción de la obra</th>
                                        <th class="text-align-l">Monto total</th>
                                        <th class="text-align-l">Fecha del contrato</th>
                                        <th class="text-align-l">Tipo de procedimiento</th>
                                        <th class="text-align-l">Estado del procedimiento</th>
                                        <th class="text-align-l">Unidad Administrativa Solicitante</th>
                                        <th class="text-align-l">Materia</th>
                                        <th class="text-align-l">Tipo de contrato</th>
                                        <th class="text-align-l">Notas</th>
                                        <th class="text-align-l">Hipervínculo a la convocatoria</th>
                                        <th class="text-align-l">Hipervínculo al documento del contrato</th>
                                        <th class="text-align-l">Hipervínculo al documento de la Presentación de Propuestas</th>
                                        <th class="text-align-l">Fecha de obtención de los datos</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="contract in contracts">
                                        <td class="" style="min-width:0px;">
                                            <router-link :to="'/contracts/'+ contract._id" class="btn-stroke button-primary table-btn-stroke">
                                                Ver más
                                            </router-link>
                                        </td>
                                        <TableTdFormat :fieldName="'supplierName'"    :value="contract.supplier ? contract.supplier.name : ''"  class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :fieldName="'contractId'"    :value="contract.contractId"  class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :fieldName="'contractNumber'"    :value="contract.contractNumber"  class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :fieldName="'servicesDescription'"    :value="contract.servicesDescription"  class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :format="'currency'" :fieldName="'totalOrMaxAmount'"    :value="contract.totalOrMaxAmount"  :currency="true" class="text-align-l c-accent"> </TableTdFormat>
                                        <TableTdFormat :format="'date'"     :fieldName="'contractDate'"    :value="contract.contractDate" class="text-align-l"></TableTdFormat>

                                        <td class="text-align-l">
                                            <div class="badge" :class="{ 'badge-yellow' : contract.procedureType == 'INVITATION', 'badge-green' : contract.procedureType == 'PUBLIC', 'badge-red' : contract.procedureType == 'NO_BID'}">{{$t(contract.procedureType)}}</div>
                                        </td>

                                        <TableTdFormat :fieldName="'procedureState'"    :value="contract.procedureState"  :i18n="true" class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :fieldName="'applicantAdministrativeUnit'"    :value="contract.applicantAdministrativeUnit ? contract.applicantAdministrativeUnit.name : ''"  class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :fieldName="'category'"    :value="contract.category"  :i18n="true" class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :fieldName="'contractType'"    :value="contract.contractType"  :i18n="true" class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :fieldName="'notes'"    :value="contract.notes"  class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :format="'url'" :fieldName="'announcementUrl'"    :value="contract.announcementUrl"  class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :format="'url'" :fieldName="'contractUrl'"    :value="contract.contractUrl"  class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :format="'url'" :fieldName="'presentationProposalsDocUrl'"    :value="contract.presentationProposalsDocUrl"  class="text-align-l"> </TableTdFormat>
                                        <TableTdFormat :format="'date'" :fieldName="'informationDate'"    :value="contract.informationDate"  class="text-align-l c-accent"> </TableTdFormat>
                                    </tr>
                                    <!--<tr class="bgm-cards">-->
                                        <!--<td class="p-t-15 p-b-10 f-bold">TOTAL</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15">$1,055,177,509.74</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15">$149,337,687.59</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15">$1,098,345,291.46</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15 c-accent">$2,302,860,488.81</td>-->
                                        <!--<td class="text-align-r p-t-15 p-b-15"></td>-->
                                    <!--</tr>-->
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination  :store-module="storeModule"/>

                <!-- ADITIONAL INFO ONLY -->
                <p class="f-12 c-plain_text principal-font-regular">
                    Todos los datos que se presentan en este informe son única y exclusivamente obtenidos de: {{fuenteInformacion}}
                    <br>
                    <LastUpdateLabel :storeModule="storeModule"/>
                </p>

                <more-info></more-info>

            </div>
        </section>

    </div>
</template>

<style>
    /*.column-wdt {*/
        /*width: auto;*/
        /*min-width: 0;*/
        /*display: table;*/
    /*}*/
</style>

<script>

    const storeModule = 'publicContracts';
    const docName = 'contracts.doc-name';
    import MoreInfo from '@/components/general/MoreInfo';
    import Pagination from '@/components/catalogs/Pagination';
    import { mapState, mapGetters } from 'vuex';
    import moment from 'moment';
    import TableTdFormat from '@/components/tables/tds/TableTdFormat';
    import PublicFilter from '@/components/filters/PublicFilter.vue';
    import ModalAutoDismiss from '@/components/catalogs/ModalAutoDismiss.vue';
    import ModalAlert from '@/components/catalogs/ModalAlert.vue';
    import LastUpdateLabel from '@/components/general/LastUpdateLabel.vue';
    import aboutInfo from '@/karewaPlatform.info';


    export default {
        data() {
            return {
                storeModule : storeModule,
                format:"",
                fuenteInformacion: aboutInfo.infoFuenteInformacion.fuenteInformacion || "https://www.plataformadetransparencia.org.mx"
            }
        },
        computed  : {
            ...mapState({
                contracts: state => state[storeModule].contracts,
                adminstrativeUnitsForFilter: state => state[storeModule].adminstrativeUnitsForFilter,
                fiscalYears: state => state[storeModule].fiscalYears,
                trimonths: state => state[storeModule].trimonths,
                administrationPeriods: state => state[storeModule].administrationPeriods,
                procedureTypes: state => state[storeModule].procedureTypes,
                totals: state => state[storeModule].totals, //I like totals
                lastQuery: state => state[storeModule].lastQuery,
                suppliers:  state => state[storeModule].suppliers
            }),
        },
        components: {
            MoreInfo,
            TableTdFormat,
            Pagination,
            PublicFilter,
            ModalAutoDismiss,
            ModalAlert,
            LastUpdateLabel
        },
        created() {
            window.$(document).ready(function () {
                window.$('.selectpicker').selectpicker();
                $('.selectpicker').selectpicker();
            });
        },
        beforeMount() {
//            this.$store.dispatch(`${storeModule}/getTotals`);
            this.$store.dispatch(`${storeModule}/list`);
            this.$store.commit(`${storeModule}/setDocName`,  docName);

            //for the filters
            this.$store.dispatch(`${storeModule}/getAdministrativeUnitsForFilter`);
            this.$store.dispatch(`${storeModule}/getFiscalYears`);
            this.$store.dispatch(`${storeModule}/getTrimonths`);
            this.$store.dispatch(`${storeModule}/getAdministrationPeriods`);
            this.$store.dispatch(`${storeModule}/getProcedureTypes`);
            this.$store.dispatch(`${storeModule}/getSuppliersForFilter`);

        },
        methods:{
            openModalAndSetFormat(format){
                this.format = format;
                $('#modalAlertSuccess').modal('show');
            },
            downloadFile (withFilters) {
                $('#modalAutoDismiss').modal('show');
                let filters = withFilters ? this.lastQuery : {};
                this.$store.dispatch('publicContracts/downloadFile', {format:this.format,filters});
            },
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
        mounted(){
            this.$nextTick(function () {
                $('.selectpicker').selectpicker('refresh');
            })
        },
        filters: {
            moment: function (date) {
                moment.locale('es');
                if(!date){
                    return
                }
                return moment(date).format('DD [de] MMMM [de] YYYY')
            }
        }
    }
</script>
