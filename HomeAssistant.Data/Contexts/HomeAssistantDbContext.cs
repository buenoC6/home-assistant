namespace HomeAssistant.Data.Contexts;

using Models;
using Microsoft.EntityFrameworkCore;

public class HomeAssistantDbContext : DbContext
{
    public HomeAssistantDbContext(DbContextOptions<HomeAssistantDbContext> options) 
        : base(options)
    {
    }
    
    public DbSet<SolarPanelData> SolarPanels { get; set; }
    public DbSet<ElectricityUsageData> ElectricityUsages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Configurations supplémentaires ici (ex: relations, index)
    }
}