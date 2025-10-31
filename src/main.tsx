import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { ConfigProvider } from 'antd'
import '@ant-design/v5-patch-for-react-19'
import 'antd/dist/reset.css'
import './index.css'
import { themeConfig } from './theme/config.ts'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

async function enableMocking() {
  if (
    import.meta.env.MODE === 'development' ||
    import.meta.env.VITE_ENABLE_MSW === 'true'
  ) {
    const { worker } = await import('./mocks/browser')
    await worker.start({
      onUnhandledRequest: 'bypass'
    })
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ConfigProvider theme={themeConfig}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ConfigProvider>
    </StrictMode>
  )
})
