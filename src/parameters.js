module.exports = {
    AppName       : 'Words',
    client_id     : '1_pwsblydjwtck8404g84w80s0ggsc08g4sggcw84ows8wgw84o',
    client_secret : '1y1gn0xde3c0cw0gwcw8w84cksck0o4cog8ow84ko8so0o0408',
    apiDomain     : 'http://words.avanzu.box',
    anonymous     : {
        'username'  : 'Anonymous',
        'anonymous' : true
    },
    pager         : {
        pageSize  : 10,
        firstPage : 1
    },
    get apiEndpoint()    {
        return this.apiDomain + '/api'
    },
    get loginUrl()       {
        return this.apiDomain + '/oauth/v2/token'
    },
    get userInfoUrl()    {
        return this.apiEndpoint + '/user-info'
    },
    get signUpUrl()      {
        return this.apiEndpoint + '/account/register'
    },
    get userProfileUrl() {
        return this.apiEndpoint + '/user-info/profile'
    }
};

