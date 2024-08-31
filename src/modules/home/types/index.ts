export type Juice = {
  id: number
  name: string
  description: string
  price: string
  imageUrl: string
}

export type JuiceType = {
  id: number
  label: string
  href: string
  juices: Juice[]
}
