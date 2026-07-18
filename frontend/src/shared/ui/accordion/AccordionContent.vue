<script setup lang="ts">
import { cn } from '@/shared/lib/utils'
import { reactiveOmit } from '@vueuse/core'
import type { AccordionContentProps } from 'reka-ui'
import { AccordionContent } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

const props = defineProps<AccordionContentProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = reactiveOmit(props, 'class')
</script>

<template>
  <AccordionContent v-bind="delegatedProps" class="AccordionContent text-sm">
    <div :class="cn('pb-4 pt-0', props.class)">
      <slot />
    </div>
  </AccordionContent>
</template>

<style scoped>
.AccordionContent {
  overflow: hidden;
}
.AccordionContent[data-state='open'] {
  animation: slideDown 300ms ease;
}
.AccordionContent[data-state='closed'] {
  animation: slideUp 300ms ease;
}

@keyframes slideDown {
  from {
    height: 0;
  }
  to {
    height: var(--reka-accordion-content-height);
  }
}

@keyframes slideUp {
  from {
    height: var(--reka-accordion-content-height);
  }
  to {
    height: 0;
  }
}
</style>
