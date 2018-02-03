<template>
    <div class="parallax-container z-depth-1">

        <div class="container">
            <br><br>
            <h1 class="header center amber-text text-accent-4" v-if="headerEnabled">{{ header }}</h1>
            <div class="row center" v-if="subheader">
                <h5 class="header col s12 light">{{ subheader }}</h5>
            </div>
        </div>
        <slot></slot>
        <div class="parallax purple darken-4 index">
            <!-- <img :src="parallaxImage" class="responsive-img blur"> -->
        </div>
    </div>
</template>
<style>
    .parallax-container .header {
        text-shadow: 2px 2px .25rem #263238;
    }
</style>

<script type="text/javascript">
    import config from '../parameters';
    export default {
        name: 'parallax-header',
        mounted() {
            document.title = this.header;
        },
        updated() {
            document.title = this.header;
        },
        props : {
            header        : {
                type    : String,
                default : config.AppName
            },
            subheader     : [String, Boolean],
            headerEnabled : {
                "type"    : Boolean,
                "default" : true
            }
        } // [ 'header', 'subheader', 'headerEnabled' ]

    };
</script>
