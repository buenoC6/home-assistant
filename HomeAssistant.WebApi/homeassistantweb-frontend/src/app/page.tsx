'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useEffect } from 'react'
import { Devices } from '@/components/devices/Devices'
import { SolarProduction } from '@/components/solar-production/SolarProduction'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseOnduleur = await fetch(
          'http://192.168.1.37:8080/api/network/onduleur'
        )
        const responseNetwork = await fetch(
          'http://192.168.1.37:8080/api/network/scan'
        )
        if (!responseOnduleur.ok) {
          throw new Error(`HTTP error! status: ${responseOnduleur.status}`)
        }
        if (!responseNetwork.ok) {
          throw new Error(`HTTP error! status: ${responseNetwork.status}`)
        }
        const network: Network[] = await responseNetwork.json()
        setNetwork(network)
        const result: SolarPower = await responseOnduleur.json()
        setSolar(result)
        const temp = []
        for (let i = 0; i < result.powerCurve.xAxis.length; i++) {
          if (result.powerCurve.activePower[i] === '-') continue
          temp.push({
            hour: result.powerCurve.xAxis[i],
            power: result.powerCurve.activePower[i],
          })
        }
        setChartData(temp)
      } catch (err) {
      } finally {
      }
    }

    fetchData()
  }, [])

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
