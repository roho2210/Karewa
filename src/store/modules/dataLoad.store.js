import i18n from '@/plugins/i18n';
import dataLoadApi from '@/api/dataLoad.api.js';
import { bus } from '@/main';
import utils from '@/common/utils';

const state = {
    dataLoadInfo: {},
    dataLoad: null,
    filteredDataLoad: null,
    paginatedDataLoad: null,
    filtering: false,
    
    docName: 'contracts.doc-name',

    search: '',
    
    filters: {
        showNoIssues: true,
        showSkipped: true,
        showErrors: true,
    },
    
    pagination: {
        total: 0,
        page: 1,
        pages: 1
    }
};

const getters = {
    rawData (state) {
        return state.dataLoad && state.dataLoad.details ? state.dataLoad.details : [];
    },
    getUrlQuery(state){
        let query = '?';
        if (state.pagination.page) {
            query += `page=${state.pagination.page}`
        }
        if(state.search){
            if(query.length > 2){
                query += '&';
            }
            query += `search=${state.search}`
        }
        if(query.length > 2){
            query += '&';
        }
        query += `showNoIssues=${state.filters.showNoIssues}`; 
        query += `&showSkipped=${state.filters.showSkipped}`; 
        query += `&showErrors=${state.filters.showErrors}`; 
        return query;
    },
};

const actions = {
    LOAD_CURRENT_DATA_LOAD_INFO: ({commit}, isFromDashboard) => {
        dataLoadApi.getCurrentInfo({}, (response) => {
            if (!response.data.error && response.data && response.data.data) {
                commit('SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: response.data.data, isFromDashboard});
                // commit('SET_PAGE_AND_PAGINATE', {page: 1});
            }
        }, (err) => {
            //Error trying to load current data load info
        });
    },
    
    LOAD_CURRENT_DATA_LOAD: ({commit, getters}, searchString) => {
        if(searchString && searchString.length){
            commit('SET_SEARCH',searchString);
        } else {
            commit('SET_SEARCH',"");
        }
        commit('SET_PAGE', 1);


        let query = getters.getUrlQuery;
        
        commit('SET_FILTERING', true);
        dataLoadApi.getCurrent({query}, (response) => {
            if (!response.data.error && response.data) {
                setTimeout(function () {
                    console.log('response.data.data', response.data.data);
                    commit('SET_PAGINATED_CURRENT_DATA_LOAD', {dataLoadInfo: response.data.data.doc});
                    commit('SET_PAGINATION', response.data.data.pagination);
                    commit('SET_FILTERING', false);
                });
            }
        }, (err) => {
            commit('SET_FILTERING', false);
            //Error trying to load current data load info
        })
    },
    
    CANCEL_CURRENT_DATA_LOAD: ({commit}) => {
        dataLoadApi.cancelCurrent({}, (response) => {
            if (response.data.error) {
                tShow(i18n.t(response.data.message), 'danger');
            } else {
                commit('SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: response.data.data});
                tShow(i18n.t(response.data.message), 'success');
            }
        }, (err) => {
            tShow(i18n.t('data-load.cancel.error.unexpected'), 'danger');
        });
    },
    
    changePage: ({commit, getters}, page) => {
        commit('SET_FILTERING', true);
        commit('SET_PAGE', page);

        let query = getters.getUrlQuery;
        
        dataLoadApi.getCurrent({query}, (response) => {
            if (!response.data.error && response.data && response.data.data) {
                console.log('response.data.data', response.data.data);
                commit('SET_PAGINATED_CURRENT_DATA_LOAD', {dataLoadInfo: response.data.data.doc});
                commit('SET_PAGINATION', response.data.data.pagination);
                commit('SET_FILTERING', false);
            }
        }, (err) => {
            //Error trying to load current data load info
        });
    },
    
    FILTER_CURRENT_DATA_LOAD: ({commit, getters}, filters) => {

        commit('SET_FILTERS', filters);
        commit('SET_PAGE', 1);

        let query = getters.getUrlQuery;

        dataLoadApi.getCurrent({query}, (response) => {
            if (!response.data.error && response.data && response.data.data) {
                console.log('response.data.data', response.data.data);
                commit('SET_PAGINATED_CURRENT_DATA_LOAD', {dataLoadInfo: response.data.data.doc});
                commit('SET_PAGINATION', response.data.data.pagination);
                commit('SET_FILTERING', false);
                // commit('SET_PAGE_AND_PAGINATE', {page: 1});
            }
        }, (err) => {
            //Error trying to load current data load info
        });
        
    },
    //Confirm current and save to database
    CONFIRM_CURRENT: ({commit}) => {
        bus.$emit('dataLoad/CONFIRMATION_FINISHED', true);
        dataLoadApi.confirmCurrent({}, (response) => {
            bus.$emit('dataLoad/CONFIRMATION_FINISHED', false);
            if (response.data.error) {
                tShow(i18n.t('data-load.confirm.error.unexpected')+":<br>"+response.data.data, 'danger');
            } else {
                commit('SET_CURRENT_DATA_LOAD_INFO', {dataLoadInfo: response.data.data});
                commit('SET_PAGE_AND_PAGINATE', {page: 1});
                tShow(i18n.t('data-load.confirm.success'), 'success');
            }
        }, (err) => {
            tShow(i18n.t('data-load.confirm.error.unexpected'), 'danger');
        });
    },
    DOWNLOAD_VALIDATIONS: () => {
        dataLoadApi.downloadValidations({}, (result) => {
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `monitor-karewa-validaciones-contratos.xlsx`);
            document.body.appendChild(link);
            link.click();
            bus.$emit('dataLoad/VALIDATIONS_DOWNLOADED');
        });
    },
    DOWNLOAD_PLANTILLA: () => {
        dataLoadApi.downloadPlantilla({}, (result) => {
            const url = window.URL.createObjectURL(new Blob([result.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `monitor-karewa-plantilla-contratos.xlsx`);
            document.body.appendChild(link);
            link.click();
        });
    }
};

const mutations = {
    SET_CURRENT_DATA_LOAD_INFO: (state, {dataLoadInfo,isFromDashboard}) =>{
        state.dataLoadInfo = dataLoadInfo;
        if(!isFromDashboard){
            bus.$emit('dataLoad/CURRENT_DATA_LOAD_INFO_LOADED', {dataLoadInfo});
        }
    },
    
    SET_CURRENT_DATA_LOAD: (state, {dataLoad, canceled = false}) => {
        state.dataLoad = dataLoad;
        bus.$emit('dataLoad/CURRENT_DATA_LOAD_LOADED', {dataLoad, canceled});
        
    },

    SET_PAGINATION: (state, pagination) => {
        state.pagination = pagination
    },
    
    SET_PAGINATED_CURRENT_DATA_LOAD: (state, {dataLoadInfo}) => {
        state.paginatedDataLoad = dataLoadInfo.details;
    },

    SET_FILTERING: (state, setTo) => {
        state.filtering = setTo;
    },

    SET_FILTERS: (state, filters) => {
        state.filters = filters;
    },

    SET_PAGE(state, page){
        page = page || 1;
        state.pagination.page = page;
    },

    SET_SEARCH(state, search){
        state.search = search;
    },

};



export default {
    namespaced: true,
    state: state,
    getters: getters,
    actions: actions,
    mutations: mutations
};
