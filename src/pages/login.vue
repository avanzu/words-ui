<template type="text/html">
    <section >
        <parallax-header></parallax-header>
        <div class="container" id="login-view">
            <div class="row">
                <div class="s12 m6 push-m3 col ">
                    <!-- card -->
                    <div class="card blue-grey darken-3 white-text z-depth-3">
                        <div class="card-content">
                            <span class="card-title">
                                {{ $t('title.signIn') }}
                            </span>
                            <div class="input-field">
                                <input type="text" v-model="login.username">
                                <label>{{$t('label.username')}}</label>
                            </div>
                            <div class="input-field">
                                <input type="password" v-model="login.password">
                                <label>{{$t('label.password')}}</label>
                            </div>
                        </div>
                        <div class="card-action">
                            <a class="btn purple darken-4" @click.prevent="handleLogin">
                                <i class="material-icons left">perm_identity</i>
                                {{$t('button.signIn')}}
                            </a>
                            <router-link :to="{name: 'signUp'}" class="btn purple darken-4">
                                {{ $t('button.signUp') }}
                            </router-link>
                        </div>
                    </div>
                    <!-- card -->
                </div>
            </div>
        </div>

    </section>
</template>
<style lang="scss">

</style>
<script type="text/javascript">

    import config from '../parameters';
    import {mapState} from 'vuex'
    import parallax from '../components/parallax-header';

    export default{
        components: {
            'parallax-header' : parallax
        },
        data(){
            return{
                appName   : config.AppName,
                login     : {
                    username : '',
                    password : '',
                },
            }
        },
        computed: {
            ...mapState({
                user: (state) => state.authUserStore,
                env : (state) => state.environmentStore
            })
        },
        methods: {
            handleLogin() {

                this
                    .$store
                    .dispatch('signIn', this.login)
                    .then(user => {
                        if (this.$route.query.redirect) {
                            return this.$router.push(this.$route.query.redirect);
                        }

                        return this.$router.push({name : 'index'});
                    })
                    .catch((reason) => {

                    })
            }
        }
    }

</script>
