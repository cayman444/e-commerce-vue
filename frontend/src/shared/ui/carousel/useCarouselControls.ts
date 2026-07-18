import type { Carousel } from '@/shared/ui/carousel'
import { ref, useTemplateRef, watch } from 'vue'

export function useCarouselControls(refId: string) {
  const carouselRef = useTemplateRef<InstanceType<typeof Carousel>>(refId)
  const activeIndex = ref(0)

  watch(
    () => carouselRef.value?.carouselApi,
    (api) => {
      if (!api) return

      activeIndex.value = api.selectedScrollSnap()

      api.on('select', () => {
        activeIndex.value = api.selectedScrollSnap()
      })
    },
  )

  const selectSlide = (index: number) => {
    carouselRef.value?.carouselApi?.scrollTo(index)
  }

  return {
    carouselRef,
    activeIndex,
    selectSlide,
  }
}
