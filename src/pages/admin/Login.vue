<template>
    <div>
        <!-- LOGIN SECTION -->
        <div class="simple-login">
            <div class="left-side">
                <div class="img-background">
                    <img class="" src="@/assets/images/Backgrounds/bgm-login.jpeg" alt="">
                </div>

                <div class="overlay-login"></div>

                <div class="logo"><img src="@/assets/images/Logos/logo-karewa-white.png" alt=""></div>

                <div class="info">
                    <div class="title">
                        <h1>{{nombreOrganizacion}}</h1>
                        <h1>{{lemaOrganizacion}}</h1>
                    </div>
                    <p v-for="parrafo in descripcionEnParrafos" :key="parrafo">
                        {{parrafo}}
                    </p>
                    <div class="link">
                        <a :href="enlaceWebsite" target="_blank">{{nombreWebsite}}</a>
                    </div>
                </div>
                <div class="login-footer">
                    <span>Desarrollado por </span><a href="http://www.blacklabs.mx/"> <img src="@/assets/images/Logos/logo-blacklabs-claro.png" alt=""> </a>
                </div>
            </div>

            <div class="right-side">
                <h1 class="principal-title">Bienvenido Administrador</h1>
                <p class="info">
                    <strong>Inicia Sesión</strong> con tus credenciales de administrador.
                    Si aún no tienes acceso, solicítalo al administrador de la plataforma o Inicia sesión para continuar.
                </p>
                <br>

                <div class="alert alert-info" v-if="alertMessage">
                    <i class="zmdi zmdi-info-outline"></i>
                    <div>
                        {{$t(alertMessage)}}
                    </div>
                </div>
                <br/>

                <div class="form">
                    <div class="form-group fg-float m-b-40">
                        <div class="fg-line  basic-input">
                            <input id="username" type="text" class="form-control fg-input" placeholder="Usuario" value="admin" v-model="username" @keyup.enter="login">
                            <label class="fg-label">Usuario<!--<small>(small text)</small>--></label>
                        </div>
                    </div>

                    <div class="form-group fg-float">
                        <div class="fg-line  basic-input">
                            <input id="password" type="password" class="form-control fg-input" placeholder="Contraseña" value="admin" v-model="password" @keyup.enter="login">
                            <label class="fg-label">Contraseña<!--<small>(small text)</small>--></label>
                        </div>
                        <!--<span class="error-span">Error message</span>-->
                    </div>
                </div>

                <div class="row m-t-30">
                    <div class="col-6 col-md-6">

                        <div class="checkbox">
                            <input type="checkbox" value="">
                            <i class="input-helper"></i>
                            <span>¡Recuerdame!</span>
                        </div>
                    </div>
                    <div class="col-6 col-md-6 text-align-r">
                        <router-link to="/forgot-password" class="f-13 c-accent f-bold">
                            ¿Olvide mi contraseña?
                        </router-link>
                    </div>
                </div>

                <div class="row m-t-60">
                    <div class="col-6 col-md-6 m-b-30 login-btn">
                        <a @click.prevent="goBack" class="btn-outline p-l-5 p-r-10 vertical-center"><i class="zmdi zmdi-long-arrow-left"></i><strong>Volver al Monitor</strong> </a>
                    </div>
                    <div class="col-6 col-md-6 m-b-30 login-btn">
                        
                        <button @click="login" class="float-right btn-raised button-accent btn-loading vertical-center">
                            INICIAR SESIÓN
                        </button>
                        
                        
                        <!--<router-link :to="'/admin'" class="float-right btn-raised button-accent btn-loading vertical-center">-->
                            <!--&lt;!&ndash;<div class="m-r-10">&ndash;&gt;-->
                                <!--&lt;!&ndash;<svg class="spinner" width="17px" height="17px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">&ndash;&gt;-->
                                    <!--&lt;!&ndash;<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>&ndash;&gt;-->
                                <!--&lt;!&ndash;</svg>&ndash;&gt;-->
                            <!--&lt;!&ndash;</div>&ndash;&gt;-->
                            <!--INICIAR SESIÓN-->
                        <!--</router-link>-->
                        <!--<a href="" class="float-right btn-raised button-accent btn-loading vertical-center">-->
                            <!--<div class="m-r-10">-->
                                <!--<svg class="spinner" width="17px" height="17px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">-->
                                    <!--<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>-->
                                <!--</svg>-->
                            <!--</div>-->
                            <!--INICIAR SESIÓN-->
                        <!--</a>-->
                    </div>
                </div>

                <!--<h1 class="principal-title text-align-c">Revisa tu correo</h1>-->
                <!--<p class="info text-align-c">-->
                    <!--Hemos enviado un correo a la dirección <strong>cgonzalez@blacklabs.mx</strong> con instrucciones para reestablecer tu contraseña.-->
                <!--</p>-->


                <!--<div class="m-t-60 m-b-30 text-align-c">-->
                    <!--<img src="@/assets/images/Illustrations/circle-success.svg" alt="">-->
                    <!--<div class="col-12 m-t-60 ">-->
                        <!--<a href="" class="btn-outline m-auto vertical-center"><i class="zmdi zmdi-long-arrow-left"></i><strong>Volver al Monitor</strong> </a>-->
                    <!--</div>-->
                <!--</div>-->

            </div>
        </div>
        <!-- END LOGIN SECTION -->
    </div>
</template>

<style>
</style>

<script>
    import { mapState } from 'vuex';

    import axios from 'axios';
    import {bus} from '@/main';
    
    const storeModule = 'accounts';
    
    import i18n from '@/plugins/i18n';
    import aboutInfo from '@/karewaPlatform.info';
    
    export default {
        data () {
            return {
//                username: 'admin@app.admin',
//                password: 'admin',
                username: '',
                password: '',
                nombreOrganizacion: aboutInfo.infoLogin.nombreOrganizacion || "Por definir...",
                lemaOrganizacion: aboutInfo.infoLogin.lemaOrganizacion || "Por definir...",
                descripcionEnParrafos: aboutInfo.infoLogin.descripcionEnParrafos || "Por definir...",
                enlaceWebsite: aboutInfo.infoLogin.enlaceWebsite || "#",
                nombreWebsite: aboutInfo.infoLogin.nombreWebsite || ""
            }
        },
        methods: {
            login () {
                let _session = this.$session;
                let credentials = {
                    username: this.username,
                    password: this.password,
                };
                this.$store.dispatch('accounts/alertMessage', '');
                this.$store.dispatch(`${storeModule}/LOGIN`, {credentials, _session});
            },
            goBack: function () {
                this.$store.dispatch('accounts/alertMessage', '');
                this.$router.back();
            }
        },
        computed: {
            ...mapState({
                alertMessage: function (state) {
                    return state[storeModule].alertMessage;
                }
            })
        },
        components: {
        },
        mounted() {
            //Check if user was redirected
            if (this.$router.currentRoute.query.redirectTo) {
                tShow(i18n.t('accounts.login.info.redirecting'), 'info');
            }
            
//            bus.$on('LOGIN_SUCCESS', (token) => {
//                if (token) {
//                    this.$session.set('jwt', token);
//
//                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//                }
//            });
        }
    }
</script>
