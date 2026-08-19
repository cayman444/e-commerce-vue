<script setup lang="ts">
import { Button } from '@/shared/ui'
import { LogOut } from '@lucide/vue'
import { usePersonalInfo } from '../model/usePersonalInfo'

const { user, isLoaded, handleLogout } = usePersonalInfo()
</script>

<template>
  <div class="flex items-center gap-8">
    <div class="aspect-square">
      <img
        src="https://placehold.co/160x160?text=No+Image"
        :alt="user?.username"
        @load="isLoaded = true"
        class="w-full h-full object-cover mix-blend-multiply transition-all duration-700 ease-out"
        :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      />
    </div>
    <div class="flex flex-col items-start">
      <h2 class="text-3xl font-display uppercase">{{ user?.username }}</h2>
      <p class="text-lg text-tertiary">{{ user?.email }}</p>
      <Button
        @click="handleLogout"
        class="mt-6 flex items-center gap-2"
        variant="outline"
        size="sm"
      >
        <span>Выйти</span>
        <LogOut :size="16" />
      </Button>
    </div>
  </div>
</template>
