<script setup lang="ts">
import { Calendar, CheckCircle2, Mail, Shield, User } from '@lucide/vue'
import { useAccountDetails } from '../model/useAccountDetails'

const { user, isAdmin, formattedCreatedAt, roleTitle } = useAccountDetails()
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-1">
      <h3 class="text-2xl font-display uppercase tracking-wide">Данные учетной записи</h3>
      <p class="text-sm text-tertiary">Информация о вашем профиле и статусе аккаунта</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white p-6 border border-secondary/10 flex flex-col gap-3">
        <div class="flex items-center gap-3 text-tertiary">
          <User :size="18" />
          <span class="text-xs uppercase font-semibold tracking-wider">Имя пользователя</span>
        </div>
        <p class="text-lg font-medium text-secondary truncate">{{ user?.username || '—' }}</p>
      </div>
      <div class="bg-white p-6 border border-secondary/10 flex flex-col gap-3">
        <div class="flex items-center gap-3 text-tertiary">
          <Mail :size="18" />
          <span class="text-xs uppercase font-semibold tracking-wider">Электронная почта</span>
        </div>
        <p class="text-lg font-medium text-secondary truncate">{{ user?.email || '—' }}</p>
      </div>
      <div class="bg-white p-6 border border-secondary/10 flex flex-col gap-3">
        <div class="flex items-center gap-3 text-tertiary">
          <Shield :size="18" />
          <span class="text-xs uppercase font-semibold tracking-wider">Роль в системе</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-lg font-medium text-secondary">{{ roleTitle }}</span>
          <span
            v-if="isAdmin"
            class="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-secondary text-neutral"
          >
            Admin
          </span>
        </div>
      </div>
      <div class="bg-white p-6 border border-secondary/10 flex flex-col gap-3">
        <div class="flex items-center gap-3 text-tertiary">
          <CheckCircle2 :size="18" class="text-green-600" />
          <span class="text-xs uppercase font-semibold tracking-wider">Статус аккаунта</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="size-2 rounded-full bg-green-500"></span>
          <p class="text-lg font-medium text-secondary">
            {{ user?.confirmed ? 'Подтвержден' : 'Активен' }}
          </p>
        </div>
      </div>
      <div
        class="bg-white p-6 border border-secondary/10 flex flex-col gap-3 md:col-span-2 lg:col-span-2"
      >
        <div class="flex items-center gap-3 text-tertiary">
          <Calendar :size="18" />
          <span class="text-xs uppercase font-semibold tracking-wider">Дата регистрации</span>
        </div>
        <p class="text-lg font-medium text-secondary">{{ formattedCreatedAt }}</p>
      </div>
    </div>
  </div>
</template>
