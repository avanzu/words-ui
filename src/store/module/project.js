import * as types from '../mutation-types';
import api        from '../../api/project';
import Vue        from 'vue';

const state     = {
    projects         : {},
    activeProject    : null,
    projectsLoaded   : false,
    pages            : 0,
    currentPage      : 1,
    pageSize         : 10,
    completions      : {},
    completionsLoaded: {},
    processing       : false,

};
const actions   = {
    loadProjects({commit, state}, {page, pageSize}) {
        page = page || 1;
        commit(types.PROJECTS_FETCH);
        return api
            .fetchProjects(page, pageSize)
            .then(projects => {
                commit(types.PROJECTS_FETCH_SUCCESS, projects);
                return state.projects;
            })
            .catch(reason => {
                commit(types.PROJECTS_FETCH_FAILURE, reason);
                return Promise.reject(reason);
            })
        ;
    },
    /**
     * Returns the project record identified by the given canonical name.
     * This method will prefer the store's state to resolve the project and will
     * only issue an api call if the project cannot be resolved using the store's state.
     *
     * @param state
     * @param dispatch
     * @param commit
     * @param canonical
     * @return {Promise}
     */
    findProject({state, dispatch, commit}, canonical) {

        if( false === canonical) {
            return Promise.resolve(false);
        }

        if( state.projects[canonical]) {
            return Promise.resolve(state.projects[canonical]);
        }
        commit(types.PROJECT_LOAD);
        return api
            .fetchProject(canonical)
            .then(project => {
                commit(types.PROJECT_LOAD_SUCCESS, project);
                return project;
            })
            .catch(reason => {
                commit(types.PROJECT_LOAD_FAILURE, reason);
            });
    },
    activateProject({state, dispatch, commit}, project) {

        return dispatch('findProject', project)
        .then(project => {
            commit(types.PROJECT_ACTIVATE, project);
            return project;
        })
        .catch(reason => {
            console.log('meh...', reason)
        })
        ;
    },
    loadStats({commit, state, dispatch}, project) {
        commit(types.PROJECT_STATS_FETCH, project);
        return api
            .fetchStats(project)
            .then(stats => {
                commit(types.PROJECT_STATS_FETCH_SUCCESS, {project: project, stats: stats});
                return stats;
            })
            .catch(reason => {
                commit(types.PROJECT_STATS_FETCH_FAILURE, {project: project, reason: reason});
                return Promise.reject(reason);
            });
    },
    updateProject({state, dispatch, commit}, project) {
        commit(types.PROJECT_SAVE, project);
        return api
            .updateProject(project)
            .then(project => {
                commit(types.PROJECT_SAVE_SUCCESS, project);
                return project;
            })
            .then(project => {
                commit(types.PROJECT_ACTIVATE, project);
                return project;
            })
            .catch(reason => {
                commit(types.PROJECT_SAVE_FAILURE, reason);
            })
            ;
    },
    createProject({state, dispatch, commit}, project) {
        commit(types.PROJECT_SAVE);
        return api
            .createProject(project)
            .then(project => {
                commit(types.PROJECT_SAVE_SUCCESS, project);
                return project;
            })
            .then(project => {
                commit(types.PROJECT_ACTIVATE, project);
                return project;
            })
            .catch(reason => {
                commit(types.PROJECT_SAVE_FAILURE, reason);
            })

    },
    getStats({state, dispatch}, args) {

        return new Promise((resolve, reject) => {
            if (!state.completions[args.project]) return reject(false);
            return resolve(state.completions[args.project])
        })
            .then(completions => {
                let match = completions.find((record) => {
                    if (!(record.catalogue === args.catalogue)) {
                        return false;
                    }
                    return (record.language === args.language);

                });

                if (!match) return Promise.reject(match);
                return match;
            })

            .catch(function () {
                return {total: 0, translated: 0};
            })
            ;

    }
};
const mutations = {
    [types.PROJECTS_FETCH](state) {
        state.projectsLoaded = false;
    },
    [types.PROJECTS_FETCH_SUCCESS](state, pager) {
        state.pages       = pager.pagesTotal;
        state.page        = pager.page;
        state.pageSize    = pager.pageSize;
        // state.completions = {};
        pager.items.forEach(project => {
            Vue.set(state.projects, project.canonical, project);
            Vue.set(state.completions, project.canonical, false);
        });
        state.projectsLoaded = true;
    },
    [types.PROJECTS_FETCH_FAILURE](state, reason) {
        state.projectsLoaded = true;
        state.reason         = reason;
    },
    [types.PROJECT_STATS_FETCH](state, project) {
        Vue.set(state.completions, project, false);
    },
    [types.PROJECT_STATS_FETCH_SUCCESS](state, {project, stats}) {
        Vue.set(state.completions, stats.project, stats.stats);
    },
    [types.PROJECT_STATS_FETCH_FAILURE](state, {project, reason}) {
        state.reason = reason;
    },
    [types.APPLICATION_BOOT_SUCCESS](state, env) {
        // store projects
        /*
        env.projects.forEach((project) => {
            Vue.set(state.projects, project.canonical, project);
            Vue.set(state.completions, project.canonical, false);
        });

        state.projectsLoaded = true;
        */
    },
    [types.PROJECT_LOAD](state){},
    [types.PROJECT_LOAD_SUCCESS](state, project){
        Vue.set(state.projects, project.canonical, project);
    },
    [types.PROJECT_LOAD_FAILURE](state, reason){

    },
    [types.PROJECT_ACTIVATE](state, project){
        state.activeProject = project;
    },
    [types.PROJECT_SAVE](state) {
        state.processing = true;
    },
    [types.PROJECT_SAVE_SUCCESS](state, project) {
        Vue.set(state.projects, project.canonical, project);
        state.processing = false;
    },
    [types.PROJECT_SAVE_FAILURE](state, reason){
        state.processing = false;
    }

};
const getters   = {
    hasMorePages() {
        return (state.currentPage < state.pages);
    }

};


export default {state, actions, mutations, getters}