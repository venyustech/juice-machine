import { http, UnexpectedError } from '@/config'
import { JuiceById, Machine, OrderPayload } from '../types'

export const saveOrder = async (data: OrderPayload[]): Promise<void> => {
  const url = '/order/create'
  try {
    console.log('save order', data)
    await http.post(url, data)
  } catch (err) {
    throw new UnexpectedError()
  }
}

export const getJuiceById = async (juiceId: number): Promise<JuiceById> => {
  const url = `/juice/${juiceId}`
  try {
    const result = await http.get<JuiceById>(url)
    return result.data
  } catch (err) {
    throw new UnexpectedError()
  }
}

export const getMachines = async (): Promise<Machine[]> => {
  const url = '/machines'
  try {
    const result = await http.get<Machine[]>(url)
    return result.data
  } catch (err) {
    throw new UnexpectedError()
  }
}
