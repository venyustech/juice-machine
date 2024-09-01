import { useMutation } from '@tanstack/react-query'
import { getMachines } from '../services'

export const useGetMachines = () => {
  return useMutation(getMachines, {
    retry: false,
    cacheTime: Infinity,
    onError: (error: unknown) => {
      console.error('Erro ao buscar as máquinas:', error)
    }
  })
}
