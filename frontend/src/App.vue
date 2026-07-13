<script setup lang="ts">
import { MainLayout } from './app/layouts'
</script>

<template>
  <MainLayout>
    <RouterView v-slot="{ Component }">
      <Transition appear name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </MainLayout>
</template>
