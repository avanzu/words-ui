<template>
    <section>
        <div class="row" v-if="changing">
            <div class="col s2" v-for="avatar in avatars">
                <a href="#" @click.prevent="selectAvatar(avatar)">
                    <div class="card-panel teal hoverable"
                         :class="[isSelected(avatar) ? 'z-depth-3' : 'darken-3 z-depth-1']">
                        <img :src=" avatar | avatarPath ">
                    </div>
                </a>

            </div>
        </div>
        <div class="row" v-else>
            <div class="col s6 offset-s3">
                <a href="#" @click.prevent="toggleChanging">
                    <div class="card-panel teal hoverable">
                        <img :src=" value|avatarPath ">
                    </div>
                </a>
            </div>
        </div>
    </section>
</template>
<style>

</style>
<script type="text/javascript">
    import {list} from '../util/avatars';

    export default {
        props: ['value'],
        data() {
            return {
                avatars : [],
                changing: false
            }
        },

        created() {
            this.avatars = list();
        },
        methods: {
            toggleChanging() {
                this.changing = !this.changing;
            },
            isSelected(value) {
                return (this.value === value);
            },
            selectAvatar(value) {
                this.$emit('input', value);
                this.changing = false;
            }

        }

    };
</script>
