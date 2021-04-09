<template>
 <q-page :class="{'q-pa-md': !noMargin}">
  <q-card>
    <q-card-section class="q-pa-none">
      <q-toolbar :class="cssClass ? cssClass : 'bg-theme text-theme'">
        <q-toolbar-title>{{title}}</q-toolbar-title>
        <q-space></q-space>
        <q-btn @click="back" round icon="fas fa-arrow-circle-left" flat />
        <q-btn to="/" round icon="fas fa-times-circle" flat />
      </q-toolbar>
    </q-card-section>

    <q-card-actions v-if="actions">
      <template v-for="(action, i) in actions">
        <template v-if="action.type === 'btn'">
          <q-btn
            :key="i"
            :label="action.label"
            :icon="action.icon"
            :outline="action.outline"
            :color="action.color"
            :size="action.size"
            :loading="action.loading"
            :disable="action.disable"
            :class="{'full-witdh': action.fullWidth}"
            @click="action.click"
          ></q-btn>
        </template>
      </template>
    </q-card-actions>


      <q-separator v-if="actions" />


    <q-scroll-area :style="style">
      <q-card-section>
        <slot name="body"></slot>
      </q-card-section>
    </q-scroll-area>

    <!-- <q-card-section>
        <slot name="body"></slot>
      </q-card-section> -->

    <q-card-actions>
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
 </q-page>
</template>


<script>
export default {
  // name: 'ComponentName',
  props: {
    title: String,
    actions: Array,
    noMargin: Boolean,
    cssClass: String
  },


  methods: {
    back() {
      this.$router.go(-1);
    },

  },
  mounted() {

  },
  watch: {
    actions(val) {

    }
  },
  computed:{


    screenHeight() {
      return this.$q.screen.height
    },
    style() {
      return [
        {height: `calc(100vh - 245px)`},
        {width: '100%'},
      ]
    }
  },

  data() {
    return {};
  }
};
</script>

<style  scoped>
.title {
}
</style>
