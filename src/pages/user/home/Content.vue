<template>
    <div>
        <section class="client-content">
            <div class="neutral-width">
                <div class="col-12 p-0">
                    <div class="floating-title-panel small">
                        <h1> Adquisiciones, Arrendamientos, Contratación de Servicios y Obra Pública del Municipio.</h1>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 col-sm-12 col-md-8 d-grid">
                        <div class="card w-100">
                            <div class="floating-title-panel small">
                                <h1> Millones de pesos por trimestre </h1>
                            </div>
                            <MillonesTrimestreChart></MillonesTrimestreChart>
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-4 d-grid">
                        <div class="card">
                            <div class="floating-title-panel small">
                                <h1> Presupuesto ejercido por tipo de procedimiento </h1>
                            </div>
                            <EjercidoPeriodoChart></EjercidoPeriodoChart>
                        </div>
                    </div>
                </div>

                <MoreInfo></MoreInfo>
            </div>
        </section>
    </div>
</template>
<style></style>
<script>
    import MoreInfo from '@/components/general/MoreInfo';
    import MillonesTrimestreChart from '@/components/charts/landing/MillonesTrimestreChart';
    import EjercidoPeriodoChart from "@/components/charts/landing/EjercidoPeriodoChart";

    export default {
        data () {
            return {
            }
        },
        components: {
            EjercidoPeriodoChart,
            MoreInfo,
            MillonesTrimestreChart
        }
    }
</script>
