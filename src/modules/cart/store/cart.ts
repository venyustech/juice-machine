import { create } from 'zustand'
import { CartStore, OrderInStore } from '../types'

export const cartStore = create<CartStore>((set) => ({
  cart: [],

  addItemToCart: (newItem: OrderInStore) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex((item) => item.juice.id === newItem.juice.id)

      if (existingItemIndex >= 0) {
        const updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
                orderPrice: item.orderPrice + newItem.orderPrice
              }
            : item
        )
        return { cart: updatedCart }
      } else {
        return { cart: [...state.cart, newItem] }
      }
    }),

  removeItemFromCart: (juiceId: number) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.juice.id !== juiceId)
    })),

  cleanCart: () => set({ cart: [] })
}))
