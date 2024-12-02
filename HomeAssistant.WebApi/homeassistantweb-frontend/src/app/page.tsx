'use client';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";

interface SolarPower{
    realKpi: {
        realTimePower: number;
        cumulativeEnergy: number;
        monthEnergy: number;
        dailyEnergy: number;
        yearEnergy: number;
    }
}

export default function Home() {

    const [solar, setSolar] = useState<SolarPower | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.37:8080/api/network/onduleur'); // Exemple d'URL API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: SolarPower = await response.json();
                setSolar(result);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
            } finally {
            }
        };

        fetchData();
    }, [])

  return (
    <div>
      <main>
        <div className={'text-3xl font-bold text-center p-3'}>
          <h1>Maison Moins</h1>
          <h2 className={'text-gray-500 font-light'}>Centre de contrôle</h2>
        </div>
        <Accordion className={'p-3'} defaultValue={'item-1'} type="single" collapsible>
          <AccordionItem value="item-1">
              <AccordionTrigger className={'text-xl'}>Panneaux solaires</AccordionTrigger>
              <AccordionContent>
                  <Card>
                      <CardHeader className={'p-1.5'}>
                          <CardTitle className={'flex justify-center pt-1'}><img width={40} height={40} src={'data:image/png;base64,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'}/></CardTitle>
                      </CardHeader>
                      <CardContent className={'pt-2'}>
                          <div className={'text-center'}>
                              <span className={'text-xl'}>{solar?.realKpi.dailyEnergy}</span> <span className={'text-gray-500'}>kW</span>
                          </div>
                          <div className={'text-center'}>
                              <span className={'text-gray-500'}>Puissance en temps réel</span>
                          </div>
                      </CardContent>
                  </Card>
              </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
