import type { IStrapiMedia } from '@/entities/product/model/types'
import { getStrapiMediaUrl } from '@/shared/lib/utils'
import { apiInstance } from './client'

export const uploadMedia = async (file: File): Promise<IStrapiMedia> => {
  const formData = new FormData()
  formData.append('files', file)

  const response = await apiInstance.post<IStrapiMedia[]>('/upload', formData)
  if (!response.data?.[0]) {
    throw new Error('Failed to upload file')
  }

  const media = response.data[0]
  return { ...media, url: getStrapiMediaUrl(media.url) }
}

export const uploadMedias = async (files: FileList | File[]): Promise<IStrapiMedia[]> => {
  const formData = new FormData()
  for (const file of Array.from(files)) {
    formData.append('files', file)
  }

  const response = await apiInstance.post<IStrapiMedia[]>('/upload', formData)
  if (!response.data || response.data.length === 0) {
    throw new Error('Failed to upload files')
  }

  return response.data.map((media) => ({
    ...media,
    url: getStrapiMediaUrl(media.url),
  }))
}


