export type Juice = {
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

export type JuiceType = {
  id: number
  label: string
  href: string
  juices: Juice[]
}
