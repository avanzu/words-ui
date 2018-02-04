<template>
    <div>
        <app-layout>
            <parallax-header></parallax-header>
            <div id="home-container">

                <div class="row">
                    <div class="col s8 offset-s2">
                        <div class="card white-text darken-3 blue-grey">
                            <div class="card-content">
                                <span class="card-title">{{ $t('home.title') }}</span>

                                <p>Sed libero ipsum, auctor ac volutpat ac, adipiscing a enim. Nulla convallis quam eget tortor dictum lobortis. Aenean tincidunt arcu id lectus facilisis imperdiet. Curabitur in orci nisl. Nullam vitae arcu in tellus malesuada sollicitudin ut in sem. Ut eu nunc lacus, sit amet venenatis mauris. Donec dui neque, cursus sed molestie sit amet, tempor quis nibh. Proin nec ligula non lacus fermentum tincidunt. Nam tempus lectus ut dolor imperdiet quis commodo odio porttitor. Fusce blandit placerat posuere. Pellentesque risus leo, tempor sit amet consequat tempus, dictum vel magna. Nulla dolor turpis, dignissim a sodales quis, molestie molestie magna. Vivamus imperdiet vestibulum tellus, quis rutrum magna eleifend quis. Pellentesque convallis metus nisl. Sed eu dolor massa, sit amet luctus nulla. Mauris sit amet diam urna, eget volutpat nunc. </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </app-layout>
    </div>
</template>
<style>
 #home-container {
     margin-top: -70px;
 }
</style>
<script type="text/javascript">

    import appLayout from './layout'
    import projectList from '../components/project/project-list'
    import ParallaxHeader from '../components/parallax-header'

    export default{

        data(){
            return{}
        },
        components: {
            ParallaxHeader,
            appLayout,
        }

    }
</script>
