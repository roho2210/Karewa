import Vue from 'vue';
import { bus } from '@/main';
import * as events from "../../events";

export default function (api, storeName) {
    const state = {
        customChartData: [],
        data:{}
    };

    const getters = {

    };

    const actions = {
        getInfoForChart({commit,getters}, searchString ) {

            api.dataForChart(
                {},
                (result) => {
                    Vue.$log.info('Response', result.data.data);
                    let aggregationData = result.data.data;
                    let tempData = api.transformDataForChart(aggregationData);
                    commit('updateDataChart', tempData);
                },
                (error) => {
                    Vue.$log.error('Response error', error);
                    tShow(`Hubo un error al cargar el chart: ${error}`);
                }
            )
        }
    };

    const mutations = {
        updateDataChart(state, {data}) {
            state.data = data;
        }
    };

    return {
        state,
        getters,
        actions,
        mutations
    }
}
