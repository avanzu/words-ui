/**
 * Created by avanzu on 03.02.17.
 */
import Vue from "vue";
import vueResource from "vue-resource";
import params from "../parameters";

Vue.use(vueResource);

const bootApplication = function( headers ) {

    return Vue
        .http
        .get(params.apiEndpoint)
        .then(response => {
            if( response.status !== 200 ) return Promise.reject(response);
            return response.data;
        })
    ;
};

const reloadApplication = function() {
    return Vue
        .http
        .get(params.apiEndpoint)
        .then(response => {
            if( response.status !== 200 ) return Promise.reject(response);
            return response.data;
        })
        ;
};

export default { bootApplication, reloadApplication }