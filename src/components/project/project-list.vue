<template>
    <section class="project-list">
        <indicator v-if="loading" :message="'lade projekte...'"></indicator>

        <div class="row">
            <div v-for="project in projects" class="col m6 s12">
                <project-card :project="project"></project-card>
            </div>
        </div>


    </section>
</template>
<script type="text/javascript">
    import projectCard from './project-card'
    import {mapState}  from 'vuex';

    export default {
        name      : 'project-list',
        components: {
            'project-card': projectCard
        },
        created() {
            this.$store.dispatch('getProjects');
        },
        computed  : {
            ...mapState({
                            loading : state => state.environmentStore.loading,
                            projects: state => state.projectStore.projects
                        })
        }

    }

</script>