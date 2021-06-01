<template>
  <span class="base-icon text-base">
    <font-awesome-icon v-bind="$attrs" />
  </span>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BaseIcon',
};
</script>

<style lang="scss" scoped>
.base-icon {
  @apply inline-block w-6 h-6 text-center align-middle;
}
</style>
