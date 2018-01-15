<template>
    <section class="project-list">
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
        <div class="row">
            <div v-for="project in projects" class="col m6 s12">
                <project-card :project="project"></project-card>
            </div>
        </div>


    </section>
</template>
<script type="text/javascript">
import projectCard from './project-card'

export default {
    name: 'project-list',
    components: {
        'project-card' : projectCard
    },
    created() {
        this.$store.dispatch('getProjects');
    },
    computed: {
        loading() {
            return this.$store.state.environmentStore.loading;
        },
        projects() {
            return this.$store.state.environmentStore.projects;
        }
    }

}

</script>