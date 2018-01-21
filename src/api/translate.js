import Vue from "vue";
import vueResource from "vue-resource";
import params from '../parameters';

Vue.use(vueResource);

const urls = {
    index : Vue.resource(params.apiEndpoint + '/{project}/translations/translate/{language}/{catalogue}'),
    update: Vue.resource(params.apiEndpoint + '/{project}/translations/translate/unit/{id}/{language}/{catalogue}')
};

const fetchTranslations = function ({project, language, catalogue}, {page, pageSize}) {
    return urls.index
        .get({project: project,language: language,catalogue: catalogue,page: (page || params.pager.firtPage),limit: (pageSize || params.pager.pageSize)})
        .then(response => {
            if (response.status !== 200) return Promise.reject(response);
            return response.body.result.resource;
        });
};

const putTranslation = function ({project,language, catalogue, transUnit}) {
    return urls.update
        .update(
            { project: project,language: language,catalogue: catalogue,id: transUnit.entityId },
            { content: transUnit.localeString, state: transUnit.state }
        )
        .then(response => {
           if( response.status >= 400) return Promise.reject(response);
           return response.body.result.resource;
        })
        ;
};

export default {
    fetchTranslations,
    putTranslation
}