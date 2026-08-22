import { uploadMedias } from '@/shared/api/upload'
import { getStrapiErrorMessage } from '@/shared/lib/utils'
import { ref } from 'vue'
import { toast } from 'vue-sonner'
import type { IProductImageItem } from './product.schema'

export const useProductImageUpload = (
  onUploaded: (media: IProductImageItem) => void,
) => {
  const isUploading = ref(false)

  const upload = async (files: FileList | File[]) => {
    isUploading.value = true
    try {
      const uploaded = await uploadMedias(files)
      for (const media of uploaded) {
        onUploaded({ id: media.id, url: media.url })
      }
      toast.success(
        uploaded.length > 1 ? 'Изображения успешно загружены' : 'Изображение успешно загружено',
      )
    } catch (err) {
      toast.error(getStrapiErrorMessage(err, 'Ошибка загрузки изображений'))
    } finally {
      isUploading.value = false
    }
  }

  return {
    isUploading,
    upload,
  }
}
