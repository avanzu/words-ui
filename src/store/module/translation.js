import * as types from "../mutation-types";
import Vue from 'vue';
import api from '../../api/translate';
import params from '../../parameters';
import {copyObject, OUT_OF_BOUNDS} from "../../util/util";

const state = {
    pages: 0,
    page: 0,
    pageSize: params.pager.pageSize,
    items: [],
    loading: false,
    reason : null,
    current: null
};
const actions = {
    /**
     * Fetch a new set of translation items for the given options.
     *
     * @param {function} $0.commit
     * @param {string} $1.project
     * @param {string} $1.catalogue
     * @param {string} $1.language
     * @param {int} $1.page
     * @param {int} $1.pageSize
     * @return {*|Promise<T>}
     */
    loadTranslations({state, commit}, {project, catalogue, language, page, pageSize}) {

        commit(types.TRANSLATION_FETCH);

        return api
            .fetchTranslations({project, language, catalogue}, {page, pageSize})
            .then(result => {
                commit(types.TRANSLATION_FETCH_SUCCESS, result);
            })
            .catch(reason => {
                commit(types.TRANSLATION_FETCH_FAILURE, reason);
            });
    },
    /**
     * commits the given object as the focused one and resolves with a detached (editable) copy
     *
     * @param commit
     * @param translation
     * @return {Promise<any>}
     */
    selectTranslation({commit}, translation){
        return new Promise((resolve, reject) => {
            commit(types.TRANSLATION_SELECT, translation);
            resolve(copyObject(translation));
        })
    },
    abortTranslation({commit}) {
        commit(types.TRANSLATION_SELECT, null);
    },
    updateTranslation({commit}, {project, catalogue, language, transUnit}) {
        commit(types.TRANSLATION_STORE);
        return api
            .putTranslation({project, language, catalogue, transUnit})
            .then(translation => {
               commit(types.TRANSLATION_STORE_SUCCESS, translation);
            })
            .catch(reason => {
                commit(types.TRANSLATION_STORE_FAILURE, reason);
            });

    }
};

const mutations = {

    [types.TRANSLATION_FETCH](state) {
        state.loading = true;
    },
    [types.TRANSLATION_FETCH_SUCCESS](state, pager) {
        state.items    = pager.items;
        state.pages    = pager.pagesTotal;
        state.page     = pager.page;
        state.pageSize = pager.pageSize;
        state.reason   = null;
        state.loading  = false;

    },
    [types.TRANSLATION_FETCH_FAILURE](state, reason) {
        state.reason = reason;
        state.loading = false;
    },
    [types.TRANSLATION_SELECT](state, translation){
        state.current = translation;
    },
    [types.TRANSLATION_STORE](state) {},
    [types.TRANSLATION_STORE_SUCCESS](state, translation){

        let index = state.items.findIndex( item =>  (item.entityId === translation.entityId) );
        state.current = null;

        if( OUT_OF_BOUNDS === index) {
            state.items.push(translation);
            return;
        }

        Vue.set(state.items, index, translation);


    },
    [types.TRANSLATION_FETCH_FAILURE](state, reason){}

};

const getters = {

};

export default { state, actions, mutations, getters }