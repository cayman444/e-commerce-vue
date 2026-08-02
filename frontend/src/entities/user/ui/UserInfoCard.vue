<script setup lang="ts">
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { LogOut, User as UserIcon } from '@lucide/vue'
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
  <div class="flex flex-col md:flex-row items-start md:items-center gap-8 w-full">
    <div
      class="w-32 h-32 md:w-36 md:h-36 shrink-0 bg-neutral border border-secondary/10 flex items-center justify-center text-secondary font-display font-medium text-3xl uppercase tracking-wider select-none overflow-hidden"
    >
      <span v-if="user?.username">{{ user.username.charAt(0) }}</span>
      <UserIcon v-else :size="48" class="text-tertiary" />
    </div>
    <div class="flex flex-col gap-4">
      <div>
        <h1 class="font-display text-3xl text-secondary tracking-tight">
          {{ user?.username || 'Пользователь' }}
        </h1>
        <p class="text-tertiary text-base md:text-lg mt-1">
          {{ user?.email }}
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-4 pt-1">
        <span
          :class="
            cn(
              'inline-flex items-center px-3.5 py-1 text-xs font-semibold uppercase tracking-widest bg-secondary text-neutral',
              {
                'bg-primary text-white': isAdmin,
              },
            )
          "
        >
          {{ isAdmin ? 'Администратор' : 'Премиум участник' }}
        </span>

        <Button :variant="'outline'" :size="'sm'" @click="emit('logout')">
          <span>Выйти</span>
          <LogOut :size="14" />
        </Button>
      </div>
    </div>
  </div>
</template>
