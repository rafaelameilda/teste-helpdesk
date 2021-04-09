<template>
  <q-dialog :full-width="fullWidth" ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" :style="getSize">
      <q-toolbar :class="color" class="text-white">
        <q-avatar>
         <q-icon class="fas fa-exclamation-circle" />
        </q-avatar>

        <q-toolbar-title>{{title}}</q-toolbar-title>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-toolbar>

      <q-separator />
      <q-card-section style="max-height: 50vh" class="scroll q-pt-none">
        <div v-html="message"></div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-if="detail" flat color="primary" :label="detail ? 'Detalhes' : 'OK'" @click="onOKClick" />
        <q-btn  flat color="primary" label="Ok" @click="onCancelClick" />
        

        
        
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  props: {
    // ...your custom props
    message: String,
    title: String,
    fullWidth: Boolean,
    size: {
      type: String,
      default: 'md'
    },
    detail: Boolean,
    color: {
      type: String,
      default: 'bg-negative'
    }
  },

  computed: {
    getSize() {
      if(this.size === 'md') {
        return [
          {'width': '700px'},
          {'max-width': '80vw'}
        ]
      }
    }
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show();
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide();
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit("hide");
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit("ok");
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide();
    },
    onDetailClick() {
      this.$emit('detail')
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide();
    }
  }
};
</script>