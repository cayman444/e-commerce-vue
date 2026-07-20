<script setup lang="ts">
import { router } from '@/app/router'
import { formatPrice } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { toast } from 'vue-sonner'
import type { IProduct } from '../model/types'
import ProductAccordion from './ProductAccordion.vue'

const { product } = defineProps<{
  product: IProduct
}>()

const emit = defineEmits<{
  (e: 'addToCart'): void
}>()

const addToCart = () => {
  emit('addToCart')
  toast.success(`${product.name} добавлен в корзину`, {
    description: formatPrice(product.price),
    action: {
      label: 'В корзину',
      onClick: () => router.push('/cart'),
    },
  })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="pb-8 border-b border-b-tertiary/10">
      <h1 class="text-5xl font-display">{{ product?.name }}</h1>
      <p class="mt-4 text-2xl">{{ formatPrice(product.price) }}</p>
    </div>
    <p class="leading-6">{{ product.description }}</p>
    <ul class="flex flex-col gap-6">
      <li
        v-for="{ id, title, description } in product.specs"
        :key="id"
        class="flex items-center justify-between pb-2 border-b border-b-tertiary/20"
      >
        <h4 class="uppercase text-tertiary">{{ title }}</h4>
        <p>{{ description }}</p>
      </li>
    </ul>
    <div class="flex flex-col gap-4">
      <Button variant="secondary" size="lg" @click="addToCart">
        В корзину
      </Button>
      <Button variant="outline" size="lg">В избранное</Button>
    </div>
    <ProductAccordion :accordions="product.accordions" />
  </div>
</template>


