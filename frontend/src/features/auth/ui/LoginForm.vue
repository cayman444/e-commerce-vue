<script setup lang="ts">
import { ROUTES_PATHS } from '@/app/router'
import { Button } from '@/shared/ui'
import { FormField } from '@/shared/ui/form-filed'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { RouterLink } from 'vue-router'
import { z } from 'zod'

const schema = toTypedSchema(
  z.object({
    email: z.string().nonempty('Поле обязательно').email('Некорректный email'),
    password: z.string().nonempty('Поле обязательно').min(6, 'Минимум 6 символов'),
  }),
)

const { errors, defineField, handleSubmit, meta } = useForm({
  validationSchema: schema,
})

const [email, emailProps] = defineField('email')
const [password, passwordProps] = defineField('password')

const submitForm = handleSubmit((values) => {
  console.log('Успешная отправка:', values)
})
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
        <Button size="lg" class="mt-4" :disabled="!meta.valid">Войти</Button>
        <div class="space-x-2 text-center text-sm">
          <span class="text-tertiary">Нет аккаунта?</span>
          <RouterLink
            :to="ROUTES_PATHS.REGISTER"
            class="transition-all hover:opacity-70 font-medium"
          >
            Создать аккаунт
          </RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>
