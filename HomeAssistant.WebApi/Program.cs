using HomeAssistant.Business.Interfaces;
using HomeAssistant.Business.Services;
using HomeAssistant.Data.Contexts;
using HomeAssistant.Data.Interfaces;
using HomeAssistant.Data.Repositories;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");

if (!string.IsNullOrEmpty(connectionString))
{
    builder.Services.AddDbContext<HomeAssistantDbContext>(options =>
        options.UseNpgsql(connectionString));
}
else
{
    // Par défaut, tu peux lire la connection string depuis appsettings.json si pas de variable d'env.
    builder.Services.AddDbContext<HomeAssistantDbContext>(options =>
        options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
}

// Ajouter les services à l'application
builder.Services.AddControllers(); // Support pour les contrôleurs

// Configuration de Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Home Assistant Web API",
        Version = "v1",
        Description = "API pour la découverte des appareils connectés au réseau local",
        Contact = new OpenApiContact
        {
            Name = "Alexian Moins",
            Email = "contact@netbuddies.dev"
        }
    });
});

// Injection des dépendances
builder.Services.AddScoped<IDeviceService, DeviceService>();
builder.Services.AddScoped<ISolarPanelsService, SolarPanelsService>();
builder.Services.AddScoped<IElectricityService, ElectricityService>();

builder.Services.AddScoped<IElectricityRepository, ElectricityRepository>();
builder.Services.AddScoped<ISolarPanelRepository, SolarPanelRepository>();

builder.Services.AddHttpClient<IDeviceService, DeviceService>();
builder.Services.AddHttpClient<IApiPollingService, ApiPollingService>();

builder.Services.AddHostedService<ApiPollingService>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<HomeAssistantDbContext>();
    dbContext.Database.Migrate();
}

app.UseCors(builder => builder
    .AllowCredentials()
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed(origin => true));

// Configurer le pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Home Assistant Web API v1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers(); // Permet de détecter automatiquement les contrôleurs et leurs endpoints

app.Run();