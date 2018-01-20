<template>
    <table class="">
        <thead>
        <tr>
            <th>resname</th>
            <th>source</th>
            <th>target</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items">
            <td>{{item.id}}</td>
            <td>{{ item.sourceString }}</td>
            <td :class="colorize(item.state)">{{ item.localeString ? item.localeString : item.sourceString }}</td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    export default {
        name: 'trans-grid',
        props: ['items', 'page', 'pages', 'pageSize'],
        methods: {
            colorize(name) {
                if( name === 'needs-translation') return 'light-green-text text-lighten-3';
                return '';

            }
        }
    }
</script>