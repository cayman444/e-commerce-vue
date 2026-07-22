import type { IPriceRange, TCategory, TSort } from './types'

export const isCategoryFilter = (filter: unknown): filter is TCategory => {
  return (
    filter === 'all' ||
    filter === 'accessories' ||
    filter === 'furniture' ||
    filter === 'items' ||
    filter === 'light'
  )
}

export const isIPriceRangeFilter = (filter: unknown): filter is IPriceRange => {
  if (typeof filter !== 'object' || filter === null) {
    return false
  }

  return (
    'min' in filter &&
    (typeof filter.min === 'number' || typeof filter.min === null) &&
    'max' in filter &&
    (typeof filter.max === 'number' || typeof filter.max === null)
  )
}

export const isSortFilter = (filter: unknown): filter is TSort => {
  return filter === 'newest' || filter === 'price-asc' || filter === 'price-desc'
}
