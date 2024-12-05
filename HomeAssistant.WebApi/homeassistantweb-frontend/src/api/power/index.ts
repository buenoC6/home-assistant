import axiosInstance from '@/utils/axiosInstance'
import { SolarPanelsDetails } from './types'

export const fetchSolarPanelsDetails =
  async (): Promise<SolarPanelsDetails> => {
    const response = await axiosInstance.get('/api/network/onduleur')
    if (response.status !== 200) {
      throw new Error('Failed to fetch network devices')
    }
    return response.data
  }
