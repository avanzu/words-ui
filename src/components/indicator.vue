<template>
    <div class="card-panel blue-grey darken-4 white-text center-align z-depth-3">
        <div class="row">
            <div class="col s12">
                {{ localizedMessage }}
                <br>
                <br>
                <div class="progress">
                    <div class="indeterminate"></div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props: ['message'],
        computed:  {
            localizedMessage() {
                if( this.message ) return this.message;
                return this.$t('message.loading');
            }
        }
    }
</script>
