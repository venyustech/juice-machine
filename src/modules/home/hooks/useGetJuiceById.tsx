import { getJuiceById } from '@/modules/cart/services'
import { useMutation } from '@tanstack/react-query'

export const useGetJuiceById = () => {
  return useMutation((juiceId: number) => getJuiceById(juiceId), {
    retry: false,
    cacheTime: Infinity
  })
}
