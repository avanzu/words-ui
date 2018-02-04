<template>
    <section>
        <div class="row">
            <div class="col s12">
                <div class="card blue-grey darken-3 white-text z-depth-3">
                    <div class="card-content">
                        <span class="card-title">
                            <span class="">/ {{ catalogue }} / {{ locale }}</span>
                            <strong class="right teal-text"
                                    v-if="currentProject"><em>{{ currentProject.name }}</em></strong>

                        </span>
                        <div class="progress" v-if="loading">
                            <div class="indeterminate"></div>
                        </div>
                        <trans-grid :items="items" :page="page" :pages="pages" :pageSize="pageSize" :active="current" class="trans-grid" @item-selected="translationSelected"></trans-grid>
                    </div>
                    <div class="card-action">
                        <trans-edit v-if="current" :record="editable" @input="updateTranslation"></trans-edit>
                    </div>
                </div>
            </div>
        </div>

        <pagination :current-page="page" :total-pages="pages" :items-per-page="pageSize" @page-changed="paginate" @pagesize-changed="paginateBlock"></pagination>


    </section>
</template>
<style>
    .trans-grid th, .trans-grid td {
        padding: 5px;
    }

    .trans-grid tr:hover td, .trans-grid tr.hover td {
        background: #263238;
    }

    .trans-grid tr.active {
        background: #546e7a;
    }
</style>
<script>

    import grid   from '../components/translation/grid';
    import pager  from '../components/paginator';
    import editor from '../components/translation/editor';

    import {mapState} from 'vuex';

    export default {
        components: {
            'trans-grid': grid,
            'trans-edit': editor,
            'pagination': pager
        },
        props     : ['project', 'catalogue', 'locale'],
        data() {
            return {
                editable: {}
            }
        },
        created() {
            this.$eventHub.$on('escape-pressed', this.abortTranslation);
        },
        beforeDestroy() {
            this.$eventHub.$off('escape-pressed', this.abortTranslation);
            this.$store.dispatch('activateProject', false);
        },

        mounted() {

            this.$store.dispatch('loadTranslations', {
                project  : this.project,
                catalogue: this.catalogue,
                language : this.locale
            })
            ;

        },
        methods : {
            /**
             * Loads the given page
             *
             * @param page
             */
            paginate(page) {
                this.$store
                    .dispatch('loadTranslations', {
                        project  : this.project,
                        catalogue: this.catalogue,
                        language : this.locale,
                        page     : page,
                        pageSize : this.pageSize
                    });
            },
            /**
             * Loads the first page with the given pagesize
             * @param pagesize
             */
            paginateBlock(pagesize) {
                this.$store.dispatch('loadTranslations', {
                    project  : this.project,
                    catalogue: this.catalogue,
                    language : this.locale,
                    page     : 1,
                    pageSize : pagesize
                });
            },
            /**
             * Sets the given translation as "selected" and updates the editable property to the given object copy
             * @param item
             */
            translationSelected(item) {
                this.$store
                    .dispatch('selectTranslation', item)
                    .then(detachedCopy => {
                        this.editable = detachedCopy;
                    });
            },
            /**
             * Resets the "selected" translation to null
             */
            abortTranslation() {
                this.$store.dispatch('abortTranslation');
            },
            /**
             * Issues an update for the given item using the current project, catalogue and language
             * @param item
             */
            updateTranslation(item) {
                this.$store.dispatch('updateTranslation', {
                    project  : this.project,
                    catalogue: this.catalogue,
                    language : this.locale,
                    transUnit: item
                });
            }
        },
        computed: {
            ...mapState({
                items         : state => state.translationStore.items,
                page          : state => state.translationStore.page,
                pages         : state => state.translationStore.pages,
                pageSize      : state => state.translationStore.pageSize,
                loading       : state => state.translationStore.loading,
                current       : state => state.translationStore.current,
                currentProject: state => state.projectStore.activeProject
            })
        }

    }
</script>