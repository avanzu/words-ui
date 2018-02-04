<template>
    <div>
         <div class="card darken-4 blue-grey white-text">
            <div class="card-content">
                <span class="card-title">{{ projectName }}</span>


                <div class="input-field">
                    <input v-model="editable.name" type="text">
                    <label>Project name</label>
                </div>

                <div class="input-field">
                    <textarea v-model="editable.description" class="materialize-textarea"></textarea>
                    <label>Description</label>
                </div>

            </div>
            <div class="card-action right-align">
                <button class="btn waves-effect waves-light" @click="cancel">cancel</button>
                <button class="btn waves-effect waves-light" @click="handleSubmit">Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import {materialize, copyObject} from '../../util/util';

    export default {
        props: ['project'],
        data(){
            return { editable: { name: "", description: ""} }
        },
        mounted() {
            this.reset();
            if( this.project ) {
                this.editable = copyObject(this.project);
            }

            materialize();
        },
        watch: {
            project(oldValue, newValue) {
                if( oldValue === newValue ) { return; }
                this.editable = copyObject(this.project);
            }
        },
        computed: {
            projectName() { return this.project ? this.project.name : this.$t('label.project.undefined'); }
        },
        methods: {
            reset() {
                this.editable = { name: "", description: ""};
            },
            handleSubmit() {

                this.$emit(this.project ? 'update-project' : 'create-project', this.editable);
            },
            cancel() {
                this.$emit('cancel');
            }
        }
    }
</script>
