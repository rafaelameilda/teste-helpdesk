<template>
  <input-container :label="label">
    <div>
      <slot></slot>
    </div>
  </input-container>
</template>

<script>
import InputContainer from "./InputContainer";
export default {
  components: { InputContainer },
  props: {
    label: String
  }
};
</script>

<style>
</style>
