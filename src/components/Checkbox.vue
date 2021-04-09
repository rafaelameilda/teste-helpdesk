<template>
  <checkbox-group-container :label="label">
   <q-checkbox v-model="content"></q-checkbox>
  </checkbox-group-container>
</template>

<script>
import CheckboxGroupContainer from "./CheckboxGroupContainer";
export default {
  components: { CheckboxGroupContainer },
  props: {
    value: Boolean,
    label: String,
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
