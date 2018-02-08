<template>
    <div>

        <div class="card darken-4 blue-grey white-text">
            <div class="card-content">
                <span class="card-title">{{ $t('title.uploadCatalogue') }}</span>
                <div class="file-field input-field">
                    <div class="btn">
                        <span>File</span>
                        <input type="file" @change="onFileChange($event.target.files)">
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text">
                    </div>
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

    import {mapState} from 'vuex';

    export default {

        name: 'catalogue-upload',
        props: ['project'],
        data(){
            return { files: [] };
        },
        methods: {
            cancel() {
                this.$emit('cancel');
            },
            handleSubmit() {
                if( ! this.files.length ) return;
                this.$emit('upload-catalogue', this.files.item(0) );
            },
            onFileChange(files) {
                this.files = files;
            }
        },
        computed: {
            ...mapState(
                {
                    loading: state => state.transUnitStore.loading
                }
            )
        }
    }
</script>
