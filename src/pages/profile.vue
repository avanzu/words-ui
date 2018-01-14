<template>
    <section>



        <div class="container" v-if="user">

            <div v-if="loading" class="card-panel blue-grey darken-4 white-text center-align z-depth-3">
                <div class="row">
                    <div class="col s12">
                        {{$t('message.loading')}}
                        <br>
                        <br>
                        <div class="progress">
                            <div class="indeterminate"></div>
                        </div>
                    </div>

                </div>
            </div>
            <router-view v-else></router-view>
        </div>
    </section>
</template>

<script type="text/javascript">

    import formErrors  from '../components/form-errors';
    import avatarChoice from '../components/avatar-choice';

    export default {
        components : {
            'form-errors'   : formErrors,
            'avatar-choice' : avatarChoice
        },

        created() {
            this.$store.dispatch('getEditableProfile');
        },
        computed: {
            loading() {
                return this.$store.state.authUserStore.loading;
            },
            user() {
                return this.$store.state.authUserStore.profile;
            }
        }
        /*
        mounted    : util.materialize,
        updated    : util.materialize,
        */

    };
</script>
