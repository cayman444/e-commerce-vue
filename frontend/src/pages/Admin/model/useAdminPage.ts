import { type IProduct, getProductsList } from '@/entities/product'
import { mapStrapiProductToProduct } from '@/shared/lib/utils'
import { computed, onMounted, ref } from 'vue'

export const useAdminPage = () => {
  const products = ref<IProduct[]>([])
  const isLoading = ref(false)
  const searchQuery = ref('')

  const isFormModalOpen = ref(false)
  const isDeleteModalOpen = ref(false)
  const selectedProduct = ref<IProduct | null>(null)

  const fetchProducts = async () => {
    isLoading.value = true
    try {
      const { data } = await getProductsList({
        populate: ['images', 'specs', 'accordions'],
        sort: 'createdAt:desc',
      })
      products.value = data.data.map(mapStrapiProductToProduct)
    } catch (err) {
      console.error('Failed to fetch products', err)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    fetchProducts()
  })

  const filteredProducts = computed(() => {
    if (!searchQuery.value.trim()) return products.value
    const query = searchQuery.value.toLowerCase()
    return products.value.filter((p) => p.name.toLowerCase().includes(query))
  })

  const handleAddProduct = () => {
    selectedProduct.value = null
    isFormModalOpen.value = true
  }

  const handleEditProduct = (product: IProduct) => {
    selectedProduct.value = product
    isFormModalOpen.value = true
  }

  const handleDeleteProduct = (product: IProduct) => {
    selectedProduct.value = product
    isDeleteModalOpen.value = true
  }

  return {
    products,
    filteredProducts,
    isLoading,
    searchQuery,
    isFormModalOpen,
    isDeleteModalOpen,
    selectedProduct,
    fetchProducts,
    handleAddProduct,
    handleEditProduct,
    handleDeleteProduct,
  }
}
