<script setup lang="ts">
import { Footer, Header } from '@/widgets'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-neutral text-secondary">
    <Header />
    <main class="grow w-full max-w-[1440px] mx-auto px-8 py-8 md:px-16 md:py-16">
      <slot />
    </main>
    <Footer />
  </div>
</template>
