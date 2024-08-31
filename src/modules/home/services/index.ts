import axios, { AxiosError } from 'axios'
import { JuiceType } from '../types'

const apiRequest = async <T>(url: string): Promise<T> => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(`Error fetching data from ${url}: ${err.message}`)
      throw new Error(err.message)
    }
    throw new Error('An unexpected error occurred')
  }
}

export const fetchJuiceTypes = async (): Promise<JuiceType[]> => {
  const url = 'http://localhost:5001/juices'
  return await apiRequest<JuiceType[]>(url)
}
