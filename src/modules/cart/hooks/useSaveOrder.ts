import { useMutation } from '@tanstack/react-query'
import { OrderPayload } from '../types'
import { saveOrder } from '../services'
import { useRouter } from 'next/navigation'
import { cartStore } from '../store/cart'

export const useSaveOrder = () => {
  const { cleanCart } = cartStore()
  const router = useRouter()

  return useMutation(['save-order'], (order: OrderPayload[]) => saveOrder(order), {
    retry: false,
    cacheTime: Infinity,
    onSuccess: () => {
      cleanCart()
      router.push('/')
    }
  })
}
