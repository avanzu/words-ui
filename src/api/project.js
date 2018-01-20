import Vue from "vue";
import vueResource from "vue-resource";
import params from '../parameters';

Vue.use(vueResource);

const urls = {
    index: Vue.resource(params.apiEndpoint + '/'),
    completed: Vue.resource(params.apiEndpoint + '/{project}/stats{/locale}'),
    stats: Vue.resource(params.apiEndpoint + '/projects/{project}/stats')
};


const fetchProjects = function(page, pageSize) {
    page = page || 1;
    pageSize = pageSize || 10;
    return urls.index.get({'page' : page, 'limit' : pageSize})
        .then(response => {
            if( response.status !== 200 ) return Promise.reject(response);
            return response.body.result.resource;
        })
        ;
};

const fetchStats = function(project) {
    return urls.stats.get({project : project})
        .then(response => {
            if( response.status !== 200) return Promise.reject(response);
            return { project: project, stats: response.body.result.resource };
        });
};

const fetchCompletion = function(project, locale) {

    let stats = [];

    return urls.completed.get({project: project, locale: locale})
        .then( response => {
            if( response.status !== 200) return Promise.reject(response);
            return { project: project, stats:response.body.result.completions };
        })
};

export default  {
    fetchProjects, fetchCompletion, fetchStats
}