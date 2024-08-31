'use client'
import React, { useState } from 'react'
import {
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button
} from '@chakra-ui/react'
import { juiceTypes } from '@/modules/home/constants/utils'
import { JuiceType, Juice } from '../types'
import { colorsProxy } from '@/modules/shared/constants/colorTheme'
import { fontsProxy } from '@/modules/shared/constants/fonts'

export const JuiceCards: React.FC = () => {
  return (
    <Box marginInline={{ base: '3', md: '8' }}>
      {juiceTypes.map((juiceType) => (
        <JuiceCard key={juiceType.id} juiceType={juiceType} />
      ))}
    </Box>
  )
}

const JuiceCard: React.FC<{ juiceType: JuiceType }> = ({ juiceType }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedJuice, setSelectedJuice] = useState<Juice | null>(null)

  const handleJuiceClick = (juice: Juice) => {
    setSelectedJuice(juice)
    onOpen()
  }

  return (
    <>
      <Box id={`section-${juiceType.id}`} pt={{ base: 3, md: 14 }}>
        <Text
          fontSize="2xl"
          fontFamily={fontsProxy.fonts.playfairDisplay}
          fontWeight={700}
          mb={6}
          color={colorsProxy.main['logo-main-color']}
        >
          {juiceType.label}
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignSelf="center">
          {juiceType.juices.map((juice) => (
            <Flex
              key={juice.id}
              borderWidth="1px"
              borderRadius={2}
              borderColor={colorsProxy.main.border}
              overflow="hidden"
              justifyContent="space-between"
              paddingInline={{ lg: '6' }}
              boxShadow="xs"
              onClick={() => handleJuiceClick(juice)}
              cursor="pointer"
            >
              <Box p={4}>
                <Text fontSize="xl" fontFamily={fontsProxy.fonts.playfairDisplay} fontWeight={700}>
                  {juice.name}
                </Text>
                <Text mt={2} wordBreak="break-word" maxW={300} minW={{ lg: '300' }} fontWeight={300}>
                  {juice.description}
                </Text>
                <Text mt={4} fontSize="lg" fontWeight={300}>
                  {juice.price}
                </Text>
              </Box>
              <Flex>
                <Image
                  src={juice.imageUrl}
                  alt={juice.name}
                  width={{ base: '100px', md: '150px', lg: '200px' }}
                  objectFit="cover"
                />
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
      <JuiceModal isOpen={isOpen} onClose={onClose} juice={selectedJuice} />
    </>
  )
}

interface JuiceModalProps {
  isOpen: boolean
  onClose: () => void
  juice: Juice | null
}

const JuiceModal: React.FC<JuiceModalProps> = ({ isOpen, onClose, juice }) => {
  if (!juice) return null
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{juice.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{juice.description}</Text>
          <Text mt={2}>{juice.price}</Text>
          <Image src={juice.imageUrl} alt={juice.name} mt={4} width="100%" objectFit="cover" />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Adicionar ao Carrinho
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
