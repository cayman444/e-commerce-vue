<script setup lang="ts">
import { PopoverContent, type PopoverContentProps, PopoverPortal, useForwardProps } from 'reka-ui'
import { computed } from 'vue'
import { cn } from '@/shared/lib/utils'

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

<style scoped>
.popover-content {
  transform-origin: var(--radix-popover-content-transform-origin);
  animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
