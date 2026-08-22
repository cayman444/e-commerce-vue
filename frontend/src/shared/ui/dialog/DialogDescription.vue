<script setup lang="ts">
import { cn } from '@/shared/lib/utils'
import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'reka-ui'
import { computed } from 'vue'

const props = defineProps<DialogDescriptionProps & { class?: string }>()
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
const forwarded = useForwardProps(delegatedProps)
</script>

<template>
  <DialogDescription
    v-bind="forwarded"
    :class="cn('text-sm text-tertiary', props.class)"
  >
    <slot />
  </DialogDescription>
</template>
