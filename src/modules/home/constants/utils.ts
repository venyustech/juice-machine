import { JuiceType } from '../types'

type JuiceOpts = 'sugar' | 'ice' | 'milk' | 'chantilly'

const juiceOptions = {
  sugar: 'Açucar',
  ice: 'Gelo',
  milk: 'Leite',
  chantilly: 'Chantilly'
}

export const optionsTranslate = (value: string) => {
  if (juiceOptions[value as JuiceOpts]) {
    return juiceOptions[value as JuiceOpts]
  }

  return value
}

export const moneyFormatter = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency'
  }).format(value)
}
