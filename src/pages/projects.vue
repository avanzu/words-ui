<template>
    <section>
        <parallax-header :header="$t('header.projects')">
            <router-link :to="{name:'createProject'}" v-if="isAuthenticated" id="add-project" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></router-link>
        </parallax-header>
        <indicator v-if="loading"></indicator>
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
            <pagination :current-page="page" :total-pages="pages" :items-per-page="pageSize" @page-changed="paginate" @pagesize-changed="paginateBlock"></pagination>


        </div>
    </section>
</template>

<script>
    import appLayout   from './layout'
    import projectList from '../components/project/project-list'
    import {mapState}  from 'vuex';
    import parallax    from '../components/parallax-header'
    import pager  from '../components/paginator';

    export default {
        components: {
            'parallax-header' : parallax,
            'pagination' : pager,
            appLayout,
            projectList
        },
        mounted() {
            this.$store.dispatch('loadProjects', {
                page     : this.page,
                pageSize : this.pageSize
            });
        },
        computed  : {
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            ...mapState(
                {
                    loading : state => state.environmentStore.loading,
                    projects: state => state.projectStore.projects,
                    page    : state => state.projectStore.currentPage,
                    pages   : state => state.projectStore.pages,
                    pageSize: state => state.projectStore.pageSize
                }
            )
        },
        methods: {
            /**
             * Loads the given page
             *
             * @param page
             */
            paginate(page) {
                this.$store
                    .dispatch('loadProjects', {
                        page     : page,
                        pageSize : this.pageSize
                    });
            },
            /**
             * Loads the first page with the given pagesize
             * @param pagesize
             */
            paginateBlock(pagesize) {
                this.$store.dispatch('loadProjects', {
                    page     : 1,
                    pageSize : pagesize
                });
            },
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
        top : 2em;
    }
    .project-description {
        height: 6.1em;
        overflow: scroll;
    }
</style>