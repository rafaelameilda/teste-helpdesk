<template>
  <q-page class="flex flex-center">
    <div class="row flex-center q-col-gutter-sm">
      <rr-cardhome
        :class="$q.dark.isActive ? 'shadow' : ''"
        v-for="card in cards"
        :key="card.title"
        :lorem="card.lorem"
        :title="card.title"
        :subTitle="card.subTitle"
        :icon="card.icon"
        :color="card.color"
        @click="(evt) => clickCard(card.path)"
      >
      </rr-cardhome>
    </div>
  </q-page>
</template>

<script>
import { cardHomeMenus } from "../services/consts/menus";
export default {
  name: "PageIndex",
  data() {
    return { cards: null };
  },

  methods: {
    clickCard(data) {
      this.$router.push(`${data}`);
    },
  },

  created() {
    this.cards = cardHomeMenus;
  },
};
</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}
</style>
