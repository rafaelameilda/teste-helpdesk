<template>
  <div class="col-12 col-md-4 col-lg-4">
    <q-card
      @click="clickCard"
      dark
      bordered
      style="height: 28rem"
      :class="$q.dark.isActive ? 'dark cursor-pointer hover text-center ' : 'cursor-pointer hover text-center bg-' + color"
    >
      <q-card-section>
        <div class="text-h4">{{ title }}</div>
        <div class="text-subtitle2">{{ subTitle }}</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <q-icon style="font-size: 12rem" :name="icon" />
      </q-card-section>

      <q-card-section>
        {{ lorem }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "CardHome",
  props: {
    lorem: String,
    title: String,
    subTitle: String,
    icon: String,
    color: String,
  },

  methods: {
    clickCard() {
      this.$emit("click");
    },
  },
};
</script>


<style lang="sass" scoped>
.my-card
    width: 100%
    max-width: 350px

.hover:hover
    border: 2px solid grey
    color: grey
</style>