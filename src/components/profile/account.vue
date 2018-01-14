<template>
    <div class="card blue-grey darken-3 white-text z-depth-3" id="exercise-form">
        <div class="card-content">
            <div class="card-title"> {{ $t('title.myProfile') }}</div>

            <form-errors :has-error="hasErrors" :errors="errors" label-prefix="label.user."></form-errors>

            <div class="card blue-grey darken-4 white-text">
                <div class="card-content">
                    <span class="card-title">{{$t('title.accountData')}}</span>
                    <div class="row">
                        <div class="col s6">
                            <div class="input-field">
                                <input type="text" v-model="editable.username">
                                <label>{{$t('label.user.username')}}</label>
                            </div>
                        </div>
                        <div class="col s6">
                            <div class="input-field">
                                <input type="text" v-model="editable.email">
                                <label>{{$t('label.user.email')}}</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s6">
                            <div class="input-field">
                                <input type="password" v-model="editable.password">
                                <label>{{$t('label.user.password')}}</label>
                            </div>
                        </div>
                        <div class="col s6">
                            <div class="input-field">
                                <input type="password" v-model="editable.confirmPassword">
                                <label>{{$t('label.user.confirmPassword')}}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-action">
            <router-link :to="{name: 'profileHome'}" class="btn">Zurück</router-link>
            <a href="#" @click.prevent="handleUpdate" class="btn">Speichern</a>
        </div>
    </div>
</template>
<style>

</style>
<script type="text/javascript">
    import {materialize, processErrors}  from '../../util/util';
    import userApi  from '../../api/auth-user';
    import formErrors from '../form-errors'
    export default {
        components : {
            'form-errors' : formErrors,
        },
        data() {
            return {
                errors    : {},
                hasErrors : false,
                editable  : {}
            }
        },
        mounted   () {
            materialize();
            this.$store
                .dispatch('getEditableProfile')
                .then(profile => { this.editable = profile; });
        } ,
        computed   : {
            loading() {
                return this.$store.state.authUserStore.loading;
            },
            user() {
                return this.$store.state.authUserStore.authUser;
            }
        },
        methods    : {
            handleUpdate() {
                this.$store
                    .dispatch('saveAccount', this.editable)
                    .then(() => {
                        this.$router.push({name: "profileHome"});
                    })
                    .then(() => {
                        this.$root.$emit('toast', this.$t('message.success.accountSaved'));
                    })
                    .catch((response) => {
                        this.hasErrors = true;
                        this.errors    = processErrors(response.body.error);

                    });
            }
        }
    };

</script>
