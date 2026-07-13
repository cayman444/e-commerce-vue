import type { IPriceRange } from '@/entities/product'
import { computed, ref, watch } from 'vue'

export const useFilterRangePrice = (
  getPriceRange: () => IPriceRange,
  getMaxProductPrice: () => number | undefined,
  onApply: (range: IPriceRange) => void,
) => {
  const priceRange = computed(getPriceRange)
  const maxProductPrice = computed(getMaxProductPrice)
  const localRange = ref([0, 5000])
  const isOpen = ref(false)

  watch(
    [() => priceRange.value.min, () => priceRange.value.max, () => maxProductPrice.value],
    ([min, max, maxLimit]) => {
      localRange.value = [min ?? 0, max ?? maxLimit ?? 5000]
    },
    { immediate: true },
  )

  const applyPrice = () => {
    onApply({
      min: localRange.value[0] as number,
      max: localRange.value[1] as number,
    })
    isOpen.value = false
  }

  return {
    isOpen,
    localRange,
    applyPrice,
  }
}
