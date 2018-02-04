<template>
    <div class="card white-text">
        <div class="card-content">
            <span class="card-title" v-if="title">{{ title }}</span>
        </div>
        <slot></slot>

    </div>
</template>

<script>
    export default {
        props: ['title']
    }
</script>
