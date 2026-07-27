<script setup lang="ts">
import { cn } from '@/shared/lib/utils'
import { PopoverContent, type PopoverContentProps, PopoverPortal, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

const props = withDefaults(defineProps<PopoverContentProps & { class?: string }>(), {
  align: 'start',
  sideOffset: 12,
})

const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.class
  return delegated
})

const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="forwarded"
      :class="
        cn(
          'z-50 bg-neutral border border-secondary/10 shadow-lg outline-none rounded-none popover-content',
          props.class,
        )
      "
    >
      <slot />
    </PopoverContent>
  </PopoverPortal>
</template>

<style>
.popover-content[data-state='open'] {
  animation: popoverFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.popover-content[data-state='closed'] {
  animation: popoverFadeOut 0.15s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popoverFadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes popoverFadeOut {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
  }
}
</style>
