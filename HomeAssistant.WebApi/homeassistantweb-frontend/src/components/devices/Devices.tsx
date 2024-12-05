import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useNetworkDevices } from '@/api/network/useNetworkDevices'

export function Devices() {
  const { data } = useNetworkDevices()
  return (
    <ul>
      {data &&
        data.length > 0 &&
        data.map((net) => {
          return (
            <li key={net.ipAddress} className={'pt-1 pb-1'}>
              <Card>
                <CardHeader className={'font-bold'}>
                  <div>Nom: {net.hostname}</div>
                </CardHeader>
                <CardContent>
                  <div>IP: {net.ipAddress}</div>
                  <div>Info: {net.osInfo}</div>
                </CardContent>
              </Card>
            </li>
          )
        })}
    </ul>
  )
}
