import React from 'react'
import { Box } from '@chakra-ui/react'
import { colorsProxy } from '@/modules/shared/constants/colorTheme'

export const HomePage: React.FC = () => {
  return <Box bg={colorsProxy.form.label}> Hello World</Box>
}
