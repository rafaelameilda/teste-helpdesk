<template>
  <q-page class="q-pa-sm q-gutter-sm">
    <q-toolbar
      :class="
        $q.dark.isActive
          ? 'shadow bg-dark text-white rounded-borders'
          : 'rounded-borders bg-deep-orange-6  text-white text-subtitle1'
      "
    >
      Abrir uma Nova Solicitação

      <q-space />
    </q-toolbar>

    <q-card>
      <q-card-section>
        <fieldset>
          <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
            <cc-input
              :color="$q.dark.isActive ? 'white' : 'grey'"
              :label="'Categoria'"
              :required="true"
              :readonly="true"
              class="col-12 col-lg-4 col-md-4"
              v-model="ticket.categoria"
            />
            <cc-input
              :readonly="true"
              :required="true"
              :color="$q.dark.isActive ? 'white' : 'grey'"
              :label="'Sub-Categoria'"
              class="col-12 col-lg-4 col-md-4"
              v-model="ticket.subCategoria"
            />

            <cc-input-container
              :required="true"
              class="col-12 col-lg-4 col-md-4"
              :label="'Prioridade'"
            >
              <q-select
                class="field-container-content"
                dense
                :color="$q.dark.isActive ? 'white' : 'grey-9'"
                outlined
                use-chips
                option-label="label"
                v-model="ticket.prioridade"
                :options="prioriadeOptions"
              ></q-select>
            </cc-input-container>

            <cc-input
              :required="true"
              :color="$q.dark.isActive ? 'white' : 'grey'"
              :label="'Título'"
              class="col-12 col-lg-12 col-md-12"
              v-model="ticket.title"
              @keyup.enter.native="pesquisar"
            />

            <r-editor
              class="col-12 col-lg-12 col-md-12"
              v-model="ticket.description"
              :color="'red'"
            />
          </div>
          <q-card-section>
            <q-separator />
            <q-card-actions>
              <q-btn
                :color="$q.dark.isActive ? 'white' : 'positive'"
                outline
                :loading="submitting"
                icon="fas fa-paper-plane"
                label="Enviar"
                no-caps
                @click="enviarChamado"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
                <q-tooltip
                  transition-show="rotate"
                  transition-hide="rotate"
                  content-class="bg-accent"
                  >Enviar Chamado</q-tooltip
                >
              </q-btn>
              <q-btn
                to="/new-ticket"
                no-caps
                outline
                :color="$q.dark.isActive ? 'grey-6' : 'negative'"
                icon="fas fa-ban"
                label="Cancelar"
              >
                <q-tooltip
                  transition-show="rotate"
                  transition-hide="rotate"
                  content-class="bg-accent"
                  >Cancelar e Voltar</q-tooltip
                >
              </q-btn>
              <q-btn
                @click="uploadAnexo = !uploadAnexo"
                no-caps
                outline
                :color="$q.dark.isActive ? 'grey-6' : 'info'"
                icon="fas fa-paperclip"
                label="Anexos"
              >
                <q-tooltip
                  transition-show="rotate"
                  transition-hide="rotate"
                  content-class="bg-accent"
                  >Anexar Arquivos ao Chamado</q-tooltip
                >
              </q-btn>
            </q-card-actions>
            <div class="row" v-if="uploadAnexo">
              <q-uploader
                ref="teste"
                auto-upload
                :color="$q.dark.isActive ? 'grey-6' : 'light-blue'"
                class="col-12 col-lg-12 col-md-12"
                label="Anexar Arquivos "
                field-name="files"
                :factory="factoryFn"
                @uploaded="upload"
                @failed="failed"
                multiple
                batch
              ></q-uploader>
            </div>
          </q-card-section>
        </fieldset>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import DialogAlert from "../../components/DialogAlert";
import authService from "../../services/auth.service";
import env from "../../enviroments/env";
export default {
  name: "FormularioNewticketPadrao",

  data() {
    return {
      ticket: {
        description: "",
        prioridade: {
          label: "Baixa",
          value: "B",
        },
      },
      prioriadeOptions: [
        {
          label: "Baixa",
          value: "B",
        },
        {
          label: "Média",
          value: "M",
        },
        {
          label: "Alta",
          value: "A",
        },
        {
          label: "Crítica",
          value: "C",
        },
      ],
      submitting: false,
      loading: false,
      uploadAnexo: false,
    };
  },

  methods: {
    async enviarChamado() {
      try {
        if (this.validarFormulario()) {
          this.prepareToSendTicket();
          const url = "/ticket/new";
          const data = await this.$axios.post(url, { params: this.ticket });

          this.submitting = false;
          this.loading = false;

          this.exibirMensagem(data.data, "success", "Chamado Criado com Sucesso!");

          this.$router.push("/new-ticket");
        }
      } catch (err) {
        const msg = !err.response
          ? "Sem comucação com servidor"
          : err.response.data.message;
        this.exibirMensagem(msg, "error", "Erro");

        this.submitting = false;
        this.loading = false;
      }
    },

    showMsg(campo, msg, type) {
      this.$q.notify({
        message: `${campo} ${msg}`,
        type,
        position: "top",
      });
    },

    validarFormulario() {
      if (!this.ticket.title) {
        this.showMsg("Titulo", " deve ser informado", "warning");
        return false;
      }
      if (!this.ticket.description) {
        this.showMsg("Descrição", " deve ser informada", "warning");
        return false;
      }

      return true;
    },

    exibirMensagem(msg, type, title) {
      this.$q.dialog({
        component: DialogAlert,
        message: msg,
        html: true,
        type,
        title,
      });
    },

    prepareToSendTicket() {
      this.submitting = true;
      this.loading = true;

      this.ticket.categoria = {
        label: this.$store.state.Ticket.items.codCategoria.label,
        value: this.$store.state.Ticket.items.codCategoria.value,
      };
      this.ticket.subCategoria = {
        label: this.$store.state.Ticket.items.label,
        value: this.$store.state.Ticket.items.codSubCategoria,
      };
    },

    factoryFn() {
      return new Promise((resolve, reject) => {
        const userData = authService.getUserFromLocalStorage();
        resolve({
          url: env.baseURL + "/upload-files",
          method: "POST",
          headers: [{ name: "Authorization", value: `Bearer ${userData.token}` }],
        });
      });
    },

    upload(info) {
      this.ticket.files = JSON.parse(info.xhr.response);
      const msg = `Arquivo/s adicionado com sucesso.`;
      this.showMsg(msg, "", "positive");
    },

    failed(reject) {
      this.showMsg(reject.xhr, "", "negative");
    },
  },

  created() {
    if (this.$store.state.Ticket.items.label) {
      this.ticket.categoria = this.$store.state.Ticket.items.codCategoria.label;
      this.ticket.subCategoria = this.$store.state.Ticket.items.label;
    } else {
      this.$router.push("/new-ticket");
    }
  },
};
</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}
</style>
