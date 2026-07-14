<script setup lang="ts">
import { ProductList, useProductStore } from '@/entities/product'
import { FiltersProducts } from '@/features/filter-products'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const productStore = useProductStore()
const { products, isLoading, error } = storeToRefs(productStore)

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div class="flex flex-col gap-16">
    <div class="text-center">
      <h1 class="font-display text-5xl leading-13 uppercase">Коллекция</h1>
      <p class="text-lg leading-7 text-tertiary mt-6 max-w-xl mx-auto">
        Кураторская подборка предметов и мебели, определяющих современный интерьер. Форма, функция и
        абсолютная точность.
      </p>
    </div>
    <FiltersProducts />
    <ProductList :products :isLoading :error />
  </div>
</template>
