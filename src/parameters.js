let AppName        = 'Words!';
let clientId       = '1_3il590peaz6sscok0go4c4c0wcwsgwccgwgs800ko0g4ww8w8k';
let clientSecret   = '5y3sypwddvokocwwg4848gs884oos048g08wo4s84o8skoc8gc';
let apiDomain      = 'http://words.avanzu.box';
let loginUrl       = apiDomain + '/oauth/v2/token';
let apiEndpoint    = apiDomain + '/api';
let userInfoUrl    = apiEndpoint + '/user-info';
let userProfileUrl = apiEndpoint + '/user-info/profile';
let signUpUrl      = apiEndpoint + '/account/register';
let anonymous      = {
    'username' : 'Anonymous',
    'anonymous': true
};
let pager          = {
    pageSize: 10,
    firtPage: 1
};

module.exports = {
    AppName,
    apiDomain,
    loginUrl,
    userInfoUrl,
    signUpUrl,
    userProfileUrl,
    apiEndpoint,
    client_id    : clientId,
    client_secret: clientSecret,
    anonymous,
    pager
};