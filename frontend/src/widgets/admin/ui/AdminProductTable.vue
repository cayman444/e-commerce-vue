<script setup lang="ts">
import type { IProduct } from '@/entities/product'
import AdminProductTableRow from './AdminProductTableRow.vue'

const props = defineProps<{
  products: IProduct[]
  isLoading: boolean
}>()

const emits = defineEmits<{
  (e: 'edit', product: IProduct): void
  (e: 'delete', product: IProduct): void
}>()
</script>

<template>
  <div class="overflow-x-auto border border-secondary/10 bg-neutral shadow-xs">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr
          class="border-b border-secondary/10 bg-black/5 text-xs uppercase tracking-wider text-tertiary"
        >
          <th class="py-3 px-4 w-16">Фото</th>
          <th class="py-3 px-4">Название</th>
          <th class="py-3 px-4">Категория</th>
          <th class="py-3 px-4">Цена</th>
          <th class="py-3 px-4">Статус</th>
          <th class="py-3 px-4 text-right">Действия</th>
        </tr>
      </thead>
      <tbody v-if="props.isLoading">
        <tr v-for="i in 5" :key="i" class="border-b border-secondary/10 animate-pulse">
          <td class="py-3 px-4"><div class="w-12 h-12 bg-secondary/10"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-secondary/10 w-3/4"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-secondary/10 w-1/2"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-secondary/10 w-1/3"></div></td>
          <td class="py-3 px-4"><div class="h-4 bg-secondary/10 w-1/4"></div></td>
          <td class="py-3 px-4"><div class="h-8 bg-secondary/10 w-16 ml-auto"></div></td>
        </tr>
      </tbody>
      <tbody v-else-if="props.products.length > 0">
        <AdminProductTableRow
          v-for="product in props.products"
          :key="product.id"
          :product="product"
          @edit="(p) => emits('edit', p)"
          @delete="(p) => emits('delete', p)"
        />
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6" class="py-12 text-center text-tertiary text-sm">Товары не найдены</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
