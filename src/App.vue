<template>
  <div id="app" class="a">
    <div>
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
.a {
  @include viewport($breakpoint-lg) {
    @apply max-w-sm bg-primary;
  }
}
</style>
