<script setup lang="ts">
import { useProductStore } from '@/entities/product'
import { Switch } from '@/shared/ui/switch'
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
      <label
        for="in-stock"
        class="flex items-center gap-3 text-sm text-tertiary uppercase font-semibold select-none cursor-pointer"
        >Только в наличии
        <Switch id="in-stock" v-model="filters.inStock" />
      </label>
    </div>
  </div>
</template>
