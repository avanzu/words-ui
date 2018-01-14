<template>
  <div id="layout">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
    updated() {
        if( this.hasError ) {
            Materialize.toast(JSON.stringify(this.error), 4000);
        }
    },
    computed: {
        hasError() {
            return (this.$store.state.error != null);
        },
        error() {
            return this.$store.state.error;
        }
    }
}
</script>

<style>
#app {

}
</style>
