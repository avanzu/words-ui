<template>
    <section>
        <parallax-header :header="$t('header.projects')"></parallax-header>
        <div id="project-view">
        <div class="row">
            <div class="col m6" v-for="project in projects">
                <div class="card white-text darken-3 blue-grey">
                    <div class="card-content">
                        <span class="card-title">
                            <router-link :to="{name: 'projectHome', params: {slug: project.canonical}}">{{ project.name }}</router-link>
                        </span>
                        <div class="project-description">
                            {{ project.description }}
                        </div>
                    </div>
                    <div class="card-action">
                        <router-link :to="{name: 'updateProject', params: {'slug': project.canonical }}" class="btn" v-if="isAuthenticated">
                            <i class="material-icons">mode_edit</i>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
            <router-link :to="{name:'createProject'}" v-if="isAuthenticated" id="add-project" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></router-link>
        </div>
    </section>
</template>

<script>
    import appLayout   from './layout'
    import projectList from '../components/project/project-list'
    import {mapState}  from 'vuex';
    import parallax  from '../components/parallax-header'

    export default {
        components: {
            'parallax-header' : parallax,
            appLayout,
            projectList
        },
        created() {
            this.$store.dispatch('getProjects');
        },
        computed  : {
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            ...mapState(
                {
                    loading : state => state.environmentStore.loading,
                    projects: state => state.projectStore.projects
                }
            )
        }
    }
</script>

<style>
    #project-view {
        margin-top: -70px;
    }
    #add-project {
        position: absolute;
        right: 2em;
        bottom: 2em;
    }
    .project-description {
        height: 6.1em;
        overflow: scroll;
    }
</style>