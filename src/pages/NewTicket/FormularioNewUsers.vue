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
        <q-stepper v-model="step" header-nav ref="stepper" animated>
          <q-step
            :name="1"
            title="Escolha 1 ou Vários"
            :color="$q.dark.isActive ? 'grey' : 'blue-10'"
            icon="settings"
            :done="done1"
          >
            <div class="q-pa-sm">
              <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-toggle
                      color="blue-10"
                      icon="fas fa-comment-dots"
                      v-model="selection"
                      val="Spark"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Spark</q-item-label>
                    <q-item-label caption
                      >Lembrando: Você precisa informar Apelido e Ramal.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-toggle
                      color="blue-10"
                      v-model="selection"
                      icon="fas fa-network-wired"
                      val="Rede"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Rede</q-item-label>
                    <q-item-label caption
                      >Lembrando: Se Desejar você já pode informar as Pastas de Rede que
                      deverá ter acesso.
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar top>
                    <q-toggle
                      color="blue-10"
                      icon="fab fa-weebly"
                      v-model="selection"
                      val="Winthor"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Winthor</q-item-label>
                    <q-item-label caption
                      >Lembrando: Voê poderá escolher qual ou quais Rotinas terá acesso,
                      ou de qual usuário copiar os acessos.</q-item-label
                    >
                  </q-item-section>
                </q-item>
              </q-list>

              <q-separator />

              <div v-if="selection.length" class="q-px-sm q-mt-sm">
                Você está selecionando:

                <q-chip
                  v-for="item in selection"
                  :key="item"
                  outline
                  clickable
                  square
                  color="deep-orange-6"
                  text-color="white"
                  :icon="returnIcon(item)"
                >
                  {{ item }}
                </q-chip>
              </div>
            </div>

            <q-stepper-navigation>
              <div class="q-gutter-sm">
                <q-btn
                  :disable="!selection.length"
                  icon="fas fa-step-forward"
                  @click="
                    () => {
                      done1 = true;
                      step = 2;
                    }
                  "
                  color="blue-10"
                  label="Continue"
                />

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
              </div>
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="2"
            :color="$q.dark.isActive ? 'white' : 'blue-10'"
            title="Preencha os Campos para Continuar"
            caption="Campos com (*) são obrigatórios"
            icon="create_new_folder"
            :done="done2"
          >
            <q-card>
              <q-card-section>
                <fieldset>
                  <legend class="">
                    <q-toolbar>
                      <q-toolbar-title>Novo Usuário</q-toolbar-title>
                    </q-toolbar>
                  </legend>
                  <q-card-section>
                    <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
                      <cc-input
                        :color="$q.dark.isActive ? 'white' : 'grey'"
                        :label="'Nome'"
                        v-model="form.name"
                        :required="true"
                        class="col-12 col-lg-6 col-md-6"
                      />
                      <cc-input
                        :color="$q.dark.isActive ? 'white' : 'grey'"
                        :label="'Setor'"
                        v-model="form.setor"
                        :required="true"
                        class="col-12 col-lg-6 col-md-6"
                      />
                    </div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section v-if="selection.includes('Spark')">
                    <r-frm-spark v-model="form" />
                  </q-card-section>
                  <q-separator />
                  <q-card-section v-if="selection.includes('Rede')">
                    <r-frm-rede v-model="form" />
                  </q-card-section>
                  <q-separator />
                  <q-card-section v-if="selection.includes('Winthor')">
                    <r-frm-winthor v-model="form" />
                  </q-card-section>
                </fieldset>
              </q-card-section>
            </q-card>

            <q-stepper-navigation>
              <q-btn
                icon="fas fa-step-forward"
                color="blue-10"
                :disable="validButtomNext()"
                @click="
                  () => {
                    done2 = true;
                    step = 3;
                  }
                "
                label="Continue"
              />
              <q-btn
                flat
                @click="step = 1"
                color="primary"
                label="Voltar"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>

          <q-step
            :name="3"
            :color="$q.dark.isActive ? 'white' : 'blue-10'"
            title="Confirmação dos Dados"
            caption="Confirme os dados preenchidos e envie sua solicitação"
            icon="add_comment"
            :done="done3"
          >
            <r-view-detail-new-user :selection="selection" :data="form" />

            <q-stepper-navigation>
              <!-- <q-btn color="primary" @click="done3 = true" label="Finish" /> -->

              <q-btn
                :color="$q.dark.isActive ? 'white' : 'positive'"
                outline
                :loading="submitting"
                icon="fas fa-paper-plane"
                label="Enviar"
                @click="sendTicket"
                no-caps
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
                flat
                @click="step = 2"
                color="primary"
                label="Voltar"
                class="q-ml-sm"
              />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import formularioConstService from "../../services/consts/formularioNewUser";
import helpdeskService from "../../services/helpdesk-service";
import DialogAlert from "../../components/DialogAlert";

const form = () => {
  return {
    winthorRotinasLiberar: [],
    winthorUserReferencia: [],
    sparkApelido: null,
    sparkRamal: null,
    redefoldersSelected: [],
    typeAcessofoldersRede: "apenasLeitura",
  };
};
export default {
  name: "FormularioNewUsers",
  data() {
    return {
      form: form(),
      step: 1,
      done1: false,
      done2: false,
      done3: false,
      submitting: false,
      selection: [],
    };
  },

  methods: {
    returnIcon(item) {
      return formularioConstService.returnIcon(item);
    },

    validButtomNext() {
      return formularioConstService.returnValidButton(this.form, this.selection);
    },

    async sendTicket() {
      try {
        const { rede, spark, winthor } = await helpdeskService.sendNewticketUser(
          this.selection,
          this.form
        );
        const msg = [];

        if (rede && rede.data) {
          msg.push(`Rede: ${rede.data}`);
        }
        if (spark && spark.data) {
          msg.push(`Spark: ${spark.data}`);
        }

        if (winthor && winthor.data) {
          msg.push(`Winthor: ${winthor.data}`);
        }

        const msgRetorno = msg.join(" | ");

        this.exibirMensagem(msgRetorno, "success", "Chamado Criado com Sucesso!");
        this.$router.push("/new-ticket");
      } catch (err) {
        const msg = !err.response
          ? "Sem comucação com servidor"
          : err.response.data.message;
        this.exibirMensagem(msg, "error", "Erro");

        this.submitting = false;
        this.loading = false;
      }
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
  },

  watch: {
    selection() {
      this.form = form();
    },
  },
};
</script>

<style></style>
