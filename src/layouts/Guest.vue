<template>
  <div class="w-full flex">
    <main class="flex-1 h-full bg-lightBlue-50">
      <div class="min-h-full">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'GuestLayout',
};
</script>

<style scoped></style>
