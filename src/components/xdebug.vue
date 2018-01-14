<template>
    <li v-if="debug.enabled">
        <a @click.prevent="toggleXDebug">
            <i class="material-icons" :class="debug.xDebug ? 'green-text' : 'deep-orange-text'">bug_report</i>
        </a>
    </li>
</template>

<script type="text/javascript">

    import {mapState} from 'vuex';

    export default{
        methods: {
            toggleXDebug() {
                this.$store.dispatch('xDebugToggle');
            }
        },
        computed: {

            ...mapState({
                debug: (state) => state.debugStore
            })

        }
    }
</script>
