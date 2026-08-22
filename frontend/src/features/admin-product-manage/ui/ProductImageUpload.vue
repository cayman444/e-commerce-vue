<script setup lang="ts">
import { Button } from '@/shared/ui'
import { Image as ImageIcon, Loader2, Upload } from '@lucide/vue'
import { ref } from 'vue'

const props = defineProps<{
  imageUrl?: string
  isUploading?: boolean
}>()

const emits = defineEmits<{
  (e: 'upload', file: File): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    emits('upload', file)
  }
}
</script>

<template>
  <div class="space-y-2">
    <label class="block text-xs uppercase tracking-wider text-tertiary">Изображение товара</label>
    <div
      class="border border-dashed border-secondary/20 p-4 text-center flex flex-col items-center justify-center gap-3 bg-neutral"
    >
      <div
        v-if="props.imageUrl"
        class="relative group w-32 h-32 overflow-hidden bg-white border border-secondary/10"
      >
        <img :src="props.imageUrl" alt="Preview" class="w-full h-full object-cover" />
      </div>
      <div v-else class="flex flex-col items-center gap-1 text-tertiary">
        <ImageIcon class="w-8 h-8 opacity-50" />
        <span class="text-xs">Изображение не загружено</span>
      </div>
      <input
        ref="fileInputRef"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileSelected"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        :disabled="props.isUploading"
        @click="triggerFileInput"
      >
        <Loader2 v-if="props.isUploading" class="w-4 h-4 animate-spin mr-1" />
        <Upload v-else class="w-4 h-4 mr-1" />
        {{ props.imageUrl ? 'Изменить фото' : 'Загрузить фото' }}
      </Button>
    </div>
  </div>
</template>
