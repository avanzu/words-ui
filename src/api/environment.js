/**
 * Created by avanzu on 03.02.17.
 */
import Vue         from 'vue';
import vueResource from 'vue-resource';
import params      from '../parameters';

Vue.use(vueResource);

const urls = {
    index: Vue.resource(params.apiEndpoint + '/environment')
};

const bootApplication = function () {

    return urls
        .index
        .get()
        .then(response => {
            if (response.status !== 200) return Promise.reject(response);
            return response.body.result.resource;
        })
        ;
};

const reloadApplication = function () {
    return urls
        .index
        .get()
        .then(response => {
            if (response.status !== 200) return Promise.reject(response);
            return response.body.result.resource;
        })
        ;
};

export default {bootApplication, reloadApplication}