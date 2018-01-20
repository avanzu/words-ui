<template>
    <section>
        <div class="row">
            <div class="col s12">
                <div class="card blue-grey darken-3 white-text z-depth-3">
                    <div class="card-content">
                        <span class="card-title">Translate!</span>
                        <trans-grid :items="items" :page="page" :pages="pages" :pageSize="pageSize"></trans-grid>
                    </div>
                    <div class="card-action">
                    </div>
                </div>
            </div>
        </div>

        <pagination :current-page="page" :total-pages="pages" :items-per-page="pageSize" @page-changed="paginate" @pagesize-changed="paginateBlock" ></pagination>


    </section>
</template>
<script>

    import grid from '../components/translation/grid';
    import pager from '../components/paginator';

    import {mapState} from 'vuex';

export default {
    components: {
        'trans-grid' : grid,
        'pagination' : pager
    },
    props: ['project', 'catalogue', 'locale'],
    mounted() {
        this.$store.dispatch('loadTranslations', {project: this.project, catalogue: this.catalogue, language: this.locale } );
    },
    methods: {
        paginate(page) {
            this.$store.dispatch('loadTranslations', {project: this.project, catalogue: this.catalogue, language: this.locale, page: page, pageSize: this.pageSize } );
        },
        paginateBlock(pagesize) {
            this.$store.dispatch('loadTranslations', {project: this.project, catalogue: this.catalogue, language: this.locale, page: 1, pageSize:pagesize } );
        }
    },
    computed: {
        ...mapState({
            items: state => state.translationStore.items,
            page: state => state.translationStore.page,
            pages: state => state.translationStore.pages,
            pageSize: state => state.translationStore.pageSize,
            loading: state => state.translationStore.loading,
        })
    }

}
</script>