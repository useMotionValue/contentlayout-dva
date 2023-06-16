'use client'

import { useTheme } from 'next-themes'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { HiDeviceMobile } from 'react-icons/hi'

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <select value={resolvedTheme} onChange={e => setTheme(e.target.value)}>
      <option value='system'>
        System <HiDeviceMobile />
        <a />
      </option>
      <option value='dark'>
        Dark
        <BsFillMoonFill />
      </option>
      <option value='light'>
        Light
        <BsFillSunFill />
      </option>
    </select>
  )
}

export default ThemeSwitcher
