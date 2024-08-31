'use client'

import React from 'react'
import { Navbar } from '@/modules/home/components/Navbar'
import { Cart } from '@/modules/cart/components'

export default function Page() {
  return (
    <>
      <Navbar showNavLink={false} />
      <Cart />
    </>
  )
}
