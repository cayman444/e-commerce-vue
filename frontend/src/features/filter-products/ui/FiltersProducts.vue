<script setup lang="ts">
import { useProductStore } from '@/entities/product'
import { Switch } from '@/shared/ui/switch'
import { storeToRefs } from 'pinia'
import FilterCategories from './FilterCategories.vue'
import FilterRangePrice from './FilterRangePrice.vue'
import FilterSort from './FilterSort.vue'
import SearchProducts from './SearchProducts.vue'

const productStore = useProductStore()
const { updateFilters } = productStore
const { filters, maxProductPrice } = storeToRefs(productStore)
</script>

<template>
  <div>
    <div class="flex justify-between items-center pb-6 border-b border-b-tertiary/10">
      <FilterCategories
        :category="filters.category"
        @set-category="(category) => updateFilters({ category })"
      />
      <SearchProducts
        :model-value="filters.search"
        @update:model-value="(search) => updateFilters({ search })"
      />
    </div>
    <div class="flex justify-between items-center pt-8">
      <div class="flex justify-between items-center gap-8">
        <FilterRangePrice
          :price-range="{ min: filters.minPrice, max: filters.maxPrice }"
          :max-product-price="maxProductPrice"
          @set-price="({ min, max }) => updateFilters({ minPrice: min, maxPrice: max })"
        />
        <div class="self-stretch w-px bg-tertiary/10"></div>
        <FilterSort :current-sort="filters.sort" @set-sort="(sort) => updateFilters({ sort })" />
      </div>
      <label
        for="in-stock"
        class="flex items-center gap-3 text-sm text-tertiary uppercase font-semibold select-none cursor-pointer"
        >Только в наличии
        <Switch
          id="in-stock"
          :modelValue="filters.inStock"
          @update:modelValue="(inStock) => updateFilters({ inStock })"
        />
      </label>
    </div>
  </div>
</template>
