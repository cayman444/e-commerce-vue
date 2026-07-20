<script lang="ts" setup>
import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
  XIcon,
} from '@lucide/vue'
import { reactiveOmit } from '@vueuse/core'
import type { ToasterProps } from 'vue-sonner'
import { Toaster as Sonner } from 'vue-sonner'

const props = defineProps<ToasterProps>()
const delegatedProps = reactiveOmit(props, 'toastOptions')
</script>

<template>
  <Sonner
    class="toaster group"
    :toast-options="{
      classes: {
        toast:
          'group toast group-[.toaster]:bg-neutral group-[.toaster]:text-secondary group-[.toaster]:border-secondary/10 group-[.toaster]:shadow-md group-[.toaster]:rounded-none border font-sans',
        description: 'group-[.toast]:text-tertiary text-xs',
        actionButton:
          'group-[.toast]:bg-primary group-[.toast]:text-neutral group-[.toast]:rounded-none',
        cancelButton:
          'group-[.toast]:bg-secondary/10 group-[.toast]:text-secondary group-[.toast]:rounded-none',
      },
    }"
    v-bind="delegatedProps"
  >
    <template #success-icon>
      <CircleCheckIcon class="size-4" />
    </template>
    <template #info-icon>
      <InfoIcon class="size-4" />
    </template>
    <template #warning-icon>
      <TriangleAlertIcon class="size-4" />
    </template>
    <template #error-icon>
      <OctagonXIcon class="size-4" />
    </template>
    <template #loading-icon>
      <div>
        <Loader2Icon class="size-4 animate-spin" />
      </div>
    </template>
    <template #close-icon>
      <XIcon class="size-4" />
    </template>
  </Sonner>
</template>

<style>
.toaster.group {
  --normal-bg: var(--color-neutral);
  --normal-text: var(--color-secondary);
  --normal-border: rgba(17, 17, 21, 0.1);
  --border-radius: 0px;
  font-family: var(--font-sans);
}

.toaster .toast {
  border-radius: 0px !important;
}
</style>
