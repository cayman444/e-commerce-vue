<script setup lang="ts">
import { ProductCard, useProductStore } from '@/entities/product'
import { FilterCategories, SearchProducts } from '@/features/filter-products'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { setCategory } = productStore
const { filteredProducts, filters } = storeToRefs(productStore)
</script>

<template>
  <div class="text-center">
    <h1 class="font-display text-5xl leading-13 uppercase">Коллекция</h1>
    <p class="text-lg leading-7 text-tertiary mt-6 max-w-xl mx-auto">
      Кураторская подборка предметов и мебели, определяющих современный интерьер. Форма, функция и
      абсолютная точность.
    </p>
  </div>
  <div class="flex justify-between items-center">
    <FilterCategories :category="filters.category" @set-category="setCategory" />
    <SearchProducts v-model="filters.search" />
  </div>
  <div class="grid grid-cols-4 gap-6">
    <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
  </div>
</template>
