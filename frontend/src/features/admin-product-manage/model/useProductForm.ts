import type { IAccordionItemDTO, IProduct, ISpecItemDTO } from '@/entities/product'
import { createProduct, updateProduct } from '@/entities/product'
import { uploadMedia } from '@/shared/api/upload'
import { getStrapiErrorMessage } from '@/shared/lib/utils'
import { useFieldArray, useForm } from 'vee-validate'
import { computed, ref, type Ref, watch } from 'vue'
import { toast } from 'vue-sonner'
import { type ProductFormValues, productSchema } from './product.schema'

const getInitialValues = (prod?: IProduct | null): ProductFormValues => ({
  name: prod?.name || '',
  price: prod?.price ?? (undefined as unknown as number),
  category: prod?.category || 'furniture',
  inStock: prod?.inStock ?? true,
  description: prod?.description || '',
  imageId: null,
  imageUrl: prod?.image || prod?.images?.[0] || '',
  specs: prod?.specs?.map((s) => ({ title: s.title, description: s.description })) || [],
  accordions: prod?.accordions?.map((a) => ({ title: a.title, content: a.content })) || [],
})

export const useProductForm = (
  product: Ref<IProduct | null | undefined>,
  onSuccess?: () => void,
) => {
  const isLoading = ref(false)
  const isUploading = ref(false)

  const isEditing = computed(() => Boolean(product.value?.id))

  const { errors, defineField, handleSubmit, resetForm, setFieldValue } =
    useForm<ProductFormValues>({
      validationSchema: productSchema,
      initialValues: getInitialValues(product.value),
    })

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

  watch(
    product,
    (newProd) => {
      resetForm({
        values: getInitialValues(newProd),
      })
    },
    { deep: true },
  )

  const [name, nameProps] = defineField('name')
  const [price, priceProps] = defineField('price')
  const [category] = defineField('category')
  const [inStock, inStockProps] = defineField('inStock')
  const [description, descriptionProps] = defineField('description')
  const [imageUrl] = defineField('imageUrl')
  const [imageId] = defineField('imageId')

  const handleUploadImage = async (file: File) => {
    isUploading.value = true
    try {
      const media = await uploadMedia(file)

      setFieldValue('imageId', media.id)
      setFieldValue('imageUrl', media.url)
      toast.success('Изображение успешно загружено')
    } catch (err) {
      toast.error(getStrapiErrorMessage(err, 'Ошибка загрузки изображения'))
    } finally {
      isUploading.value = false
    }
  }

  const submitForm = handleSubmit(async (values) => {
    isLoading.value = true
    try {
      const dto = {
        name: values.name,
        price: values.price,
        category: values.category,
        inStock: values.inStock,
        description: values.description,
        images: values.imageId ? [values.imageId] : undefined,
        specs: values.specs,
        accordions: values.accordions,
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
    nameProps,
    price,
    priceProps,
    category,
    inStock,
    inStockProps,
    description,
    descriptionProps,
    imageUrl,
    imageId,
    specFields,
    addSpec,
    removeSpec,
    accordionFields,
    addAccordion,
    removeAccordion,
    errors,
    isEditing,
    isLoading,
    isUploading,
    handleUploadImage,
    submitForm,
  }
}
