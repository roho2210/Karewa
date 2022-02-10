<template>
    <div>
        <section id="cover" class="client-cover">
            <div class="cover-container">
                <div class="img-container">
                    <img v-if="!hasCover" src="@/assets/images/Backgrounds/test-cover-page.svg" alt="Cover">
                    <img v-if="hasCover"
                         :src="coverSrc"
                         alt="Cover"/>
                    <!--<img src="@/assets/images/Backgrounds/test-cover-page.svg" alt="">-->
                </div>
                <div class="neutral-width">
                    <div class="info">
                        <!--<h3>{{$t('general.welcome-to')}}</h3>-->
                        <!--&lt;!&ndash;<h1>Monitor <strong>Karewa</strong></h1>&ndash;&gt;-->
                        <!--<h1 v-html="$t('general.app.name.html-strong')"></h1>-->
                        <!--<div class="divider"></div>-->
                        <!--&lt;!&ndash;<p>Aquí podrás obtener información sobre los procedimientos de licitaciones para consultar la compra, renta y contratación de servicios que se realizan</p>&ndash;&gt;-->
                        <!--<p>{{$t('general.app.description')}}</p>-->
                        <h3 :class="currentOrganization.showBackgroundText != '' ? 'welcomeTitle' : ''" v-html="currentOrganization.welcomeTitle || defaultWelcomeTitle"></h3>
                        <!--<h1>Monitor <strong>Karewa</strong></h1>-->
                        <h1 :class="currentOrganization.showBackgroundText != '' ? 'title' : ''" v-html="currentOrganization.title || defaultTitle"></h1>
                        <div class="divider"></div>
                        <!--<p>Aquí podrás obtener información sobre los procedimientos de licitaciones para consultar la compra, renta y contratación de servicios que se realizan</p>-->
                        <p :class="currentOrganization.showBackgroundText != '' ? 'description' : ''" v-html="currentOrganization.description || defaultDescription"></p>

                    </div>

                    <div v-if="showOrganizationSelect">
                        <OrganizationSelector :defaultRedirectTo="defaultRedirectTo"/>
                    </div>

                    <div class="horizontal-center m-t-50" v-if="showFilters">

                        <div class="filter-box">
                            <!--filters-->
                            <PublicFilter
                                    :storeModules="chartsModules"
                                    :administrativeUnits="adminstrativeUnitsForFilter"
                                    :fiscalYears="fiscalYears"
                                    :trimonths="trimonths"
                                    :administrationPeriods="administrationPeriods"
                                    :procedureTypes="procedureTypes"
                                    :suppliers="suppliers"
                                    :actionName = "'getInfoForChart'"
                                    :projection = "{search : 0}"
                            >
                            </PublicFilter>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style>
    .description {
            font-size: 16px;
            font-weight: 500;
            line-height: 1.88;
            text-align: center;
            max-width: 780px;
            margin: auto;
            overflow: hidden;
            display: -webkit-box !important;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            text-overflow: ellipsis;
            overflow: hidden;
            background-color: rgba(0,0,0,0.3); 
    }

    .title {
        font-size: 60px;
        font-weight: normal;
        line-height: normal;
        text-align: center;
        background-color: rgba(0,0,0,0.3);
        max-width: 780px;
        margin: auto;
    }

    .welcomeTitle {
        font-size: 20px;
        font-weight: bold;
        line-height: normal;
        text-align: center;
        margin-bottom: 0;
        background-color: rgba(0,0,0,0.3);
        max-width: 780px;
        margin: auto;     
    }



</style>
<script>

    import OrganizationSelector from '@/components/general/OrganizationSelector';
    import PublicFilter from '@/components/filters/PublicFilter.vue';
    import { mapState} from 'vuex';

    const storeModule = "userHome";
    const chartsModules = ["millonesTrimestreChart","ejercidoProcedimientoChart"];
    import baseApi from '@/api/base.api';

    export default {
        data () {
            return {
                storeModule : storeModule,
                chartsModules : chartsModules,
                defaultRedirectTo: '/',
                defaultTitle: 'Monitor <strong>Karewa</strong>',
                defaultDescription: 'Aquí podras obtener información sobre los procedimientos de contrataciones públicas, incluyendo la compra, renta y contratación de servicios que se realizan',
                defaultWelcomeTitle: 'Bienvenido a'
            }
        },
        components: {
            OrganizationSelector,
            PublicFilter
        },
        props: {
            showFilters: {
                type: Boolean,
                default: true
            },
            showOrganizationSelect: {
                type: Boolean,
                default: false
            }
        },
        computed : {
            ...mapState({
                currentOrganization: state => state.currentOrganization,
                contracts: state => state[storeModule].contracts,
                adminstrativeUnitsForFilter: state => state[storeModule].adminstrativeUnitsForFilter,
                fiscalYears: state => state[storeModule].fiscalYears,
                trimonths: state => state[storeModule].trimonths,
                administrationPeriods: state => state[storeModule].administrationPeriods,
                procedureTypes: state => state[storeModule].procedureTypes,
                // suppliers: state => state[storeModule].suppliers,
                suppliers : function(state){
                    let suppliers = state[storeModule].suppliers
                    return suppliers;
                }
            }),
            hasCover() {
                return !!this.currentOrganization.cover;
            },
            coverSrc() {
                if (this.currentOrganization.cover) {
                    return `${baseApi.baseUrl}/public-api/files/image/${this.currentOrganization.cover}`;
                } else {
                    return '';
                }
            }
        },
        beforeMount() {
            //for the filters
            this.$store.dispatch(`${storeModule}/getAdministrativeUnitsForFilter`);
            this.$store.dispatch(`${storeModule}/getFiscalYears`);
            this.$store.dispatch(`${storeModule}/getTrimonths`);
            this.$store.dispatch(`${storeModule}/getAdministrationPeriods`);
            this.$store.dispatch(`${storeModule}/getProcedureTypes`);
            this.$store.dispatch(`${storeModule}/getSuppliersForFilter`);


            let cover = this.$session.get('currentOrganizationCover');
            let title = this.$session.get('currentOrganizationTitle');
            let description = this.$session.get('currentOrganizationDescription');

        },

    }
</script>
