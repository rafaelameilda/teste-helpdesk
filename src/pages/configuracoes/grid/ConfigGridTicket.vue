<template>
  <cc-page title="Configurações da GRID">
    <template v-slot:actions>
      <div class="q-gutter-sm q-pa-sm">
        <q-btn @click="redefinir" color="color1" label="Redefinir" />
        <q-btn to="/history/ticket/general" color="color1" label="Voltar" />
      </div>
    </template>
    <div class="q-pa-md page">
      <Alert
        class="q-mb-md"
        title="Dica"
        type="help"
        caption="Selecione uma coluna depois arraste para a posição desejada"
      />
      <Alert
        class="col-12"
        v-if="redefinicaoOK"
        title="Colunas Redefinidas"
        type="success"
        caption="As colunas foram redefinidas para o padrão"
      />
      <q-draggable-rows v-if="rows" class="drag-rows q-pa-md" v-model="order">
        <q-draggable-row class="drag" v-for="id in order" :key="id" :id="id">
          <div class="column">
            <div class="label">{{ getLabel(rows[id], id) }}</div>
          </div>
        </q-draggable-row>
      </q-draggable-rows>
    </div>
  </cc-page>
</template>

<script>
import { columnsPageListagemCarga, gridService } from "../../../services/grids";

import Alert from "../../../components/Alert";

export default {
  components: { Alert },
  mounted() {
    this.generateOrders();
  },
  data() {
    return {
      order: gridService.loadGridCargas().map((column) => column.name),
      depth: 0,
      rows: null,
      grids: gridService.grids,
      redefinicaoOK: false,
      columns: gridService.loadGridCargas(),
      form: {
        grid: null,
      },
    };
  },

  watch: {
    order(val) {
      gridService.saveGridCargas(val);
    },
    form: {
      deep: true,
      handler(form) {
        const value = form.grid.value;
        this.columns = gridService.getGrid(value);

        this.order = this.columns.map((col) => col.name);

        this.generateOrders();
      },
    },
  },
  methods: {
    redefinir() {
      this.redefinicaoOK = true;
      gridService.redefinir();
      this.order = gridService.loadGridCargas().map((column) => column.name);
      this.columns = gridService.loadGridCargas();
      this.generateOrders();
      gridService.saveGridCargas(this.order);
    },
    getLabel(val, id) {
      return val.label;
    },
    generateOrders() {
      const obj = {};

      this.order.forEach((name) => {
        const col = this.columns.find((col) => col.name === name);
        obj[name] = { depth: 0, ...col };
      });

      this.rows = obj;
      this.order = this.columns.map((col) => col.name);
    },
  },
};
</script>

<style scoped lang="scss">
.page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
}

.form {
  width: 50%;
}

.drag-rows {
  font-family: "Montserrat", sans-serif;
  width: 100%;
  display: flex;
  align-items: center;
  .drag {
    display: flex;
    flex-direction: row;
    align-items: center;
    box-shadow: 2px 6px 18px -3px rgba(0, 0, 0, 1);
    width: 30%;
    margin-bottom: 10px;

    .column {
      padding: 5px;

      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .label {
        font-weight: bold;
      }
    }
  }
}
</style>