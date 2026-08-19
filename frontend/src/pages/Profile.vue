<script setup lang="ts">
import { CartInfo } from '@/entities/cart'
import { PersonalInfo } from '@/entities/user'
</script>

<template>
  <div class="px-8 py-8 md:px-16 md:py-16 flex flex-col gap-12">
    <div class="grid grid-cols-1 lg:grid-cols-12 items-start gap-6">
      <div class="lg:col-span-8">
        <PersonalInfo />
      </div>
      <div class="lg:col-span-4">
        <CartInfo />
      </div>
    </div>
  </div>
</template>
