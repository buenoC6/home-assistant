using Newtonsoft.Json;

namespace HomeAssistant.Data.Models;

public class SolarPanelData
{
    public DateTime Timestamp { get; set; }
    
    public string SolarData  { get; set; }
    
    public double DailyProduction { get; set; }
}