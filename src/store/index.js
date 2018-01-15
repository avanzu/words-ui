import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
// import * as getters from "./getters";
import authUserStore from "./module/auth-user";
import navigationStore from "./module/navigation";
import debugStore from './module/debug';
import environmentStore from './module/environment';
import i18nStore from './module/i18n';
import projectStore from './module/project';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const modules = {
    'authUserStore'    : authUserStore,
    'navigationStore'  : navigationStore,
    'environmentStore' : environmentStore,
    'i18nStore'        : i18nStore,
    'debugStore'       : debugStore,
    'projectStore'     : projectStore
};

/*
if (true == debug ) {
    modules['debugStore'] =  debugStore;
}
*/

const store = new Vuex.Store({
    actions,
    // getters,
    modules,
    strict : debug,
});

export default store