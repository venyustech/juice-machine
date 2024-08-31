import React from 'react'
import { Box } from '@chakra-ui/react'
import { colorsProxy } from '@/modules/shared/constants/colorTheme'
import { JuiceCards } from './JuiceCards'
import { Navbar } from './Navbar'

export const HomePage: React.FC = () => {
  return (
    <Box bg={colorsProxy.main.primary} pt={16}>
      <Navbar />
      <JuiceCards />
    </Box>
  )
}
