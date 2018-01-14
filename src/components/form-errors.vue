<template>
    <section>
    <!-- error-display -->
    <div class="row" v-if="hasError">
        <div class="col s12" >
            <div class="card-panel red z-depth-3">
                <dl v-for="item, key in errors" class="row">
                    <dt class="col s4">{{ transLabel(key) }} </dt>
                    <dd class="col s8 right-align">{{item.join(' ') }}</dd>
                </dl>
            </div>
        </div>
    </div>
    <!-- end error-display -->
    </section>
</template>

<script type="text/javascript">

    export default  {
        props: {
            hasError: {
                type: Boolean,
                required: true,
                default: false
            },
            errors: {
                type: Object,
                required: true,
                default: {},
            },
            labelPrefix: {
                type: String,
                requred: false,
                default: ''
            }
        },
        methods: {
            transLabel(key) {
                return this.$t( this.labelPrefix + key );
            }
        }

    };

</script>
