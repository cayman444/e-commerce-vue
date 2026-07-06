export type TCategory = 'all' | 'furniture' | 'light' | 'items' | 'accessories'
export type TProductCategory = Exclude<TCategory, 'all'>

export interface IProduct {
  id: number
  name: string
  price: number
  image: string
  category: TProductCategory
}

export interface IProductFilters {
  category: TCategory
  search: string
}
