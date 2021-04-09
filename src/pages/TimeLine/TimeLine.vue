<template>
  <q-page class="q-pa-sm q-gutter-sm shadow">
    <div class="q-px-lg q-pb-md">
      <div class="q-pa-sm q-gutter-sm">
        <q-btn @click="showModal" label="Atividades" />
      </div>
      <q-timeline color="secondary">
        <q-timeline-entry heading body="Time-Line do Chamado" />

        <q-timeline-entry
          class="cursor-pointer"
          :color="time.prioridade === 'alta' ? 'negative' : ''"
          v-for="time in timeline"
          @click="clickTimeLine(time)"
          :key="time.id"
          :title="time.title"
          :subtitle="time.dtlanc"
          :icon="time.icone"
          :body="time.body"
        >
          <q-tooltip>Lançado por: {{ time.nomelanc }} </q-tooltip>
        </q-timeline-entry>
      </q-timeline>
    </div>

    <q-dialog
      v-model="modalFilters"
      transition-show="scale"
      transition-hide="scale"
      persistent
    >
      <q-card style="width: 950px; max-width: 85vw">
        <q-card-section
          :class="$q.dark.isActive ? 'shadow bg-dark text-white' : 'bg-color1 text-white'"
        >
          <div class="text-h6">Lançar TimeLine das Atividades</div>
        </q-card-section>

        <q-card-section>
          <fieldset>
            <legend class="">
              <q-toolbar>
                <q-toolbar-title>Informe o andamento dos Títulos</q-toolbar-title>
              </q-toolbar>
            </legend>
            <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
              <q-select
                class="col-12 col-lg-12 col-md-12"
                outlined
                v-model="model"
                :options="options"
                label="Titulos"
              />

              <q-input
                class="col-12 col-lg-12 col-md-12"
                v-model="text"
                outlined
                autogrow
              />
            </div>
          </fieldset>
        </q-card-section>

        <q-separator />
        <q-card-actions
          align="right"
          :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-color1 text-white'"
        >
          <q-btn flat label="Cancelar" @click="modalFilters = false" no-caps />
          <q-btn flat label="Lançar" @click="lancar" no-caps />
          <q-btn flat label="Novo Título" @click="prompt" no-caps />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import helpDeskService from "../../services/helpdesk-service";
import DialogComponent from "../../components/DialogMessage";
export default {
  name: "TimeLine",
  computed: {},
  data() {
    return {
      id: null,
      modalFilters: false,
      text: "",
      newTitle: "",
      timeline: [],
      options: [],
      model: null,
      loading: false,
    };
  },
  methods: {
    carregaOptions() {
      this.options = this.timeline.map((ver) => ver.title);
    },

    showModal() {
      this.modalFilters = true;
      this.carregaOptions();
    },

    prompt() {
      this.$q
        .dialog({
          title: "Novo Título",
          message: "Qual a nova atividade ?",
          prompt: {
            model: "",
            type: "text", // optional
          },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          this.options.push(data);
          this.newTitle = data;
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },

    async lancar() {
      const tilmeline = {
        title: this.model,
        dtlanc: String(new Date()),
        body: this.text,
        icone: "fas fa-arrow-down",
        id: this.id,
      };

      const findIndex = this.timeline.findIndex((time) => time.title === this.model);

      if (findIndex >= 0) {
        let attualizacao = {
          icone: "fas fa-arrow-down",
          id: this.id,
          body: this.timeline[findIndex].body + " || " + tilmeline.body,
          timelineId: this.timeline[findIndex].id,
        };
        await helpDeskService.updateTimeLine(attualizacao);
      } else {
        await helpDeskService.insertNewTimeLine(tilmeline);
      }

      this.model = "";
      this.text = "";

      this.modalFilters = false;
      this.loadTimeLine();
    },

    async loadTimeLine() {
      try {
        this.loading = true;
        const res = await helpDeskService.loadTimeLines({ id: this.id });

        this.timeline = res.data;

        this.loading = false;
      } catch (err) {
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

    clickTimeLine(param) {
      console.log(param);
    },
  },

  async mounted() {
    this.id = this.$route.params.id;
    this.loadTimeLine();
  },

  watch: {
    // model() {
    //   console.log("alterou");
    // },
  },
};
</script>

<style lang="sass"></style>
