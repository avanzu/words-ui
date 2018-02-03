<template>
    <div class="page-content container-fluid">
        <slot></slot>
    </div>
</template>
<style>

</style>
<script>

    export default{
        name : 'main-container',
        data(){
            return{
                msg:'hello vue'
            }
        }
    }

</script>
