<script setup lang="ts">
import { onMounted } from 'vue'
import { MainLayout } from './app/layouts'
import { useUserStore } from './entities/user'

const { initAuth } = useUserStore()

onMounted(() => {
  initAuth()
})
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
