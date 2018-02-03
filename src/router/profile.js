

// ----------------------------------------------------------------------------------------------------- PROFILE/ACCOUNT
const profile  = r => require.ensure([], () => r(require('../pages/profile.vue')), 'profile');
const home     = r => require.ensure([], () => r(require('../components/profile/home')), 'profile');
const account  = r => require.ensure([], () => r(require('../components/profile/account')), 'profile');
const history  = r => require.ensure([], () => r(require('../components/profile/history')), 'profile');

const routes = {
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
};

export default [routes];