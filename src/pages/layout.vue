<template>
    <main>
        <main-container>
            <slot></slot>
        </main-container>
    </main>
</template>
<style>

</style>
<script type="text/javascript">

    /*
import navbar        from '../components/navbar'
import sidebar       from '../components/sideBar'
import breadcrumbs   from '../components/breadcrumbs'
*/
    import mainContainer from '../components/mainContainer'

    export default {
        name: 'app-layout',
        data() {
            return {}
        },
        components: {
            //navbar,
            //sidebar,
            //breadcrumbs,
            mainContainer
        }
    }
</script>
