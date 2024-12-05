import { useQuery } from '@tanstack/react-query'
import { SolarPanelsDetails } from '@/api/power/types'
import { fetchSolarPanelsDetails } from '@/api/power/index'

export const useSolarPanelsDetails = () => {
  return useQuery<SolarPanelsDetails, Error>({
    queryKey: ['solarPanelsDetails'],
    queryFn: fetchSolarPanelsDetails,
  })
}
