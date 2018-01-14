import params from '../parameters'
import store from '../store'


const getApiUrl = function(name) {
    if ( store.state.environmentStore.links[name] ) {
        return params.apiDomain.replace(/\/$/, '') + store.state.environmentStore.links[name].href;
    }
    return false;
    //throw new Error(`There is no api rel called ${name}`);
} ;

const hasApiUrl = function(name) {
    if ( store.state.environmentStore.links[name] ) {
        return true;
    }
    return false;
};

export default { getApiUrl, hasApiUrl }