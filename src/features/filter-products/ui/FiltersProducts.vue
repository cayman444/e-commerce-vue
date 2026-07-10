<script setup lang="ts">
import { useProductStore } from '@/entities/product'
import { storeToRefs } from 'pinia'
import FilterCategories from './FilterCategories.vue'
import FilterRangePrice from './FilterRangePrice.vue'
import FilterSort from './FilterSort.vue'
import SearchProducts from './SearchProducts.vue'

const productStore = useProductStore()
const { setCategory, setPriceRange, setSort } = productStore
const { filters, maxProductPrice } = storeToRefs(productStore)
</script>

<template>
  <div>
    <div class="flex justify-between items-center pb-6 border-b border-b-tertiary/10">
      <FilterCategories :category="filters.category" @set-category="setCategory" />
      <SearchProducts v-model="filters.search" />
    </div>
    <div class="flex justify-between items-center pt-8">
      <div class="flex justify-between items-center gap-8">
        <FilterRangePrice
          :price-range="filters.price"
          :maxProductPrice="maxProductPrice"
          @set-price="setPriceRange"
        />
        <div class="self-stretch w-px bg-tertiary/10"></div>
        <FilterSort :current-sort="filters.sort" @set-sort="setSort" />
      </div>
      <div>Только в наличии</div>
    </div>
  </div>
</template>
