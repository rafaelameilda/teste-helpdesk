<template>
  <cc-input-container :label="label">
    <div class="field-container-content">
      <q-btn-toggle v-model="content" :color="color"
        :textColor="textColor"
        :toggleColor="toggleColor"
        :toggleTextColor="toggleTextColor"
        :options="options" />
    </div>
  </cc-input-container>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    label: String,
    value: String,
    options: {
      type: Array,
      default: () => []
    },
    toggleColor: {
      type: String,
      default: "theme"
    },
    color: {
      type: String,
      default: 'primary'
    },
    textColor: {
      type: String,
      default: 'white'
    },
    toggleTextColor: {
      type: String,
      default: 'white'
    }
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
  data() {
    return {};
  }
};
</script>
