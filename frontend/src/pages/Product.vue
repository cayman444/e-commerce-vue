<script setup lang="ts">
import { ProductBreadcrumbs, ProductDetails, useProductDetails } from '@/entities/product'
import { useRoute } from 'vue-router'

const route = useRoute()
const { product, isLoading, error } = useProductDetails(() => route.params.id as string)
</script>

<template>
  <div class="flex flex-col gap-8 px-8 py-4 md:px-16 md:py-8">
    <ProductBreadcrumbs :product :isLoading />
    <ProductDetails :product :is-loading :error />
  </div>
</template>
