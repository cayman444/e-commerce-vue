<script setup lang="ts">
import type { IProductsToCart } from '../model/types.ts'
import CartItem from './CartItem.vue'
import CartItemSkeleton from './CartItemSkeleton.vue'
import CartListError from './CartListError.vue'

withDefaults(
  defineProps<{
    productsToCart: IProductsToCart[]
    isLoading?: boolean
    error?: string | null
  }>(),
  {
    isLoading: false,
    error: null,
  },
)

defineEmits<{
  (e: 'increment', productId: string): void
  (e: 'decrement', productId: string): void
  (e: 'remove', productId: string): void
}>()
</script>

<template>
  <CartListError v-if="error" :error="error" />
  <Transition v-else name="fade" mode="out-in">
    <div v-if="isLoading && productsToCart.length === 0" class="flex flex-col border-t border-b border-secondary/10">
      <CartItemSkeleton v-for="n in 3" :key="n" />
    </div>
    <div
      v-else
      class="relative flex flex-col border-t border-b border-secondary/10 transition-opacity duration-300"
      :class="{ 'opacity-50 pointer-events-none': isLoading }"
    >
      <TransitionGroup name="list">
        <CartItem
          v-for="item in productsToCart"
          :key="item.productId"
          :item="item"
          @increment="$emit('increment', item.productId)"
          @decrement="$emit('decrement', item.productId)"
          @remove="$emit('remove', item.productId)"
        />
      </TransitionGroup>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

.list-move {
  transition: transform 0.5s ease;
}
</style>
