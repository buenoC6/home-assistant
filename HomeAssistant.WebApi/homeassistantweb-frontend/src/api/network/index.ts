import axiosInstance from '@/api/axiosInstance'
import { NetworkDevice } from './types'

export const fetchNetworkDevices = async (): Promise<NetworkDevice[]> => {
  const response = await axiosInstance.get('/api/network/scan')
  if (response.status !== 200) {
    throw new Error('Failed to fetch network devices')
  }
  return response.data
}
