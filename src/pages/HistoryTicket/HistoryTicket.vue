<template>
  <q-page class="q-pa-sm q-gutter-sm shadow">
    <q-toolbar
      :class="
        $q.dark.isActive
          ? 'bg-dark text-white rounded-borders'
          : 'rounded-borders bg-brown  text-white'
      "
    >
      <r-btn-menu :menus="historyMenus" @r-enter="(evt) => getPage(evt)" />
      <q-space />

      <r-btn-status
        v-model="statusBtnModel"
        @input="(evt) => btnStatus(evt)"
        :btnOptions="btnOptions"
      />
    </q-toolbar>

    <q-table
      :style="$q.screen.lt.md ? 'height: 58vh' : 'height: 79vh'"
      :columns="columns"
      :data="data"
      :loading="loading"
      :color="$q.dark.isActive ? 'white' : 'brown'"
      row-key="id"
      :pagination.sync="pagination"
      @request="onRequest"
      :grid="grid"
      :dense="dense"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:top-right>
        <div class="q-gutter-sm row">
          <q-btn
            :color="$q.dark.isActive ? 'white' : 'brown'"
            flat
            round
            @click="modalFilters = !modalFilters"
            icon="fas fa-filter"
          >
            <q-tooltip content-class="bg-accent">Filtros de Chamado</q-tooltip>
          </q-btn>
          <q-btn
            :color="$q.dark.isActive ? 'white' : 'brown'"
            flat
            round
            icon="fas fa-th"
            to="/configuracoes/grid/ticket"
          >
            <q-tooltip content-class="bg-accent"
              >Configurar Ordenação de Colunas na Grid.</q-tooltip
            >
          </q-btn>
          <q-btn
            :color="$q.dark.isActive ? 'white' : 'brown'"
            icon="fas fa-file-excel"
            flat
            round
            @click="exportToExcel"
          >
            <q-tooltip content-class="bg-accent">Exportar para Excel</q-tooltip>
          </q-btn>
          <q-checkbox
            :class="$q.dark.isActive ? 'text-white' : 'text-brown'"
            dense
            v-model="dense"
            label="Denso"
            :color="$q.dark.isActive ? 'black' : 'brown'"
          >
            <q-tooltip content-class="bg-accent"
              >Alternar entre modo denso de tabela.</q-tooltip
            >
          </q-checkbox>
          <q-checkbox
            :class="$q.dark.isActive ? 'text-white' : 'text-brown'"
            dense
            v-model="grid"
            label="Card"
            :color="$q.dark.isActive ? 'black' : 'brown'"
          >
            <q-tooltip content-class="bg-accent"
              >Alternar entre modo card de tabela.</q-tooltip
            >
          </q-checkbox>
        </div>
      </template>

      <template v-slot:header-cell="props">
        <q-th class="text-black text-bold text-h6" :props="props">
          <strong>{{ props.col.label }}</strong>
        </q-th>
      </template>

      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge
            class="cursor-pointer"
            @click="viewTicket(props.row)"
            :color="!$q.dark.isActive ? returnColorStatus(props) : 'dark text-white'"
            :label="props.value"
          />
        </q-td>
      </template>
      <template v-slot:body-cell-id="props">
        <q-td :props="props">
          <q-btn
            rounded
            flat
            icon="fas fa-eye"
            :color="!$q.dark.isActive ? returnColorStatus(props) : 'dark text-white'"
            size="sm"
            @click="viewTicket(props.row)"
          >
            <q-tooltip content-class="bg-accent">
              Visualizar detalhes do chamado {{ props.row.id }}
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:body-cell-prioridade="props">
        <q-td :props="props">
          <q-badge
            class="cursor-pointer"
            @click="viewTicket(props.row)"
            :color="!$q.dark.isActive ? returnColorPrioridade(props) : 'dark text-white'"
            :label="props.value"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog
      transition-show="scale"
      transition-hide="scale"
      persistent
      v-model="modalFilters"
    >
      <q-card style="width: 950px; max-width: 85vw">
        <q-card-section
          :class="$q.dark.isActive ? 'shadow bg-dark text-white' : 'bg-color1 text-white'"
        >
          <div class="text-h6">
            Os Resultados da pesquisa variam de acordo com os filtros
          </div>
        </q-card-section>

        <q-card-section>
          <fieldset>
            <legend class="">
              <q-toolbar>
                <q-toolbar-title v-if="!$q.screen.lt.md"
                  >Preencha os Filtros Desejados</q-toolbar-title
                >
                <q-toolbar-title v-if="$q.screen.lt.md"
                  >Preencha os filtros...</q-toolbar-title
                >
              </q-toolbar>
            </legend>
            <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
              <cc-input-container
                class="col-12 col-lg-3 col-md-3 col-sm-3"
                :label="'Da Data de Abertura'"
              >
                <cc-date-picker
                  :color="$q.dark.isActive ? 'white' : 'grey'"
                  v-model="filters.dataAbertura1"
                  @keyup.enter.native="pesquisar"
                />
              </cc-input-container>

              <cc-input-container
                class="col-12 col-lg-3 col-sm-3 col-md-3"
                :label="'Até a Data de Abertura'"
              >
                <cc-date-picker
                  :color="$q.dark.isActive ? 'white' : 'grey'"
                  v-model="filters.dataAbertura2"
                  @keyup.enter.native="pesquisar"
                />
              </cc-input-container>

              <cc-input-container
                class="col-12 col-lg-3 col-sm-3 col-md-3"
                :label="'Da Data de Fechamento'"
              >
                <cc-date-picker
                  :color="$q.dark.isActive ? 'white' : 'grey'"
                  v-model="filters.dataFechamento1"
                  @keyup.enter.native="pesquisar"
                />
              </cc-input-container>

              <cc-input-container
                class="col-12 col-lg-3 col-sm-3 col-md-3"
                :label="'Até a Data de Fechamento'"
              >
                <cc-date-picker
                  :color="$q.dark.isActive ? 'white' : 'grey'"
                  v-model="filters.dataFechamento2"
                  @keyup.enter.native="pesquisar"
                />
              </cc-input-container>

              <cc-input
                :color="$q.dark.isActive ? 'white' : 'grey'"
                :label="'Código do Chamado'"
                class="col-12 col-lg-4 col-md-4"
                v-model="filters.codigoChamado"
                @keyup.enter.native="pesquisar"
              />

              <!-- <cc-input-container
                class="col-12 col-lg-4 col-md-4"
                :label="'Categoria'"
              >
                <q-select
                  class="field-container-content"
                  dense
                  outlined
                  use-chips
                  use-input
                  option-label="Descricao"
                  input-debounce="1000"
                  @filter="getFiltersCategoria"
                  v-model="filters.categoria"
                  :options="categoriaOptions"
                ></q-select>
              </cc-input-container>

              <cc-input-container
                class="col-12 col-lg-4 col-md-4"
                :label="'Sub-Categoria'"
              >
                <q-select
                  class="field-container-content"
                  dense
                  :disable="!filters.categoria"
                  outlined
                  use-chips
                  use-input
                  option-label="Descricao"
                  input-debounce="1000"
                  @filter="getFiltersSubCategoria"
                  v-model="filters.subCategoria"
                  :options="subCategoriaOptions"
                ></q-select>
              </cc-input-container> -->

              <cc-input-container class="col-12 col-lg-4 col-md-4" :label="'Usuário'">
                <q-select
                  class="field-container-content"
                  dense
                  :color="$q.dark.isActive ? 'white' : 'grey'"
                  outlined
                  use-chips
                  use-input
                  option-label="Nome"
                  input-debounce="1000"
                  @filter="getFiltersUsuario"
                  v-model="filters.usuario"
                  :options="usuarioOptions"
                ></q-select>
              </cc-input-container>

              <cc-input-container class="col-12 col-lg-4 col-md-4" :label="'Técnico'">
                <q-select
                  class="field-container-content"
                  dense
                  :color="$q.dark.isActive ? 'white' : 'grey'"
                  outlined
                  use-chips
                  use-input
                  option-label="Nome"
                  input-debounce="1000"
                  @filter="getFiltersTecnico"
                  v-model="filters.tecnico"
                  :options="tecnicoOptions"
                ></q-select>
              </cc-input-container>
            </div>
          </fieldset>
        </q-card-section>

        <q-separator />
        <q-card-actions
          align="right"
          :class="$q.dark.isActive ? 'bg-dark text-white' : 'bg-color1 text-white'"
        >
          <q-btn flat label="Cancelar" no-caps @click="modalFilters = !modalFilters">
            <q-tooltip
              transition-show="rotate"
              transition-hide="rotate"
              content-class="bg-accent"
              >Cancelar e Fechar Modal</q-tooltip
            >
          </q-btn>
          <q-btn flat label="Pesquisar" no-caps @click="pesquisar">
            <q-tooltip
              transition-show="rotate"
              transition-hide="rotate"
              content-class="bg-accent"
              >Pesquisar Tickets</q-tooltip
            >
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { gridService } from "../../services/grids";
import { historyMenus } from "../../services/consts/menus";
import helpDeskService from "../../services/helpdesk-service";
import XLSX from "xlsx";
import DialogComponent from "../../components/DialogMessage";

export default {
  name: "HistoryTicket",
  computed: {
    historyMenus() {
      return historyMenus;
    },

    columns() {
      return gridService.loadGridCargas();
    },
  },
  data() {
    return {
      data: [],
      categoriaOptions: [],
      subCategoriaOptions: [],
      usuarioOptions: [],
      tecnicoOptions: [],
      loading: false,
      statusBtnModel: "",
      grid: false,
      filters: {},
      dense: true,
      modalFilters: false,
      btnOptions: [
        { label: "Aberto", value: "A", slot: 1 },
        { label: "Andamento", value: "B", slot: 2 },
        { label: "Aguard.", value: "C", slot: 3 },
        { label: "Fechado", value: "F", slot: 4 },
        { label: "Todos", value: "", slot: 5 },
      ],
      pagination: {
        sortBy: "id",
        descending: true,
        page: 1,
        rowsPerPage: 17,
        rowsNumber: 1,
      },
    };
  },
  methods: {
    getPage(page) {
      this.filters.filters = {
        categoria: page.categoria,
        subcategoria: page.subcategoria,
      };
      this.pesquisar();
    },

    onRequest(props) {
      this.pagination = { ...props.pagination };
      this.pesquisar();
    },

    async pesquisar() {
      try {
        this.filters.pagination = this.pagination;

        this.loading = true;
        const res = await helpDeskService.listAll(this.filters);

        this.data = res.data;
        this.pagination.rowsPerPage = res.limit;
        this.pagination.rowsNumber = res.count;
        this.loading = false;
        this.modalFilters = false;
      } catch (err) {
        const msg = !err.response
          ? "Sem comucação com servidor"
          : err.response.data.message;
        this.exibirMensagem(msg);
      }
    },

    returnColorStatus(props) {
      let cor = "primary";
      if (props.row.status === "FECHADO") {
        cor = "blue-6";
      } else if (props.row.status === "ABERTO") {
        cor = "positive";
      } else if (props.row.status === "ANDAMENTO") {
        cor = "warning";
      } else if (props.row.status === "AGUARDANDO FECHAMENTO") {
        cor = "grey";
      }
      return cor;
    },

    returnColorPrioridade(props) {
      let cor = "primary";
      if (props.row.prioridade === "BAIXA") {
        cor = "grey";
      } else if (props.row.prioridade === "ALTA") {
        cor = "info";
      } else if (props.row.prioridade === "MÉDIA") {
        cor = "secondary";
      } else if (props.row.prioridade === "CRÍTICO") {
        cor = "negative";
      }
      return cor;
    },

    viewTicket(row) {
      if (row) {
        this.$router.push(`view/detail/ticket/${row.id}`);
      }
    },

    btnStatus(evt) {
      this.filters.status = { status: evt };
      this.pesquisar();
    },

    exportToExcel() {
      var dados = XLSX.utils.json_to_sheet(this.data);

      var wb = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(wb, dados, "Tickets");

      XLSX.writeFile(wb, "Tickets.xlsx");
    },

    getFiltersCategoria(val, update, abort) {
      const url = "/filters/categoria";
      this.$axios
        .get(url, { params: val })
        .then((res) => {
          update(() => {
            this.categoriaOptions = res.data;
          });
        })
        .catch((err) => {
          if (err.response.data.originalError) {
            err.retorno = err.response.data.originalError.info.message;
            err.status = 500;
          }
          this.$messages.notify(err);
        });
    },

    getFiltersSubCategoria(val, update, abort) {
      val = this.filters.categoria;
      const url = "/filters/subcategoria";
      this.$axios
        .get(url, { params: val })
        .then((res) => {
          update(() => {
            this.subCategoriaOptions = res.data;
          });
        })
        .catch((err) => {
          if (err.response.data.originalError) {
            err.retorno = err.response.data.originalError.info.message;
            err.status = 500;
          }
          this.$messages.notify(err);
        });
    },

    async getFiltersUsuario(val, update, abort) {
      try {
        const res = await helpDeskService.getFiltersUsuario(val);

        update(() => {
          this.usuarioOptions = res;
        });
      } catch (error) {
        const msg = !error.response
          ? "Sem comucação com servidor"
          : error.response.data.message;
        this.exibirMensagem(msg);
      }
    },

    getFiltersTecnico(val, update, abort) {
      const url = "/filters/tecnico";
      this.$axios
        .get(url, { params: val })
        .then((res) => {
          update(() => {
            this.tecnicoOptions = res.data;
          });
        })
        .catch((err) => {
          if (err.response.data.originalError) {
            err.retorno = err.response.data.originalError.info.message;
            err.status = 500;
          }
          this.$messages.notify(err);
        });
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

  async mounted() {
    this.pesquisar();
  },
};
</script>

<style lang="sass">
.field-container-content
  padding: 8px 0
</style>
