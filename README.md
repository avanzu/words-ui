# words-ui

> A Vue.js project serving as frontend for the _words_ symfony project. 

## Build Setup

``` bash
# install dependencies
npm install

# create parameters file
cp parameters.js.dist parameters.js

```
## Configure
``` javascript 
// parameters.js 

{
    // ...
    client_id      : '<YOUR OAUTH CLIENT ID>',  
    client_secret  : '<YOUR OAUTH CLIENT SECRET>' , 
    apiDomain      : '<API HOSTNAME>' , 
    /... 
}

```

## Run 
``` bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
