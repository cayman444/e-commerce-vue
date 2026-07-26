<script setup lang="ts">
import { ROUTES_PATHS, router } from '@/app/router'
import { useCartStore } from '@/entities/cart'
import { Menu, Settings, ShoppingBag, UserRound } from '@lucide/vue'
import { RouterLink } from 'vue-router'

const ROUTES = [
  { to: ROUTES_PATHS.CATALOG, text: 'Каталог' },
  { to: ROUTES_PATHS.ABOUT, text: 'О нас' },
  { to: ROUTES_PATHS.JOURNAL, text: 'Журнал' },
] as const

const cartStore = useCartStore()
</script>

<template>
  <header
    class="py-8 border-b border-b-tertiary/10 transition-all duration-300 bg-neutral text-secondary"
  >
    <div class="flex justify-between items-center w-full max-w-360 mx-auto px-8 md:px-16">
      <h2
        class="font-display text-2xl leading-8 uppercase cursor-pointer"
        @click="router.push(ROUTES_PATHS.CATALOG)"
      >
        Archive
      </h2>
      <nav class="hidden md:flex">
        <ul class="flex items-center gap-10 uppercase">
          <li v-for="{ text, to } in ROUTES" :key="to">
            <RouterLink
              class="nav-link transition-all cursor-pointer font-semibold tracking-wider hover:opacity-70"
              exact-active-class="active text-primary pointer-events-none"
              :to
            >
              {{ text }}
            </RouterLink>
          </li>
        </ul>
      </nav>
      <div class="flex items-center gap-6 [&>button]:cursor-pointer [&>button]:transition-opacity">
        <button class="hover:opacity-70" @click="router.push(ROUTES_PATHS.LOGIN)">
          <UserRound :size="20" />
        </button>
        <button class="hover:opacity-70">
          <Settings :size="20" />
        </button>
        <button class="hover:opacity-70 relative" @click="router.push(ROUTES_PATHS.CART)">
          <ShoppingBag :size="20" />
          <span
            v-if="cartStore.totalCount > 0"
            class="absolute -top-1.5 -right-1.5 bg-primary text-neutral text-[10px] font-bold rounded-full size-4 flex items-center justify-center font-sans"
          >
            {{ cartStore.totalCount }}
          </span>
        </button>
        <button class="hover:opacity-70 block md:hidden">
          <Menu :size="20" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  position: relative;
  padding-bottom: 10px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.nav-link.active::after {
  width: 100%;
}
</style>
