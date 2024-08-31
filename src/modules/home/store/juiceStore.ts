import { create } from 'zustand'
import { JuiceType } from '../types'

interface JuiceStore {
  juiceTypes: JuiceType[]
  setJuiceTypes: (juiceTypes: JuiceType[]) => void
}

export const useJuiceStore = create<JuiceStore>((set) => ({
  juiceTypes: [],
  setJuiceTypes: (juiceTypes) => set({ juiceTypes })
}))
