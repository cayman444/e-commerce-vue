import { ROUTES_PATHS } from '@/app/router'
import { useUserStore } from '@/entities/user'
import { getStrapiErrorMessage } from '@/shared/lib/utils'
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { loginSchema } from './login.schema'

export const useLoginForm = () => {
  const { login } = useUserStore()
  const router = useRouter()
  const isLoading = ref(false)
  const formError = ref<string | null>(null)

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: loginSchema,
  })

  const [email, emailProps] = defineField('email')
  const [password, passwordProps] = defineField('password')

  const submitForm = handleSubmit(async (values) => {
    isLoading.value = true
    formError.value = null

    try {
      await login({
        identifier: values.email,
        password: values.password,
      })

      toast.success('Вы успешно вошли!')
      router.push(ROUTES_PATHS.CATALOG)
    } catch (err) {
      const message = getStrapiErrorMessage(err, 'Ошибка при входе')
      formError.value = message

      toast.error(message)
    } finally {
      isLoading.value = false
    }
  })

  watch([email, password], () => {
    if (formError.value) {
      formError.value = null
    }
  })

  return {
    email,
    emailProps,
    password,
    passwordProps,
    errors,
    isLoading,
    formError,
    submitForm,
  }
}
