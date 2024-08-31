import { Juice } from '@/modules/home/types'

export interface OrderPayload {
  juiceId: number
  options: {
    [keyname: string]: boolean
  }
  extras: {
    [keyname: string]: boolean
  }
  machine: '1' | '2'
}

export type JuiceById = {
  id: number
  name: string
  description: string
  value: number
  imageUrl: string
  createdAt: string
  updatedAt: string
  juiceType: string
  options: {
    sugar: boolean
    ice: boolean
    milk: boolean
  }
  extras: {
    chantilly?: {
      value: number
    }
    alcohol?: {
      value: number
    }
    whey?: {
      value: number
    }
  }
  ingredient: string[]
}

export interface OrderInStore {
  juice: Juice
  options: {
    [keyname: string]: {
      value: number
      isIncluded: boolean
    }
  }
  extras: {
    [keyname: string]: {
      value: number
      isIncluded: boolean
    }
  }
  orderPrice: number
  quantity: number
}

export interface CartStore {
  cart: OrderInStore[]
  addItemToCart: (item: OrderInStore) => void
  removeItemFromCart: (juiceId: number) => void
  cleanCart: () => void
}
