import Vue         from 'vue';
import vueResource from 'vue-resource';
import params      from '../parameters';

Vue.use(vueResource);

const urls = {
    index    : Vue.resource(params.apiEndpoint + '/'),
    show     : Vue.resource(params.apiEndpoint + '/projects/{project}'),
    completed: Vue.resource(params.apiEndpoint + '/{project}/stats{/locale}'),
    stats    : Vue.resource(params.apiEndpoint + '/projects/{project}/stats'),
    update   : Vue.resource(params.apiEndpoint + '/projects/{project}/update'),
    create   : Vue.resource(params.apiEndpoint + '/projects/create')
};


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

const fetchProject = function(canonical) {
    return urls.show.get({project: canonical}).then(response => {
        if(response.status !== 200) return Promise.reject(response);
        return response.body.result;
    })
};

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

const updateProject = function(project) {
    return urls
        .update
        .update({ project: project.canonical }, {payload: project})
        .then(response => {
            if( response.status >= 400) return Promise.reject(response);
            return response.body.result;
        });
};

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