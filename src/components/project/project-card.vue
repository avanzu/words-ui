<template>
    <div class="card white-text darken-3 blue-grey hoverable">
        <!-- <card-image :exercise="exercise"></card-image> -->
        <div class="card-content">
            <span class="card-title activator">
                {{project.name}}
                <i class="material-icons right">more_vert</i>
            </span>
            <table>
                <thead>
                <tr>
                    <th>catalogue</th>
                    <th v-for="language in languages">{{language}}</th>
                </tr>
                </thead>
                <tbody v-if="statsReady">
                <tr v-for="catalogue in catalogues">
                    <td>{{ catalogue }}</td>
                    <td v-for="language in languages" >
                    <project-cell :project="project.canonical" :language="language" :catalogue="catalogue"></project-cell>
                    </td>
                        <!-- <span v-for=" (key, value) in getStats(language, catalogue)">{{ key }}: {{ value}}</span> -->
                </tr>
                </tbody>
            </table>
            <!--
            <div class="card-panel blue-grey darken-4" v-for="catalogue in catalogues">
                {{ catalogue }}
                <dl>
                    <dt></dt>
                </dl>
            </div>
            -->

            <!--
            <dl>
                <dt class="col s4">{{$t('label.exercise.bodyPart')}}</dt>
                <dd class="right-align col s8 thin-text lime-text text-accent-3">
                    {{labelize(exercise.bodyPart,'tags.bodypart.').join(', ')}}
                </dd>
            </dl>
            <dl>
                <dt class="col s4">{{$t('label.exercise.type')}}</dt>
                <dd class="right-align col s8 thin-text purple-text text-accent-3">
                    {{ labelize(exercise.type,'tags.type.').join(', ') }}
                </dd>
            </dl>

            <dl>
                <dt class="col s4">
                    {{$t('label.exercise.difficulty')}}
                </dt>
                <dd class="right-align col s8 thin-text">
                    {{$t('tags.difficulty.' + exercise.difficulty) }}
                </dd>
            </dl>
            <dl>
                <dt class="col s4">
                    {{$t('label.exercise.complexity')}}
                </dt>
                <dd class="right-align col s8 thin-text">
                    {{$t('tags.complexity.' + exercise.complexity) }}
                </dd>
            </dl>
            -->
        </div>
        <div class="card-action">
            <router-link :to="{name: 'updateProject', params: {'slug': project.canonical }}" class="btn" v-if="isAuthenticated">
                <i class="material-icons">mode_edit</i>
            </router-link>

        </div>
        <div class="card-reveal blue-grey darken-3 white-text">
            <span class="card-title">
                {{project.name}}
                <!-- {{$t('title.exerciseDetails')}} -->
                <i class="material-icons right">close</i>
            </span>

            <p v-html="project.description"></p>
            <!--
                <div v-for="bodypart in exercise.bodyPart" class="chip lime">{{ bodypart }}</div>
                <div v-for="type in exercise.type" class="chip teal">{{ type }}</div>
            -->
        </div>

    </div>
</template>
<script type="text/javascript">
    import cell from './project-cell'

    export default {
        components: {
            'project-cell' : cell
        },
        name: 'project-card',
        props: ['project'],
        mounted() {
            this.$store
                .dispatch('loadStats', this.project.canonical);

        },
        computed: {
            statsReady() {
                return this.$store.state.projectStore.completions[this.project.canonical];
            },
            isAuthenticated() {
                return this.$store.getters.isAuthenticated;
            },
            languages() {
                return this.$store.state.environmentStore.languages;
            },
            catalogues(){
                return this.$store.state.environmentStore.catalogues;
            },
            stats() {
                return this.$store.state.projectStore.completions[this.project.canonical];
            }
        }
    }
</script>