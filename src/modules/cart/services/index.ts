import axios, { AxiosError } from 'axios'
import { JuiceById, Machine, OrderPayload } from '../types'

export const saveOrder = async (data: OrderPayload[]) => {
  const url = 'https://testecolab.onrender.com/order/create'
  try {
    console.log('save order', data)
    const response = await axios.post(url, data)
    return response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message)
    }
  }
}

export const getJuiceById = async (juiceId: number): Promise<JuiceById> => {
  const url = `https://testecolab.onrender.com/juice/${juiceId}`
  try {
    const response = await axios.get(url)
    return response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message)
    }
    throw new Error('Erro desconhecido ao buscar o suco.')
  }
}

export const getMachines = async (): Promise<Machine[]> => {
  const url = 'https://testecolab.onrender.com/machines'
  try {
    const response = await axios.get(url)
    return response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.message)
    }
    throw new Error('Erro desconhecido ao buscar as máquinas.')
  }
}
