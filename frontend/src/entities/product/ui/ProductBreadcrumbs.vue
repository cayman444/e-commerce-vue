<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/ui/breadcrumb'
import { Skeleton } from '@/shared/ui/skeleton'
import { CATEGORY_LABELS } from '../model/constants'
import type { IProduct } from '../model/types'

defineProps<{
  product: IProduct | null
  isLoading?: boolean
}>()
</script>

<template>
  <Breadcrumb class="text-xs uppercase tracking-wider text-tertiary font-sans">
    <BreadcrumbList class="gap-1.5 sm:gap-2">
      <BreadcrumbItem>
        <BreadcrumbLink as-child class="text-tertiary hover:text-secondary transition-colors">
          <RouterLink to="/">Главная</RouterLink>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <template v-if="isLoading">
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <Skeleton class="h-3 w-16 bg-tertiary/20" />
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <Skeleton class="h-3 w-24 bg-tertiary/20" />
        </BreadcrumbItem>
      </template>
      <template v-else-if="product">
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink as-child class="text-tertiary hover:text-secondary transition-colors">
            <RouterLink :to="`/catalog?category=${product.category}`">
              {{ CATEGORY_LABELS[product.category] }}
            </RouterLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage class="text-secondary font-medium">{{ product.name }}</BreadcrumbPage>
        </BreadcrumbItem>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
