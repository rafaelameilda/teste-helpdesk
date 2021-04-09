<template>
  <div>
    <q-btn-dropdown
      v-for="(menu, index) in menus"
      :key="index"
      dropdown-icon="fas fa-angle-down"
      stretch
      flat
      :label="menus[index].title"
    >
      <q-list>
        <q-item-label header>Analítico</q-item-label>
        <q-separator />
        <q-item
          v-for="(rel, index) in menu.relatorios"
          :key="index"
          clickable
          v-close-popup
          tabindex="0"
          @click="$emit('r-enter', rel)"
        >
          <q-item-section avatar>
            <q-avatar :icon="rel.icon" color="brown" text-color="white" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ rel.titleRel }}</q-item-label>
            <q-item-label caption>{{ rel.descriptionRel }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :color="$q.dark.isActive ? 'white' : 'brown'" name="info" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    menus: Array,
  },

  name: "BtnMenu",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style>
</style>