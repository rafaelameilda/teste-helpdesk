<template>
  <q-splitter v-if="data" v-model="splitterModel">
    <template v-slot:before>
      <q-toolbar :class="!$q.dark.isActive ? 'bg-grey-3 q-pa-sm' : 'q-pa-sm bg-dark'">
        <q-toolbar-title :class="$q.dark.isActive ? 'text-white' : 'label-color'">
          Chamado Nº <strong>{{ data.id }}</strong>
        </q-toolbar-title>
        <div :class="$q.dark.isActive ? 'text-h5 text-white' : 'label-color text-h5'">
          {{ data.titulo }}
        </div>
      </q-toolbar>

      <template>
        <div class="row q-pa-sm label-color">
          <div class="col-3 label-color">Usuário</div>
          <div class="col-2 label-color">Data</div>
          <div class="col-2 label-color">Categoria</div>
          <div class="col-2 label-color">Sub-Categoria</div>
          <div class="col-2 label-color">Status</div>
          <div class="col-1 label-color">Prioridade</div>
        </div>
        <div class="q-pa-sm row value-color">
          <div class="col-3 value-color">{{ data.usuario }}</div>
          <div class="col-2 value-color">{{ data.data }}</div>
          <div class="col-2 value-color">{{ data.categoria }}</div>
          <div class="col-2 value-color">{{ data.subcategoria }}</div>
          <div class="col-2 text-bold">
            <q-chip clickable square size="sm" outline :color="statusColor()">{{
              data.status
            }}</q-chip>
          </div>
          <div class="col-1 text-bold">
            <q-chip square size="sm" clickable outline :color="prioridadeColor()">{{
              data.prioridade
            }}</q-chip>
          </div>
        </div>
        <q-separator class="q-mt-sm q-mb-sm" />
        <div class="row q-pa-sm label-color">
          <div class="col-3 label-color">Técnico</div>
          <div class="col-2 label-color">Data Atribuição</div>
          <div class="col-2 label-color">Data Aguardando</div>
          <div class="col-2 label-color">Data Fechamento</div>
          <div v-if="user.type === 'T'" class="col-3 label-color">Avalição</div>
        </div>
        <div class="q-pa-sm row value-color">
          <div class="col-3 value-color">{{ data.tecnico }}</div>
          <div class="col-2 value-color">{{ data.dataatribuicao }}</div>
          <div class="col-2 value-color">{{ data.dataaguardando }}</div>
          <div class="col-2 value-color">{{ data.datafechamento }}</div>
          <div v-if="user.type === 'T'" class="col-3 value-color">
            {{ data.avaliacao }}
            <q-icon
              v-for="(s, i) in data.avaliacao"
              :key="i"
              color="warning"
              name="fas fa-star"
            />
          </div>
        </div>
        <q-separator class="q-mt-sm q-mb-sm" />

        <q-banner rounded class="q-pa-sm">
          <div v-html="data.chamado" class="q-pa-sm text-justify text-subtitle2"></div>
        </q-banner>

        <q-separator
          v-if="status !== 'FECHADO' && user.type === 'T'"
          class="q-mt-sm q-mb-sm"
        />

        <div style="height: 25px" class=""></div>

        <div v-if="status !== 'FECHADO' && user.type === 'T'" class="q-pa-md">
          <div class="q-gutter-y-md">
            <q-btn-toggle
              style="border: 1px solid #027be3"
              v-model="status"
              spread
              rounded
              unelevated
              :toggle-color="statusColor()"
              text-color="black"
              :options="optinsButtonTogle"
            />
          </div>
        </div>

        <q-separator
          v-if="data.files && data.files[0] && data.files[0].name"
          class="q-mt-sm q-mb-sm"
        />

        <div
          class="label-color q-pa-md"
          v-if="data.files && data.files[0] && data.files[0].name"
        >
          Anexos:
          <q-chip
            outline
            clickable
            @click="downloadFile(file)"
            color="primary"
            v-for="(file, index) in data.files"
            :key="index"
            :icon="inconType(file.name)"
            :label="file.name"
          />
        </div>

        <q-separator class="q-mt-sm q-mb-sm" />

        <div
          v-if="status === 'AGUARDANDO FECHAMENTO' && data.usuario === user.name"
          class="text-center q-pa-sm text-subtitle2 label-color col"
        >
          <div>
            Seu Ticket foi marcado para ser <strong>"Fechado"</strong>, se você concorda
            com isso por favor avalie seu atendimento para fechar.
          </div>

          <q-rating
            class="q-pa-sm"
            v-model="ratingModel"
            size="3.5em"
            :max="10"
            color="grey"
            :color-selected="ratingColors"
          />
        </div>

        <div
          v-if="ratingModel > 0 && status === 'AGUARDANDO FECHAMENTO'"
          class="text-center"
        >
          <div class="label-color q-pa-sm">
            Sua avaliação foi de "{{ ratingModel }}" Estrelas
          </div>

          <q-btn
            @click="alterStatusFechado"
            class="label-color"
            color="color1"
            no-caps
            rounded
            >Confirmar</q-btn
          >
        </div>

        <div style="height: 80px" class=""></div>
        <div class="q-pa-md q-gutter-sm">
          <q-btn
            size="md"
            to="/history/ticket/general"
            align="between"
            no-caps
            class="bg-color1 text-white"
            icon="fas fa-chevron-left"
            label="Voltar"
          >
            <q-tooltip
              transition-show="rotate"
              transition-hide="rotate"
              content-class="bg-accent"
              >Voltar para a Lista de Chamados</q-tooltip
            >
          </q-btn>
          <q-btn
            size="md"
            icon="fas fa-print"
            no-caps
            @click="print"
            class="bg-color1 text-white"
            label="Imprimir"
          >
            <q-tooltip
              transition-show="rotate"
              transition-hide="rotate"
              content-class="bg-accent"
              >Imprimir este Chamado</q-tooltip
            >
          </q-btn>
          <q-btn
            :disable="false"
            size="md"
            icon="fas fa-history"
            no-caps
            :to="goTimeLine()"
            class="bg-color1 text-white"
            label="Time Line"
          >
            <q-tooltip
              transition-show="rotate"
              transition-hide="rotate"
              content-class="bg-accent"
              >Ir Para Time Line</q-tooltip
            >
          </q-btn>
        </div>

        <template v-if="!data"
          ><div>
            <q-banner class="shadow-2">
              <div class="text-bold label-color">
                <q-icon name="fas fa-info"></q-icon>&nbsp; Registro não encontrado
              </div>
            </q-banner>
          </div>
        </template>
      </template>
    </template>

    <template v-slot:after>
      <div class="position-relative bg-grey-3" :style="style">
        <q-layout :class="!$q.dark.isActive ? 'bg-grey-3' : 'bg-dark'" container>
          <q-header elevated>
            <q-toolbar
              :class="
                !$q.dark.isActive
                  ? 'bg-grey-3 text-black label-color'
                  : 'bg-dark text-white'
              "
            >
              <q-btn round flat>
                <q-icon name="fas fa-clipboard-list" />
              </q-btn>

              <span class="q-pl-md"> Trâmites </span>
            </q-toolbar>
            <q-separator :class="!$q.dark.isActive ? 'bg-grey-4' : 'bg-grey-4'" />
            <div
              v-if="tramites.length !== 0"
              :style="style"
              :class="!$q.dark.isActive ? 'bg-grey-3 text-black' : 'bg-dark text-white'"
            >
              <q-scroll-area
                ref="scrollArea"
                v-if="tramites"
                :thumb-style="thumbStyle"
                :bar-style="barStyle"
                :style="styleRolaPage"
              >
                <q-chat-message
                  v-for="vc in tramites"
                  :key="vc.id"
                  :name="vc.funcionario"
                  avatar="https://cdn.quasar.dev/img/boy-avatar.png"
                  :text="[vc.tramite]"
                  :stamp="vc.data"
                  :sent="user.id === vc.funcionarioId ? true : false"
                  :bg-color="colorBalaoChat(vc.funcionarioId)"
                />
              </q-scroll-area>
            </div>

            <div v-else>
              <q-banner class="shadow-2">
                <div class="text-bold label-color text-center">
                  <q-icon name="fas fa-info"></q-icon>&nbsp; Sem trâmites ainda...
                </div>
              </q-banner>
            </div>
          </q-header>

          <q-footer>
            <q-toolbar
              :class="
                !$q.dark.isActive ? 'bg-grey-3 text-black row' : 'row bg-dark text-white'
              "
            >
              <q-input
                rounded
                :disable="status === 'FECHADO'"
                @keyup.enter="sendMessage"
                outlined
                dense
                :color="!$q.dark.isActive ? 'black' : 'white'"
                :class="
                  !$q.dark.isActive
                    ? 'col-grow q-mr-sm'
                    : 'bg-dark text-black col-grow q-mr-sm'
                "
                v-model="message"
                placeholder="Digite sua mensagem aqui"
              />
            </q-toolbar>
          </q-footer>
        </q-layout>
      </div>
    </template>
  </q-splitter>
</template>

<script>
import authService from "../../services/auth.service";
import DialogComponent from "../../components/DialogMessage";
export default {
  name: "DetailTicket",
  computed: {
    style() {
      return {
        height: this.$q.screen.height - 110 + "px",
      };
    },
    styleRolaPage() {
      return {
        height: this.$q.screen.height - 220 + "px",
      };
    },
    styleActions() {
      return {
        height: this.$q.screen.height - 900 + "px",
      };
    },
    user() {
      return authService.getUserFromLocalStorage();
    },
    optinsButtonTogle() {
      const options = [
        { label: "Aberto", value: "ABERTO" },
        { label: "Andamento", value: "ANDAMENTO" },
        {
          label: "Aguardando Fechamento",
          value: "AGUARDANDO FECHAMENTO",
        },
      ];

      // if (this.user.type === "T") {
      //   options.push({ label: "Fechado", value: "FECHADO" });
      // }

      return options;
    },
  },
  data() {
    return {
      data: [],
      splitterModel: 70, // start at 50%
      leftDrawerOpen: false,
      status: null,
      position: 0,
      ratingModel: 0,
      ratingColors: [
        "light-green-2",
        "light-green-3",
        "light-green-4",
        "light-green-5",
        "light-green-6",
        "light-green-7",
        "light-green-8",
        "light-green-9",
        "light-green-10",
        "green-10",
      ],
      search: "",
      message: "",
      thumbStyle: {
        right: "4px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },
      barStyle: {
        right: "2px",
        borderRadius: "9px",
        backgroundColor: "#027be3",
        width: "9px",
        opacity: 0.2,
      },
      tramites: [],
    };
  },

  methods: {
    async pesquisar() {
      const id = this.$route.params.id;
      try {
        if (id) {
          const res = await this.$axios.get(`/view/ticket/detail/${id}`);
          this.data = res.data.result[0];
          this.status = res.data.result[0].status;
          this.tramites = res.data.tramite;
        }
      } catch (error) {
        const msg = !error.response
          ? "Sem comucação com servidor"
          : error.response.data.message;
        this.exibirMensagem(msg);
      }
    },

    statusColor() {
      let cor = "primary";
      let status = this.data.status;
      if (status === "FECHADO") {
        cor = "blue-6";
      } else if (status === "ABERTO") {
        cor = "positive";
      } else if (status === "ANDAMENTO") {
        cor = "warning";
      } else if (status === "AGUARDANDO FECHAMENTO") {
        cor = "grey";
      }
      return cor;
    },

    exibirMensagem(msg) {
      this.$q.dialog({
        component: DialogComponent,
        message: msg,
        html: true,
        title: "Erro",
      });
    },

    prioridadeColor() {
      let cor = "primary";
      let prioridade = this.data.prioridade;
      if (prioridade === "ALTA") {
        cor = "info";
      } else if (prioridade === "MÉDIA") {
        cor = "secondary";
      } else if (prioridade === "CRÍTICO") {
        cor = "negative";
      } else if (prioridade === "BAIXA") {
        cor = "grey";
      }
      return cor;
    },

    sendMessage() {
      if (this.message.length) {
        const tramite = {};
        const id = this.$route.params.id;
        tramite.tramite = this.message;
        tramite.codigochamado = id;

        const url = "/ticket/tramite";
        this.$axios.post(url, tramite).then((res) => {
          this.pesquisar();
          this.message = "";
          this.rolar();
        });
      }
    },

    rolar() {
      if (!this.$q.screen.lt.sm && this.$refs.scrollArea) {
        this.$refs.scrollArea.setScrollPosition(this.position);
        this.position = Math.floor(Math.random() * 5000000) * 2000;
      }
    },

    colorBalaoChat(func) {
      let cor = "primary";
      if (func === this.user.id && this.$q.dark.isActive !== true) {
        cor = "cyan";
      } else if (func !== this.user.id && this.$q.dark.isActive !== true) {
        cor = "green-5";
      } else if (func === this.user.id && this.$q.dark.isActive === true) {
        cor = "grey";
      } else if (func !== this.user.id && this.$q.dark.isActive === true) {
        cor = "blue-grey";
      }

      return cor;
    },

    async alterStatus() {
      const ticketId = this.data.id;
      const newStatus = {};
      const url = `/alter-ticket/status/${ticketId}`;
      if (this.status !== this.data.status) {
        newStatus.status = this.status;

        const res = await this.$axios.put(url, { newStatus });

        this.$q.notify({
          message: `Status Alterado com sucesso!!`,
          type: "positive",
          position: "center",
          progress: true,
          timeout: 2000,
        });
        this.pesquisar();

        const user = authService.getUserFromLocalStorage();

        // this.$socket.sendObj({
        //   broadcast: true,
        //   data: {
        //     notification: true,
        //     message: `Alteração de Status no Chamado Nº ${this.data.id} por ${user.name}`,
        //     link: `http://localhost:8080/#/history/ticket/view/detail/ticket/${ticketId}`,
        //     type: "Alteração de Status",
        //     from: authService.getUserFromLocalStorage(),
        //   },
        // });
      }
    },

    async alterStatusFechado() {
      const ticketId = this.data.id;
      const newStatus = {};
      const url = `/alter-ticket/status/${ticketId}`;
      if (this.status === "AGUARDANDO FECHAMENTO") {
        newStatus.status = "FECHADO";
        newStatus.avaliacao = this.ratingModel;

        const res = await this.$axios.put(url, { newStatus });

        this.$q.notify({
          message: `Status Fechado com sucesso!!`,
          type: "positive",
          position: "center",
          progress: true,
          timeout: 2000,
        });
        this.pesquisar();
      }
    },

    inconType(file) {
      console.log(file);
      let icon = "";

      if (file.match(".pdf")) {
        icon = "far fa-file-pdf";
        return icon;
      } else if (file.match(".flv") || file.match(".mp4") || file.match(".mkv")) {
        icon = "far fa-file-video";
      } else if (file.match(".xls") || file.match(".csv") || file.match(".xlsx")) {
        icon = "far fa-file-excel";
        return icon;
      } else if (file.match(".jpg") || file.match(".png") || file.match(".jpe")) {
        icon = "far fa-file-image";
        return icon;
      } else if (file.match(".doc")) {
        icon = "fas fa-file-word";
        return icon;
      } else if (file.match(".rar") || file.match(".zip")) {
        icon = "far fa-file-archive";
        return icon;
      } else {
        icon = "far fa-file-alt";
        return icon;
      }
    },

    downloadFile(file) {
      this.$q.loading.show({
        message: `
          <span class="text-black text-bold">Por Favor <b>Aguarde</b> estou indo buscar o arquivo.<br/></span>
          <span class="text-yellow text-bold">Só vai levar um minutinho...</span>
          `,
        backgroundColor: "cyan",
      });
      const url = "/upload-files";
      this.$axios
        .get(url, { params: { file: file }, responseType: "arraybuffer" })
        .then((res) => {
          let blob = new Blob([res.data], { type: file.type });
          let url = window.URL.createObjectURL(blob);
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", file.name);
          document.body.appendChild(link);
          link.click();
          this.$q.loading.hide();
        })
        .catch((err) => {
          this.$q.loading.hide();
          const msg =
            err.response.status === 404
              ? (err.retorno = "Arquivo não encontrado ou inexistente.")
              : "Sem comucação com servidor";

          this.exibirMensagem(msg);
        });
    },

    print() {
      this.$q.loading.show({
        message: `
          <span class="text-black text-bold">Por Favor <b>Aguarde</b> montando impressão.<br/></span>
          <span class="text-yellow text-bold">Só vai levar um minutinho...</span>
          `,
        backgroundColor: "cyan",
      });
      const id = this.$route.params.id;
      const url = `/reports/ticket/${id}`;
      this.$axios
        .get(url, { responseType: "arraybuffer" })
        .then((res) => {
          let blob = new Blob([res.data], { type: "application/pdf" });
          let url = window.URL.createObjectURL(blob);
          window.open(url);
          // let link = document.createElement("a");
          // link.href = url;
          // link.setAttribute("download", `Ticket Nº ${id}`);
          // document.body.appendChild(link);
          // link.click();
          // window.URL.revokeObjectURL(blob);

          this.$q.loading.hide();
        })
        .catch((err) => {
          this.$q.loading.hide();
          this.$messages.notify(err);
        });
    },

    goTimeLine() {
      const id = this.$route.params.id;
      const url = `timeline/${id}`;

      return url;
    },
  },

  mounted() {
    this.pesquisar();
    this.rolar();
  },

  watch: {
    status() {
      if (this.status !== "FECHADO") {
        this.alterStatus();
      }
    },
  },
};
</script>

<style scoped>
div {
  font-family: "Open Sans", sans-serif;
}
.label-color {
  color: #4a5c60;
  font-weight: bold;
}
.t {
  width: 33.33%;
}
.value-color {
  font-family: Open Sans, sans-serif;
  line-height: 24px;
  color: #1d2426;
  min-height: 24px;
}
</style>
