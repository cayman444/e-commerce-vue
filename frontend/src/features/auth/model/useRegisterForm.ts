import { ROUTES_PATHS } from '@/app/router'
import { useUserStore } from '@/entities/user'
import { getStrapiErrorMessage } from '@/shared/lib/utils'
import { useForm } from 'vee-validate'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { registerSchema } from './register.schema'

export const useRegisterForm = () => {
  const { register } = useUserStore()
  const router = useRouter()
  const isLoading = ref(false)
  const formError = ref<string | null>(null)

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: registerSchema,
  })

  const [username, usernameProps] = defineField('username')
  const [email, emailProps] = defineField('email')
  const [password, passwordProps] = defineField('password')
  const [confirmPassword, confirmPasswordProps] = defineField('confirmPassword')

  watch([username, email, password, confirmPassword], () => {
    if (formError.value) {
      formError.value = null
    }
  })

  const submitForm = handleSubmit(async (values) => {
    isLoading.value = true
    formError.value = null

    try {
      await register({
        username: values.username,
        email: values.email,
        password: values.password,
      })

      toast.success('Регистрация успешна! Добро пожаловать!')
      router.push(ROUTES_PATHS.CATALOG)
    } catch (err) {
      const message = getStrapiErrorMessage(err, 'Ошибка при регистрации')
      formError.value = message
      toast.error(message)
    } finally {
      isLoading.value = false
    }
  })

  return {
    username,
    usernameProps,
    email,
    emailProps,
    password,
    passwordProps,
    confirmPassword,
    confirmPasswordProps,
    errors,
    isLoading,
    formError,
    submitForm,
  }
}
