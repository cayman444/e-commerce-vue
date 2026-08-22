<script setup lang="ts">
import { cn } from '@/shared/lib/utils'
import { DialogTitle, type DialogTitleProps, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<DialogTitleProps & { class?: string }>()
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <DialogTitle
    v-bind="forwarded"
    :class="cn('text-lg font-medium leading-none tracking-tight text-secondary', props.class)"
  >
    <slot />
  </DialogTitle>
</template>
