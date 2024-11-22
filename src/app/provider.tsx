// providers.tsx
// QueryClient를 따로 분리
'use client'
 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
 
//인스턴스를 useState로 관리
export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )
 
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}