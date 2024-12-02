'use client';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";

import { type ChartConfig } from "@/components/ui/chart"
import Image from "next/image";

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    },
    mobile: {
        label: "Mobile",
        color: "#60a5fa",
    },
} satisfies ChartConfig

interface SolarPower{
    powerCurve: {
      xAxis: string[],
      activePower: string[]
    },
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
    const [chartData, setChartData] = useState<{hour: string, power: string}[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.1.37:8080/api/network/onduleur'); // Exemple d'URL API
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: SolarPower = await response.json();
                setSolar(result);
                const temp = [];
                for (let i = 0; i < result.powerCurve.xAxis.length; i++){
                    if(result.powerCurve.activePower[i] === '-') continue;
                    temp.push({
                        hour: result.powerCurve.xAxis[i],
                        power: result.powerCurve.activePower[i]
                    })
                }
                setChartData(temp)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
            } finally {
            }
        };

        fetchData();
    }, [])

    function formatCustom(number?: number){
        if(!number) return 0;
        return (number / 100).toFixed(2)
    }

  return (
    <div>
      <main>
        <div className={'text-3xl font-bold text-center p-3'}>
          <h1>Maison MOINS</h1>
          <h2 className={'text-gray-500 font-light text-xl'}>Centre de contrôle</h2>
        </div>
        <Accordion className={'p-3'} defaultValue={'item-1'} type="single" collapsible>
          <AccordionItem value="item-1">
              <AccordionTrigger className={'text-xl'}>Panneaux solaires</AccordionTrigger>
              <AccordionContent>
                  <Drawer>
                      <DrawerTrigger className={'flex flex-wrap gap-2'} style={{width: '100%', cursor: 'pointer'}}>
                          {
                              chartData && chartData.length > 0 &&
                              <Card style={{width: '98.5%'}}>
                              <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                  <AreaChart
                                      accessibilityLayer
                                      data={chartData}
                                      margin={{
                                          left: 12,
                                          right: 12,
                                      }}
                                  >
                                      <CartesianGrid vertical={false} />
                                      <XAxis
                                          dataKey="hour"
                                          tickLine={false}
                                          axisLine={false}
                                          tickMargin={8}
                                          tickFormatter={(value) => value.slice(0, 3)}
                                      />
                                      <ChartTooltip
                                          cursor={false}
                                          content={<ChartTooltipContent indicator="line" />}
                                      />
                                      <Area
                                          dataKey="power"
                                          type="natural"
                                          fill="var(--color-desktop)"
                                          fillOpacity={0.4}
                                          stroke="var(--color-desktop)"
                                      />
                                  </AreaChart>
                              </ChartContainer>
                          </Card>
                          }
                        <Card style={{width: '48.5%'}} >
                          <CardHeader className={'p-1.5'}>
                              <CardTitle className={'flex justify-center pt-1'}><Image alt={'design'}  width={40} height={40} src={'data:image/png;base64,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'}/></CardTitle>
                          </CardHeader>
                          <CardContent className={'pt-2'}>
                              <div className={'text-center'}>
                                  <span className={'text-xl'}>{solar?.realKpi.realTimePower}</span> <span className={'text-gray-500'}>kW</span>
                              </div>
                              <div className={'text-center'}>
                                  <span className={'text-gray-500'}>En temps réel</span>
                              </div>
                          </CardContent>
                      </Card>
                        <Card style={{width: '48.5%'}} >
                              <CardHeader className={'p-1.5'}>
                                  <CardTitle className={'flex justify-center pt-1'}><Image alt={'design'}  width={40} height={40} src={'data:image/png;base64,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'}/></CardTitle>
                              </CardHeader>
                              <CardContent className={'pt-2'}>
                                  <div className={'text-center'}>
                                      <span className={'text-xl'}>{solar?.realKpi.dailyEnergy}</span> <span className={'text-gray-500'}>kWh</span>
                                  </div>
                                  <div className={'text-center'}>
                                      <span className={'text-gray-500'}>Rendement du jour</span>
                                  </div>
                              </CardContent>
                          </Card>
                          <div style={{width: '100%', marginTop: 10, color: 'white', backgroundColor: 'black', padding: 10, borderRadius: 10}}>Voir plus</div>
                      </DrawerTrigger>
                      <DrawerContent>
                          <DrawerHeader className={'flex flex-wrap gap-1'}>
                              <Card style={{width: '98.5%'}}>
                                  {
                                      chartData && chartData.length > 0 &&
                                      <Card style={{width: '98.5%'}}>
                                          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                                              <AreaChart
                                                  accessibilityLayer
                                                  data={chartData}
                                                  margin={{
                                                      left: 12,
                                                      right: 12,
                                                  }}
                                              >
                                                  <CartesianGrid vertical={false} />
                                                  <XAxis
                                                      dataKey="hour"
                                                      tickLine={false}
                                                      axisLine={false}
                                                      tickMargin={8}
                                                      tickFormatter={(value) => value.slice(0, 3)}
                                                  />
                                                  <ChartTooltip
                                                      cursor={false}
                                                      content={<ChartTooltipContent indicator="line" />}
                                                  />
                                                  <Area
                                                      dataKey="power"
                                                      type="natural"
                                                      fill="var(--color-desktop)"
                                                      fillOpacity={0.4}
                                                      stroke="var(--color-desktop)"
                                                  />
                                              </AreaChart>
                                          </ChartContainer>
                                      </Card>
                                  }
                              </Card>
                              <Card style={{width: '49.25%'}} >
                                  <CardHeader className={'p-1.5'}>
                                      <CardTitle className={'flex justify-center pt-1'}>
                                          <Image alt={'design'}  width={40} height={40} src={'data:image/png;base64,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'}/></CardTitle>
                                  </CardHeader>
                                  <CardContent className={'pt-2'}>
                                      <div className={'text-center'}>
                                          <span className={'text-xl'}>{solar?.realKpi.realTimePower}</span> <span className={'text-gray-500'}>kW</span>
                                      </div>
                                      <div className={'text-center'}>
                                          <span className={'text-gray-500'}>En temps réel</span>
                                      </div>
                                  </CardContent>
                              </Card>
                              <Card style={{width: '49.25%'}}>
                                  <CardHeader className={'p-1.5'}>
                                      <CardTitle className={'flex justify-center pt-1'}>
                                          <Image alt={'design'} width={40} height={40} src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAAXNSR0IArs4c6QAAEbBJREFUeAHtXQmQHUUZ/ud4x97ZZDf3sUDAQDgDGECRRMpIhICgSZUiR4VDRKoUUfFICZQopYhGxEKRogxCqYlVCJEKiJgYkCOaYAgJAQLZkM252U327fWumfH/+u28zNv3pmfmHZsN7F+1OzPd//zd/U3P33//3fM/hYYJWZal3EVrtNZW0o2qpBbv7dIpXK+lFV3R+ztVHA1VU1BdzTQs3Upb6arRJo6UjBnRmoa01h82WloofQfNMRRFsYZD00SFj1RF7rRW6+v39IS1RDqsGFbYBrDU+uABWJqSNCJ68swJtck7lbnpUmUWe/+QAzxn9Wq9eSZF9XRPtDduasVWPMh9NVHVSOu18fbNFF8zd2jBHhKA8fovalsRJaqvSqQSoSDglJs3EoqkiGL9yycvjA+FGqkowAD20vV/q6qdSNVD1Vv9PhD06p7d1PfUmZf0VxLoigG8cOfyKorX1ia0lOq30UeCL2KETIr29KyYsqi/EuWXHWAMXJvbEvVHWhUEBQuqY+bkSKzcA2LZAIY6uOytp2opTNVBGzes+JPU9+RHLu0pl9ooC8AL2ShKb31ilBHR9FLAgq2rJYyT9LB5IhnqcZZK0y2LpnEl68my6lg2/kDdpCjdbOjGFIV2KCZtY+P43XRSfZPrsEXYxhm+ov5zHdL6jMsPrVAUoygBjptKBvja7aujXcbB+mJt2Co92pyMx+ez3Xo+g3g+AzrKUb/Apwz4IQb/BbarXwhHo6v60/H2wEL4BtjSDVpj7PfHzI0Xc799T0kAL9y8vDZRFamxhfk9WpYaCSnqPNMwFpFiXcigVmQgZLBNspTnVU1bnrLMvyuKmfBbR5sv0p/oXTFzUY99HfRYFMDQt1/atqquW0tVBSlQbayvstq7riRFvYXIGh/k3tJ5lb1kmQ8ozQ2PmwdjgSyGOiPU/9j0+d3F6OXAAAPcy1v/2mByL/TdaJ00NUXXcH+6jfXmGN/3VYCRG9zB78t9ZoiWUZp861iVe/8TLZ/tCgpyIICLAVdVQ7MonfoJq4FTKoBX0SJZfWwiPXS7aaY2+BVSDMiBdB/Ugt+emwqHQqql3mGl008PN3ABKOqEuqGOqKsfkNF2YOCH1+bx3YODDGgRTZucSpoPWWTNsgsazkeFlA2hsHpjwjDa/NQzyMDnqwfDFPNrLWhJ45xUKv380QIuAEVdUWfU3Q/AwAKY+OH1BBiTCNi5foRpJl1ksUnE42CDH/7hxIM6o+5og596ARNg48UrBRiDmpihDawkyISxobCILYRH+C8s4xvOeag72oC2eNUTEytgA4xkvNLMS7c+WefHtyB6LsCt0IRB1oBK5GGCwsAsNlR6xlM++y6emnFZtxufaw+GV8wXuKy3GNiHPijgAii0BW3ypZPZuSWwckHYFWC4HF3uySbDWrB0ddnRrBayjRl0ItQFtw1tHJSVdynDqiDAcJZ7+XNhOwpT7Cgc0PIQcknAwIc2etnJwEosMBSQkwewUNq8ElGANycpkjC+dyRMsZZwPdWovuYFOfUt9gJtRFs972fMCg14eQBjDc1rmQfTXxZ2k2ehZWaYGR1DS6fOoXsmfazMkuXi0FYx5ZewATNgN5glB2A8ASxQDmbKuWYbBr4FHgmkFkjOPWW6mBzOvFiTw4Fmq6WXjraizWi7hIDd4F6cAzCW1r1Wf+EV4xF2WDluJG0uWxbaLDyCEonALrM94TBTDsDYt3A4K/8M/ly4HPNzhiZlf7pPFLRv4Dg0pTpK4bYLDBxJ+ae5GGZfc+y4qZ8Wk/pqlbR1PS/H3J0vdOhSTqtqpt2pHmpPB/KZl6+ClrXE0pWHZQJjO+o77B1E2R6M7Uyym7DMk1mJkHH5z5sRHU2Lm2ZSsy59afIEbuxvDwzuZxqOoe+OP5uadGkT88oqmMCrMQKLgpmZRCeW2VVg7BWTLVhhDc2gdNmWea4cPYNOqW6ic2sm0JJdL5HstR8fqqHTqpoYoCoazSBxXagzHadOI05vxw/RW/FO9ogVpi9yOYtGnyAy1/Xupee7dxZm9J1qjQ8p2rw0mSvdbgGWnCfW8QTAmOpt2B6TjpBigdJNYhHpz8Za6eSqMdQcqqa7Jp1LN+/4J1Yos5IA4sXc8y6sn0pTPKyGQ+kEvdy7m/7S+Q51MOg2ncMPzwb3vUQXvdSzx84q6Siw0MgVYAx2wBSbWATA2EKaVcYFisbSesKMX+hofwGuYEkv8sawiKLRLWNPpzHcM2tUnbpN3pfH9InaSXR100mix+K620jS+r591JbsET2XV4hFT4Z6mVU9liay+TYfD6NuKq3seo/+1PkWgSfMDwm0jXv5nbtfpn6rTLtYeSUcmMi2BABTLjoDMPbnmpKV82QyOR8OEFHbMv7D6/pO4pCQCHBVUuiG5pMFWEgEMI93bqWNffu5d7sTevjnG48XD+ZzfDyF1ck9e9bR2p5dtLW1U+jsw++Guxy/OcACeznYLn7U7R5gynl97DWyeP+KJfXhWor5CTdBpaa/n+wm/GkM7pIJswW4CdOg+/e9Rt9sW0uveYCL8nfy/b/Yt0Hw70n10gnRRrpvygU0Vq+m/WxtlBNcu71io4x9UeAITIGtptw5R9/dlXKdvYntTKb5U5ZRhiG4QE0Gkr7cfCqdXzeJDvLgdQe/zhsY2KB00EjQv7rb6PhII7VE6ulU7slr+C1JVwBiVqnjUqr+a9Xl3bIUVXm7cU9cxTcRsoZgrxi/EiVtZ5LJR97cuil0UUMLoefevedVepcHJBmN0aK0lHsoVMpg6mFV8yOWsSMRo2kM8ldZx1eCgAmwkckGtio+OJExiY14MoYS88I80F015kQh5cH2jZ7g6gzq7RPO5v9iX1TB0uOWwSCvo34zLd6KGawyKkFe2ABbVXzNIyuddznKskvNu3TUscIigC27hl9vL1rMgyB07Ob+DikrptVPHNwmeK4eI+1oUjnSTA9sgK2KT6VkQrCFVJZfah7sXNBjHVs9RV1QO5kwKwNt6j/gyf/koXeFiXcS29sTeLJSbvLEhrEV35/JCmZdM02WX0oezCs0/BAPbF6ATWPem8eeKorj0dmzB4MxwariPzx7A82uKdskVMjDPy9sYCCo+Mgve0eBEx5GPNfmCtzmK+l0dtyA1vXuk/JX8yTkO+xLiPARhNnaOJ4BHh8Zlf2DSVaIbNmnV2fKKsRTbJoXNsBWB8rSAjI7y6UsXpkACLM1UCfbpb08+ICaQ5k02LEy+trYM2jCgLMdfPBJ3Dsl1zR/g1UGfBqDyZaNe0DoTWfw7K9Oy5j+W+MHaS/bzkWRBzbAVvexM72k5QOogKVT5nDvy6h6mGK37lzDLsdeamRzC3TQ4T8Y3NArRk2n2bUTBifnXKdYFTzUviknzb6AUwgEJxHo4oZj6ToeKG2CpXHt9meFOrHTAhyl2ABbqXoIUJArK2sh0nknh024hiMHBF8ECLqyEMEZdOWACVco30579MCbYjZoXzuPAB/EHjBx3JGMUa+R8XkgAU4gt/LFDSX+0/Etgkcvxvs7pthy8Ipe3/oc68zMKL6Pey5mXCC4G0GjB3qyuHD8wwPATMxJZ9eMo3rt8N7vjX3twsHj5HGejxrouRhIQa+zKrlq+yqy+xacQiWQVLeJj9bxRY7BxbkWwl/z8HBZNMCQC0BtUJ3l2K+vm9N9PU+X8eekR1rmZS972MsGn4WMxtq636GGAKlZGrCZIoGNZBoObFWEBJBVkB0lMVl+KXm2Jw2Djh+CS9PWpeD/TfvrOf7fQjJs2e+wZ67c5IUNsFW9vilj9bmj3BWz5W3i1xuDzHHRUVnfr51X6Oh0vMOpA5+yF9n276sD9rAXf5B8L2xED0YwC5lQ8ZGfjKGEPHi5sIwDuqLRe8JoA9ye6qPfcu/1orOqx9FUdvhgxcNrau0lq1C+JzaMrYpIIYVuzqbxF5TZ8wqc/JlXHwzWh5+un0YTPaazANjk6dMv979GfQO2tFuV4Gm7esACWX7w7ZzlKLd7Aqd7YANsVYRhkQnG56my/FLzYA8/F3tfjOrfGn9W1nQrJHdiqJbgX3jDw9GDe6/jFWv0Xjjgn+1qLSSu5DQvbICt2sIxbmQl4dtf1jXlHyEchS47sEWsShwTaaDbxp3JDurC5vmyji3sFPJ+3pewQ+hi9tIleVLz873r+WM4Ho7KTMAE2MjEAlsVAYRgr7kxikFQoRfd8suRjsVI+G+xuPnR2vF096TzqMFh69plwKaWgYXHcn3TyXR9c2Zn1wP7/5dd87NllO3I30PLDARgCmxVfLmIAEKygjVLXSvLLyUPNjCcNvAHLNn1b9rHA9iMqtH0q6lzCD0RDnY/dAY7c7AOdwn3XMzelvIaHayMT/JqyXH8ZpSbeM3tBZlMYApsRe0X7F5ZrcRN13m1WLZPxjfy+FL43ZWVJMnDmtn3eaETfopb319D23kaW6eG6RvjZwmHDG7tYOfQK7yfAV6xNu7BmLBg/0Q9841ljxqAPZe3NR47ACIe0M/2/lf0XFgRSybOpjQPovdyWrlMNVYPZiQcPU22bG9F1e6VExf0CYAHNp5IZ2uqofyBNyN/SoJXoCws49w18TwBbh+vo93U+jzFzMMvEvY7wApoGdT74AuGmoBPw0kxVi8rOt+mVV3bs4uco1jN3M9vAqbWAPkH7G3bwisnpRIvVz1natZVMjmzjqnvwMaT7Pv3hd0rm2RbV3XSFxhG+ncyoUHybm4+jeY1TGNzK0V37HrZVVeiZ2KygE1/TezebGSwYILhYWCq/Ra7G2FLv953gIHNn5TCUf9D1ukAGQ8A+yxKJU3Tb0hTeqWbHARc+uPEBWLJJQvwwv2raxM9Mdd1FWx4U03rVZ57j3cTHCR9MptcWEn+B5torawaghD2UMgGu8Gy4I84mx/SWp792buHBvP4v1b2mqoyWxZ7IlJb37ti7FyxNy37niFom6wQIZDjLch4guS18RbUhw+8ERhcbBY8iz1qQQibT55m1VE6uFwqYk54BPZwYpkFGPtZM0Hb3KuOYBbc5TvcOSqbg574bZ6M3M7LR24uzkrWAG0HBrIygKG9Nxh8WYAzN8kjgYhIIRzMQlZAJfOgR9n0IbYt2U7OLPlUsrw82Qjk4RktJRfDHIARbhAKOk+wIwGRQrh9mxxJH4pTtFlESZG0FtgBQydLDsAwjNk2z3wI4eRyniMMC0cK4a7kOvtzspfzHHZwjO1grE7s4onJkBHaijZ7hKABdsDQWa+sFWEnYkfgom2rmjy/lUM0E9P8in3fUB2xjIQWJAfW2oaiXEVVHzQV8y5ZWQjRuHz6/AODAc7pwRAgGDiWo0wY8hIR7ceIFOLFV+58LFAOKbjcRrTVsx2M2WBwcU9eD7YFLdz5zGiv75VF6BhEN/mAfq/Mb3tXKKRf6BVqBpbDiikXFZwi5vVgG2AEyrTP3Y4oWEmb1/BTOjzHdWM+ytLRJrTNC1w0S4aVK8CYRzNs8gGPhRth7RUeYW/kv/x56lEGql1dtAVtQtvsNNcjYySwcmFwBRj8iEKKQJku92aTERlEVbWvfxBARhvQFj/RToANMMoCUeBECjCUNqKQyhzytky2YJbza7X4aFYXQi1wG9AWu11uR7GphLEpNLA575ECDEaEeEUUUudNbud46goH/MTg4MYzXNNRZ9TdT89FG4CJn/C3ngBDGEK8Ihgbzr0Iegsj75Ew4bzq5paPuqLOvnQuCwEWfsPe+gIYFUOIV0QhdaukMx0jb6JKvwwG+pGY8TnrIj3nbos6oq5+rAXIAgZBwt2y2vFPmOUFjbz6YQ8OGghgPIpiQOaVy5Hwtv77cQbkkQDN/hAL3IOdYoNEZHXeNxJi3ImGxzmikJYcJB8fm+N7aIs+zovGJX1VyhMFDpJPL/LvB6w96oPk29iX62ceEryuGo4nTxz5mQcbWccRg9/ID5U4ABk4LUkH54sjwiaWkZ/aOYxM2QG2RY/8WFQGiYoBDPFQGyM/d2Z3uQoeAfTID/ZVEGCn6JGfnHSiUeFzDIgjP5paYZBt8VAjH8Sf/f0/ohBKojvAzQgAAAAASUVORK5CYII='}/>
                                      </CardTitle>
                                  </CardHeader>
                                  <CardContent className={'pt-2'}>
                                      <div className={'text-center'}>
                                          <span className={'text-xl'}>{solar?.realKpi.dailyEnergy}</span> <span className={'text-gray-500'}>kWh</span>
                                      </div>
                                      <div className={'text-center'}>
                                          <span className={'text-gray-500'}>{"Aujourd'hui"}</span>
                                      </div>
                                  </CardContent>
                              </Card>
                              <Card style={{width: '49.25%'}}>
                                  <CardHeader className={'p-1.5'}>
                                      <CardTitle className={'flex justify-center pt-1'}><Image alt={'design'}  width={40} height={40} src={'https://uni003eu5.fusionsolar.huawei.com/pvmswebsite/nologin/assets/build/static/media/monthCap.b6cd73cc1817905b0220.png'}/></CardTitle>
                                  </CardHeader>
                                  <CardContent className={'pt-2'}>
                                      <div className={'text-center'}>
                                          <span className={'text-xl'}>{solar?.realKpi.monthEnergy}</span> <span className={'text-gray-500'}>kWh</span>
                                      </div>
                                      <div className={'text-center'}>
                                          <span className={'text-gray-500'}>Ce mois</span>
                                      </div>
                                  </CardContent>
                              </Card>
                              <Card style={{width: '49.25%'}}>
                                  <CardHeader className={'p-1.5'}>
                                      <CardTitle className={'flex justify-center pt-1'}><Image alt={'design'}  width={40} height={40} src={'https://uni003eu5.fusionsolar.huawei.com/pvmswebsite/nologin/assets/build/static/media/yearCap.6cf130026784a4b09158.png'}/></CardTitle>
                                  </CardHeader>
                                  <CardContent className={'pt-2'}>
                                      <div className={'text-center'}>
                                          <span className={'text-xl'}>{formatCustom(solar?.realKpi?.yearEnergy)}</span> <span className={'text-gray-500'}>MWh</span>
                                      </div>
                                      <div className={'text-center'}>
                                          <span className={'text-gray-500'}>Cette année</span>
                                      </div>
                                  </CardContent>
                              </Card>
                              <Card style={{width: '49.25%'}}>
                                  <CardHeader className={'p-1.5'}>
                                      <CardTitle className={'flex justify-center pt-1'}><Image alt={'design'}  width={40} height={40} src={'data:image/png;base64,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'}/></CardTitle>
                                  </CardHeader>
                                  <CardContent className={'pt-2'}>
                                      <div className={'text-center'}>
                                          <span className={'text-xl'}>{formatCustom(solar?.realKpi.cumulativeEnergy)}</span> <span className={'text-gray-500'}>MWh</span>
                                      </div>
                                      <div className={'text-center'}>
                                          <span className={'text-gray-500'}>Rendement total</span>
                                      </div>
                                  </CardContent>
                              </Card>
                          </DrawerHeader>
                          <DrawerFooter>
                              <DrawerClose>
                                  <Button>Close</Button>
                              </DrawerClose>
                          </DrawerFooter>
                      </DrawerContent>
                  </Drawer>
              </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
}
