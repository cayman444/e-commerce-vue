<script setup lang="ts">
import { Skeleton } from '@/shared/ui/skeleton'
</script>

<template>
  <div
    class="flex items-center justify-between gap-4 py-6 border-b border-b-secondary/10 last:border-0"
  >
    <div class="flex items-center gap-4 grow">
      <div class="w-20 h-24 shrink-0">
        <Skeleton class="w-full h-full rounded-none bg-tertiary/20 animate-pulse" />
      </div>
      <div class="flex flex-col gap-2 grow">
        <Skeleton class="h-5 w-2/3 bg-tertiary/20 animate-pulse" />
        <Skeleton class="h-4 w-1/4 bg-tertiary/20 animate-pulse" />
      </div>
    </div>
    <div class="flex items-center gap-6 md:gap-12">
      <div class="w-28 h-9">
        <Skeleton class="w-full h-full rounded-none bg-tertiary/20 animate-pulse" />
      </div>
      <div class="w-24 h-6 hidden sm:block">
        <Skeleton class="w-full h-full rounded-none bg-tertiary/20 animate-pulse" />
      </div>
      <div class="w-9 h-9">
        <Skeleton class="w-full h-full rounded-none bg-tertiary/20 animate-pulse" />
      </div>
    </div>
  </div>
</template>
