/**
 * Created by avanzu on 03.02.17.
 */
import Vue from "vue";
import vueResource from "vue-resource";
import params from '../parameters';


Vue.use(vueResource);

const urls = {
    token   : params.apiDomain + '/oauth/v2/token',
    info    : params.apiDomain + '/api/account/profile/',
    profile : params.apiDomain + '/api/account/profile/',
    register: params.apiDomain + '/api/account/register'
};


/**
 * @param credentials
 * @return {Promise.<object>}
 */
const authenticate = (credentials) => {
    let user = {};
    let postData    = {
        grant_type    : "password",
        client_id     : params.client_id,
        client_secret : params.client_secret,
        username      : credentials.username,
        password      : credentials.password,
        scope         : ''
    };


    return new Promise(function(resolve, reject){
      let url = urls.token;
      if( url ) return resolve(url);
      return reject();
    })
        .then((authUrl) => {
            return Vue
                .http
                .post(authUrl, postData);

        }).then(response => {
            if (response.status !== 200) {
                return Promise.reject(response);
            }

            Object.keys(response.data).forEach((key) => user[key] = response.data[key]);
            user.expires_at = new Date(Date.now() + (user.expires_in * 1000));
            return user;
        })
        // .then(getUserInfo)
        .catch(reason => Promise.reject( reason.body ? reason.body : reason ) )
};


const register = function (postData) {

    return Vue
        .http
        .post(urls.register, postData)
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject(response);
            }

            return {
                grant_type    : "password",
                client_id     : params.client_id,
                client_secret : params.client_secret,
                username      : postData.username,
                password      : postData.password,
                scope         : ''
            };
        })
        .then(authenticate)

};


/**
 *
 * @param token
 * @return {Promise.<object>}
 */
const getUserInfo = (token) => {
    return new Promise(function(resolve, reject) {
        let url = urls.info;
        if( url ) return resolve(url);
        return reject();
    })
        .then(url => {
            return Vue
                .http
                .get(url) // , {headers: header(token)}
        })
        .then(response => {
            if (response.status !== 200) {
                return Promise.reject(response)
            }

            return response.data;
        })
        .catch(reason => Promise.reject(reason.body ? reason.body : reason))
        ;
};

/**
 *
 * @param token
 * @return {*|Promise.<object>}
 */
const refreshToken = (token)  => {

    let postData = {
        grant_type    : "refresh_token",
        client_id     : params.client_id,
        client_secret : params.client_secret,
        refresh_token : token.refresh_token,
        scope         : ''
    };

    return Vue
        .http
        .post(urls.token, postData)
        .then(response => {
            if( response.status !== 200 ) {
                return Promise.reject(response);
            }

            Object.keys(response.data).forEach((key) => token[key] = response.data[key]);
            token.expires_at = new Date(Date.now() + (token.expires_in * 1000));
            return token;
        })
    ;

};

/**
 *
 * @param user
 * @return {Promise.<boolean>}
 */
const signOut = (user) => {
    return Promise.resolve( true );
};

/**
 *
 * @return {Promise.<object>}
 */
const fetchProfile = () => {

  return new Promise(function(resolve, reject) {
        let url = urls.profile;
        if( url ) return resolve(url);
        return reject();
    })
    .then(url => {
        return Vue.http.get(url)
    })
    .then(response => {
          if( response.status !== 200) {
              return Promise.reject(response);
          }

          return response.body.result.resource;
      })
      .catch(reason => Promise.reject(reason.body ? reason.body : reason ))
    ;

};

/**
 *
 * @param postData
 * @return {Promise.<object>}
 */
const putProfile = (postData) => {
    return new Promise(function(resolve, reject) {
        let url = urls.profile;
        if( url ) return resolve(url);
        return reject();
    })
        .then(url => {
            return Vue.http.put(url, {payload: postData});
        })

        .then(response => {
            if( response.status >= 300 ) {
                return Promise.reject(response);
            }

            // we have
            return fetchProfile();
        })
        .catch(reason => Promise.reject(reason.body ? reason.body : reason))

};


export default { authenticate, getUserInfo, refreshToken, signOut, fetchProfile, putProfile, register }