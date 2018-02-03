import * as types from '../mutation-types';
import api        from '../../api/environment';

const state = {

    appName   : 'Words!',
    links     : {},
    schemas   : {},
    projects  : {},
    languages : [],
    catalogues: [],
    booted    : false,
    error     : null,
    loading   : false,
    booting   : null

};

const actions = {
    bootApplication({commit, state}) {

        // do not boot multiple times...
        if( state.booted ) {
            return Promise.resolve(state);
        }

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
    },
    getProjects({state, dispatch}) {

        return new Promise(function (resolve, reject) {
            if (state.error) {
                return reject(state.error);
            }
            if (state.booted) {
                return resolve(state);
            }
            return Promise.all([state.booting, dispatch('bootApplication')]);

        }).then(() => {
            return state.projects;

        });
    },
    getLanguages({state, dispatch}) {
        return new Promise(function (resolve, reject) {
            if (state.error) {
                return reject(state.error);
            }
            if (state.booted) {
                return resolve(state);
            }
            return Promise.all([state.booting, dispatch('bootApplication')]);

        }).then(() => {
            return state.languages;

        });
    },
    getCatalogues({state, dispatch}) {
        return new Promise(function (resolve, reject) {
            if (state.error) {
                return reject(state.error);
            }
            if (state.booted) {
                return resolve(state);
            }
            return Promise.all([state.booting, dispatch('bootApplication')]);

        }).then(() => {
            return state.catalogues;
        });
    }

};

const mutations = {
    [types.APPLICATION_BOOT](state) {

        state.loading = true;
        state.booting = new Promise(function (resolve, reject) {});
        state.error   = null;
        state.booted  = false;
    },
    [types.APPLICATION_BOOT_SUCCESS](state, config) {
        let links = config._links || (config._links = {});

        // store HATEOAS Links
        Object.keys(links).forEach((name) => {
            if (name.indexOf('schema:') > -1) {
                state.schemas[name] = links[name];
                return;
            }

            state.links[name] = links[name];
        });

        state.languages  = config.languages;
        state.catalogues = config.catalogues;
        state.booting    = Promise.resolve(true);
        state.loading    = false;
        state.booted     = true;

    },
    [types.APPLICATION_BOOT_FAILURE](state, reason) {

        state.booting = Promise.reject(false);
        state.booted  = false;
        state.loading = false;
        state.error   = reason;
    }

};

export default {state, actions, mutations}