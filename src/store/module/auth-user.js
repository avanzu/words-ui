/**
 * Created by avanzu on 03.02.17.
 */
import * as types from "../mutation-types";
import header from "../../util/auth-header";
import api from "../../api/auth-user";
import params from '../../parameters';
import {copyObject} from "../../util/util";

const sessionAuthToken  = JSON.parse(window.sessionStorage.getItem('authToken'));
const sessionProfile    = JSON.parse(window.sessionStorage.getItem('profile'));

const state = {
    authToken  : sessionAuthToken,
    userStatus : null,
    error      : null,
    profile    : sessionProfile ? sessionProfile : params.anonymous,
    loading    : false,
    refreshing : false,
    editable   : false,
};

const actions = {
    signIn({commit, dispatch, state}, postData) {

        // BEGIN AUTHENTICATION TRANSACTION
        commit(types.AUTHENTICATE);

        return api
            .authenticate(postData) // get auth token
            .then(token => {
                // commit token to store
                commit(types.AUTHENTICATE_SET_TOKEN, token);

                // commit successful authentication
                commit(types.AUTHENTICATE_SUCCESS);

                return token;
            })
            .catch(reason => {
                // handle authentication error
                commit(types.AUTHENTICATE_FAILURE, reason);
                return Promise.reject(reason);
            })
            /*
            .then(() => {
                // reload HATEOAS
                return dispatch('bootApplication');
            })
            */
            .then(() => {
                // load user profile
                return dispatch('getProfile', true);
            })
            ;
    },
    signOut({commit, state}) {
        // begin transaction
        commit(types.USER_SIGN_OUT);
        return api
            .signOut(state.profile)
            .then(() => {
                // clear profile
                commit(types.PROFILE_SET, null);
                // clear token
                commit(types.AUTHENTICATE_SET_TOKEN, null);
                // commit transaction
                commit(types.USER_SIGN_OUT_SUCCESS);
                return true;
            })
    },
    refreshToken({commit, state}) {
        commit(types.AUTHENTICATE_REFRESH);
        return api
            .refreshToken(Object.assign({},state.authToken))
            .then(token => {
                commit(types.AUTHENTICATE_SET_TOKEN, token);
                commit(types.AUTHENTICATE_REFRESH_SUCCESS);
                return token;
            })
            .catch(reason => {
                commit(types.AUTHENTICATE_REFRESH_FAILURE, reason);
                return Promise.reject(reason);
            })
    },
    getProfile({commit, state, getters}, forceReload){

        // clear profile on force reload
        if( forceReload ) {
            commit(types.PROFILE_SET, null);
        }

        // resolve with the loaded profile unless we don't have one
        if( ! (!!state.profile.anonymous )) {
            return Promise.resolve(state.profile);
        }

        // get fresh profile from api
        commit(types.PROFILE_FETCH);
        return api
            .fetchProfile()
            .then(profile => {
                commit(types.PROFILE_SET, profile);
                commit(types.PROFILE_FETCH_SUCCESS);
                return state.profile;
            })
            .catch(reason => {
                commit(types.PROFILE_FETCH_FAILURE, reason);
            })
        ;
    },
    putProfile({commit, state}, postData){
        commit(types.PROFILE_SAVE);
        return api
            .putProfile(postData)
            .then(response => {
                commit(types.PROFILE_SET, response);
                commit(types.PROFILE_SAVE_SUCCESS);
                return state.profile;
            })
            .catch(reason => {
                commit(types.PROFILE_SAVE_FAILURE, reason);
            })
        ;
    },
    getEditableProfile({state, dispatch}) {

        return new Promise((resolve) => {
            if( state.profile ) {
                return resolve(state.profile);
            }
            return dispatch('getProfile');
        })
        .then(profile => {
            return  JSON.parse(JSON.stringify(profile));
        });
    }
};

const mutations = {

    [types.AUTHENTICATE](state) {
        state.userStatus = 'authenticate';
    },
    [types.AUTHENTICATE_SUCCESS](state) {
        state.userStatus = 'authenticate ok';
    },
    [types.AUTHENTICATE_FAILURE](state) {
        state.userStatus = 'authenticate failed';
    },
    [types.AUTHENTICATE_SET_TOKEN](state, token) {
        state.authToken = token;
        window.sessionStorage.setItem('authToken', JSON.stringify(state.authToken));
    },
    [types.USER_SIGN_OUT] (state) {
        state.userStatus = 'sign-out';
    },
    [types.USER_SIGN_OUT_SUCCESS](state) {
        state.userStatus = 'sign-out ok';
    },
    [types.USER_SIGN_OUT_FAILURE](state) {
        state.userStatus = 'sign-out failed';
    },
    [types.AUTHENTICATE_REFRESH](state) {
        state.userStatus = 'refresh authentication';
        state.refreshing = true;
    },
    [types.AUTHENTICATE_REFRESH_SUCCESS](state){
        state.userStatus = 'refresh authentication ok';
        state.refreshing = false;
    },
    [types.AUTHENTICATE_REFRESH_FAILURE](state, reason){
        state.userStatus = 'refresh authentication failed';
        state.refreshing = false;
        state.error = reason;
    },
    [types.PROFILE_SET](state, profile) {
        state.profile = profile ? profile : params.anonymous;
        window.sessionStorage.setItem('profile', JSON.stringify(state.profile));
    },
    [types.PROFILE_FETCH](state) {
        state.loading    = true;
        state.userStatus = 'fetching profile';
        state.error      = null;
    },
    [types.PROFILE_FETCH_SUCCESS](state) {
        state.userStatus = 'fetching profile ok';
        state.loading    = false;
    },
    [types.PROFILE_FETCH_FAILURE](state, reason) {
        state.userStatus = 'fetching profile failed';
        state.loading = false;
        state.error   = reason;
    },
    [types.PROFILE_SAVE](state) {
        state.userStatus = 'saving profile';
        state.loading = true;
        state.error  = null;
    },
    [types.PROFILE_SAVE_SUCCESS](state) {
        state.userStatus = 'saving profile ok';
        state.loading    = false;
        state.error      = null;
    },
    [types.PROFILE_SAVE_FAILURE](state, reason) {
        state.userStatus = 'saving profile failed';
        state.loading = false;
        state.error = reason;
    }
};

const getters = {
    isAuthenticated : state => (state.authToken !== null),
    authHeaders     : state => header(state.authToken),
    isExpired       : state => {
        return (state.authToken ? Date.parse(state.authToken.expires_at) < Date.now() : true)
    },
    isAnonymous     : state => (!!state.profile.anonymous),
    editable(state) {
        return copyObject(state.profile);
    }
};


export default {
    state,
    getters,
    actions,
    mutations,

}
