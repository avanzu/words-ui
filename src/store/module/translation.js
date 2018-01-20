import * as types from "../mutation-types";
import api from '../../api/translate';
import Vue from 'vue';

const state = {
    pages: 0,
    page: 0,
    pageSize: 10,
    items: [],
    loading: false,
    reason : null
};
const actions = {
    loadTranslations({state, commit}, {project, catalogue, language, page, pageSize}) {
        return api.fetchTranslations(project, language, catalogue, page, pageSize)
            .then(result => {
                commit(types.TRANSLATION_FETCH_SUCCESS, result);
            })
            .catch(reason => {
                commit(types.TRANSLATION_FETCH_FAILURE, reason);
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
        state.loading = false;
        state.reason = reason;
    }

};

const getters = {

};

export default { state, actions, mutations, getters }