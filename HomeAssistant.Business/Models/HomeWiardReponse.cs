namespace HomeAssistant.Business.Models;
using Newtonsoft.Json;

public class HomeWizardResponse
{
    [JsonProperty("wifi_ssid")]
    public string WifiSsid { get; set; }

    [JsonProperty("wifi_strength")]
    public int WifiStrength { get; set; }

    [JsonProperty("smr_version")]
    public int SmrVersion { get; set; }

    [JsonProperty("meter_model")]
    public string MeterModel { get; set; }

    [JsonProperty("unique_id")]
    public string UniqueId { get; set; }

    [JsonProperty("active_tariff")]
    public int ActiveTariff { get; set; }

    [JsonProperty("total_power_import_kwh")]
    public double TotalPowerImportKwh { get; set; }

    [JsonProperty("total_power_import_t1_kwh")]
    public double TotalPowerImportT1Kwh { get; set; }

    [JsonProperty("total_power_import_t2_kwh")]
    public double TotalPowerImportT2Kwh { get; set; }

    [JsonProperty("total_power_export_kwh")]
    public double TotalPowerExportKwh { get; set; }

    [JsonProperty("total_power_export_t1_kwh")]
    public double TotalPowerExportT1Kwh { get; set; }

    [JsonProperty("total_power_export_t2_kwh")]
    public double TotalPowerExportT2Kwh { get; set; }

    [JsonProperty("active_power_w")]
    public double ActivePowerW { get; set; }

    [JsonProperty("active_power_l1_w")]
    public double ActivePowerL1W { get; set; }

    [JsonProperty("active_power_l2_w")]
    public double ActivePowerL2W { get; set; }

    [JsonProperty("active_power_l3_w")]
    public double ActivePowerL3W { get; set; }

    [JsonProperty("active_voltage_l1_v")]
    public double ActiveVoltageL1V { get; set; }

    [JsonProperty("active_voltage_l2_v")]
    public double ActiveVoltageL2V { get; set; }

    [JsonProperty("active_voltage_l3_v")]
    public double ActiveVoltageL3V { get; set; }

    [JsonProperty("active_current_a")]
    public double ActiveCurrentA { get; set; }

    [JsonProperty("active_current_l1_a")]
    public double ActiveCurrentL1A { get; set; }

    [JsonProperty("active_current_l2_a")]
    public double ActiveCurrentL2A { get; set; }

    [JsonProperty("active_current_l3_a")]
    public double ActiveCurrentL3A { get; set; }

    [JsonProperty("active_power_average_w")]
    public double ActivePowerAverageW { get; set; }

    [JsonProperty("montly_power_peak_w")]
    public double MontlyPowerPeakW { get; set; }

    [JsonProperty("montly_power_peak_timestamp")]
    public long MontlyPowerPeakTimestamp { get; set; }

    [JsonProperty("external")]
    public List<object> External { get; set; }
}
