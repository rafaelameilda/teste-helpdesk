<template>
  <q-btn-toggle
    v-model="btnStatus"
    glossy
    :color="color"
    :textColor="textColor"
    :toggleColor="toggleColor"
    :toggleTextColor="toggleTextColor"
    :options="btnOptions"
  >
    <template v-slot:1>
      <q-tooltip content-class="bg-accent"
        >Filtro Rápido de Status dos Chamados "Abertos"</q-tooltip
      >
    </template>
    <template v-slot:2>
      <q-tooltip content-class="bg-accent"
        >Filtro Rápido de Status dos Chamados em "Andamento""</q-tooltip
      >
    </template>
    <template v-slot:3>
      <q-tooltip content-class="bg-accent"
        >Filtro Rápido de Status dos Chamados em "Aguardando
        Fechamento"</q-tooltip
      >
    </template>
    <template v-slot:4>
      <q-tooltip content-class="bg-accent"
        >Filtro Rápido de Status dos Chamados "Fechados"</q-tooltip
      >
    </template>
    <template v-slot:5>
      <q-tooltip content-class="bg-accent"
        >Filtro Rápido de "Todos" os Status</q-tooltip
      >
    </template>
  </q-btn-toggle>
</template>

<script>
export default {
  name: "HistoryTicket",
  props: {
    value: String,
    btnOptions: {
      type: Array,
      default: () => [],
    },
    toggleColor: {
      type: String,
      default: "color1",
    },
    color: {
      type: String,
      default: "bg-grey-9",
    },
    textColor: {
      type: String,
      default: "white",
    },
    toggleTextColor: {
      type: String,
      default: "white",
    },
  },
  computed: {
    btnStatus: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>