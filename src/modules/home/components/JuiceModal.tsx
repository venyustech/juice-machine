import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  Image,
  Stack,
  Checkbox,
  Flex,
  IconButton,
  Input
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { cartStore } from '@/modules/cart/store/cart'
import { fontsProxy } from '@/modules/shared/constants/fonts'
import { useGetJuiceById } from '@/modules/cart/hooks/useGetJuiceById'
import { moneyFormatter, optionsTranslate } from '../constants/utils'

interface JuiceModalProps {
  isOpen: boolean
  onClose: () => void
  juiceId: number
}

export const JuiceModal: React.FC<JuiceModalProps> = ({ isOpen, onClose, juiceId }) => {
  const [extraValue, setExtraValue] = useState<{ [key: string]: { value: number; isIncluded: boolean } }>({})
  const [optionValue, setOptionValue] = useState<{ [key: string]: { value: number; isIncluded: boolean } }>({})
  const [orderPrice, setOrderPrice] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { data: juice, mutate } = useGetJuiceById()
  const { addItemToCart } = cartStore()

  useEffect(() => {
    if (juiceId) {
      mutate(juiceId)
    }
  }, [juiceId])

  useEffect(() => {
    if (juice) {
      setOrderPrice(juice.value)

      const mappedExtras = Object.keys(juice.extras || {}).reduce((acc, key) => {
        acc[key as keyof typeof juice.extras] = {
          value: juice.extras[key as keyof typeof juice.extras]?.value || 0,
          isIncluded: false
        }
        return acc
      }, {} as { [key: string]: { value: number; isIncluded: boolean } })

      const mappedOptions = Object.keys(juice.options || {}).reduce((acc, key) => {
        acc[key as keyof typeof juice.options] = {
          value: 0,
          isIncluded: juice.options[key as keyof typeof juice.options] || false
        }
        return acc
      }, {} as { [key: string]: { value: number; isIncluded: boolean } })

      setExtraValue(mappedExtras)
      setOptionValue(mappedOptions)
    }
  }, [juice])

  useEffect(() => {
    if (!juice) return

    const extraCost = Object.keys(extraValue)
      .filter((key) => extraValue[key]?.isIncluded)
      .reduce((sum, key) => sum + (extraValue[key]?.value || 0), 0)

    setOrderPrice((juice.value + extraCost) * quantity)
  }, [extraValue, juice, quantity])

  useEffect(() => {
    if (!isOpen && juice) {
      setExtraValue(
        Object.keys(juice.extras || {}).reduce((acc, key) => {
          acc[key as keyof typeof juice.extras] = {
            value: juice.extras[key as keyof typeof juice.extras]?.value || 0,
            isIncluded: false
          }
          return acc
        }, {} as { [key: string]: { value: number; isIncluded: boolean } })
      )
      setOptionValue(
        Object.keys(juice.options || {}).reduce((acc, key) => {
          acc[key as keyof typeof juice.options] = {
            value: 0,
            isIncluded: juice.options[key as keyof typeof juice.options] || false
          }
          return acc
        }, {} as { [key: string]: { value: number; isIncluded: boolean } })
      )
      setOrderPrice(juice?.value || 0)
      setQuantity(1)
    }
  }, [isOpen, juice])

  if (!juice) return null

  const handleAddToCart = () => {
    addItemToCart({
      juice: juice,
      options: optionValue,
      extras: extraValue,
      orderPrice: orderPrice,
      quantity: quantity
    })
    onClose()
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontFamily={fontsProxy.fonts.playfairDisplay}>{juice.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Box pt={3}>
              <Text>{juice.description}</Text>
              <Text mt={2}> {`R$ ${(juice.value / 100).toFixed(2).replace('.', ',')}`}</Text>
            </Box>
            <Box width="50%">
              <Image src={juice.imageUrl} alt={juice.name} mt={4} width="100%" height="100%" objectFit="cover" />
            </Box>
          </Flex>
          <Box>
            <Text>Opções</Text>
            <Stack direction="column">
              {Object.keys(optionValue).map((option) => (
                <Checkbox
                  key={option}
                  name={option}
                  isChecked={optionValue[option]?.isIncluded || false}
                  onChange={(e) => {
                    const { name, checked } = e.target
                    setOptionValue((prev) => ({
                      ...prev,
                      [name]: { ...prev[name], isIncluded: checked }
                    }))
                  }}
                >
                  {optionsTranslate(option)}
                </Checkbox>
              ))}
            </Stack>
          </Box>
          <Box>
            <Text>Extras</Text>
            <Stack direction="column">
              {juice.extras &&
                Object.keys(juice.extras).map((extra) => (
                  <Checkbox
                    key={extra}
                    isChecked={extraValue[extra]?.isIncluded || false}
                    onChange={(e) => {
                      const { checked } = e.target
                      setExtraValue((prev) => ({
                        ...prev,
                        [extra]: { ...prev[extra], isIncluded: checked }
                      }))
                    }}
                  >
                    {`${optionsTranslate(extra)}: ${moneyFormatter(extraValue[extra]?.value / 100)}`}
                  </Checkbox>
                ))}
            </Stack>
          </Box>
          <Box mt={4}>
            <Text>Quantidade</Text>
            <Flex align="center" mt={2}>
              <IconButton aria-label="Decrement" icon={<MinusIcon />} onClick={decrementQuantity} />
              <Input value={quantity} readOnly textAlign="center" width="50px" mx={2} />
              <IconButton aria-label="Increment" icon={<AddIcon />} onClick={incrementQuantity} />
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Flex w="100%" align="center" justify="space-between">
            <Text>Valor do pedido: {moneyFormatter(orderPrice / 100)}</Text>
            <Button colorScheme="blue" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
