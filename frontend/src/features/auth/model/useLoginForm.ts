import { ROUTES_PATHS } from '@/app/router'
import { useUserStore } from '@/entities/user'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { loginSchema } from './login.schema'

export const useLoginForm = () => {
  const { login } = useUserStore()
  const router = useRouter()
  const isLoading = ref(false)

  const { errors, defineField, handleSubmit } = useForm({
    validationSchema: loginSchema,
  })

  const [email, emailProps] = defineField('email')
  const [password, passwordProps] = defineField('password')

  const submitForm = handleSubmit(async (values) => {
    isLoading.value = true

    try {
      await login({
        identifier: values.email,
        password: values.password,
      })

      toast.success('Вы успешно вошли!')
      router.push(ROUTES_PATHS.CATALOG)
    } catch (err) {
      toast.error('Ошибка при входе', { description: JSON.stringify(err) })
    } finally {
      isLoading.value = false
    }
  })

  return {
    email,
    emailProps,
    password,
    passwordProps,
    errors,
    isLoading,
    submitForm,
  }
}
