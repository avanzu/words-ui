import Vue         from 'vue';
import vueResource from 'vue-resource';
import params      from '../parameters';

Vue.use(vueResource);

/**
 *
 * @type {{
 * index: <Resource>,
 * show:<Resource>,
 * completed: <Resource>,
 * stats:<Resource>,
 * update:<Resource>,
 * create:<Resource>
 *     }}
 */
const urls = {
    index    : Vue.resource(params.apiEndpoint + '/'),
    show     : Vue.resource(params.apiEndpoint + '/projects/{project}'),
    completed: Vue.resource(params.apiEndpoint + '/{project}/stats{/locale}'),
    stats    : Vue.resource(params.apiEndpoint + '/projects/{project}/stats'),
    update   : Vue.resource(params.apiEndpoint + '/projects/{project}/update'),
    create   : Vue.resource(params.apiEndpoint + '/projects/create')
};

/**
 *
 * @param page
 * @param pageSize
 * @return Promise
 */
const fetchProjects = function (page, pageSize) {
    page     = page || 1;
    pageSize = pageSize || 10;
    return urls
        .index
        .get({
                 'page' : page,
                 'limit': pageSize
             })
        .then(response => {
            if (response.status !== 200) return Promise.reject(response);
            return response.body.result.resource;
        })
        ;
};
/**
 *
 * @param canonical
 * @return Promise
 */
const fetchProject = function(canonical) {
    return urls.show.get({project: canonical}).then(response => {
        if(response.status !== 200) return Promise.reject(response);
        return response.body.result;
    })
};
/**
 *
 * @param project
 * @return Promise
 */
const fetchStats = function (project) {
    return urls
        .stats
        .get({
                 project: project
             })
        .then(response => {
            if (response.status !== 200) return Promise.reject(response);
            return {project: project, stats: response.body.result.resource};
        });
};
/**
 *
 * @param project
 * @param locale
 * @return Promise
 */
const fetchCompletion = function (project, locale) {
    return urls
        .completed
        .get({
                 project: project,
                 locale : locale
             })
        .then(response => {
            if (response.status !== 200) return Promise.reject(response);
            return {project: project, stats: response.body.result.completions};
        })
};

/**
 *
 * @param project
 * @return Promise
 */
const updateProject = function(project) {
    return urls
        .update
        .update({ project: project.canonical }, {payload: project})
        .then(response => {
            if( response.status >= 400) return Promise.reject(response);
            return response.body.result;
        });
};
/**
 *
 * @param project
 * @return Promise
 */
const createProject = function(project) {
    return urls
        .create
        .save({}, {payload: project})
        .then( response => {
            if( response.status >= 400 ) return Promise.reject(response);
            return response.body.result;
        })
};

export default {
    fetchProjects,
    fetchCompletion,
    fetchStats,
    updateProject,
    createProject,
    fetchProject
}