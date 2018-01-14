<template>
    <section>
        <parallax-header :header="$t('title.signUp')" :subheader="$t('subheader.createAccount')"></parallax-header>

        <div class="container" id="sign-up-view">
            <div class="row">
                <div class="s12 m6 push-m3 col ">

                    <!-- card -->
                    <div class="card blue-grey darken-3 white-text z-depth-3">
                        <div class="card-content">
                            <span class="card-title ">
                                {{ $t('title.signUp') }}
                            </span>

                            <form-errors :has-error="hasErrors" :errors="errors" label-prefix="label.signUp."></form-errors>

                            <div class="row">
                                <div class="col s12">
                                    <div class="input-field">
                                        <input type="text" v-model="signup.username">
                                        <label>{{$t('label.signUp.username')}}</label>
                                    </div>
                                    <div class="input-field">
                                        <input type="text" v-model="signup.email">
                                        <label>{{$t('label.signUp.email')}}</label>
                                    </div>
                                    <div class="input-field">
                                        <input type="password" v-model="signup.password">
                                        <label>{{$t('label.signUp.password')}}</label>
                                    </div>
                                    <div class="input-field">
                                        <input type="password" v-model="signup.confirmPassword">
                                        <label>{{$t('label.signUp.confirmPassword')}}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-action">
                            <a class="btn purple darken-4" @click.prevent="handleSignUp">
                                <i class="material-icons left">perm_identity</i>
                                {{$t('button.signUp')}}
                            </a>
                        </div>
                    </div>
                    <!-- card -->
                </div>
            </div>
        </div>


    </section>
</template>
<style>
    #sign-up-view {
        margin-top: -70px;
    }

</style>

<script type="text/javascript">
    import userApi  from '../api/auth-user';
    import {processErrors}    from '../util/util';
    import formErrors from '../components/form-errors'
    export default {
        components: {
            'form-errors' : formErrors
        },
        data() {
            return {
                signup    : {
                    username        : "",
                    email           : "",
                    password        : "",
                    confirmPassword : ""
                },
                errors    : {},
                hasErrors : false,
            }
        },
        methods : {
            handleSignUp() {

                userApi
                    .register(this.signup)
                    .then(authenticatedUser => {
                        return this.$store.dispatch('setCurrentUser', authenticatedUser);
                    })
                    .then(user => {
                        this.$root.$emit('toast', this.$t('message.success.signedUp'));
                        this.$router.push({name: "profileHome"});
                    })
                    .catch(reason => {
                        console.log(reason);
                        var ref;
                        this.hasErrors = true;
                        if ((((ref = reason.body) != null ? ref.error : void 0) != null)) {
                            this.errors    = processErrors(reason.body.error);
                        }
                    });

            }
        }
    };

</script>
