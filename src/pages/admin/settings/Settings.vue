<template>
    <div>
        <AdminMainSection :storeModule="'settings'">
            <BackButton />
            <div class="col-12">
                <div class="material-tabs">
                    <div class="nav" id="material-tabs" role="tablist" aria-orientation="vertical">
                        <a class="nav-link active" id="material-tab" data-toggle="pill" href="#info-content"
                           role="tab" aria-controls="info-content" aria-selected="true">
                            Información general
                        </a>

                        <a class="nav-link" id="material-tab" data-toggle="pill" href="#plat-content"
                           role="tab" aria-controls="plat-content" aria-selected="false">
                            Personalización de la plataforma
                        </a>
                    </div>

                    <div class="tab-content" id="material-tabsContent">
                        <div class="tab-pane fade show active" id="info-content" role="tabpanel"
                             aria-labelledby="v-pills-home-tab">
                            <div class="card">
                                <div class="card-body">
                                    <div class="p-relative d-flex vertical-center m-t-20 m-b-20">
                                        <div class="floating-text w-50">
                                            <h1>Imagen de portada </h1>
                                            <p class="m-b-0">Puedes cambiar la imagen principal de la página
                                                del monitor</p>
                                        </div>
                                        <div class="buttons-right w-50">
                                            <a v-show="!editEnabled" class="btn-stroke button-accent b-shadow-none p-t-5 p-b-5">
                                                <!--<i class="zmdi zmdi-plus"></i>-->
                                                Cambiar Imagen
                                                <input type="file" id="file" :ref="coverFileRef" v-on:change="handleCoverFileUpload()" :accept="fileAcceptCover"/>
                                            </a>
                                            <a v-show="!editEnabled" @click.prevent="setEditEnabled(true)"
                                               class="btn-raised button-accent b-shadow-none p-t-5 p-b-5 m-l-15">
                                                <!--<i class="zmdi zmdi-plus"></i>-->
                                                Editar
                                            </a>
                                            <a v-show="editEnabled" @click.prevent="setEditEnabled(false)"
                                               class="btn-stroke button-accent b-shadow-none p-t-5 p-b-5">
                                                <!--<i class="zmdi zmdi-plus"></i>-->
                                                Cancelar
                                            </a>
                                            <a v-show="editEnabled" @click.prevent="saveChanges()"
                                               class="btn-raised button-accent b-shadow-none p-t-5 p-b-5 m-l-15">
                                                <!--<i class="zmdi zmdi-plus"></i>-->
                                                Guardar
                                            </a>
                                        </div>
                                    </div>

                                    <div class="cover-test m-b-30">
                                        <label>Tamaño de imagen recomendado: <strong class="primary">1280 x
                                            500</strong> </label>
                                        <div class="container-cover">
                                            <img v-if="!hasCover" class="img-fluid" src="@/assets/images/Backgrounds/test-cover-page.svg" alt="Cover">
                                            <img v-if="hasCover" class="img-fluid"
                                                 :src="coverSrc"
                                                 alt="Cover"/>
                                            <div class="info" v-show="!editEnabled">
                                                <small :class="{'welcomeTitle' : settings.showBackgroundText}" v-html="settings.welcomeTitle || defaultWelcomeTitle"></small>
                                                <label :class="{'title' : settings.showBackgroundText}" v-html="settings.title || defaultTitle"></label>
                                                <p :class="{'description' : settings.showBackgroundText}" v-html="settings.description || defaultDescription"></p>
                                            </div>
                                            <div class="info" v-show="editEnabled">
                                                <small :class="{'welcomeTitle' : localSettings.showBackgroundText}" v-html="localSettings.welcomeTitle || defaultWelcomeTitle"></small>
                                                <label :class="{'title' : localSettings.showBackgroundText}" v-html="localSettings.title || defaultTitle"></label>
                                                <p :class="{'description' : localSettings.showBackgroundText}" v-html="localSettings.description || defaultDescription"></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-12 col-md-12">
                                            <div class="form-group fg-float">
                                                <div v-show="!editEnabled" class="">
                                                    <input type="checkbox" v-model="settings.showBackgroundText" disabled="true" ><label class="fg-label"> Fondo de texto</label>
                                                </div>
                                                <div v-show="editEnabled" class="fg-line fg-float">
                                                    <input type="checkbox" value="" v-model="localSettings.showBackgroundText"><label class="fg-label"> Fondo de texto</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group fg-float">
                                                <div v-show="!editEnabled" class="fg-line basic-input">
                                                    <p>{{settings.welcomeTitle}}</p>
                                                    <label class="fg-label">Texto de bienvenida</label>
                                                </div>
                                                <div v-show="editEnabled" class="fg-line basic-input">
                                                    <input v-model.trim="localSettings.welcomeTitle" type="text" class="form-control fg-input"
                                                           placeholder="Texto de bienvenida">
                                                    <label class="fg-label">Texto de bienvenida</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group fg-float">
                                                <div v-show="!editEnabled" class="fg-line basic-input">
                                                    <p>{{settings.title}}</p>
                                                    <label class="fg-label">Titulo</label>
                                                </div>
                                                <div v-show="editEnabled" class="fg-line basic-input">
                                                    <input v-model.trim="localSettings.title" type="text" class="form-control fg-input"
                                                           placeholder="Titulo">
                                                    <label class="fg-label">Titulo</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group fg-float">
                                                <div v-show="!editEnabled" class="fg-line basic-input">
                                                    <p>{{settings.description}}</p>
                                                    <label class="fg-label">Descripción</label>
                                                </div>
                                                <div v-show="editEnabled" class="fg-line basic-input">
                                                    <textarea v-model.trim="localSettings.description" type="text"
                                                              class="form-control fg-input"
                                                              placeholder="Aquí podrás obtener información sobre los procedimientos de licitaciones para comparar la compra, renta y contratación de serviciosque se realizan en el Monitor Karewa."></textarea>
                                                    <label class="fg-label">Descripción</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group fg-float">
                                                <div v-show="!editEnabled" class="fg-line basic-input">
                                                    <p>{{settings.contactLocation}}</p>
                                                    <label class="fg-label">Descripción de formulario de
                                                        contacto</label>
                                                </div>
                                                <div v-show="editEnabled" class="fg-line basic-input">
                                                    <textarea v-model.trim="localSettings.contactLocation" type="text"
                                                              class="form-control fg-input"
                                                              placeholder="Edita la dirección de correo de donde recibirás la información  de la gente que te contacte."></textarea>
                                                    <label class="fg-label">Descripción de formulario contacto</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="col-12 col-md-6">
                                            <div class="form-group fg-float">
                                                <div v-show="!editEnabled" class="fg-line basic-input">
                                                    <p>{{settings.address}}</p>
                                                    <label class="fg-label">Dirección</label>
                                                </div>
                                                <div v-show="editEnabled" class="fg-line basic-input">
                                                    <textarea v-model.trim="localSettings.address" type="text"
                                                              class="form-control fg-input"
                                                              placeholder="Se usará para generar el mapa de localización"></textarea>
                                                    <label class="fg-label">Dirección</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group fg-float">
                                                <div v-show="!editEnabled" class="fg-line basic-input">
                                                    <p>{{settings.schedule}}</p>
                                                    <label class="fg-label">Horario</label>
                                                </div>
                                                <div v-show="editEnabled" class="fg-line basic-input">
                                                    <input v-model.trim="localSettings.schedule" type="text" class="form-control fg-input"
                                                           placeholder="i.e. Lunes a Viernes de 9:30am a 5:00pm">
                                                    <label class="fg-label">Horario</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group fg-float">
                                                <div v-show="!editEnabled" class="fg-line basic-input">
                                                    <p>{{settings.additionalInformation}}</p>
                                                    <label class="fg-label">Información adicional de contacto</label>
                                                </div>
                                                <div v-show="editEnabled" class="fg-line basic-input">
                                                    <input v-model.trim="localSettings.additionalInformation" type="text" class="form-control fg-input"
                                                           placeholder="Información adicional de contacto">
                                                    <label class="fg-label">Información adicional de contacto</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group fg-float">
                                                <div class="fg-line basic-input">

                                                     <div v-show="!editEnabled" class="fg-line basic-input">
                                                        <p>{{settings.defaultAdministrationPeriod}}</p>
                                                    </div>

                                                    <div v-show="editEnabled" class="m-t-10">
                                                        <select v-model="localSettings.defaultAdministrationPeriod" class="form-control select selectpicker" data-live-search="true"
                                                                data-live-search-placeholder="Buscar administración"
                                                                title="Administración">
                                                            <option v-for="item in administrationPeriods" :value="item._id">
                                                                {{item.administrationPeriod}}
                                                            </option>
                                                        </select>
                                                    </div>

                                                    <label class="fg-label">Administración por defecto</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-6">
                                            <div class="form-group fg-float">
                                                <div class="fg-line basic-input">

                                                     <div v-show="!editEnabled" class="checkbox m-t-10">
                                                        <input type="checkbox" :checked="!(settings.round === false)" disabled="true">
                                                        <i class="input-helper"></i>
                                                    </div>

                                                    <div v-show="editEnabled" class="checkbox m-t-10">
                                                        <input type="checkbox" v-model="localSettings.round" :checked="localSettings.round">
                                                        <i class="input-helper"></i>
                                                    </div>

                                                    <label class="fg-label">Redondear decimales</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <img class="img-fluid img-card-corner"
                                     src="@/assets/images/Cards/corner-settings-lg.svg" alt="">
                            </div>
                        </div>

                        <div class="tab-pane fade" id="plat-content" role="tabpanel"
                             aria-labelledby="plat-content">
                            <div class="card">
                                <div class="card-body">
                                    <div class="p-relative d-flex vertical-center m-t-20 m-b-20">
                                        <div class="floating-text w-50">
                                            <h1>Personalización de plataforma </h1>
                                            <p class="m-b-0">Elige el tema para personalizar la
                                                plataforma.</p>
                                        </div>
                                        <div class="buttons-right w-50">
                                            <a @click="editTheme()" v-show="!editThemeEnabled"
                                               class="btn-raised button-accent b-shadow-none p-t-5 p-b-5">
                                                Editar </a>
                                            <a @click="cancelEditTheme()" v-show="editThemeEnabled"
                                               class="btn-raised button-accent b-shadow-none p-t-5 p-b-5">
                                                Cancelar </a>
                                        </div>
                                    </div>
                                    <!-- AL DAR CLICK EN EDITAR, SE DEBE ELIMINAR LA CLASE "disabled".
                                    CUANDO SE DE GUARDAR, SE AGREGA LA CLASE "disabled". -->
                                    <ul class="colors-list controls" :class="{disabled: !editThemeEnabled}">
                                        <li>
                                            <button class="controls" data-theme="default" @click="setTheme('default')"></button>
                                            <!-- SE AGREGA LA CLASE "active" CUANDO SE DA CLICK EN RECUADRO -->
                                            <span :class="defaultClass"></span> Default
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="dark" @click="setTheme('dark')"></button>
                                            <span :class="darkClass"></span> Oscuro
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="purple" @click="setTheme('purple')"></button>
                                            <span :class="purpleClass"></span> Morado
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="orange" @click="setTheme('orange')"></button>
                                            <span :class="orangeClass"></span> Naranja
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="yellow" @click="setTheme('yellow')"></button>
                                            <span :class="yellowClass"></span> Amarillo
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="greenBlue" @click="setTheme('greenBlue')"></button>
                                            <span :class="greenBlueClass"></span> Azul Verde
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="green" @click="setTheme('green')"></button>
                                            <span :class="greenClass"></span> Verde
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="sky" @click="setTheme('sky')"></button>
                                            <span :class="skyClass"></span> Cielo
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="blue" @click="setTheme('blue')"></button>
                                            <span :class="blueClass"></span> Azul
                                        </li>
                                        <!--li>
                                            <button class="controls" data-theme="red" @click="setTheme('red')"></button>
                                            <span :class="redClass"></span> Rojo
                                        </li-->
                                        <li>
                                            <button class="controls" data-theme="pink" @click="setTheme('pink')"></button>
                                            <span :class="pinkClass"></span> Rosa
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="gray" @click="setTheme('gray')"></button>
                                            <span :class="grayClass"></span> Gris
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="lilac" @click="setTheme('lilac')"></button>
                                            <span :class="lilacClass"></span> Lila
                                        </li>
                                        <li>
                                            <button class="controls" data-theme="blueDark" @click="setTheme('blueDark')"></button>
                                            <span :class="blueDarkClass"></span> Azul Oscuro
                                        </li>
                                    </ul>
                                </div>

                                <img class="img-fluid img-card-corner"
                                     src="@/assets/images/Cards/corner-settings-lg.svg" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminMainSection>

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
        color: white;   
    }
</style>

<script>
    import AdminMainSection from '@/components/admin/AdminMainSection';
    import BackButton from '@/components/general/BackButton';
    import baseApi from '@/api/base.api';
    import {mapState} from 'vuex';
    
    const storeModule = 'settings';

    export default {
        data () {
            return {
                editEnabled: false,
                editThemeEnabled: false,
                localSettings: {
                    title: '',
                    description: '',
                    contactLocation: '',
                    contactEmail: '',
                    schedule: '',
                    additionalInformation: '',
                    address: '',
                    welcomeTitle: '',
                    showBackgroundText: false,
                    round: true,
                    defaultAdministrationPeriod: ''
                },
                coverFileRef: 'coverFile',
                coverFile: null,
                allowedImageMimeTypes: [
                    'image/png',
                    'image/jpeg',
                    'image/svg+xml',
                    'image/gif',
                ],
                defaultTitle: 'Monitor <strong>Karewa</strong>',
                defaultDescription: 'Aquí podras obtener información sobre los procedimientos de contrataciones públicas, incluyendo la compra, renta y contratación de servicios que se realizan en el Municipio',
                defaultWelcomeTitle: 'Bienvenido a '
            }
        },
        components: {
            AdminMainSection,
            BackButton
        },
        watch: {
            settings(val) {
                this.setLocalSettings(val);
            }
        },
        computed: {
            ...mapState({
                currentOrganization: state => state.currentOrganization,
                settings: state => state[storeModule].settings,
                administrationPeriods: state => state['publicContracts'].administrationPeriods,
            }),
            theme () {
                return this.currentOrganization.theme || 'default';
            },
            defaultClass() {
                return this.theme === 'default' ? 'active' : '';
            },
            darkClass() {
                return this.theme === 'dark' ? 'active' : '';
            },
            purpleClass() {
                return this.theme === 'purple' ? 'active' : '';
            },
            orangeClass() {
                return this.theme === 'orange' ? 'active' : '';
            },
            yellowClass() {
                return this.theme === 'yellow' ? 'active' : '';
            },
            greenBlueClass() {
                return this.theme === 'greenBlue' ? 'active' : '';
            },
            greenClass() {
                return this.theme === 'green' ? 'active' : '';
            },
            skyClass() {
                return this.theme === 'sky' ? 'active' : '';
            },
            blueClass() {
                return this.theme === 'blue' ? 'active' : '';
            },
            redClass() {
                return this.theme === 'red' ? 'active' : '';
            },
            pinkClass() {
                return this.theme === 'pink' ? 'active' : '';
            },
            grayClass() {
                return this.theme === 'gray' ? 'active' : '';
            },
            lilacClass() {
                return this.theme === 'lilac' ? 'active' : '';
            },
            blueDarkClass() {
                return this.theme === 'blueDark' ? 'active' : '';
            },
            fileAcceptCover() {
                return this.allowedImageMimeTypes.join(',');
            },
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
        methods:{
            setTheme(theme) {
                if (this.editThemeEnabled) {
                    let session = this.$session;
                    this.$store.dispatch(`${storeModule}/CHANGE_THEME`, {theme, session});
                    this.editThemeEnabled = false;
                }
            },
            editTheme() {
                this.editThemeEnabled = true;
            },
            cancelEditTheme() {
                this.editThemeEnabled = false;
            },
            setEditEnabled (setTo) {
                if (setTo) {
                    this.setLocalSettings(this.settings);
                    $('.selectpicker').selectpicker('refresh');
                }
                this.editEnabled = setTo;
            },
            saveChanges() {
                //TODO: Save
                let session = this.$session;
                this.$store.dispatch(`${storeModule}/CHANGE_SETTINGS`, {session, ...this.localSettings});
                this.setEditEnabled(false);
            },
            setLocalSettings(val) {
                this.localSettings.title = val.title || '';
                this.localSettings.description = val.description || '';
                this.localSettings.contactLocation = val.contactLocation || '';
                this.localSettings.contactEmail = val.contactEmail || '';  
                this.localSettings.address = val.address|| '';
                this.localSettings.schedule = val.schedule || '';
                this.localSettings.additionalInformation = val.additionalInformation || '';
                this.localSettings.welcomeTitle = val.welcomeTitle || '';
                this.localSettings.showBackgroundText = val.showBackgroundText || false;
                this.localSettings.round = val.round === false ? false : true;
                this.localSettings.defaultAdministrationPeriod = val.defaultAdministrationPeriod || '';
            },
            handleCoverFileUpload() {

                this.coverFile = null;

                if (this.$refs[this.coverFileRef].files && this.$refs[this.coverFileRef].files.length) {
                    this.coverFile = this.$refs[this.coverFileRef].files[0];
                }

                if (!this.coverFile || !this.coverFile.size || !this.coverFile.type) {
                    //TODO: toast i18n
                    tShow(`Por favor selecciona un archivo para la imagen`, 'danger');
                    return;
                }

                if (!this.allowedImageMimeTypes.includes(this.coverFile.type)) {
                    //TODO: toast i18n
                    tShow(`Por favor selecciona una imagen con extensión .jpeg, .png, .gif o .svg`, 'danger');
                    return;
                }

                let formData = new FormData();
                formData.append('cover', this.coverFile);
                
                let session = this.$session;

                this.$store.dispatch(`${storeModule}/CHANGE_COVER`, {session, formData});
            },
        },
        created(){
        },
        beforeMount(){
            this.$store.dispatch(`${storeModule}/LOAD_SETTINGS`);
            this.$store.dispatch('publicContracts/getAdministrationPeriods');
        },
        mounted() {
            if (this.settings) {
                this.setLocalSettings(this.settings);
            }
        }
    }
</script>
