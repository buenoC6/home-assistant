import axiosInstance from '@/api/axiosInstance'
import { ElectricityDetails, SolarPanelsDetails } from './types'

export const fetchSolarPanelsDetails =
  async (): Promise<SolarPanelsDetails> => {
    const response = await axiosInstance.get('/api/network/onduleur')
    if (response.status !== 200) {
      throw new Error('Failed to fetch network devices')
    }
    return response.data
  }

export const fetchElectricityDetails =
  async (): Promise<ElectricityDetails> => {
    const response = await axiosInstance.get('/api/network/electricity')
    if (response.status !== 200) {
      throw new Error('Failed to fetch network devices')
    }
    return response.data
  }
