<template>
    <div>
        <app-layout>
            <project-list></project-list>
        </app-layout>
    </div>
</template>
<style>

</style>
<script type="text/javascript">

    import appLayout from './layout'
    import projectList from '../components/project/project-list'

    export default{

        data(){
            return{}
        },
        components: {
            appLayout,
            projectList
        }

    }
</script>
