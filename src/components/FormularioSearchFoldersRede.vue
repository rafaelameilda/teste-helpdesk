<template>
  <q-card-section class="q-pt-none">
    <fieldset>
      <legend>
        <q-toolbar>
          <q-toolbar-title>{{
            items.codSubCategoria === 27 ? "Rede" : items.label
          }}</q-toolbar-title>
        </q-toolbar>
      </legend>

      <div class="q-gutter-sm">
        <q-radio
          v-model="form.typeAcessofoldersRede"
          val="apenasLeitura"
          label="Apenas Leitura"
          color="teal"
        />
        <q-radio
          v-model="form.typeAcessofoldersRede"
          val="leituraEGravacao"
          label="Leitura e Gravação"
          color="orange"
        />
      </div>
      <q-banner class="row bg-grey-3 col-12 col-lg-12 col-md-12" rounded>
        <q-breadcrumbs>
          <q-breadcrumbs-el>
            <q-btn @click="getPath()" icon="home" dense flat round>
              <q-tooltip content-class="bg-accent" :offset="[10, 10]">{{
                path.path
              }}</q-tooltip>
            </q-btn>
          </q-breadcrumbs-el>

          <q-breadcrumbs-el
            @click="back(f)"
            v-for="(f, i) in folders2"
            :key="i"
            class="cursor-pointer"
            :label="f.name"
            icon="fas fa-folder"
          ></q-breadcrumbs-el>
        </q-breadcrumbs>
      </q-banner>

      <div class="row q-col-gutter-x-xs q-col-gutter-y-lg">
        <div class=""></div>
        <cc-input-container
          class="col-12 col-lg-12 col-md-12"
          :label="'Pastas'"
          :required="true"
          :help="'Pesquise as Pastas que deseja solicitar acesso, e clique em confirmar'"
        >
          <q-select
            class="field-container-content"
            :color="$q.dark.isActive ? 'white' : 'grey'"
            outlined
            dense
            @input="selectFolter"
            v-model="redefoldersSelected"
            :options="folders"
            option-label="name"
            option-value="name"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                <q-item-section side>
                  <q-icon class="fas fa-folder"></q-icon>
                </q-item-section>

                <q-item-section>
                  <q-item-label v-html="scope.opt.name"></q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </cc-input-container>

        <q-card-actions class="col-12 col-lg-12 col-md-12">
          <q-btn
            :disable="!redefoldersSelected"
            color="primary"
            @click="confirmarPasta"
            flat
            size="md"
            label="Confirmar"
          />
          <q-btn
            :disable="!form.redefoldersSelected"
            color="primary"
            @click="limparPastas"
            flat
            size="md"
            label="Limpar"
          />
          <q-separator />
        </q-card-actions>
        <div>
          <q-chip
            class="text-bold"
            clickable
            outline
            square
            :color="$q.dark.isActive ? 'white' : 'orange-6'"
            text-color="white"
            icon="fas fa-folder-open"
            v-for="(s, i) in form.redefoldersSelected"
            :key="i"
            :label="s.path"
          />
        </div>

        <cc-input
          :color="$q.dark.isActive ? 'white' : 'grey'"
          :label="'Observação'"
          v-model="form.redeObservacao"
          class="col-12 col-lg-12 col-md-12"
        />
        <div class=""></div>
      </div>
    </fieldset>
  </q-card-section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FormularioSearchFoldersRede",

  data() {
    return {
      folders: [],
      folders2: [],
      previosSelectedFolder: [],
      redefoldersSelected: [],
      path: {
        path: "U://",
      },
    };
  },

  props: {
    value: Object,
  },

  methods: {
    confirmarPasta() {
      this.redefoldersSelected.acesso = this.form.typeAcessofoldersRede;
      this.form.redefoldersSelected.push(this.redefoldersSelected);
      this.redefoldersSelected = [];
      this.getPath();
    },

    limparPastas() {
      this.form.redefoldersSelected = [];
      this.redefoldersSelected = [];
      this.previosSelectedFolder = [];
      this.folders = [];
      this.folders2 = [];
      this.getPath();
    },

    back(obj) {
      const index = this.folders2.indexOf(obj);
      this.getPath(obj.path, index);
    },

    selectFolter() {
      this.folders2.push(this.redefoldersSelected);

      let dir;
      if (this.previosSelectedFolder.length > 0) {
        const sub = this.previosSelectedFolder.map((s) => s.name).join("/");
        dir = `${this.path.path}/${sub}/${this.redefoldersSelected.name}`;
      } else {
        dir = `${this.path.path}/${this.redefoldersSelected.name}`;
      }

      this.getPath(dir);
    },

    getPath(dir = null, removeFolder = null) {
      const pathLocal = !dir ? this.path.path : dir;

      if (!dir) {
        this.previosSelectedFolder = [];
        this.folders2 = [];
        this.redefoldersSelected = null;
      }

      this.$q.loading.show();
      const url = "folders/search";
      this.$axios
        .get(url, { params: { path: pathLocal } })
        .then((res) => {
          this.folders = res.data;

          if (dir) {
            if (removeFolder === null) {
              this.previosSelectedFolder.push(this.redefoldersSelected);
            } else {
              this.folders2.splice(removeFolder + 1, this.folders2.length);
              this.previosSelectedFolder.splice(
                removeFolder + 1,
                this.previosSelectedFolder.length
              );
              this.redefoldersSelected = this.folders2[removeFolder];
            }
          }

          this.$q.loading.hide();
        })
        .catch((err) => {
          this.$q.loading.hide();
          err.response.data.code
            ? (err.retorno =
                "Operação não permitida (Possivelmente Permissão de Acesso a Pasta.)")
            : null;
          this.$messages.notify(err);
        });
    },
  },

  computed: {
    form() {
      return this.value;
    },

    ...mapState("Ticket", ["items"]),
  },

  mounted() {
    this.getPath();
  },
};
</script>

<style></style>
