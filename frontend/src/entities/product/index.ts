export { default as ProductList } from './ui/ProductList.vue'
export { default as ProductBreadcrumbs } from './ui/ProductBreadcrumbs.vue'
export { default as ProductDetails } from './ui/ProductDetails.vue'
export { default as ProductAccordion } from './ui/ProductAccordion.vue'
export { useProductStore } from './model/store'
export { CATEGORY_LABELS, CATEGORY_FILTERS, SORT_OPTIONS } from './model/constants'
export { useProductDetails } from './model/useProductDetails.ts'
export { getProductById, getProductsList, createProduct, updateProduct, deleteProduct } from './api/product.ts'
export type {
  IProduct,
  TCategory,
  TProductCategory,
  IPriceRange,
  TSort,
  IStrapiProduct,
  IStrapiMedia,
  ICreateProductDTO,
  IUpdateProductDTO,
  ISpecItemDTO,
  IAccordionItemDTO,
} from './model/types'

