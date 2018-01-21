<template>

    <div class="row">
        <div class="col s4">
            <div class="card-panel center-align blue-grey darken-3 white-text z-depth-3">
                <ul class="pagination">
                    <li v-for="block in sizeBrackets" :class="activeBracket(block)" class="waves-effect">
                        <a href="#" @click.prevent="blockSizeChanged(block)" class="white-text">{{ block }}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col s8">

            <div class="card-panel center-align blue-grey darken-3 white-text z-depth-3">
                <div class="col s3">
                    <div class="left-align">
                        <ul class="pagination">
                            <li class="white-text">{{ currentPage }} / {{ totalPages }}</li>
                        </ul>
                    </div>
                </div>
                <div class="col-s9">
                    <div class="right-align">
                        <ul class="pagination">
                            <li :class="{ disabled : isFirstPage }">
                                <a href="#" @click.prevent="pageChanged(1)" aria-label="Previous"  class="white-text">
                                    <i class="material-icons">chevron_left</i>
                                </a>
                            </li>
                            <li v-for="n in paginationRange" :class="activePage(n)" class="waves-effect">
                                <a href="#" @click.prevent="pageChanged(n)" class="white-text">{{ n }}</a>
                            </li>
                            <li :class="{disabled: isLastPage }">
                                <a href="#" @click.prevent="pageChanged(lastPage)" aria-label="Next" class="white-text">
                                    <i class="material-icons">chevron_right</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

    import {lowerBound} from "../util/util";

    export default {
        props: {

            // Current Page
            currentPage: {
                type: Number,
                required: true
            },

            // Total number of pages
            totalPages: Number,

            // Items per page
            itemsPerPage: Number,

            // Total items
            totalItems: Number,

            // Visible Pages
            visiblePages: {
                type: Number,
                default: 5,
                coerce: (val) => parseInt(val)
            }

        },
        created() {
            // enable pagination by keyboard shortcut
            this.$eventHub.$on('alt-arrow-left-pressed', this.previousPage);
            this.$eventHub.$on('alt-arrow-right-pressed', this.nextPage);
        },
        beforeDestroy(){
            //
            this.$eventHub.$off('alt-arrow-left-pressed', this.previousPage);
            this.$eventHub.$off('alt-arrow-right-pressed', this.nextPage);
        },
        methods: {
            activePage(pageNum) {
                return this.currentPage === pageNum ? 'active' : ''
            },
            pageChanged(pageNum) {
                this.$emit('page-changed', pageNum)
            },
            blockSizeChanged(size) {
                this.$emit('pagesize-changed', size);
            },
            activeBracket(bracket) {
                return this.itemsPerPage === bracket ? 'active' : '';
            },
            nextPage(){
                if( this.isLastPage ) return;
                this.pageChanged(this.currentPage +1);
            },
            previousPage(){
                if( this.isFirstPage ) return;
                this.pageChanged(this.currentPage -1);
            }
        },
        computed: {
            sizeBrackets() {
                return [10, 20, 50, 100];
            },
            lastPage() {
                // we know the total pages. There's no need to calculate
                if (this.totalPages) { return this.totalPages }

                // total items spread perfectly over items per page
                if (this.totalItems % this.itemsPerPage === 0) {
                    return (this.totalItems / this.itemsPerPage);
                }
                // we have a spillover, add one page to display the last items not fitting on the "regular" last page
                return  Math.floor(this.totalItems / this.itemsPerPage) + 1

            },
            isFirstPage() {
                return (2 > this.currentPage);
            },
            isLastPage(){
                return (this.currentPage === this.lastPage);
            },

            rangeStart() {
                // avoid pointing out of range beyond the first page
                if (this.currentPage - this.visiblePages / 2 <= 0) {
                    return 1;
                }

                // avoid pointing out of range beyond the last page
                if (this.currentPage + this.visiblePages / 2 > this.lastPage) {
                    return Math.max(this.lastPage - this.visiblePages + 1, 1);
                }


                return  Math.ceil(this.currentPage - this.visiblePages / 2);

            },
            paginationRange() {
                let start = this.rangeStart, range = [];
                for (let i = 0; i < this.visiblePages && i < this.lastPage; i++) {
                    range.push(start + i)
                }

                return range
            }
        }
    }

</script>