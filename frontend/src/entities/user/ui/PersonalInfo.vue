<script setup lang="ts">
import { Button } from '@/shared/ui'
import { ArrowRight, LogOut, ShieldCheck } from '@lucide/vue'
import { usePersonalInfo } from '../model/usePersonalInfo'

const { user, isAdmin, isLoaded, handleLogout, handleNavigateToAdmin } = usePersonalInfo()
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col sm:flex-row sm:items-center gap-8">
      <div class="aspect-square w-32 sm:w-40 bg-neutral border border-secondary/10 shrink-0">
        <img
          src="https://placehold.co/160x160?text=No+Image"
          :alt="user?.username"
          @load="isLoaded = true"
          class="w-full h-full object-cover mix-blend-multiply transition-all duration-700 ease-out"
          :class="isLoaded ? 'opacity-100' : 'opacity-0'"
        />
      </div>
      <div class="flex flex-col items-start gap-1">
        <div class="flex items-center gap-3">
          <h2 class="text-3xl font-display uppercase">{{ user?.username }}</h2>
          <span
            v-if="isAdmin"
            class="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-secondary text-neutral flex items-center gap-1"
          >
            <ShieldCheck :size="12" />
            Admin
          </span>
        </div>
        <p class="text-lg text-tertiary">{{ user?.email }}</p>
        <Button
          @click="handleLogout"
          class="mt-4 flex items-center gap-2"
          variant="outline"
          size="sm"
        >
          <span>Выйти</span>
          <LogOut :size="16" />
        </Button>
      </div>
    </div>
    <div
      v-if="isAdmin"
      class="bg-secondary text-neutral p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <div class="p-3 bg-neutral/10 rounded-none shrink-0">
          <ShieldCheck :size="22" class="text-neutral" />
        </div>
        <div>
          <h3 class="font-display text-base uppercase tracking-wider">Панель управления</h3>
          <p class="text-neutral/70 text-xs mt-0.5">
            Управление каталогом товаров, ценами и категориями
          </p>
        </div>
      </div>
      <Button
        @click="handleNavigateToAdmin"
        variant="outline"
        size="sm"
        class="border-neutral text-neutral hover:bg-neutral hover:text-secondary flex items-center gap-2 cursor-pointer shrink-0"
      >
        <span>Управление каталогом</span>
        <ArrowRight :size="14" />
      </Button>
    </div>
  </div>
</template>
