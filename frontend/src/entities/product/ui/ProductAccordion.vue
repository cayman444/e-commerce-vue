<script setup lang="ts">
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { Plus } from '@lucide/vue'
import type { IAccordionItem } from '../model/types'

defineProps<{
  accordions?: IAccordionItem[]
}>()
</script>

<template>
  <Accordion type="single" collapsible class="w-full">
    <AccordionItem
      v-for="item in accordions"
      :key="item.id"
      :value="String(item.id)"
      class="border-b border-secondary/10"
    >
      <AccordionTrigger
        class="py-6 hover:no-underline text-xs uppercase tracking-widest text-secondary font-semibold"
      >
        {{ item.title }}
        <template #icon>
          <Plus
            class="h-4 w-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45"
          />
        </template>
      </AccordionTrigger>
      <AccordionContent class="pb-6 text-tertiary text-sm leading-relaxed">
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
