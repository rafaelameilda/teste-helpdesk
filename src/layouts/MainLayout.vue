<template>
  <q-layout view="hHh LpR lFf">
    <q-header
      elevated
      :class="$q.dark.isActive ? 'q-dark shadow' : 'bg-color1 text-brand'"
    >
      <q-toolbar>
        <q-toolbar-title>
          <router-link class="title" to="/">HelpDesk</router-link>
        </q-toolbar-title>

        <q-space />

        <q-btn
          flat
          @click="$q.dark.toggle()"
          :icon="!$q.dark.isActive ? 'fas fa-adjust' : 'fas fa-sun'"
        />

        <q-btn
          icon="account_circle"
          unelevated
          :ripple="false"
          :label="user.name.split(' ')[0]"
          flat
        >
          <q-menu fit auto-close>
            <q-list style="min-width: 100px">
              <q-item clickable @click="logout" class="align-end">
                <q-item-section avatar>
                  <q-icon class="text-black" name="logout" />
                </q-item-section>

                <q-item-section>Sair</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="row no-wrap">
        <div class="col">
          <div class="full-height">
            <q-scroll-area class="col q-pr-sm full-height" visible>
              <router-view />
            </q-scroll-area>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-theme text-white">
      <q-toolbar>
        <q-toolbar-title></q-toolbar-title>
        <q-space></q-space>
        <small>Developed by Almeida Rº 748 - Versão {{ version }}</small>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import authService from "../services/auth.service";
import { version } from "../../package.json";

export default {
  created() {},
  computed: {
    version() {
      return version;
    },
    user() {
      return authService.getUserFromLocalStorage();
    },
  },
  methods: {
    logout() {
      authService.logout();
      this.$router.push("/login");
    },
  },
  data() {
    return {
      left: false,
    };
  },
};
</script>

<style scoped>
.title {
  text-decoration: none;
  color: white;
}

.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}
</style>
