import type { ThemeConfig } from 'antd'

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 8,
    fontFamily: 'Inter, sans-serif'
  },
  components: {
    Card: {
      boxShadowTertiary: 'none'
    }
  }
}
