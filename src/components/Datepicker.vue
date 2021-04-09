<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <input-container :label="label" :required="required">
    <q-input
      ref="ccInput"
      :readonly="readonly"
      :disable="disable"
      :dense="dense"
      :color="color"
      v-model="localValue"
      :mask="mask"
      :outlined="outlined"
      @keypress.enter="$emit('keypress-enter')"
      @blur="$emit('blur')"
      class="field-container-content"
    >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date today-btn v-model="model">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="OK" color="primary" flat v-close-popup />
                <q-btn label="Cancel" color="primary" flat v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </input-container>
</template>

<script>
import { date } from "quasar";
import InputContainer from "./InputContainer";

const formatDateQuasar = (data) => {
  return date.formatDate(data, "YYYY/MM/DD");
};

const dateFromString = (value) => {
  value = value || [];
  try {
    if (value.length) {
      const x = value.split("/");
      x[1] = parseInt(x[1]) - 1;
      //let newDate = date.buildDate({date: x[0], year: x[2], month: x[1]})
      const d = new Date().setFullYear(x[2], x[1], x[0]);

      if (date.isValid(date.formatDate(d, "YYYY/MM/DD"))) {
        const date = formatDateQuasar(d);

        return date;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
};
const vModelComputed = {
  get() {
    this.model = dateFromString(this.value);
    return this.value;
  },
  set(newValue) {
    this.model = dateFromString(newValue);
    this.$emit("input", newValue);
  },
};

export default {
  name: "Datepicker",
  components: { InputContainer },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    inputHandler(value) {
      this.$emit("input", value);
    },

    focus() {
      this.$refs.ccInput.focus();
    },
  },
  computed: {
    localValue: vModelComputed,
  },
  watch: {
    model(val) {
      const format = date.formatDate(val, "DD/MM/YYYY");
      this.inputHandler(format);
    },
  },
  props: {
    value: String,
    label: String,
    outlined: { type: Boolean, default: true },
    color: {
      type: String,
      default: "black",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    mask: {
      type: String,
      default: "##/##/####",
    },
    required: Boolean,
  },
};
</script>

<style scoped>
.field-container-content {
  padding: 8px 0;
}
</style>
