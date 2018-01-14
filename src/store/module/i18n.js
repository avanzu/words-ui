/**
 * Created by avanzu on 24.12.16.
 */
import Vue from 'vue';
import * as types from '../mutation-types';
// var api = require('../api/i18n');
import api from '../../api/i18n';
import defaultLocale from '../../i18n/de';

const state = {
    error   : null,
    locales : {
        de : defaultLocale
    }

};

const actions = {
    getLocale({commit, state}, locale){
        return new Promise(function (resolve, reject) {
            if (state.locales[locale]) {
                return resolve(state.locales[locale]);
            }
            commit('LOADING_START');
            return api
                .getLocale(locale)
                .then((messages) => {
                    return commit('SET_LOCALE_DONE', messages);

                })
                .catch((reason) => {
                    commit('SET_LOCALE_FAIL', reason);
                    return reject(reason);

                })
                .then(() => {
                    return commit('LOADING_DONE');
                })
                .then(() => {
                    return resolve();
                });

        });
    },
    setLocale({commit, state, dispatch}, locale){

        dispatch('getLocale', locale)
            .then(() => {
                Object.keys(state.locales).forEach(function (lang) {
                    Vue.locale(lang, state.locales[lang]);
                });
                Vue.config.lang = locale;
            })
            .catch(() => {
                console.log(state.error);
            });
    }
};

const mutations = {
    [types.SET_LOCALE_SUCCESS] : (state, locale) => {
        state.locales = locale;
        state.error   = null;
    },
    [types.SET_LOCALE_FAILURE] : (state, reason) => {
        state.error = reason;
    }
};

export default { state, actions, mutations }