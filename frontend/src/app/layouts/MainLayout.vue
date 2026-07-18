<script setup lang="ts">
import { Footer, Header } from '@/widgets'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-neutral text-secondary">
    <Header />
    <main class="grow w-full max-w-[1440px] mx-auto">
      <slot />
    </main>
    <Footer />
  </div>
</template>
