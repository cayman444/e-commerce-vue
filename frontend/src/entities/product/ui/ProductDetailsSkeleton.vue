<script setup lang="ts">
import { Skeleton } from '@/shared/ui/skeleton'
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-24 animate-pulse">
    <div class="lg:col-span-7 flex flex-col gap-4">
      <Skeleton class="aspect-3/2 w-full rounded-none bg-secondary/5" />
      <div class="grid grid-cols-4 gap-4">
        <Skeleton
          v-for="n in 4"
          :key="n"
          class="aspect-square w-full rounded-none bg-secondary/5"
        />
      </div>
    </div>
    <div class="lg:col-span-5 flex flex-col gap-8 pt-4">
      <div class="border-b border-secondary/10 pb-8 flex flex-col gap-4">
        <Skeleton class="h-12 w-3/4 bg-secondary/5" />
        <Skeleton class="h-6 w-1/4 bg-secondary/5" />
      </div>
      <div class="flex flex-col gap-3">
        <Skeleton class="h-4 w-full bg-secondary/5" />
        <Skeleton class="h-4 w-5/6 bg-secondary/5" />
        <Skeleton class="h-4 w-4/6 bg-secondary/5" />
      </div>
      <div class="flex flex-col gap-4 pt-4 border-t border-secondary/10">
        <Skeleton class="h-16 w-full bg-secondary/5" />
        <Skeleton class="h-16 w-full bg-secondary/5" />
      </div>
    </div>
  </div>
</template>
