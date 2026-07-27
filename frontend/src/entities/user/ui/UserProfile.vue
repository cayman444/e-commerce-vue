<script setup lang="ts">
import { ROUTES_PATHS } from '@/app/router'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui'
import { LogOut, ShieldCheck, User, UserRound } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import type { IUser } from '../model/types'

defineProps<{
  user: IUser | null
  isAdmin?: boolean
}>()

const emit = defineEmits<{
  (e: 'logout'): void
}>()
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <button
        class="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer text-xs font-semibold uppercase tracking-wider text-secondary"
      >
        <UserRound :size="20" />
        <span class="hidden sm:inline-block max-w-32 truncate">{{ user?.username }}</span>
      </button>
    </PopoverTrigger>
    <PopoverContent align="end" class="w-56 p-0 rounded-none shadow-xl border border-secondary/10">
      <div class="p-4 border-b border-secondary/10 bg-neutral">
        <p class="text-xs font-semibold uppercase tracking-wider text-secondary truncate">
          {{ user?.username }}
        </p>
        <p class="text-[10px] text-tertiary truncate mt-0.5">
          {{ user?.email }}
        </p>
      </div>
      <div class="p-1 flex flex-col gap-0.5">
        <RouterLink
          :to="ROUTES_PATHS.PROFILE"
          class="flex items-center justify-between px-3 py-2.5 text-xs text-secondary hover:bg-tertiary/10 transition-colors uppercase tracking-wider font-medium"
        >
          <span>Личный кабинет</span>
          <User :size="14" class="text-tertiary" />
        </RouterLink>
        <RouterLink
          v-if="isAdmin"
          :to="ROUTES_PATHS.ADMIN"
          class="flex items-center justify-between px-3 py-2.5 text-xs text-secondary hover:bg-tertiary/10 transition-colors uppercase tracking-wider font-medium"
        >
          <span>Админ-панель</span>
          <ShieldCheck :size="14" class="text-tertiary" />
        </RouterLink>
        <button
          @click="emit('logout')"
          class="w-full flex items-center justify-between px-3 py-2.5 text-xs text-red-600 hover:bg-red-500/5 transition-colors cursor-pointer rounded-none border-0 text-left font-medium uppercase tracking-wider"
        >
          <span>Выйти</span>
          <LogOut :size="14" />
        </button>
      </div>
    </PopoverContent>
  </Popover>
</template>
