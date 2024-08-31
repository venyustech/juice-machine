'use client'
import React, { useEffect, useState } from 'react'
import { Box, Flex, Link, HStack, Image, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { PiHandbagThin } from 'react-icons/pi'
import { colorsProxy } from '@/modules/shared/constants/colorTheme'
import { fontsProxy } from '@/modules/shared/constants/fonts'
import { animate } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { cartStore } from '@/modules/cart/store/cart'
import { useJuiceStore } from '@/modules/home/store/juiceStore' // Importando a store

interface NavbarProps {
  showNavLink?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ showNavLink = true }) => {
  const [activeSection, setActiveSection] = useState<number | null>(null)
  const { juiceTypes } = useJuiceStore()
  const { cart } = cartStore()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = null
      juiceTypes.forEach((juiceType) => {
        const sectionElement = document.getElementById(`section-${juiceType.id}`)
        if (sectionElement) {
          const rect = sectionElement.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 30) {
            currentSection = juiceType.id
          }
        }
      })
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [juiceTypes])

  const handleClick = (id: number) => {
    setActiveSection(id)
    const sectionElement = document.getElementById(`section-${id}`)
    if (sectionElement) {
      const yOffset = -16
      const y = sectionElement.getBoundingClientRect().top + window.pageYOffset + yOffset

      animate(window.scrollY, y, {
        type: 'spring',
        stiffness: 120,
        damping: 20,
        onUpdate: (latest) => window.scrollTo(0, latest)
      })
    }
  }

  return (
    <Flex
      paddingInline={8}
      borderBottom="1px solid"
      borderColor={colorsProxy.main.border}
      position="fixed"
      bg={colorsProxy.main.primary}
      top={0}
      left={0}
      right={0}
      boxShadow="xs"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between" w="100%">
        <Box
          cursor="pointer"
          onClick={() => router.push('/')}
          pr={8}
          mr={8}
          borderRight="1px solid"
          borderColor={colorsProxy.main.border}
        >
          <Image
            src="/images/sharkLogoInLine.png"
            alt="Shark Logo"
            width="200px"
            display={{ base: 'none', md: 'block' }}
          />
          <Image
            src="/images/sharkLogoColumn.png"
            alt="Shark Logo Mobile"
            width="80px"
            display={{ base: 'block', md: 'none' }}
          />
        </Box>

        <HStack
          as="nav"
          spacing={6}
          height="100%"
          width="100%"
          fontFamily={fontsProxy.fonts.montserrat}
          fontWeight={300}
          overflowX="auto"
          whiteSpace="nowrap"
          css={{
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            '-ms-overflow-style': 'none',
            scrollbarWidth: 'none'
          }}
        >
          {juiceTypes.map((link) => (
            <NavLink
              key={link.id}
              href={`#section-${link.id}`}
              label={link.label}
              isActive={link.id === activeSection}
              onClick={() => handleClick(link.id)}
              showNavLink={showNavLink}
            />
          ))}
        </HStack>

        <Flex cursor="pointer" onClick={() => router.push('/cart')} gap={3}>
          <PiHandbagThin fontSize="25px" />
          <Text as="span">{cart?.length || 0}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

interface NavLinkProps {
  href: string
  label: React.ReactNode
  isActive: boolean
  onClick: () => void
  showNavLink?: boolean
}

const NavLink: React.FC<NavLinkProps> = ({ href, label, isActive, onClick, showNavLink = true }) => {
  if (!showNavLink) return null
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
      fontSize={{ base: '12px', md: '16px' }}
      borderBottom={isActive ? '4px solid' : 'none'}
      borderColor={isActive ? colorsProxy.main['border-selected'] : 'transparent'}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      _hover={{
        textDecoration: 'none',
        borderBottom: '4px solid',
        borderColor: `${colorsProxy.main['border-selected']}`,
        backgroundColor: `${colorsProxy.main.secundary}`
      }}
    >
      {label}
    </Link>
  )
}
