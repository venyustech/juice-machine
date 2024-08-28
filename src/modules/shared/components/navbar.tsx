import React from 'react'
import { Box, Flex, Link, HStack, Image, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { colorsProxy } from '../constants/colorTheme'
import { fontsProxy } from '../constants/fonts'
import { PiHandbagThin } from 'react-icons/pi'

export const Navbar: React.FC = () => {
  return (
    <Flex paddingInline={8} borderBottom="1px solid" borderColor={colorsProxy.main.border}>
      <Flex h={16} alignItems="center" justifyContent="space-between" w="100%">
        <Box pr={8} mr={8} borderRight="1px solid" borderColor={colorsProxy.main.border}>
          <Image src="/images/sharkLogoInLine.png" alt="Shark Logo" width="200px" />
        </Box>

        <HStack
          as="nav"
          spacing={6}
          height="100%"
          width="100%"
          fontFamily={fontsProxy.fonts.montserrat}
          fontWeight={300}
        >
          <NavLink href="/">Shark Sucos</NavLink>
          <NavLink href="/">Sucos Naturais</NavLink>
          <NavLink href="/">Sucos Funcionais</NavLink>
          <NavLink href="/">Italian Sodas</NavLink>
          <NavLink href="/">Thai Drinks</NavLink>
          <NavLink href="/">Radical Smoothies</NavLink>
          <NavLink href="/">Bebidas Diversas</NavLink>
        </HStack>

        <Flex gap={3}>
          <PiHandbagThin fontSize="25px" />
          <Text as="span">0</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  return (
    <Link
      as={NextLink}
      href={href}
      display="flex"
      alignItems="center"
      justifyContent="center"
      rounded="md"
      px={3}
      borderRadius={0}
      height="100%"
      _hover={{
        textDecoration: 'none',
        borderBottom: '4px solid',
        borderColor: `${colorsProxy.main['border-selected']}`
      }}
    >
      {children}
    </Link>
  )
}
