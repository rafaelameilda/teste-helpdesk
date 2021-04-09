<template>
  <q-editor
    :class="$q.dark.isActive ? 'shadow' : ''"
    flat
    :value="value"
    @input="change"
    placeholder="Descreva sua solicitação..."
    :content-class="$q.dark.isActive ? 'bg-grey-9' : 'bg-deep-orange-1'"
    toolbar-text-color="white"
    :toolbar-toggle-color="$q.dark.isActive ? 'grey' : 'amber'"
    :toolbar-bg="$q.dark.isActive ? 'dark' : 'light-blue'"
    :min-height="$q.screen.height.toString() - 700 + 'px'"
    :toolbar="[
      [
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          list: 'only-icons',
          options: ['left', 'center', 'right', 'justify'],
        },
        {
          label: $q.lang.editor.align,
          icon: $q.iconSet.editor.align,
          fixedLabel: true,
          options: ['left', 'center', 'right', 'justify'],
        },
      ],
      ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
      ['token', 'hr', 'link', 'custom_btn'],
      ['print', 'fullscreen'],
      [
        {
          label: $q.lang.editor.formatting,
          icon: $q.iconSet.editor.formatting,
          list: 'no-icons',
          options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code'],
        },
        {
          label: $q.lang.editor.fontSize,
          icon: $q.iconSet.editor.fontSize,
          fixedLabel: true,
          fixedIcon: true,
          list: 'no-icons',
          options: [
            'size-1',
            'size-2',
            'size-3',
            'size-4',
            'size-5',
            'size-6',
            'size-7',
          ],
        },

        'removeFormat',
      ],
      ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

      ['undo', 'redo'],
      ['viewsource'],
    ]"
  />
</template>

<script>
export default {
  props: {
    value: String,
  },

  methods: {
    change(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style scoped>
.shadow {
  -webkit-box-shadow: 0 0 10px #bfbfbf !important;
  box-shadow: 0 0 10px #bfbfbf !important;
}
</style>