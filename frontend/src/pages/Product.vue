<script setup lang="ts">
import { useProductDetails } from '@/entities/product'
import { useRoute } from 'vue-router'

const route = useRoute()
const { product, isLoading, error } = useProductDetails(() => route.params.id as string)
</script>

<template>
  <div class="flex flex-col gap-16 px-8 py-4 md:px-16 md:py-8">
    <div v-if="isLoading" class="text-center">Загрузка информации о товаре...</div>
    <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
    <div v-else-if="product">
      <h1>{{ product.name }}</h1>
      <img :src="product.image" :alt="product.name" />
      <p>{{ product.price }}</p>
    </div>
  </div>
</template>
