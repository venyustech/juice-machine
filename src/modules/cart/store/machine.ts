import { create } from 'zustand'
import { Machine } from '../types'

interface MachineStore {
  machines: Machine[]
  setMachines: (machines: Machine[]) => void
}

export const useMachineStore = create<MachineStore>((set) => ({
  machines: [],
  setMachines: (machines) => set({ machines })
}))
