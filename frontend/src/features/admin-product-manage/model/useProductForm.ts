import type { IAccordionItemDTO, IProduct, ISpecItemDTO } from '@/entities/product'
import { createProduct, updateProduct } from '@/entities/product'
import { getStrapiErrorMessage, getStrapiMediaUrl } from '@/shared/lib/utils'
import { useFieldArray, useForm } from 'vee-validate'
import { computed, ref, type Ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { type IProductImageItem, type ProductFormValues, productSchema } from './product.schema'
import { useProductImageUpload } from './useProductImageUpload'

const getInitialValues = (prod?: IProduct | null): ProductFormValues => {
  const images: IProductImageItem[] =
    prod?.rawImages?.map((img) => ({ id: img.id, url: getStrapiMediaUrl(img.url) })) ||
    prod?.images?.map((url) => ({ url })) ||
    []

  return {
    name: prod?.name || '',
    price: prod?.price ?? (undefined as unknown as number),
    category: prod?.category || 'furniture',
    inStock: prod?.inStock ?? true,
    description: prod?.description || '',
    images,
    specs: prod?.specs?.map((s) => ({ title: s.title, description: s.description })) || [],
    accordions: prod?.accordions?.map((a) => ({ title: a.title, content: a.content })) || [],
  }
}

export const useProductForm = (
  product: Ref<IProduct | null | undefined>,
  onSuccess?: () => void,
) => {
  const isLoading = ref(false)
  const isEditing = computed(() => Boolean(product.value?.id))

  const { errors, defineField, handleSubmit, resetForm } = useForm<ProductFormValues>({
    validationSchema: productSchema,
    initialValues: getInitialValues(product.value),
  })

  const [name] = defineField('name')
  const [price] = defineField('price')
  const [category] = defineField('category')
  const [inStock] = defineField('inStock')
  const [description] = defineField('description')

  const {
    fields: imageFields,
    push: addImage,
    remove: removeImage,
  } = useFieldArray<IProductImageItem>('images')

  const {
    fields: specFields,
    push: addSpec,
    remove: removeSpec,
  } = useFieldArray<ISpecItemDTO>('specs')

  const {
    fields: accordionFields,
    push: addAccordion,
    remove: removeAccordion,
  } = useFieldArray<IAccordionItemDTO>('accordions')

  const { isUploading, upload: handleUploadImages } = useProductImageUpload((media) => {
    addImage(media)
  })

  watch(
    product,
    (newProd) => {
      resetForm({
        values: getInitialValues(newProd),
      })
    },
    { deep: true },
  )

  const submitForm = handleSubmit(async (formValues) => {
    isLoading.value = true
    try {
      const imageIds = formValues.images
        .map((img) => img.id)
        .filter((id): id is number => typeof id === 'number')

      const dto = {
        name: formValues.name,
        price: formValues.price,
        category: formValues.category,
        inStock: formValues.inStock,
        description: formValues.description,
        images: imageIds.length > 0 ? imageIds : undefined,
        specs: formValues.specs,
        accordions: formValues.accordions,
      }

      if (product.value?.id) {
        await updateProduct(product.value.id, dto)
        toast.success('Товар успешно обновлен')
      } else {
        await createProduct(dto)
        toast.success('Товар успешно создан')
      }

      onSuccess?.()
    } catch (err) {
      toast.error(getStrapiErrorMessage(err, 'Ошибка сохранения товара'))
    } finally {
      isLoading.value = false
    }
  })

  return {
    name,
    price,
    category,
    inStock,
    description,
    imageFields,
    isUploading,
    handleUploadImages,
    removeImage,
    specFields,
    addSpec,
    removeSpec,
    accordionFields,
    addAccordion,
    removeAccordion,
    errors,
    isEditing,
    isLoading,
    submitForm,
  }
}
