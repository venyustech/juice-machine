import axios, { AxiosError } from 'axios'
import { JuiceById, OrderPayload } from '../types'

export const saveOrder = async (data: OrderPayload[]) => {
  const url = 'https://jsonplaceholder.typicode.com/posts'
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
  const url = `http://localhost:5001/juice/${juiceId}`
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
