'use client'
import React, { useEffect, useState } from 'react'
import { Box, Flex, Image, SimpleGrid, Text, useDisclosure, Spinner } from '@chakra-ui/react'
import { JuiceType } from '../types'
import { colorsProxy } from '@/modules/shared/constants/colorTheme'
import { fontsProxy } from '@/modules/shared/constants/fonts'
import { JuiceModal } from './JuiceModal'
import { useJuiceStore } from '../store/juiceStore'
import { useGetJuices } from '../hooks/useGetJuices'

export const JuiceCards: React.FC = () => {
  const { juiceTypes, setJuiceTypes } = useJuiceStore()
  const { mutate: fetchJuices, data, error, isLoading } = useGetJuices()

  useEffect(() => {
    if (!data || data.length === 0) {
      fetchJuices()
    }
  }, [fetchJuices, data])

  useEffect(() => {
    if (data) {
      setJuiceTypes(data)
    }
  }, [data, setJuiceTypes])

  if (isLoading) {
    return <Spinner p={10} mt={10} />
  }

  if (error) {
    return <Text>Erro ao carregar os tipos de suco.</Text>
  }

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
  const [selectedJuiceId, setSelectedJuiceId] = useState<number | null>(null)

  const handleJuiceClick = (juiceId: number) => {
    setSelectedJuiceId(juiceId)
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
              onClick={() => handleJuiceClick(juice.id)}
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
                  {`R$ ${(juice.value / 100).toFixed(2).replace('.', ',')}`}
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
      {selectedJuiceId && <JuiceModal isOpen={isOpen} onClose={onClose} juiceId={selectedJuiceId} />}
    </>
  )
}
