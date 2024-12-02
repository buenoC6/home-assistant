using Newtonsoft.Json;

namespace HomeAssistant.Business.Models;

public class PowerCurve
{
    [JsonProperty("xAxis")]
    public List<string> XAxis { get; set; }

    [JsonProperty("currentPower")]
    public string CurrentPower { get; set; } // Assurez-vous que le type est correct

    [JsonProperty("activePower")]
    public List<string> ActivePower { get; set; } // Assurez-vous que le type est correct
}

public class StationOverview
{
    [JsonProperty("stationName")]
    public string StationName { get; set; }

    [JsonProperty("plantAddress")]
    public string PlantAddress { get; set; }

    [JsonProperty("stationDn")]
    public string StationDn { get; set; }
}

public class SocialContribution
{
    [JsonProperty("co2ReductionByYear")]
    public double Co2ReductionByYear { get; set; }

    [JsonProperty("equivalentTreePlantingByYear")]
    public int EquivalentTreePlantingByYear { get; set; }

    [JsonProperty("standardCoalSavings")]
    public double StandardCoalSavings { get; set; }

    [JsonProperty("componentFlag")]
    public int ComponentFlag { get; set; }

    [JsonProperty("equivalentTreePlanting")]
    public int EquivalentTreePlanting { get; set; }

    [JsonProperty("co2Reduction")]
    public double Co2Reduction { get; set; }

    [JsonProperty("standardCoalSavingsByYear")]
    public double StandardCoalSavingsByYear { get; set; }
}

public class RealKpi
{
    [JsonProperty("realTimePower")]
    public double RealTimePower { get; set; }

    [JsonProperty("cumulativeEnergy")]
    public double CumulativeEnergy { get; set; }

    [JsonProperty("monthEnergy")]
    public double MonthEnergy { get; set; }

    [JsonProperty("dailyEnergy")]
    public double DailyEnergy { get; set; }

    [JsonProperty("yearEnergy")]
    public double YearEnergy { get; set; }
}

public class JsonResponse
{
    [JsonProperty("data")]
    public string Data { get; set; }

    [JsonProperty("success")]
    public bool Success { get; set; }

    [JsonProperty("failCode")]
    public int FailCode { get; set; }
}

public class Data
{
    [JsonProperty("powerCurve")]
    public PowerCurve PowerCurve { get; set; }

    [JsonProperty("stationOverview")]
    public StationOverview StationOverview { get; set; }

    [JsonProperty("language")]
    public string Language { get; set; }

    [JsonProperty("socialContribution")]
    public SocialContribution SocialContribution { get; set; }

    [JsonProperty("realKpi")]
    public RealKpi RealKpi { get; set; }
}