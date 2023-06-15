'use client'
import React from 'react'
import { ThemeProvider } from 'next-themes'

function Providers({ children }: React.PropsWithChildren) {
  return <ThemeProvider attribute='class'>{children}</ThemeProvider>
}

export default Providers
