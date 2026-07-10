import type { TCategory, TProductCategory, TSort } from './types'

export const CATEGORY_LABELS: Record<TProductCategory, string> = {
  furniture: 'Мебель',
  light: 'Свет',
  items: 'Предметы',
  accessories: 'Аксессуары',
}

export const CATEGORY_FILTERS: { name: string; value: TCategory }[] = [
  { name: 'Все', value: 'all' },
  ...Object.entries(CATEGORY_LABELS).map(([value, name]) => ({
    name,
    value: value as TProductCategory,
  })),
]

export const SORT_OPTIONS: { value: TSort; label: string }[] = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
]
