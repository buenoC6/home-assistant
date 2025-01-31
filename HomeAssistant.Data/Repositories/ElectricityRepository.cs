using HomeAssistant.Data.Contexts;
using HomeAssistant.Data.Interfaces;
using HomeAssistant.Data.Models;

namespace HomeAssistant.Data.Repositories;

public class ElectricityRepository : IElectricityRepository
{
    private readonly HomeAssistantDbContext _context;
    private readonly ILogger<SolarPanelRepository> _logger;
    
    public ElectricityRepository(HomeAssistantDbContext context, ILogger<SolarPanelRepository> logger)
    {
        _context = context;
        _logger = logger;
    }
    
    public void CreateDailyElectricityUsageData(ElectricityUsageData electricityUsageData)
    {
        var data = new ElectricityUsageData
        {
            Timestamp = DateTime.UtcNow
                    
        };

        _context.ElectricityUsages.Add(data);
        _context.SaveChanges();

        _logger.LogInformation("Données sauvegardées : {@Data}", data);
    }
    
}