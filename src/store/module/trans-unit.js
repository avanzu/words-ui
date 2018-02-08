import * as types from '../mutation-types';
import api        from '../../api/trans-unit';
import Vue        from 'vue';

const state = {
    loading: false,
    files  : []
};

const actions = {

    uploadCatalogue({commit}, {project, file}){
        commit(types.TRANSUNIT_UPLOAD);

        return api
            .uploadCatalogue(project, file)
            .then(result => {
               commit(types.TRANSUNIT_UPLOAD_SUCCESS, result);
            })
            .catch(reason => {
                commit(types.TRANSUNIT_UPLOAD_FAILURE, reason);
            })
        ;
    }

};

const mutations = {

    [types.TRANSUNIT_UPLOAD](state) {
        state.loading = true;
        state.reason  = null;
    },
    [types.TRANSUNIT_UPLOAD_SUCCESS](state) {
        state.loading = false;

    },
    [types.TRANSUNIT_UPLOAD_FAILURE](state, reason) {
        state.loading = false;
        state.reason  = reason;
    }
};

const getters = {

};

export default {
    state,
    actions,
    mutations,
    getters
}