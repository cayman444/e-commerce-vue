<script setup lang="ts">
import { FilterCategories, SearchProducts } from '@/features/filter-products'
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
    <FilterCategories />
    <SearchProducts />
  </div>
</template>
