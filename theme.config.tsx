import React from 'react'
import { DocsThemeConfig, useTheme } from 'nextra-theme-docs'
import Logo from './components/images'

const config: DocsThemeConfig = {
  logo: <span><Logo/></span>,
  project: {
    link: 'https://github.com/wyst-lang/wyst',
  },
  chat: {
    link: 'https://discord.gg/nCePwckd4q',
  },
  docsRepositoryBase: 'https://github.com/wyst-lang/wyst',
  useNextSeoProps() {
    return {
      titleTemplate: '%s - Wyst'
    }
  }
}

export default config
