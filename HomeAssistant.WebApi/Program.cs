using HomeAssistant.Business.Interfaces;
using HomeAssistant.Business.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

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

var app = builder.Build();

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