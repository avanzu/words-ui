<template>
    <table>
        <thead>
        <tr>
            <th>resname</th>
            <th>source</th>
            <th>target</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in items" @click.prevent="selectItem(index, item)" :class="isSelected(index, item)">
            <td>{{item.id}}</td>
            <td>{{ item.sourceString }}</td>
            <td :class="colorize(item.state)">{{ item.localeString ? item.localeString : item.sourceString }}</td>
        </tr>
        </tbody>
        <!--
        <tfoot>
        <tr>
            <td>{{ index }} / {{ cursor }}</td>
            <td colspan="2">{{ focused }}</td>
        </tr>
        </tfoot>
        -->
    </table>
</template>

<script>

    import {colorMap} from "../../api/trans-unit-states";

    export default {
        name: 'trans-grid',
        props: ['items', 'page', 'pages', 'pageSize', 'active'],
        data() {
            return {
                cursor: 0,
                index: 0,
                focused: {}
            }
        },
        created() {
            // hook into the global event bus
            this.$eventHub.$on('alt-arrow-up-pressed', this.moveUp);
            this.$eventHub.$on('alt-arrow-down-pressed', this.moveDown);
            this.$eventHub.$on('alt-enter-pressed', this.selectFocusedItem);


            this.indexAndFocus();
        },
        beforeDestroy() {

            // detach from the global event bus (avoid zombies)
            this.$eventHub.$off('alt-arrow-up-pressed', this.moveUp);
            this.$eventHub.$off('alt-arrow-down-pressed', this.moveDown);
            this.$eventHub.$off('alt-enter-pressed', this.selectFocusedItem);
        },
        methods: {
            colorize(name) {
                return colorMap[name] ? colorMap[name] : '';
            },
            selectItem(index, item){
                this.cursor  = index;
                this.index   = index;
                this.focused = item;
                this.$emit('item-selected', this.focused);
            },
            selectFocusedItem(){
                if( this.focused === this.active) return;
                if( this.focused ) this.selectItem(this.index, this.focused);
            },
            isSelected(index, item) {
                if( index === this.index ) return 'hover';
                if( ! this.active ) return '';
                return (item.id === this.active.id) ? 'active' : '';
            },
            indexAndFocus() {
                this.index   = Math.abs(this.cursor % this.pageSize);
                this.focused = this.items[this.index];
            },
            moveUp(){
                this.cursor--;
                this.indexAndFocus();
            },
            moveDown(){
                this.cursor++;
                this.indexAndFocus();
            }
        },
        computed: {

        }
    }
</script>