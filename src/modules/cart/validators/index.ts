import { z } from 'zod'

export const localizationSchema = z.object({
  machineId: z.string().min(1, 'Selecione um local de retirada'),
  pickupDateTime: z.string().min(1, 'Selecione uma data e horário de retirada'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF deve ter 11 dígitos'),
  email: z.string().email('Insira um e-mail válido')
})
export type LocalizationSchema = z.infer<typeof localizationSchema>
