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

export interface ElectricityDetails {
  wifiSsid: string
  wifiStrength: number
  smrVersion: number
  meterModel: string
  uniqueId: string
  activeTariff: number
  totalPowerImportKwh: number
  totalPowerImportT1Kwh: number
  totalPowerImportT2Kwh: number
  totalPowerExportKwh: number
  totalPowerExportT1Kwh: number
  totalPowerExportT2Kwh: number
  activePowerW: number
  activePowerL1W: number
  activePowerL2W: number
  activePowerL3W: number
  activeVoltageL1V: number
  activeVoltageL2V: number
  activeVoltageL3V: number
  activeCurrentA: number
  activeCurrentL1A: number
  activeCurrentL2A: number
  activeCurrentL3A: number
  activePowerAverageW: number
  montlyPowerPeakW: number
  montlyPowerPeakTimestamp: number
  external: any[]
}
