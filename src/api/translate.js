import Vue from "vue";
import vueResource from "vue-resource";
import params from '../parameters';

Vue.use(vueResource);

const urls = {
    index: Vue.resource(params.apiEndpoint + '/{project}/translations/translate/{locale}/{catalogue}'),
    put: Vue.resource(params.apiEndpoint + '/{project}/translations/translate/unit/{id}/{locale}/{catalogue}')
};


const fetchTranslations = function (project, locale, catalogue, page, pageSize) {
    return urls.index
        .get({project: project,locale: locale,catalogue: catalogue,page: (page || 1),limit: (pageSize || 20)})
        .then(response => {
            if (response.status !== 200) return Promise.reject(response);
            return response.body.result.resource;
        });
};

const putTranslation = function () {
};

export default {
    fetchTranslations,
    putTranslation
}