using HomeAssistant.Business.Interfaces;
using HomeAssistant.Business.Services;
using HomeAssistant.Data.Contexts;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Ajout du DbContext avec PostgreSQL
builder.Services.AddDbContext<HomeAssistantDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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

builder.Services.AddHttpClient<IDeviceService, DeviceService>();
builder.Services.AddHttpClient<IApiPollingService, ApiPollingService>();

builder.Services.AddHostedService<ApiPollingService>();

var app = builder.Build();

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