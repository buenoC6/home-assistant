using HomeAssistant.Business.Models;

namespace HomeAssistant.Business.Interfaces;

public interface ISolarPanelsService
{
    Task<SolarData> GetSolarPanelsDetailsAsync();
}