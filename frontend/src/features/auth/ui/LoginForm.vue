<script setup lang="ts">
import { ROUTES_PATHS } from '@/app/router'
import { Button } from '@/shared/ui'
import { FormField } from '@/shared/ui/form-filed'
import { Loader2 } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { useLoginForm } from '../model/useLoginForm'

const { email, emailProps, password, passwordProps, errors, isLoading, formError, submitForm } =
  useLoginForm()
</script>

<template>
  <div class="bg-neutral border border-tertiary/20 p-8 sm:p-12 w-full max-w-md">
    <form class="flex flex-col gap-10" @submit.prevent="submitForm">
      <div class="text-center">
        <h1 class="uppercase font-display text-3xl">Вход в систему</h1>
        <p class="text-sm text-tertiary mt-2">Добро пожаловать в Archive Interior</p>
      </div>
      <div class="flex flex-col gap-6">
        <FormField
          id="email"
          label="Электронная почта"
          type="email"
          placeholder="example@archive.com"
          v-model="email"
          v-bind="emailProps"
          :error="errors.email"
        />
        <FormField
          id="password"
          label="Пароль"
          type="password"
          placeholder="••••••••"
          v-model="password"
          v-bind="passwordProps"
          :error="errors.password"
        />
        <div
          v-if="formError"
          class="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-medium tracking-wide text-center"
        >
          {{ formError }}
        </div>
        <Button size="lg" class="flex items-center justify-center gap-2" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="animate-spin" :size="16" />
          <span>{{ isLoading ? 'Вход...' : 'Войти' }}</span>
        </Button>
        <div class="space-x-2 text-center text-sm">
          <span class="text-tertiary">Нет аккаунта?</span>
          <RouterLink
            :to="ROUTES_PATHS.REGISTER"
            class="transition-all hover:text-primary font-medium"
          >
            Создать аккаунт
          </RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>
