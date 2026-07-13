export type TCategory = 'all' | 'furniture' | 'light' | 'items' | 'accessories'
export type TProductCategory = Exclude<TCategory, 'all'>
export interface IPriceRange {
  min: number | null
  max: number | null
}
export type TSort = 'newest' | 'price-asc' | 'price-desc'

export interface IProduct {
  id: number
  name: string
  price: number
  image: string
  inStock: boolean
  createdAt: string
  category: TProductCategory
}

export interface IProductFilters {
  category: TCategory
  search: string
  price: IPriceRange
  sort: TSort
  inStock: boolean
}
