<template>
    <section>
        <div class="row">
            <div class="col s8">
                <!--
                <div class="input-field">
                    <textarea v-model="record.sourceString" readonly class="materialize-textarea"></textarea>
                    <label>locale string</label>
                </div>
                -->
                <div class="input-field">
                    <textarea v-model="record.localeString" ref="localeString" class="materialize-textarea"></textarea>
                    <label>
                        <small>{{ record.id }}</small>
                        <br/>{{ record.sourceString }}
                    </label>
                </div>
            </div>
            <div class="col s4">
                <div class="row">
                <div class="col s6" v-for="state in states">
                    <input type="radio" :id="state" :value="state" v-model="record.state" />
                    <label :for="state">{{ state }}</label>
                </div>
                </div>
            </div>
            <div class="col s12">
                <button class="btn waves-effect waves-light right" @click="handleSubmit">Submit
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </div>
    </section>
</template>
<script>

    import {materialize} from "../../util/util";
    import {states} from '../../api/trans-unit-states'
    import events from '../../util/key-code-map'

    export default {
        props: ['record'],
        data() {
            return {
                states: states
            }
        },
        mounted() {
            materialize();
        },
        watch: {
            record(oldValue, newValue) {
                /*
                 * the materialize script does not work properly when the input field's underlying value
                 * changes from non empty string to empty string (e.g. when the record prop changes)
                 * which leads to labels not being moved away hence floating above the input value.
                 *
                 * triggering blur and focus when the record changes seems to fix this
                  */
                if( oldValue.entityId === newValue.entityId) return;
                this.$refs.localeString.blur();
                this.$refs.localeString.focus();
            }
        },
        methods: {
            handleSubmit() {
                this.$emit('input', this.record);
            }
        }
    }

</script>