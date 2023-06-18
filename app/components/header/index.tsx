'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'
import ModeToggle from '../mode-toggle'
import { motion, useMotionTemplate } from 'framer-motion'
import useScrollHeaderAnimation from './useScrollHeaderAnimation'
import { useTheme } from 'next-themes'

const scrollThreshold: [number, number] = [0, 50]

function Header() {
  const {
    logoHeight,
    backgroundOpacity,
    headerHeight: height
  } = useScrollHeaderAnimation(scrollThreshold)
  const { theme } = useTheme()
  const bgCn = theme === 'light' ? 'light' : 'dark'

  return (
    <motion.header
      className='bg-bkgd/50'
      style={{
        height,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        backdropFilter: 'blur(8px)',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '0 6rem'
      }}
    >
      <Link
        href='/'
        className='sm:w-1/2 w-[80%] h-full flex items-center justify-start'
      >
        <Image
          src='/next.svg'
          alt='next.js svg'
          width={100}
          height={100}
          className='w-[100px] h-[100px]'
          priority
        />
        <h1 className='font-semibold ml-2  text-[1.800rem]'>BLOG</h1>
      </Link>
      <ModeToggle />
      <Link
        href='https://vercel.com'
        target='_blank'
        className='sm:w-1/2 w-[20%] h-full flex items-center justify-end'
      >
        <Image
          src='/vercel.svg'
          alt='vercel svg'
          width={30}
          height={30}
          className='w-[30px] h-[30px]'
          priority
        />
      </Link>
    </motion.header>
  )
}

export default Header
