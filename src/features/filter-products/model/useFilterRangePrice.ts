import type { IPriceRange } from '@/entities/product'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useTemplateRef, watch } from 'vue'

export const useFilterRangePrice = (
  getPriceRange: () => IPriceRange,
  getMaxProductPrice: () => number | undefined,
  onApply: (range: IPriceRange) => void,
) => {
  const containerRef = useTemplateRef<HTMLElement>('container')
  const localRange = ref([0, 5000])
  const isOpen = ref(false)

  const priceRange = computed(getPriceRange)
  const maxProductPrice = computed(getMaxProductPrice)

  onClickOutside(containerRef, () => (isOpen.value = false))

  watch(
    [() => priceRange.value.min, () => priceRange.value.max, () => maxProductPrice.value],
    ([min, max, maxLimit]) => {
      localRange.value = [min ?? 0, max ?? maxLimit ?? 5000]
    },
    { immediate: true },
  )

  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  const applyPrice = () => {
    onApply({
      min: localRange.value[0] as number,
      max: localRange.value[1] as number,
    })
    isOpen.value = false
  }

  return {
    isOpen,
    containerRef,
    localRange,
    toggle,
    applyPrice,
  }
}
