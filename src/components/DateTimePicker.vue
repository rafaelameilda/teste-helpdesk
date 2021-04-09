<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <input-container :label="label" :required="required">
   <q-datetime-picker :display-value="computedProperty" dense outlined mask="DD/MM/YYYY HH:mm" mode="datetime" format24h  v-model="datetime"></q-datetime-picker>
  </input-container>
</template>

<script>
import { date } from "quasar";
import InputContainer from "./InputContainer";
import moment from 'moment'

export default {
  props: {
    label: String,
    required: Boolean
  },
  name: "Datepicker",
  components: { InputContainer },
  data() {
    return {
      datetime: null
    };
  },
  computed: {
    computedProperty() {

      return date.formatDate(this.datetime, 'DD/MM/YYYY HH:mm')
    }
  }
};
</script>

<style scoped>
.field-container-content {
  padding: 8px 0;
}
</style>
