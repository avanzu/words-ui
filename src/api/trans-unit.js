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
    upload   : Vue.resource(params.apiEndpoint + '/{project}/translations/file/upload')
};

const uploadCatalogue = function(project, file) {

    let formData = new FormData();
    formData.append('catalog', file, file.name);
    return urls
        .upload
        .save({project: project.canonical}, formData )
        .then((response) => {
            debugger;
        });




};

export default {
    uploadCatalogue
}