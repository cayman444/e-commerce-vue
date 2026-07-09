<script setup lang="ts">
import { useProductStore } from '@/entities/product'
import { storeToRefs } from 'pinia'
import FilterCategories from './FilterCategories.vue'
import SearchProducts from './SearchProducts.vue'

const productStore = useProductStore()
const { setCategory } = productStore
const { filters } = storeToRefs(productStore)
</script>

<template>
  <div class="flex justify-between items-center pb-6 border-b border-b-tertiary/10">
    <FilterCategories :category="filters.category" @set-category="setCategory" />
    <SearchProducts v-model="filters.search" />
  </div>
</template>
