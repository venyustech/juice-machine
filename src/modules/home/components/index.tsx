import React from 'react'
import { Box } from '@chakra-ui/react'
import { colorsProxy } from '@/modules/shared/constants/colorTheme'
import { Navbar } from '@/modules/shared/components/navbar'

export const HomePage: React.FC = () => {
  return (
    <Box bg={colorsProxy.main.primary}>
      <Navbar />
    </Box>
  )
}
