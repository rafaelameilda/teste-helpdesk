<template>
  <q-card-section class="q-pt-none">
    <fieldset>
      <legend class="">
        <q-toolbar>
          <q-toolbar-title>Winthor</q-toolbar-title>
        </q-toolbar>
      </legend>
      <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
        <div class="q-gutter-sm">
          <q-radio
            v-model="form.typeNewUserWinthor"
            val="libertItRotinas"
            label="Liberar Estas Rotinas"
            color="teal"
          />
          <q-radio
            v-model="form.typeNewUserWinthor"
            val="copyOfUser"
            label="Copiar as Rotinas deste Usuário"
            color="orange"
          />
        </div>
        <cc-input-container
          v-if="form.typeNewUserWinthor === 'copyOfUser'"
          class="col-12 col-lg-12 col-md-12"
          :label="'Usuário'"
          :required="true"
        >
          <q-select
            class="field-container-content"
            dense
            :color="$q.dark.isActive ? 'white' : 'grey'"
            outlined
            v-model="form.winthorUserReferencia"
            @filter="getUsersFilter"
            use-chips
            use-input
            option-label="Nome"
            input-debounce="1000"
            :options="usersOptions"
          ></q-select>
        </cc-input-container>

        <cc-input-container
          v-if="form.typeNewUserWinthor === 'libertItRotinas'"
          class="col-12 col-lg-12 col-md-12"
          :label="'Rotinas'"
          :required="true"
        >
          <q-select
            class="field-container-content"
            dense
            :color="$q.dark.isActive ? 'white' : 'grey'"
            outlined
            use-chips
            v-model="form.winthorRotinasLiberar"
            use-input
            multiple
            @filter="getRotinasFilter"
            option-label="Rotina"
            input-debounce="1000"
            :options="rotinasOptions"
          ></q-select>
        </cc-input-container>

        <cc-input
          :color="$q.dark.isActive ? 'white' : 'grey'"
          :label="'Observação'"
          v-model="form.winthorObservacao"
          class="col-12 col-lg-12 col-md-12"
        />
        <div class=""></div>
      </div>
    </fieldset>
  </q-card-section>
</template>

<script>
import helpdeskService from "../services/helpdesk-service";
import DialogComponent from "./DialogMessage";
export default {
  name: "FormularioNewUserWinthor",

  data() {
    return {
      rotinasOptions: [],
      usersOptions: [],
    };
  },

  methods: {
    async getUsersFilter(params, update, abort) {
      try {
        const res = await helpdeskService.getFiltersUsuario(params);

        update(() => {
          this.usersOptions = res;
        });
      } catch (error) {
        const msg = !err.response
          ? "Sem comucação com servidor"
          : err.response.data.message;
        this.exibirMensagem(msg);
      }
    },

    async getRotinasFilter(params, update, abort) {
      try {
        const res = await helpdeskService.getFiltersRotinas(params);

        update(() => {
          this.rotinasOptions = res;
        });
      } catch (error) {
        const msg = !err.response
          ? "Sem comucação com servidor"
          : err.response.data.message;
        this.exibirMensagem(msg);
      }
    },

    exibirMensagem(msg) {
      this.$q.dialog({
        component: DialogComponent,
        message: msg,
        html: true,
        title: "Erro",
      });
    },
  },

  props: {
    value: Object,
  },

  computed: {
    form() {
      return this.value;
    },
    typeNewUserWinthor: {
      get() {
        return this.form.typeNewUserWinthor;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },

  watch: {
    typeNewUserWinthor(val) {
      this.form.typeNewUserWinthor = val;
      this.form.winthorRotinasLiberar = [];
      this.form.winthorUserReferencia = null;
    },
  },
};
</script>

<style></style>
