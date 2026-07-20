<script setup lang="ts">
import { ProductBreadcrumbs, ProductDetails, useProductDetails } from '@/entities/product'
import { useRoute } from 'vue-router'

const route = useRoute()
const { product, isLoading, error, handleAddToCart } = useProductDetails(
  () => route.params.id as string,
)
</script>

<template>
  <div class="flex flex-col gap-8 px-8 py-4 lg:px-16 lg:py-8">
    <ProductBreadcrumbs :product :isLoading />
    <ProductDetails :product :is-loading :error @add-to-cart="handleAddToCart" />
  </div>
</template>
