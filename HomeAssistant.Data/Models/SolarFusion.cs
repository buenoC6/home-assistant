namespace HomeAssistant.Data.Models;

public class PowerCurve
{
    public List<string> XAxis { get; set; }
    public string CurrentPower { get; set; } // Assurez-vous que le type est correct
    public List<string> ActivePower { get; set; } // Assurez-vous que le type est correct
}

public class StationOverview
{
    public string StationName { get; set; }
    public string PlantAddress { get; set; }
    public string StationDn { get; set; }
}

public class SocialContribution
{
    public double Co2ReductionByYear { get; set; }
    public int EquivalentTreePlantingByYear { get; set; }
    public double StandardCoalSavings { get; set; }
    public int ComponentFlag { get; set; }
    public int EquivalentTreePlanting { get; set; }
    public double Co2Reduction { get; set; }
    public double StandardCoalSavingsByYear { get; set; }
}

public class RealKpi
{
    public double RealTimePower { get; set; }
    public double CumulativeEnergy { get; set; }
    public double MonthEnergy { get; set; }
    public double DailyEnergy { get; set; }
    public double YearEnergy { get; set; }
}

public class JsonResponse
{
    public string Data { get; set; }
    public bool Success { get; set; }
    public int FailCode { get; set; }
}

public class SolarData
{
    public PowerCurve PowerCurve { get; set; }
    public StationOverview StationOverview { get; set; }
    public string Language { get; set; }
    public SocialContribution SocialContribution { get; set; }
    public RealKpi RealKpi { get; set; }
}