import React from 'react'
import { Box, Button, Flex, Input, Select, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { colorsProxy } from '@/modules/shared/constants/colorTheme'
import { useGetMachines } from '@/modules/cart/hooks/useGetMachines'
import { useMachineStore } from '../store/machine'
import { LocalizationSchema, localizationSchema } from '../validators'

interface ChooseLocationFormProps {
  onSubmit: (data: LocalizationSchema) => void
}

export const ChooseLocationForm: React.FC<ChooseLocationFormProps> = ({ onSubmit }) => {
  const { machines, setMachines } = useMachineStore()
  const { mutate: fetchMachines, data: machinesData } = useGetMachines()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LocalizationSchema>({
    resolver: zodResolver(localizationSchema)
  })

  React.useEffect(() => {
    if (!machines.length && !machinesData) {
      fetchMachines()
    } else if (machinesData) {
      setMachines(machinesData)
    }
  }, [machines, machinesData, fetchMachines, setMachines])

  const convertToTimestamp = (dateTime: string) => {
    return new Date(dateTime).getTime()
  }

  const onSubmitWithTimestamp = (data: LocalizationSchema) => {
    const timestamp = convertToTimestamp(data.pickupDateTime)
    onSubmit({ ...data, pickupDateTime: timestamp.toString() })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitWithTimestamp)}>
      <Box mt={8}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Escolha o local de retirada
        </Text>
        <Select
          bg="transparent"
          borderColor={colorsProxy.form.label}
          {...register('machineId')}
          placeholder="Selecione um local de retirada"
        >
          {machines.map((machine) => (
            <option key={machine.id} value={machine.id}>
              {machine.name}
            </option>
          ))}
        </Select>
        {errors.machineId && <Text color="red">{errors.machineId.message}</Text>}
      </Box>

      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Escolha a data e horário de retirada
        </Text>
        <Input
          bg="transparent"
          borderColor={colorsProxy.form.label}
          type="datetime-local"
          {...register('pickupDateTime')}
        />
        {errors.pickupDateTime && <Text color="red">{errors.pickupDateTime.message}</Text>}
      </Box>

      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          CPF
        </Text>
        <Input
          bg="transparent"
          borderColor={colorsProxy.form.label}
          type="text"
          maxLength={11}
          {...register('cpf')}
          placeholder="Digite seu CPF"
        />
        {errors.cpf && <Text color="red">{errors.cpf.message}</Text>}
      </Box>

      <Box mt={4}>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          E-mail
        </Text>
        <Input type="email" {...register('email')} placeholder="Digite seu e-mail" />
        {errors.email && <Text color="red">{errors.email.message}</Text>}
      </Box>

      <Button
        mt={8}
        type="submit"
        bg={colorsProxy.form.label}
        color="#FFFFFF"
        _hover={{
          borderWidth: `1px`,
          borderColor: `${colorsProxy.form.label}`,
          color: `${colorsProxy.form.label}`,
          backgroundColor: '#FFFFFF'
        }}
      >
        Finalizar pedido
      </Button>
    </form>
  )
}
