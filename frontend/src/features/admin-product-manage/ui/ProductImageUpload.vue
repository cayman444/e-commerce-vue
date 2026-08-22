<script setup lang="ts">
import { Button } from '@/shared/ui'
import { Image as ImageIcon, Loader2, Plus, Trash2 } from '@lucide/vue'
import { ref } from 'vue'

export interface IImageFieldItem {
  key: string | number
  value: {
    url: string
    id?: number
  }
}

const props = defineProps<{
  images: IImageFieldItem[]
  isUploading?: boolean
}>()

const emits = defineEmits<{
  upload: [files: FileList | File[]]
  remove: [index: number]
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const onFilesSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    emits('upload', target.files)
    target.value = ''
  }
}
</script>

<template>
  <div class="space-y-2 border-t border-secondary/10 pt-3">
    <div class="flex items-center justify-between">
      <label class="text-xs uppercase text-tertiary">
        Изображения товара ({{ images.length }})
      </label>
      <Button
        type="button"
        variant="outline"
        size="sm"
        class="h-7 text-xs gap-1"
        :disabled="props.isUploading"
        @click="triggerFileInput"
      >
        <Loader2 v-if="props.isUploading" class="w-3.5 h-3.5 animate-spin" />
        <Plus v-else class="w-3.5 h-3.5" />
        Добавить фото
      </Button>
    </div>
    <input
      ref="fileInputRef"
      type="file"
      multiple
      accept="image/*"
      class="hidden"
      @change="onFilesSelected"
    />
    <div
      v-if="images.length === 0"
      class="border border-dashed border-secondary/20 p-6 text-center flex flex-col items-center justify-center gap-2 bg-neutral"
    >
      <ImageIcon class="w-8 h-8 opacity-40 text-tertiary" />
      <span class="text-xs text-tertiary">Изображения не загружены</span>
    </div>
    <div v-else class="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-1">
      <div
        v-for="(image, index) in images"
        :key="image.key"
        class="relative group aspect-square bg-white border border-secondary/10 overflow-hidden flex items-center justify-center"
      >
        <img :src="image.value.url" alt="Preview" class="w-full h-full object-cover" />
        <span
          v-if="index === 0"
          class="absolute bottom-1 left-1 bg-black/70 text-white text-[10px] px-1 py-0.5 rounded leading-none"
        >
          Главная
        </span>
        <button
          type="button"
          class="absolute top-1 right-1 bg-white/90 hover:bg-red-500 hover:text-white text-secondary p-1 rounded shadow transition-colors"
          title="Удалить"
          @click="emits('remove', index)"
        >
          <Trash2 class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>
