<template>
    <div class="navbar-fixed">
        <nav class="purple darken-2">
            <div class="nav-wrapper">

                <a href="#" class="brand-logo">{{appName}}</a>

                <a href="#" data-activates="nav-sidebar" class="button-collapse"><i class="material-icons">menu</i></a>

                <ul id="nav-primary" class="right hide-on-med-and-down">
                    <router-link :to="{name: 'index'}" tag="li" active-class="active" exact>
                        <a>{{ $t('menu.home') }}</a>
                    </router-link>
                    <router-link :to="{name: 'projectsIndex'}" tag="li" active-class="active" exact>
                        <a>{{ $t('menu.projects') }}</a>
                    </router-link>
                    <!--
                    <router-link :to="{name: 'exercises'}" tag="li" active-class="active">
                        <a>{{ $t('menu.exercises') }}</a>
                    </router-link>
                    -->
                    <router-link v-if="isAuthenticated" :to="{name: 'profileHome'}" tag="li" active-class="active">
                        <a>{{ $t('menu.profile', {'user' : currentUser.username}) }}</a>
                    </router-link>

                    <li v-if="isAuthenticated">
                        <a @click.prevent="handleLogout" class=""> <i class="material-icons">exit_to_app</i></a>
                    </li>
                    <router-link v-if="! isAuthenticated" :to="{name: 'login'}" tag="li" active-class="active">
                        <a><i class="material-icons">lock</i></a>
                    </router-link>
                    <xdebug></xdebug>
                </ul>

                <ul id="nav-sidebar" class="side-nav">
                    <router-link :to="{name: 'index'}" tag="li" active-class="active" exact>
                        <a>{{ $t('menu.home') }}</a>
                    </router-link>
                    <!--
                    <router-link :to="{name: 'exercises'}" tag="li" active-class="active">
                        <a>{{ $t('menu.exercises') }}</a>
                    </router-link>
                     -->
                    <router-link v-if="isAuthenticated" :to="{name: 'profileHome'}" tag="li" active-class="active">
                        <a>{{ $t('menu.profile', {'user' : currentUser.username}) }}</a>
                    </router-link>

                    <li v-if="isAuthenticated">
                        <a @click.prevent="handleLogout" > {{$t('menu.signOut', {'user' : currentUser.username})}}<i class="material-icons right">exit_to_app</i></a>
                    </li>
                    <router-link v-if="! isAuthenticated" :to="{name: 'login'}" tag="li" active-class="active">
                        <a>{{$t('menu.signIn')}}<i class="material-icons right">lock</i></a>
                    </router-link>
                </ul>

            </div>

        </nav>
    </div>
</template>

<script type="text/javascript">
    import {appName}  from '../parameters' ;
    import {path}    from '../util/avatars';
    import xdebug from './xdebug';

    export default {
        components:{ xdebug },
        computed : {
            appName() {
                return appName;
            },
            currentUser() {
                return this.$store.state.authUserStore.profile;
            },
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            avatar() {
                return this.currentUser ? path(this.currentUser.avatar) : false;
            }
        },
        methods  : {
            handleLogout() {

                Promise
                    .resolve(this.$router.push({name: 'index'}))
                    .then(() => {
                        return this.$store.dispatch('signOut');
                    })
                    .then(() => {
                        this.$root.$emit('toast', this.$t('message.success.loggedOut'));
                    })

            }
        },
        mounted() {

        }
    };


</script>
