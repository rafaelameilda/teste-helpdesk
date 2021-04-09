<template>
  <checkbox-group-container :label="label">
    <q-option-group :color="color" :type="type" v-model="content" :options="optionsInternal" :inline="inline"></q-option-group>
  </checkbox-group-container>
</template>

<script>
import CheckboxGroupContainer from "./CheckboxGroupContainer";
export default {
  components: { CheckboxGroupContainer },
  props: {
    value: String | Number | Object | Array,
    label: String,
    options: Array,
    inline: Boolean,
    color: String,
    type: {
      default: 'checkbox',
      type: String
    }
  },
  mounted() {},
  computed: {
    optionsInternal() {
      const ret = this.options.map(m => {
        if (typeof m === "string") {
          return {
            label: m,
            value: m
          };
        } else {
          return m;
        }
      });      
      return ret;
    },
    content: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style>
</style>
