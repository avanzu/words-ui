import * as types from "../mutation-types";
import api from '../../api/environment';

const state     = {

    appName : 'Twistmill',
    links   : {},
    schemas : {},
    booting : false,
    booted  : false,
    error   : null

};

const actions   = {
    bootApplication({commit}) {
        commit(types.APPLICATION_BOOT);
        return api
            .bootApplication()
            .then(config => {
                commit(types.APPLICATION_BOOT_SUCCESS, config);
                return config;
            })
            .catch(reason => {
                commit(types.APPLICATION_BOOT_FAILURE, reason);
                return Promise.reject(reason);
            })
    }
};

const mutations = {
    [types.APPLICATION_BOOT](state) {

        state.booting = true;
        state.error   = null;
    },
    [types.APPLICATION_BOOT_SUCCESS](state, config) {
        let links  = config._links || (config._links = {});

        Object.keys(links).forEach((name) => {
           if( name.indexOf('schema:') > -1 ) {
               state.schemas[name] = links[name];
               return;
           }

           state.links[name] = links[name];
        });

        state.booting = false;
        state.booted  = true;

    },
    [types.APPLICATION_BOOT_FAILURE](state, reason) {

        state.booting = false;
        state.booted  = false;
        state.error   = reason;
    },

};

export default { state, actions, mutations }