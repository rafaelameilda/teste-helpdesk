<template>
  <div class="">
    <div class="col-3 label-color">
      Você esta solicitando um novo usuário de {{ selection }} com as seguintes
      informações:
      <q-separator />
    </div>
    <div class="row q-pa-sm label-color">
      <div class="col-3 label-color">Usuário</div>
      <div class="col-3 label-color">Setor</div>
      <div
        v-if="selection.includes('Spark') >= 0 && data.sparkApelido"
        class="col-3 label-color"
      >
        Spark: Apelido
      </div>
      <div
        v-if="selection.includes('Spark') >= 0 && data.sparkRamal"
        class="col-3 label-color"
      >
        Spark: Ramal
      </div>
    </div>

    <div class="row q-pa-sm value-color">
      <div class="col-3 value-color">{{ data.name }}</div>
      <div class="col-3 value-color">{{ data.setor }}</div>
      <div
        v-if="selection.includes('Spark') >= 0 && data.sparkApelido"
        class="col-3 value-color"
      >
        {{ data.sparkApelido }}
      </div>
      <div
        v-if="selection.includes('Spark') >= 0 && data.sparkRamal"
        class="col-3 value-color"
      >
        <q-chip
          class="text-bold"
          clickable
          square
          icon="fas fa-headset"
          outline
          :color="$q.dark.isActive ? 'white' : 'orange-6'"
          text-color="white"
          :label="data.sparkRamal"
        />
      </div>
    </div>

    <div class="row q-pa-sm label-color">
      <div
        v-if="selection.includes('Rede') >= 0 && data.redeObservacao"
        class="col-3 label-color"
      >
        Rede: Observação
      </div>

      <div
        v-if="selection.includes('Rede') >= 0 && data.redefoldersSelected.length"
        class="col-3 label-color"
      >
        Rede: Pastas -

        <q-badge :color="$q.dark.isActive ? 'dark' : 'orange-6'">{{
          data.typeAcessofoldersRede === "apenasLeitura"
            ? "Apenas Leitura"
            : "Leitura e Gravação"
        }}</q-badge>
      </div>
      <div
        v-if="selection.includes('Winthor') >= 0 && data.winthorObservacao"
        class="col-3 label-color"
      >
        Winthor: Observação
      </div>
      <div
        v-if="
          selection.includes('Winthor') >= 0 &&
          data.winthorRotinasLiberar &&
          data.winthorRotinasLiberar.length
        "
        class="col-3 label-color"
      >
        Winthor: Rotinas a Liberar
      </div>
      <div
        v-if="
          selection.includes('Winthor') >= 0 &&
          data.winthorUserReferencia &&
          data.winthorUserReferencia.toString().length
        "
        class="col-3 label-color"
      >
        Winthor: Usuário Referência
      </div>
    </div>

    <div class="row q-pa-sm value-color">
      <div
        v-if="selection.includes('Rede') >= 0 && data.redeObservacao"
        class="col-3 value-color"
      >
        {{ data.redeObservacao }}
      </div>
      <div v-if="data.redefoldersSelected.length" class="col-3 value-color">
        <q-chip
          class="text-bold"
          clickable
          outline
          square
          :color="$q.dark.isActive ? 'white' : 'orange-6'"
          text-color="white"
          icon="fas fa-folder-open"
          v-for="(s, i) in data.redefoldersSelected"
          :key="i"
          :label="s.name"
        />
      </div>
      <div
        v-if="selection.includes('Winthor') >= 0 && data.winthorObservacao"
        class="col-3 value-color"
      >
        {{ data.winthorObservacao }}
      </div>
      <div
        v-if="selection.includes('Winthor') >= 0 && data.winthorRotinasLiberar.length"
        class="col-3 value-color"
      >
        <q-chip
          class="text-bold"
          clickable
          square
          icon="far fa-window-restore"
          outline
          :color="$q.dark.isActive ? 'white' : 'orange-6'"
          text-color="white"
          v-for="(s, i) in data.winthorRotinasLiberar"
          :key="i"
          :label="s.codigo"
        />
      </div>

      <div
        v-if="selection.includes('Winthor') >= 0 && data.winthorUserReferencia"
        class="col-3 value-color"
      >
        {{ data.winthorUserReferencia.Nome }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    selection: Array,
  },

  mounted() {},
};
</script>

<style scoped>
div {
  font-family: "Open Sans", sans-serif;
}
.label-color {
  color: #4a5c60;
  font-weight: bold;
}
.t {
  width: 33.33%;
}
.value-color {
  font-family: Open Sans, sans-serif;
  line-height: 24px;
  color: #1d2426;
  min-height: 24px;
}
</style>
