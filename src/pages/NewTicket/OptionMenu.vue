<template>
  <q-page class="column q-pa-sm q-gutter-sm flex flex-start">
    <q-toolbar
      :class="
        $q.dark.isActive
          ? 'rounded-borders bg-dark text-white'
          : 'rounded-borders bg-deep-orange-6  text-white'
      "
    >
      <q-breadcrumbs
        :class="$q.dark.isActive ? 'q-dark text-blue-grey-3' : 'text-blue-grey-3 '"
      >
        <q-breadcrumbs-el
          icon="home"
          to="/"
          :class="$q.dark.isActive ? 'q-dark' : 'text-white '"
        />

        <q-breadcrumbs-el
          label="ESCOLHA DE CATEGORIA"
          icon="navigation"
          to="/new-ticket"
        />
      </q-breadcrumbs>
    </q-toolbar>

    <q-tree
      :class="$q.dark.isActive ? 'text-h6 q-dark text-grey' : 'text-h6 '"
      :nodes="categoryTree"
      node-key="label"
      accordion
      :expanded.sync="expanded"
    >
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <q-icon
            :name="prop.node.icon || 'fas fa-angle-right'"
            :color="!$q.dark.isActive ? 'deep-orange-6' : ''"
            size="30px"
            class="q-mr-sm"
          />
          <div
            @click="clickMenu(prop.node)"
            :class="
              !$q.dark.isActive
                ? 'cursor-pointer text-weight-bold text-black'
                : 'cursor-pointer text-weight-bold '
            "
          >
            {{ prop.node.label }}
          </div>
        </div>
      </template>

      <template v-slot:default-body="prop">
        <div class="text-subtitle1" v-if="prop.node.story">
          <span class="text-weight-bold"></span> {{ prop.node.story }}
        </div>
      </template>
    </q-tree>
  </q-page>
</template>

<script>
import { categoryTree } from "../../services/consts/menus";

export default {
  computed: {
    categoryTree() {
      return categoryTree;
    },
  },

  data() {
    return {
      expanded: ["CATEGORIA DE CHAMADO"],
    };
  },

  methods: {
    clickMenu(data) {
      if (!data.children && data.codSubCategoria !== 27 && data.codSubCategoria !== 26) {
        this.$router.push("new-ticket/formulario");
      } else if (!data.children && data.codSubCategoria === 27) {
        this.$router.push("new-ticket/newuser");
      } else if (!data.children && data.codSubCategoria === 26) {
        this.$router.push("new-ticket/access-folder");
      }

      this.$store.commit("Ticket/setItems", data);
    },
  },
};
</script>

<style></style>
