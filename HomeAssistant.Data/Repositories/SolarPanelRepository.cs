using HomeAssistant.Data.Contexts;
using HomeAssistant.Data.Interfaces;
using HomeAssistant.Data.Models;
using Newtonsoft.Json;

namespace HomeAssistant.Data.Repositories;

public class SolarPanelRepository : ISolarPanelRepository
{
    private readonly HomeAssistantDbContext _context;
    private readonly ILogger<SolarPanelRepository> _logger;
    
    public SolarPanelRepository(HomeAssistantDbContext context, ILogger<SolarPanelRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public void CreateDailySolarPanelData(SolarData solarPanelsData)
    {
        var newEntry = new SolarPanelData
        {
            Timestamp = DateTime.UtcNow,
            SolarData = JsonConvert.SerializeObject(solarPanelsData),
            DailyProduction = solarPanelsData.RealKpi.DailyEnergy
                    
        };

        _context.SolarPanels.Add(newEntry);
        _context.SaveChanges();

        _logger.LogInformation("Données sauvegardées : {@Data}", newEntry);
    }
}