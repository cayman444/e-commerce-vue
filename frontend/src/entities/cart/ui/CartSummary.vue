<script setup lang="ts">
import { formatPrice } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'

defineProps<{
  totalPrice: number
  totalCount: number
}>()
</script>

<template>
  <div class="bg-secondary/5 border border-secondary/10 p-8 flex flex-col gap-6">
    <h2 class="font-display text-xl uppercase m-0 pb-4 border-b border-b-secondary/10">
      Сводка заказа
    </h2>
    <div class="flex flex-col gap-4 font-sans">
      <div class="flex justify-between items-center text-sm text-tertiary">
        <span>Товары ({{ totalCount }})</span>
        <span>{{ formatPrice(totalPrice) }}</span>
      </div>
      <div class="flex justify-between items-center text-sm text-tertiary">
        <span>Доставка</span>
        <span>Бесплатно</span>
      </div>
      <div
        class="flex justify-between items-center text-base font-semibold text-secondary pt-4 border-t border-t-secondary/10"
      >
        <span>Итого</span>
        <span>{{ formatPrice(totalPrice) }}</span>
      </div>
    </div>
    <Button variant="secondary" size="lg" class="w-full mt-4">Оформить заказ </Button>
    <p class="text-[10px] text-center text-tertiary leading-4 tracking-wide uppercase">
      Нажимая кнопку, вы соглашаетесь с условиями оферты и политикой конфиденциальности.
    </p>
  </div>
</template>
