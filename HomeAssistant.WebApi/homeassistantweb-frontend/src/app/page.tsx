'use client'
import { SolarProduction } from '@/components/solar-production/SolarProduction'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Tab, Tabs } from '@nextui-org/tabs'

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <main
        style={{
          paddingInline: '10px',
        }}
      >
        <div className={'text-3xl font-bold text-center p-3 pb-6'}>
          <h1>Maison MOINS</h1>
          <h2 className={'text-gray-500 font-light text-xl'}>
            Centre de contrôle
          </h2>
        </div>
      </main>
      <div className="flex w-full flex-col">
        <Tabs
          placement={'bottom'}
          fullWidth
          size="md"
          classNames={{
            tabList: 'gap-0 rounded-none p-2',
            tab: 'h-12',
          }}
          style={{
            position: 'fixed',
            bottom: 0,
            boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.025)',
          }}
        >
          <Tab
            key="photos1"
            title={
              <div className="flex items-center space-x-1">
                <span>Electricité</span>
              </div>
            }
          >
            <SolarProduction />
          </Tab>
          <Tab
            key="photos2"
            title={
              <div className="flex items-center space-x-1">
                <span>Appareils</span>
              </div>
            }
          ></Tab>
          <Tab
            key="photos3"
            title={
              <div className="flex items-center space-x-1">
                <span>Assistant</span>
              </div>
            }
          ></Tab>
        </Tabs>
      </div>
    </QueryClientProvider>
  )
}
