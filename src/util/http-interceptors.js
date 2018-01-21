/**
 * Created by avanzu on 03.02.17.
 */
import Vue from 'vue'
import store from '../store'

const debug = process.env.NODE_ENV !== 'production';

const appendXdebugParam = r => {
    if( ! debug ) return;
    if( store.state.debugStore.xDebug ) {
        r.params['XDEBUG_SESSION_START'] = 'netbeans-xdebug';
    }
};

Vue.http.interceptors.push((request, next) => {

    let authToken = store.state.authUserStore.authToken;

    appendXdebugParam(request);

    // make sure, symfony understands that it's AJAX
    request.headers.set('X-Requested-With', 'XMLHttpRequest');

    // we are not authenticated (e.g. there is no authUser)
    // so, there's nothing to do here
    if( false == store.getters.isAuthenticated ) {
        return next();
    }


    // the authUser's access token has not expired,
    // so, we add the bearer token header and continue...
    if( ! store.getters.isExpired ) {

        request.headers.set('Authorization' , `Bearer ${authToken.access_token}`);
        return next();
    }

    // at this point, the token is expired and should be refreshed...
    // do not intercept the very request we issued to refresh the token since this will result in infinite recursion
    if(  store.state.authUserStore.refreshing ) {
        return next();
    }

    // using the store to refresh the token and continue as soon as we have a new one.
    return store
        .dispatch('refreshToken')
        .then(user => {
            request.headers.set('Authorization' , `Bearer ${user.access_token}`);
            return next();
        });
});


