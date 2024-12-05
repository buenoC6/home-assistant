export interface SolarPanelsDetails {
  powerCurve: {
    xAxis: string[]
    activePower: string[]
  }
  realKpi: {
    realTimePower: number
    cumulativeEnergy: number
    monthEnergy: number
    dailyEnergy: number
    yearEnergy: number
  }
}
