<script setup lang="ts">
import { router } from '@/app/router'
import { useCartStore } from '@/entities/cart'
import { ProductList, useProductStore } from '@/entities/product'
import type { IProduct } from '@/entities/product'
import { FiltersProducts } from '@/features/filter-products'
import { formatPrice } from '@/shared/lib/utils'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { toast } from 'vue-sonner'

const productStore = useProductStore()
const { products, isLoading, error } = storeToRefs(productStore)

const cartStore = useCartStore()

const handleAddToCart = (product: IProduct) => {
  cartStore.addToCart({
    productId: product.id,
    priceForOne: product.price,
    name: product.name,
    image: product.image,
  })
  toast.success(`${product.name} добавлен в корзину`, {
    description: formatPrice(product.price),
    action: {
      label: 'В корзину',
      onClick: () => router.push('/cart'),
    },
  })
}

onMounted(() => productStore.fetchProducts())
</script>

<template>
  <div class="flex flex-col gap-16 px-8 py-8 md:px-16 md:py-16">
    <div class="text-center">
      <h1 class="font-display text-5xl leading-13 uppercase">Коллекция</h1>
      <p class="text-lg leading-7 text-tertiary mt-6 max-w-xl mx-auto">
        Кураторская подборка предметов и мебели, определяющих современный интерьер. Форма, функция и
        абсолютная точность.
      </p>
    </div>
    <FiltersProducts />
    <ProductList :products :isLoading :error @add-to-cart="handleAddToCart" />
  </div>
</template>
