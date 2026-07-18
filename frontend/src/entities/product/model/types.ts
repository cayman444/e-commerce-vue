export type TCategory = 'all' | 'furniture' | 'light' | 'items' | 'accessories'
export type TProductCategory = Exclude<TCategory, 'all'>
export interface IPriceRange {
  min: number | null
  max: number | null
}
export type TSort = 'newest' | 'price-asc' | 'price-desc'

export interface IProductSpecs {
  id: number
  title: string
  description: string
}

export interface IAccordionItem {
  id: number
  title: string
  content: string
}

export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  image: string
  images: string[]
  inStock: boolean
  createdAt: string
  category: TProductCategory
  specs?: IProductSpecs[]
  accordions?: IAccordionItem[]
}

export interface IProductFilters {
  category: TCategory
  search: string
  price: IPriceRange
  sort: TSort
  inStock: boolean
}

export interface IStrapiMedia {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  url: string
}

export interface IStrapiProduct {
  id: number
  documentId: string
  name: string
  description: string
  price: number
  inStock: boolean
  category: TProductCategory
  createdAt: string
  updatedAt: string
  publishedAt: string
  images?: IStrapiMedia[]
  specs?: IProductSpecs[]
  accordions?: IAccordionItem[]
}

export interface IStrapiResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}
