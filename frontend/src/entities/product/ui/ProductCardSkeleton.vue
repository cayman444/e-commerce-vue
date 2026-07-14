<script setup lang="ts">
import { Skeleton } from '@/shared/ui/skeleton'
</script>

<template>
  <li class="flex flex-col gap-5">
    <Skeleton class="aspect-3/4 w-full rounded-none bg-tertiary/20" />
    <div class="flex flex-col gap-2.5 px-1">
      <Skeleton class="h-3 w-1/3 bg-tertiary/20" />
      <div class="flex justify-between items-center gap-4">
        <Skeleton class="h-5 w-1/2 bg-tertiary/20" />
        <Skeleton class="h-5 w-1/4 bg-tertiary/20" />
      </div>
    </div>
  </li>
</template>
