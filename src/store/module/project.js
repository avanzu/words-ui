import * as types from "../mutation-types";
import api from '../../api/project';

const state = {
    projects: {},
    activeProject: null,
    loading: false,
    pages: 0,
    currentPage: 0,
    pageSize: 10,
    completions: []

};
const actions = {
    loadProjects({commit, state}, page){
        page = page||1;
        commit(types.PROJECTS_FETCH);
        return api
            .fetchProjects(page, state.pageSize)
            .then(projects => {
                commit(types.PROJECTS_FETCH_SUCCESS, projects);
                return projects;
            })
            .catch(reason => {
                commit(types.PROJECTS_FETCH_FAILURE, reason);
                return Promise.reject(reason);
            })
    },
    loadCompletion({commit, state, dispatch}, project) {

        return dispatch('getLanguages')
            .then((languages) => {
                let calls = [];
                languages.forEach((language) => {
                    calls.push(api.fetchCompletion(project, language))
                });
                return Promise.all(calls);
            }).then((stats) => {
                commit(types.PROJECTS_FETCH_SUCCESS, stats);
                return state.completions;
            })
            .catch( reason => {
                commit(types.PROJECTS_FETCH_FAILURE, reason);
                return Promise.reject(reason);
            });

    }
};
const mutations = {
    [types.PROJECTS_FETCH](state){
        state.loading = true;
    },
    [types.PROJECTS_FETCH_SUCCESS](state, pager) {
        state.projects = pager.items;
        state.pages    = pager.pagesTotal;
        state.page     = pager.page;
        state.pageSize = pager.pageSize;
        state.loading  = false;

    },
    [types.PROJECTS_FETCH_FAILURE](state, reason){
        state.loading = false;
    },
    [types.PROJECT_STATS_FETCH](state){
        state.loading = true;
    },
    [types.PROJECTS_FETCH_SUCCESS](state, stats){
        state.loading = false;
        state.completions = stats;
    },
    [types.PROJECTS_FETCH_FAILURE](state, reason) {
        state.loading = false;
        state.reason = reason;
    }

};
const getters = {
    hasMorePages() {
        return (state.currentPage < state.pages);
    },

};


export default {state, actions, mutations, getters}