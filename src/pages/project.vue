<template>
    <section>
        <parallax-header :header="header"></parallax-header>

        <div class="row" v-if="editorAvailable">
            <div class="col s10 offset-s1" id="project-container">
                <router-view :project="project"  @update-project="handleUpdate" @create-project="handleCreate" @cancel="handleCancel"></router-view>

            </div>
        </div>


        <indicator v-else></indicator>
    </section>
</template>

<script>
    import {copyObject} from '../util/util';
    import {mapState}   from 'vuex'
    import parallax     from '../components/parallax-header'

    export default {
        props   : ['slug', 'create'],
        components: {
            'parallax-header' : parallax
        },

        mounted() {
            console.log('mounted projects page');
            this.$store
                .dispatch('bootApplication')
                .then(() => {
                    console.log('activating project ', this.slug);
                    return this.$store.dispatch('activateProject', this.slug)
                })

        },
        computed: {
            header() {
                if( this.project ) return this.project.name;
                return this.$t('project.undefined');
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
                this.$store.dispatch('updateProject', content).then(() => { this.index(); });
            },
            handleCreate(content) {
                this.$store.dispatch('createProject', content).then(() => { this.index(); });
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