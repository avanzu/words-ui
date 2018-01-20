<template>
    <span>
        <router-link :to="{ name: 'translateCatalogue', params: {project: project, catalogue: catalogue, locale: language }}">
        {{ total }} / {{ translated }}
    </router-link>
    </span>
</template>
<script>
    export default {
        props: ['catalogue', 'language', 'project'],
        data() {
            return {
                translated: 999,
                total: 9999
            };
        },
        mounted() {

            return this
                .$store
                .dispatch('getStats', {
                    language: this.language,
                    catalogue: this.catalogue,
                    project: this.project
                })
                .then(data => {
                    this.translated = data.translated;
                    this.total      = data.total;

                })
                ;
        }
    }
</script>