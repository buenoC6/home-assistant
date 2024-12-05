'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Devices } from '@/components/devices/Devices'
import { SolarProduction } from '@/components/solar-production/SolarProduction'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <main>
        <div className={'text-3xl font-bold text-center p-3'}>
          <h1>Maison MOINS</h1>
          <h2 className={'text-gray-500 font-light text-xl'}>
            Centre de contrôle
          </h2>
        </div>
        <Accordion
          className={'p-3'}
          defaultValue={'item-1'}
          type="single"
          collapsible
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className={'text-xl'}>
              Panneaux solaires
            </AccordionTrigger>
            <AccordionContent>
              <SolarProduction />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className={'text-xl'}>
              Consommation éléctrique
            </AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className={'text-xl'}>Caméras</AccordionTrigger>
            <AccordionContent></AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className={'text-xl'}>
              Appareils connectés
            </AccordionTrigger>
            <AccordionContent>
              <Devices />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </QueryClientProvider>
  )
}
