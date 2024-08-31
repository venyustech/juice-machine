import React from 'react'
import { Flex, Box } from '@chakra-ui/react'
import { colorsProxy } from '@/modules/shared/constants/colorTheme'
import { JuiceCards } from './JuiceCards'
import { Navbar } from './Navbar'

export const HomePage: React.FC = () => {
  return (
    <Box bg={colorsProxy.main.primary} pt={16} pb={16}>
      <Navbar />
      <Flex justify="center">
        <JuiceCards />
      </Flex>
    </Box>
  )
}
