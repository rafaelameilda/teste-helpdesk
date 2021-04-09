<template>
  <q-card-section class="q-pt-none">
    <fieldset>
      <legend>
        <q-toolbar>
          <q-toolbar-title>Spark</q-toolbar-title>
        </q-toolbar>
      </legend>
      <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
        <cc-input
          :color="$q.dark.isActive ? 'white' : 'grey'"
          :label="'Apelido'"
          :help="'Nome que o funcionário irá usar'"
          :required="true"
          class="col-12 col-lg-6 col-md-6"
          v-model="form.sparkApelido"
        />
        <cc-input
          :color="$q.dark.isActive ? 'white' : 'grey'"
          :label="'Ramal'"
          :required="true"
          :type="'number'"
          :minlength="3"
          @valid="validar"
          :error="validRamal"
          :error-message="errorMessageRamal"
          class="col-12 col-lg-6 col-md-6"
          v-model.number="form.sparkRamal"
        />
        <div class=""></div>
      </div>
    </fieldset>
  </q-card-section>
</template>

<script>
export default {
  name: "FormularioNewUserSpark",

  data() {
    return {
      errorMessageRamal: null,
      validRamal: false,
    };
  },
  props: {
    value: Object,
  },

  methods: {
    validar(x) {
      if (x.valid === false || x === false) {
        this.errorMessageRamal = x.message;
        this.validRamal = true;
      } else {
        this.errorMessageRamal = null;
        this.validRamal = false;
      }
    },
  },

  computed: {
    form() {
      return this.value;
    },
  },
};
</script>

<style></style>
