using HomeAssistant.Business.Models;

namespace HomeAssistant.Business.Interfaces;

public interface IElectricityService
{
    Task<HomeWizardResponse> GetElectricityInfoAsync();
}