<template>
    <section>
        <parallax-header :header="header"></parallax-header>

        <div class="row" v-if="editorAvailable">
            <div class="col s10 offset-s1" id="project-container">
                <router-view :project="project" @update-project="handleUpdate" @create-project="handleCreate" @cancel="handleCancel" @upload-catalogue="handleUpload"></router-view>

            </div>
        </div>


        <indicator v-else></indicator>
    </section>
</template>

<script>
    import {mapState}   from 'vuex'
    import parallax     from '../components/parallax-header'

    export default {
        props   : ['slug', 'create'],
        components: {
            'parallax-header' : parallax
        },

        mounted() {
            console.log('activating project ', this.slug);
            this.$store.dispatch('activateProject', this.slug);
            /*
            this.$store
                .dispatch('loadProjects')
                .then(() => {
                    console.log('activating project ', this.slug);
                    return this.$store.dispatch('activateProject', this.slug)
                })
            */

        },
        beforeDestroy(){
            this.$store.dispatch('activateProject', false);
        },
        computed: {
            header() {
                if( this.project ) return this.project.name;
                return this.$t('label.project.undefined');
            },
            editorAvailable() {
                return (this.project || this.create);
            },
            ...mapState(
                {
                    project: state => state.projectStore.activeProject
                }
            )
        },
        methods: {
            index() {
                this.$router.push({name: 'projectsIndex'});
            },
            handleUpdate(content) {
                this.$store.dispatch('updateProject', content).then(() => this.index());
            },
            handleCreate(content) {
                this.$store.dispatch('createProject', content).then(() =>  this.index() );
            },
            handleUpload(files) {
                this.$store.dispatch('uploadCatalogue', {project: this.project, file: files}).then(() =>  this.index() );
            },
            handleCancel() {
                this.index();
            }
        }

    }
</script>

<style>
    #project-container {
        margin-top: -70px;
    }
</style>