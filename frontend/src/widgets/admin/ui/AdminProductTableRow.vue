<script setup lang="ts">
import { CATEGORY_LABELS, type IProduct } from '@/entities/product'
import { formatPrice } from '@/shared/lib/utils'
import { Button } from '@/shared/ui'
import { Edit2, Image as ImageIcon, Trash2 } from '@lucide/vue'
import { ref } from 'vue'

defineProps<{
  product: IProduct
}>()

const emits = defineEmits<{
  (e: 'edit', product: IProduct): void
  (e: 'delete', product: IProduct): void
}>()

const isLoaded = ref(false)
</script>

<template>
  <tr class="border-b border-secondary/10 hover:bg-black/5 transition-colors text-sm">
    <td class="py-3 px-4">
      <div
        class="w-12 h-12 bg-neutral border border-secondary/10 overflow-hidden flex items-center justify-center"
      >
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          @load="isLoaded = true"
          class="w-full h-full object-cover mix-blend-multiply transition-all duration-700 ease-out"
          :class="isLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'"
        />
        <ImageIcon v-else class="w-5 h-5 text-tertiary opacity-40" />
      </div>
    </td>
    <td class="py-3 px-4 font-medium text-secondary">
      {{ product.name }}
    </td>
    <td class="py-3 px-4 text-tertiary">
      {{ CATEGORY_LABELS[product.category] || product.category }}
    </td>
    <td class="py-3 px-4 font-semibold text-secondary">
      {{ formatPrice(product.price) }}
    </td>
    <td class="py-3 px-4">
      <span
        class="inline-block px-2 py-0.5 text-xs rounded-full font-medium"
        :class="product.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'"
      >
        {{ product.inStock ? 'В наличии' : 'Нет на складе' }}
      </span>
    </td>
    <td class="py-3 px-4 text-right">
      <div class="flex items-center justify-end gap-1">
        <Button
          variant="outline"
          size="sm"
          class="h-8 w-8 p-0"
          title="Редактировать"
          @click="emits('edit', product)"
        >
          <Edit2 class="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          class="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
          title="Удалить"
          @click="emits('delete', product)"
        >
          <Trash2 class="w-3.5 h-3.5" />
        </Button>
      </div>
    </td>
  </tr>
</template>
