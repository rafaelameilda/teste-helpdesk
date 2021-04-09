<template>
  <cc-input-container :label="label" :required="required" :help="help">
    <q-input
      ref="ccInput"
      v-model="content"
      class="field-container-content"
      :color="color"
      input-class="native-field-container-content"
      outlined
      :clearable="clearable"
      clear-icon="close"
      dense
      :disable="disable"
      :readonly="readonly"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :minlength="minlength"
      :error="error"
      :error-message="errorMessage"
      :mask="mask"
      :type="type"
      :autogrow="autogrow"
      @blur="$emit('blur-evt', $event)"
      @keypress.enter="$emit('keypress-enter')"
      @keypress.tab="$emit('keypress-tab')"
    >
      <template v-show="icon" v-if="iconRight" v-slot:append>
        <q-icon @click="$emit('icon-click')" :name="icon"></q-icon>
      </template>

      <template v-show="icon" v-if="iconLeft" v-slot:prepend>
        <q-icon :name="icon"></q-icon>
      </template>
    </q-input>
  </cc-input-container>
</template>

<script>
export default {
  props: {
    value: String | Number,
    label: String,
    clearable: Boolean,
    readonly: Boolean,
    disable: Boolean,
    icon: String,
    iconLeft: Boolean,
    placeholder: String,
    help: String,
    maxlength: Number,
    minlength: Number,
    errorMessage: String,
    autogrow: Boolean,
    color: {
      type: String,
      default: "black",
    },
    iconRight: {
      default: false,
      type: Boolean,
    },
    type: {
      type: String,
      default: "text",
    },
    mask: String,
    error: Boolean,
    required: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    setValid(valid, msg = "") {
      this.$emit("valid", { valid: valid, message: msg });
      this.$emit("svalid", valid);
    },
    focus() {
      this.$refs.ccInput.focus();
    },
  },
  watch: {
    content(val) {
      if (this.minlength) {
        if (val.toString().length < this.minlength) {
          this.setValid(false, `Valor minímo do campo não preenchido. ${this.minlength}`);
        } else {
          this.setValid(true, null);
        }
      }
    },
  },
  computed: {
    content: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style scoped>
.native-field-container-content::-webkit-outer-spin-button,
.native-field-container-content::-webkit-inner-spin-button {
  /* display: none; <- Crashes Chrome on hover */
  -webkit-appearance: none;
  margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.native-field-container-content[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

.field-container-content {
  padding: 8px 0;
}
</style>
