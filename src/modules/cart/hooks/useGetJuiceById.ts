import { useMutation } from '@tanstack/react-query'
import { getJuiceById } from '../services'

export const useGetJuiceById = () => {
  return useMutation((juiceId: number) => getJuiceById(juiceId), {
    retry: false,
    cacheTime: Infinity,
    onError: (error: unknown) => {
      console.error('Erro ao buscar o suco:', error)
    }
  })
}
