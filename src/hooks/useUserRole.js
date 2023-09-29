import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useUserRole () {
  const { data: session } = useSession()
  const router = useRouter()

  const checkUserRole = async () => {
    if (!session?.user || session.user.role !== 'admin') {
      // Si el usuario no está autenticado o su rol no es "admin", redirige a otra página.
      await router.push('/tasks')
    }
  }

  return { checkUserRole }
}
