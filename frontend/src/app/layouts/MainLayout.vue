<script setup lang="ts">
import { Toaster } from '@/shared/ui'
import { Footer, Header } from '@/widgets'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-neutral text-secondary">
    <Toaster />
    <Header />
    <main class="grow flex flex-col w-full max-w-360 mx-auto">
      <slot />
    </main>
    <Footer />
  </div>
</template>
