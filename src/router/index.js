import Vue       from 'vue';
import VueRouter from 'vue-router';
import store     from '../store';
import loginPage from "../pages/login";
import indexPage from "../pages/index";
import signUpPage from '../pages/sign-up';

import profileRoutes from './profile';
import projectRoutes from './project';


// --------------------------------------------------------------------------------------------------------- TRANSLATION
const translate = r => require.ensure([], () => r(require('../pages/translate')), 'translate');

Vue.use(VueRouter);

const router = new VueRouter({
    routes : [
        {
            path      : '/',
            name      : "index",
            component : indexPage,
            meta      : {
                requiresAuth : true
            }
        },
        {
            path      : '/login',
            name      : 'login',
            component : loginPage,
        },
        {
            path      : '/sign-up',
            name      : 'signUp',
            component : signUpPage,
            meta      : {
                requiresAuth : false
            }
        },
        {
            path: '/translate/:project/:catalogue/:locale',
            name: 'translateCatalogue',
            component: translate,
            props: true,
            meta: {
                requiresAuth: true
            }
        }

    ]
});

router.addRoutes(profileRoutes);
router.addRoutes(projectRoutes);

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        return next();
    }
    if (store.getters.isAuthenticated) {
        return next();
    }

    next({
        name  : "login",
        query : {redirect : to.fullPath}
    });
});


// store.dispatch('addMenuItem', { label: 'Dashboard', name: 'index', icon: 'fa-dashboard'} );

export default router;