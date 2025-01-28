import { useQuery } from '@tanstack/react-query'
import { ElectricityDetails } from '@/api/power/types'
import { fetchElectricityDetails } from '@/api/power/index'

export const useElectricityDetails = () => {
  return useQuery<ElectricityDetails, Error>({
    queryKey: ['electricityDetails'],
    queryFn: fetchElectricityDetails,
  })
}
