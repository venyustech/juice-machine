import { useMutation } from '@tanstack/react-query'
import { fetchJuiceTypes } from '../services'

export const useGetJuices = () => {
  return useMutation(['fetch-juices'], fetchJuiceTypes, {
    retry: false,
    cacheTime: Infinity
  })
}
