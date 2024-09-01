import { http, UnexpectedError } from '@/config'
import { JuiceType } from '../types'

export const fetchJuiceTypes = async (): Promise<JuiceType[]> => {
  const url = '/juices'
  try {
    const result = await http.get<JuiceType[]>(url)
    return result.data
  } catch (err) {
    throw new UnexpectedError()
  }
}
