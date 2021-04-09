<template>
  <q-dialog :full-width="fullWidth" ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin" :style="getSize">
      <Alert class="full-width" @close="onCancelClick" :title="title" :caption="message" :type="type" />
    </q-card>
  </q-dialog>
</template>

<script>

import Alert from './Alert'

export default {
    components: {Alert},
  props: {
    // ...your custom props
    message: String,
    title: String,
    fullWidth: Boolean,
    size: {
      type: String,
      default: 'md'
    },
    type: String,
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