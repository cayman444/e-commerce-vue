<script setup lang="ts">
import { formatPrice } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { ArrowRight } from '@lucide/vue'
import { useCartInfo } from '../model/useCartInfo'

const { totalCount, totalPrice, handleToCart } = useCartInfo()
</script>

<template>
  <div class="bg-white p-8">
    <div class="flex flex-col gap-6">
      <div class="flex flex-col gap-1">
        <h2 class="text-2xl font-display uppercase">Корзина</h2>
        <p class="text-tertiary">
          {{ totalCount === 0 ? 'Ваша корзина пуста' : `${totalCount} шт. в заказе` }}
        </p>
      </div>
      <div class="flex justify-between items-center pb-2 border-b border-b-secondary/10">
        <div class="uppercase text-tertiary font-semibold text-sm">Итого</div>
        <div class="font-display text-2xl">{{ formatPrice(totalPrice) }}</div>
      </div>
      <Button @click="handleToCart" class="w-full mt-2 flex items-center justify-center gap-2">
        <span>Перейти в корзину</span>
        <ArrowRight :size="16" />
      </Button>
    </div>
  </div>
</template>
