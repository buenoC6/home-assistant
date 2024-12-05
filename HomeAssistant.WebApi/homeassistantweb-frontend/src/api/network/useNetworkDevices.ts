import { useQuery } from '@tanstack/react-query'
import { fetchNetworkDevices } from './index'
import { NetworkDevice } from './types'

export const useNetworkDevices = () => {
  return useQuery<NetworkDevice[], Error>({
    queryKey: ['networkDevices'],
    queryFn: fetchNetworkDevices,
  })
}
