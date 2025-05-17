using HomeAssistant.Data.Models;

namespace HomeAssistant.Data.Interfaces;

public interface ISolarPanelRepository
{
    public void CreateDailySolarPanelData(SolarData solarPanelsData);
}