import React, { useState } from 'react'
import { Box, Button, Flex, Image, SimpleGrid, Text, useDisclosure, IconButton, Input } from '@chakra-ui/react'
import { DeleteIcon, AddIcon, MinusIcon } from '@chakra-ui/icons'
import { cartStore } from '@/modules/cart/store/cart'
import { useSaveOrder } from '@/modules/cart/hooks/useSaveOrder'
import { OrderPayload } from '@/modules/cart/types'
import { JuiceById } from '@/modules/cart/types'
import { colorsProxy } from '@/modules/shared/constants/colorTheme'
import { fontsProxy } from '@/modules/shared/constants/fonts'
import { RemoveItemModal } from './RemoveItemModal'
import { moneyFormatter } from '@/modules/home/constants/utils'

export const Cart = () => {
  const { cart, addItemToCart, removeItemFromCart } = cartStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedJuice, setSelectedJuice] = useState<JuiceById | null>(null)

  const { mutate } = useSaveOrder()

  const handleRemoveClick = (juice: JuiceById) => {
    setSelectedJuice(juice)
    onOpen()
  }

  const handleConfirmRemove = (juiceId: number) => {
    removeItemFromCart(juiceId)
  }

  const handleQuantityChange = (juiceId: number, newQuantity: number) => {
    cart.forEach((item) => {
      if (item.juice.id === juiceId) {
        const numericPrice = item.juice.value
        const newOrderPrice = numericPrice * newQuantity

        const updatedItem = {
          ...item,
          quantity: newQuantity,
          orderPrice: newOrderPrice
        }

        removeItemFromCart(juiceId)

        addItemToCart(updatedItem)
      }
    })
  }

  const handlePayload = () => {
    if (!cart?.length) {
      return
    }
    const order: OrderPayload[] = cart.map((items) => {
      // Converter `extras` e `options` para o formato esperado
      const mappedOptions: { [keyname: string]: boolean } = Object.keys(items.options).reduce((acc, key) => {
        acc[key] = items.options[key].isIncluded
        return acc
      }, {} as { [keyname: string]: boolean })

      const mappedExtras: { [keyname: string]: boolean } = Object.keys(items.extras).reduce((acc, key) => {
        acc[key] = items.extras[key].isIncluded
        return acc
      }, {} as { [keyname: string]: boolean })

      return {
        options: mappedOptions,
        extras: mappedExtras,
        juiceId: items.juice.id,
        machine: '1'
      }
    })
    console.log('Resumo da compra:', order)
    mutate(order)
  }

  const calculateExtraCost = (extras: any) => {
    return Object.keys(extras)
      .filter((key) => extras[key].isIncluded)
      .reduce((sum, key) => sum + (extras[key]?.value || 0), 0)
  }

  const calculateSubtotal = (item: any) => {
    const itemCost = item.orderPrice
    const extrasCost = calculateExtraCost(item.extras)
    return itemCost + extrasCost
  }

  const total = cart.reduce((sum, item) => sum + calculateSubtotal(item), 0)

  return (
    <>
      <Flex justify="center" pt={{ base: 3, md: 14 }} pb={8}>
        <Box minW="1180px">
          <Text
            fontSize="2xl"
            fontFamily={fontsProxy.fonts.playfairDisplay}
            fontWeight={700}
            color={colorsProxy.main['logo-main-color']}
            mb={6}
            mt={16}
          >
            Carrinho
          </Text>
          <SimpleGrid columns={{ base: 1, md: 1 }} spacing={10} alignSelf="center">
            {cart?.map(
              (item) =>
                item.juice && (
                  <Flex
                    key={item.juice.id}
                    borderWidth="1px"
                    borderRadius={2}
                    borderColor={colorsProxy.main.border}
                    overflow="hidden"
                    justifyContent="space-between"
                    paddingInline={{ lg: '6' }}
                    boxShadow="xs"
                    cursor="pointer"
                  >
                    <Box p={4}>
                      <Text fontSize="xl" fontFamily={fontsProxy.fonts.playfairDisplay} fontWeight={700}>
                        {item.juice.name} (x{item.quantity})
                      </Text>
                      <Text mt={2} wordBreak="break-word" maxW={300} minW={{ lg: '300' }} fontWeight={300}>
                        {item.juice.description}
                      </Text>
                      <Text mt={4} fontSize="lg" fontWeight={300}>
                        Preço unitário: {moneyFormatter(item.orderPrice / item.quantity / 100)}
                      </Text>
                      {Object.keys(item.extras).some((extra) => item.extras[extra].isIncluded) && (
                        <Box mt={2}>
                          <Text fontSize="md" fontWeight="bold">
                            Adicionais:
                          </Text>
                          <SimpleGrid columns={1} spacing={2}>
                            {Object.entries(item.extras).map(([extra, extraInfo]) => {
                              const extraValue = extraInfo.value
                              return extraInfo.isIncluded ? (
                                <Flex key={extra} justify="space-between">
                                  <Text>{extra}:</Text>
                                  <Text>{moneyFormatter(extraValue / 100)}</Text>
                                </Flex>
                              ) : null
                            })}
                          </SimpleGrid>
                        </Box>
                      )}
                      <Text mt={2} fontSize="lg" fontWeight={500}>
                        Subtotal: {moneyFormatter(calculateSubtotal(item) / 100)}
                      </Text>
                      <Flex align="center" mt={4}>
                        <IconButton
                          aria-label="Decrement quantity"
                          icon={<MinusIcon />}
                          onClick={() => handleQuantityChange(item.juice.id, Math.max(1, item.quantity - 1))}
                          size="sm"
                        />
                        <Input value={item.quantity} readOnly textAlign="center" width="50px" mx={2} />
                        <IconButton
                          aria-label="Increment quantity"
                          icon={<AddIcon />}
                          onClick={() => handleQuantityChange(item.juice.id, item.quantity + 1)}
                          size="sm"
                        />
                      </Flex>
                    </Box>
                    <Flex>
                      <Image
                        src={item.juice.imageUrl}
                        alt={item.juice.name}
                        width={{ base: '100px', md: '150px', lg: '200px' }}
                        objectFit="cover"
                      />
                      <IconButton
                        aria-label="Remove item"
                        icon={<DeleteIcon />}
                        onClick={() => handleRemoveClick(item.juice)}
                        ml={4}
                      />
                    </Flex>
                  </Flex>
                )
            )}
          </SimpleGrid>
          <Flex justify="space-between" align="center" mt={8}>
            <Text fontSize="xl" fontWeight="bold">
              Total:
            </Text>
            <Text fontSize="2xl">{moneyFormatter(total / 100)}</Text>
          </Flex>
          <Button
            mt={8}
            onClick={handlePayload}
            bg={colorsProxy.main['logo-main-color']}
            color="white"
            _hover={{
              bg: colorsProxy.main['logo-main-color']
            }}
          >
            Finalizar pedido
          </Button>
        </Box>
      </Flex>

      <RemoveItemModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => handleConfirmRemove(selectedJuice?.id!)}
        juice={selectedJuice}
      />
    </>
  )
}
