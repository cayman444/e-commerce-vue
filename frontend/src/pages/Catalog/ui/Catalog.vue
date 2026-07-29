<script setup lang="ts">
import { ProductList } from '@/entities/product'
import { FiltersProducts } from '@/features/filter-products'
import { useCatalogPage } from '../model/useCatalogPage'

const { products, isLoading, error, handleAddToCart } = useCatalogPage()
</script>

<template>
  <div class="flex flex-col gap-16 px-8 py-8 md:px-16 md:py-16">
    <div class="text-center">
      <h1 class="font-display text-5xl leading-13 uppercase">Коллекция</h1>
      <p class="text-lg leading-7 text-tertiary mt-6 max-w-xl mx-auto">
        Кураторская подборка предметов и мебели, определяющих современный интерьер. Форма, функция и
        абсолютная точность.
      </p>
    </div>
    <FiltersProducts />
    <ProductList :products :isLoading :error @add-to-cart="handleAddToCart" />
  </div>
</template>
