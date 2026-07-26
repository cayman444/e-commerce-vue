<script setup lang="ts">
import { ROUTES_PATHS } from '@/app/router'
import { Button } from '@/shared/ui'
import { FormField } from '@/shared/ui/form-filed'
import { AlertCircle, Loader2 } from '@lucide/vue'
import { RouterLink } from 'vue-router'
import { useLoginForm } from '../model/useLoginForm'

const { email, emailProps, password, passwordProps, errors, isLoading, formError, submitForm } =
  useLoginForm()
</script>

<template>
  <div class="bg-neutral border border-secondary/10 p-8 sm:p-12 w-full max-w-md rounded-none">
    <form class="flex flex-col gap-10" @submit.prevent="submitForm">
      <div class="text-center">
        <h1 class="uppercase font-display text-3xl tracking-wider text-secondary">
          Вход в систему
        </h1>
        <p class="text-xs uppercase tracking-widest text-tertiary mt-2">
          Добро пожаловать в Archive Interior
        </p>
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
          class="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/20 border-l-2 border-l-red-600 text-red-600 text-xs font-medium tracking-wide rounded-none"
        >
          <AlertCircle :size="16" class="shrink-0 text-red-600" />
          <span>{{ formError }}</span>
        </div>
      </div>
      <div class="flex flex-col gap-6">
        <Button
          size="lg"
          class="w-full h-12 rounded-none text-xs uppercase tracking-widest bg-secondary text-neutral hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
          :disabled="isLoading"
        >
          <Loader2 v-if="isLoading" class="animate-spin" :size="16" />
          <span>{{ isLoading ? 'Вход...' : 'Войти' }}</span>
        </Button>
        <div class="text-center text-xs tracking-wider text-tertiary">
          <span>Нет аккаунта? </span>
          <RouterLink
            :to="ROUTES_PATHS.REGISTER"
            class="text-secondary font-semibold underline underline-offset-4 hover:opacity-70 transition-opacity ml-1"
          >
            Создать аккаунт
          </RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>
