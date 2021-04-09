<template>
  <input-container :label="label" :required="required" :help="help">
    <q-select
    :readonly="readonly"
      v-if="filter"
      v-model="content"
      class="field-container-content"
      :emit-value="emitValue"
      ref="ccSelect"
      :option-label="optionLabel"
      :option-value="optionValue"
      :options="options"
      dense
      outlined
      :multiple="multiple"
      :placeholder="placeholder"
      :map-options="mapOptions"
      :use-input="useInput"
      @filter="filter"
    >
     <template v-if="clearable && content" v-slot:append>
        <q-icon class="cursor-pointer" @click="content = null" name="close"></q-icon>
      </template>

      <template v-show="icon" v-if="iconLeft" v-slot:prepend>
        <q-icon :name="icon"></q-icon>
      </template>
    </q-select>

    <q-select
    :readonly="readonly"
      v-else
      v-model="content"
      ref="ccSelect"
      class="field-container-content"
      :emit-value="emitValue"
      :option-label="optionLabel"
      :option-value="optionValue"
      :options="options"
      dense
      outlined
      :multiple="multiple"
      :placeholder="placeholder"
      :map-options="mapOptions"
      :use-input="useInput"
    >
      <template v-if="clearable && content" v-slot:append>
        <q-icon class="cursor-pointer" @click="content = null" name="close"></q-icon>
      </template>

      <template v-show="icon" v-if="iconLeft" v-slot:prepend>
        <q-icon :name="icon"></q-icon>
      </template>


    </q-select>
  </input-container>
</template>


<script>
import InputContainer from "./InputContainer";
export default {
  components: { InputContainer },
  props: {
    value: String | Number | Object,
    label: String,
    placeholder: String,
    required: Boolean,
    help: String,
    options: Array,
    optionLabel: String | Function,
    optionValue: String | Function,
    emitValue: Boolean,
    icon: String,
    iconLeft: Boolean,
    iconRight: Boolean,
    multiple: Boolean,
    mapOptions: Boolean,
    useInput: Boolean,
    filter: Function,
    clearable: Boolean,
    readonly: Boolean
  },
  computed: {
    content: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    focus() {
      this.$refs.ccSelect.focus();
    }
  }
};
</script>

<style scoped>
.field-container-content {
  padding: 8px 0;
}
</style>

