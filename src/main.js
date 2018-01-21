// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueI18n from 'vue-i18n'
import de from './i18n/de'
import {toast} from './util/util'
import './util/http-interceptors'
import navbar from './components/navbar'
import {path} from './util/avatars'
import keys from './util/key-code-map'

Vue.component('navbar', navbar);
Vue.filter('avatarPath', path);

Vue.use(VueI18n);

const i18n = new VueI18n({
    'locale' : 'de',
    messages: {
        'de' : de
    }
});


Vue.config.lang = 'de';
Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();

/* eslint-disable no-new */
new Vue({
    i18n,
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
    created() {
        // this.$store.dispatch('setLocale', 'de');
        this.$on('toast', function(msg) { toast(i18n.t(msg)); });
        document.addEventListener('keypress', (event) => {

            if( ! keys.eventMap[event.keyCode] ) {
                return;
            }

            if( ! keys.hasModifier(event)) {
                return;
            }

            let eventName = keys.modifyEventName(event, keys.eventMap[event.keyCode]);
            this.$eventHub.$emit(eventName, event);

        });
        document.addEventListener('keyup', (event) => {
            if( ! keys.eventMap[event.keyCode] ) {
                return;
            }

            let eventName = keys.modifyEventName(event, keys.eventMap[event.keyCode]);
            this.$eventHub.$emit(eventName, event);
        });

    }
});
