<template>
    <div class="card blue-grey darken-3 white-text z-depth-3" id="exercise-form">
        <div class="card-content">
            <div class="card-title"> {{ $t('title.myProfile') }}</div>

            <div class="card blue-grey darken-4 white-text">
                <div class="card-content">
                    <span class="card-title">{{$t('title.accountData')}}</span>
                    <div class="row">
                        <div class="col s6">
                            <div class="input-field">
                                <input type="text" :value="user.username" readonly>
                                <label>{{$t('label.user.username')}}</label>
                            </div>
                        </div>
                        <div class="col s6">
                            <div class="input-field">
                                <input type="text" :value="user.email" readonly>
                                <label>{{$t('label.user.email')}}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-action">
                    <router-link :to="{name: 'changeAccount'}">Kontodaten ändern</router-link>
                </div>
            </div>

            <div class="card blue-grey darken-4 white-text">

                <div class="card-content">
                    <span class="card-title">{{$t('title.profileData')}}</span>


                    <form-errors :has-error="hasErrors" :errors="errors" label-prefix="label.profile."></form-errors>
                    <div class="row">
                        <div class="col s6">
                            <div class="row">
                                <div class="col s12">
                                    <label :class="{'red-text': (errors.gender)}">
                                        {{$t('label.profile.gender') }}
                                    </label>
                                </div>
                                <div class="col s6">
                                    <input type="radio" id="gender-male" value="m" v-model="editable.gender">
                                    <label for="gender-male">{{$t('label.profile.male') }}</label>
                                </div>
                                <div class="col s6">
                                    <input type="radio" id="gender-female" value="f" v-model="editable.gender">
                                    <label for="gender-female">{{$t('label.profile.female') }}</label>
                                </div>
                            </div>

                            <div class="input-field">
                                <input type="text" v-model="editable.firstName">
                                <label>{{$t('label.profile.firstName')}}</label>
                            </div>
                            <div class="input-field">
                                <input type="text" v-model="editable.lastName">
                                <label>{{$t('label.profile.lastName')}}</label>
                            </div>
                        </div>
                        <div class="col s6">
                            <avatar-choice v-model="editable.avatar"></avatar-choice>
                        </div>
                    </div>
                </div>
                <div class="card-action">
                    <a @click.prevent="handleSaveProfile" class="btn">{{$t('button.save')}}</a>
                </div>
            </div>
        </div>
    </div>

    </div>
</template>
<style>
    .white-text .input-field input[readonly="readonly"],
    .white-text .input-field input[readonly="readonly"] + label,
    .white-text .input-field input[disabled="disabled"],
    .white-text .input-field input[disabled="disabled"] + label {
        color: rgba(255, 255, 255, 0.26) !important;
    }

</style>
<script type="text/javascript">
    import {materialize, processErrors} from '../../util/util';
    import formErrors                   from '../form-errors'
    import avatarChoice                 from '../avatar-choice'

    export default {
        components: {
            'form-errors'  : formErrors,
            'avatar-choice': avatarChoice
        },
        data() {
            return {
                hasErrors: false,
                errors   : {},
                loading  : false,
                editable : {}
            }
        },
        created() {
            materialize();
            this.createEditable();
        },
        updated   : materialize,
        computed  : {
            profile() {
                return this.$store.state.authUserStore.profile;
            },
            user() {
                return this.$store.state.authUserStore.profile;
            }
        },
        methods   : {
            createEditable() {
                this.$store
                    .dispatch('getEditableProfile')
                    .then(profile => this.editable = profile);
            },

            handleSaveProfile() {
                this.$store
                    .dispatch('putProfile', this.editable)
                    .then(() => this.$root.$emit('toast', 'message.success.profileSaved'))
                    .catch((reason) => {
                        this.hasErrors = true;
                        this.errors    = processErrors(reason);
                    });
            }
        }


    };
</script>
