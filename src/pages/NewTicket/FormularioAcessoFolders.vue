<template>
  <q-page class="q-pa-sm q-gutter-sm">
    <q-toolbar
      :class="
        $q.dark.isActive
          ? 'shadow bg-dark text-white rounded-borders'
          : 'rounded-borders bg-deep-orange-6  text-white text-subtitle1'
      "
    >
      Abrir uma Nova Solicitação de Acesso a Pastas

      <q-space />
    </q-toolbar>

    <q-card>
      <q-card-section>
        <cc-input
          :color="$q.dark.isActive ? 'white' : 'grey'"
          :label="'Usuário'"
          :required="true"
          :placeholder="'Nome Completo'"
          v-model="form.redeFuncionario"
          :help="'Nome completo do funcionário que receberá o acesso das pastas'"
          class="col-12 col-lg-12 col-md-12"
        />

        <r-frm-rede v-model="form" />

        <q-card-actions>
          <q-btn
            :color="$q.dark.isActive ? 'white' : 'positive'"
            outline
            :disable="validarFormulario()"
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
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import DialogAlert from "../../components/DialogAlert";

const form = () => {
  return {
    redefoldersSelected: [],
    typeAcessofoldersRede: "apenasLeitura",
    categoria: { label: "", value: 0 },
    subCategoria: { label: "", value: 0 },
    title: "LIBERAR ACESSO A PASTAS DE REDE",
    prioridade: {
      label: "Baixa",
      value: "B",
    },
    description: "",
  };
};
export default {
  name: "FormularioNewUsers",
  data() {
    return {
      form: form(),
      submitting: false,
    };
  },

  methods: {
    async enviarChamado() {
      try {
        if (!this.validarFormulario()) {
          this.prepareToSendTicket();
          const url = "/ticket/new";
          const data = await this.$axios.post(url, { params: this.form });

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

    prepareToSendTicket() {
      this.submitting = true;
      this.loading = true;

      const pastas = this.form.redefoldersSelected.map(
        (item, indice) =>
          `${indice + 1}: ${item.path} - ${
            item.acesso === "apenasLeitura" ? "Apenas Leitura" : "Leitura e Gravação"
          }<br/>`
      );

      this.form.categoria = {
        label: this.$store.state.Ticket.items.codCategoria.label,
        value: this.$store.state.Ticket.items.codCategoria.value,
      };
      this.form.subCategoria = {
        label: this.$store.state.Ticket.items.label,
        value: this.$store.state.Ticket.items.codSubCategoria,
      };

      this.form.description = `
      <b>Por favor, Liberar acesso as pastas de Rede com os dados a baixo:</b><br/>
      <b>Pastas a Serem liberadas:</b><br/> ${pastas}
      <b>Observação:</b> ${
        !this.form.redeObservacao ? "Não possui" : this.form.redeObservacao
      }
      
      `;
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

    validarFormulario() {
      if (this.form.redefoldersSelected.length && this.form.redeFuncionario) {
        return false;
      } else {
        return true;
      }
    },
  },

  created() {
    if (this.$store.state.Ticket.items.label) {
      this.form.categoria = this.$store.state.Ticket.items.codCategoria.label;
      this.form.subCategoria = this.$store.state.Ticket.items.label;
    } else {
      this.$router.push("/new-ticket");
    }
  },
};
</script>

<style></style>
