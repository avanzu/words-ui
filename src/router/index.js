import Vue       from 'vue';
import VueRouter from 'vue-router';
import store     from '../store';
import loginPage from "../pages/login";
import indexPage from "../pages/index";
import signUpPage from '../pages/sign-up';
import projectEditor from '../components/project/project-editor';

const profile  = r => require.ensure([], () => r(require('../pages/profile.vue')), 'profile');
const home     = r => require.ensure([], () => r(require('../components/profile/home')), 'profile');
const account  = r => require.ensure([], () => r(require('../components/profile/account')), 'profile');
const history  = r => require.ensure([], () => r(require('../components/profile/history')), 'profile');

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
            path      : '/profile',
            // name      : 'profile',
            component : profile,
            meta      : {
                requiresAuth : true
            },
            children: [
                {
                    path      : '',
                    name      : 'profileHome',
                    component : home,
                    meta      : {
                        requiresAuth : true
                    }
                },
                {
                    path      : '/profile/change-account',
                    name      : 'changeAccount',
                    component : account,
                    meta      : {
                        requiresAuth : true
                    }
                },
                {
                    path      : '/profile/history',
                    name      : 'profileHistory',
                    component : history,
                    meta      : {
                        requiresAuth : true
                    }
                },
            ]
        },
        {
            path      : '/project/create',
            name      : 'createProject',
            component : projectEditor,
            meta      : {
                requiresAuth : true
            }
        },
        {
            path      : '/project/update/:slug',
            name      : 'updateProject',
            component : projectEditor,
            meta      : {
                requiresAuth : true
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


store.dispatch('addMenuItem', { label: 'Dashboard', name: 'index', icon: 'fa-dashboard'} );

export default router;