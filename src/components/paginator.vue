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
                            <li :class="{ disabled : firstPage }">
                                <a href="#" @click.prevent="pageChanged(1)" aria-label="Previous">
                                    <i class="material-icons">chevron_left</i>
                                </a>
                            </li>
                            <li v-for="n in paginationRange" :class="activePage(n)" class="waves-effect">
                                <a href="#" @click.prevent="pageChanged(n)" class="white-text">{{ n }}</a>
                            </li>
                            <li :class="{disabled: lastPage }">
                                <a href="#" @click.prevent="pageChanged(lastPage)" aria-label="Next">
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
            }
        },
        computed: {
            sizeBrackets() {
                return [10, 20, 50, 100];
            },
            lastPage() {
                if (this.totalPages) {
                    return this.totalPages
                } else {
                    return this.totalItems % this.itemsPerPage === 0
                        ? this.totalItems / this.itemsPerPage
                        : Math.floor(this.totalItems / this.itemsPerPage) + 1
                }
            },
            firstPage() {
                return (2 > this.currentPage);
            },
            paginationRange() {
                let start =
                    this.currentPage - this.visiblePages / 2 <= 0
                        ? 1 : this.currentPage + this.visiblePages / 2 > this.lastPage
                        ? lowerBound(this.lastPage - this.visiblePages + 1, 1)
                        : Math.ceil(this.currentPage - this.visiblePages / 2);

                let range = [];

                for (let i = 0; i < this.visiblePages && i < this.lastPage; i++) {
                    range.push(start + i)
                }

                return range
            }
        }
    }

</script>