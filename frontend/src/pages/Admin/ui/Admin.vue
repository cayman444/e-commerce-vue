<script setup lang="ts">
import { ProductDeleteModal, ProductFormModal } from '@/features/admin-product-manage'
import { AdminHeader, AdminProductTable } from '@/widgets/admin'
import { useAdminPage } from '../model/useAdminPage'

const {
  products,
  filteredProducts,
  isLoading,
  isDeleteModalOpen,
  isFormModalOpen,
  searchQuery,
  selectedProduct,
  fetchProducts,
  handleAddProduct,
  handleDeleteProduct,
  handleEditProduct,
} = useAdminPage()
</script>

<template>
  <div class="px-8 py-8 md:px-16 md:py-16 flex flex-col gap-18">
    <AdminHeader
      v-model:search="searchQuery"
      :total-count="products.length"
      @add-product="handleAddProduct"
    />
    <AdminProductTable
      :products="filteredProducts"
      :is-loading="isLoading"
      @edit="handleEditProduct"
      @delete="handleDeleteProduct"
    />
    <ProductFormModal
      v-model:open="isFormModalOpen"
      :product="selectedProduct"
      @saved="fetchProducts"
    />
    <ProductDeleteModal
      v-model:open="isDeleteModalOpen"
      :product="selectedProduct"
      @deleted="fetchProducts"
    />
  </div>
</template>
