<template>
  <div
    class="
      the-navigation-drawer
      fixed
      top-0
      lg:static
      h-full
      bg-white
      shadow-xl
      z-10
      overflow-hidden
      flex flex-col
      w-64
    "
    :class="{ 'left-0': opened, '-left-100': !opened }"
  >
    <div class="h-full overflow-y-auto p-2">
      <div class="flex items-center px-2 py-4">
        <div class="w-20 h-20 flex-shrink-0 rounded-full bg-gray-300"></div>
        <div class="ml-2 w-full">
          <div class="font-bold text-lg">{{ username }}</div>
          <span
            v-if="isAdmin"
            class="
              inline-block
              mt-1
              px-2
              text-center
              rounded-md
              bg-red-400
              text-white text-sm
            "
          >
            ADMINISTRADOR
          </span>
          <span
            v-else
            class="
              inline-block
              mt-1
              px-2
              text-center
              rounded-md
              bg-cyan-400
              text-white text-sm
            "
          >
            FUNCIONÁRIO
          </span>
        </div>
      </div>
      <ul>
        <li
          v-for="(item, index) in menuList"
          :key="index"
          @click="handleClose"
        >
          <component :is="item.path ? 'router-link' : 'div'" :to="item.path">
            <base-button
              class="w-full hover:bg-gray-100"
              :disabled="item.disabled"
            >
              <base-icon
                v-if="item.icon"
                class="text-blue-500"
                :icon="item.icon"
              ></base-icon>
              <span class="ml-4 text-gray-500 uppercase">
                {{ item.title }}
              </span>
            </base-button>
          </component>
        </li>
      </ul>
    </div>
    <div class="p-2 flex items-end border-t">
      <base-button class="w-full hover:bg-gray-100" @click="handleLogout">
        <base-icon class="text-blue-500" icon="sign-out-alt"></base-icon>
        <span class="ml-4 text-gray-500 uppercase">Sair</span>
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { types as appMutations } from '@/store/app';

export default {
  name: 'TheNavigationDrawer',
  data: () => ({
    allMenuList: [
      {
        title: 'Dashboard',
        icon: 'home',
        path: { name: 'dashboard' },
      },
      {
        title: 'Usuários',
        icon: 'user',
        path: { name: 'admin.user.index' },
        ability: 'administrador',
      },
    ],
  }),
  computed: {
    ...mapGetters('auth', {
      user: 'user',
      isAdmin: 'isAdmin',
    }),
    ...mapGetters('app', {
      navigationDrawer: 'navigationDrawer',
    }),
    opened() {
      return this.navigationDrawer.opened;
    },
    menuList() {
      return this.allMenuList.filter(this.canAccessRoute)
    },
    username() {
      return this.user.email.split('@')?.[0];
    },

  },
  watch: {
    opened(opened) {
      this.handleOpened(opened);
    },
  },
  methods: {
    canAccessRoute(item) {
      return this.$ability.can(item.ability);
    },
    ...mapActions('auth', {
      signOut: 'signOut',
    }),
    ...mapMutations('app', {
      closeNavigationDrawer: appMutations.CLOSE_NAVIGATION_DRAWER,
    }),
    handleLogout() {
      this.signOut().finally(() => {
        this.$router.replace({ name: 'auth.login' });
      });
    },
    handleKeyUp(event) {
      if (event.key === 'Escape' && this.opened) {
        event.stopImmediatePropagation();
        this.handleClose();
      }
    },
    handleClose() {
      if (!this.opened) return;
      this.closeNavigationDrawer();
    },
    handleClickOutside({ path }) {
      if (path.includes(this.$el)) return;
      if (path.includes(this.ignoreClick)) return;
      this.handleClose();
    },
    registerEvents() {
      document.addEventListener('mousedown', this.handleClickOutside);
      document.addEventListener('keyup', this.handleKeyUp, true);
    },
    removeEvents() {
      document.removeEventListener('mousedown', this.handleClickOutside);
      document.removeEventListener('keyup', this.handleKeyUp, true);
    },
    handleOpened(opening) {
      if (opening) {
        return this.registerEvents();
      }
      this.removeEvents();
    },
  },
  mounted() {
    this.handleOpened(this.opened);
  },
  beforeDestroy() {
    this.removeEvents();
  },
};
</script>

<style lang="scss">
.-left-100 {
  left: -100%;
}
.the-navigation-drawer {
  transition: 0.3s ease-in-out;
  ul {
    @apply uppercase;
  }
}
</style>
