using HomeAssistant.Business.Interfaces;
using HomeAssistant.Business.Models;
using HomeAssistant.Data.Contexts;
using HomeAssistant.Data.Models;
using Newtonsoft.Json;

namespace HomeAssistant.Business.Services;

public class ApiPollingService : BackgroundService , IApiPollingService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<ApiPollingService> _logger;

    public ApiPollingService(IServiceScopeFactory scopeFactory, ILogger<ApiPollingService> logger, ISolarPanelsService solarPanelsService)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("ApiPollingService started.");
        
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var apiData = await this.GetElectricityInfoAsync();

                if (apiData != null)
                {
                    using var scope = _scopeFactory.CreateScope();
                    var dbContext = scope.ServiceProvider.GetRequiredService<HomeAssistantDbContext>();

                    var newEntry = new SolarPanelData
                    {
                        Timestamp = DateTime.UtcNow,
                    };

                    dbContext.SolarPanels.Add(newEntry);
                    await dbContext.SaveChangesAsync(stoppingToken);

                    _logger.LogInformation("Données sauvegardées : {@Data}", newEntry);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de l'appel API.");
            }
            
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }

    private async Task<HomeWizardResponse> GetElectricityInfoAsync()
    {
        using (HttpClient client = new HttpClient())
        {
            // Construire l'URL de l'API
            var url = $"http://192.168.1.9/api/v1/data";

            // Envoyer une requête GET
            var response = await client.GetAsync(url);

            // Vérifier si la réponse est réussie
            response.EnsureSuccessStatusCode();

            // Lire le contenu de la réponse
            var responseBody = await response.Content.ReadAsStringAsync();

            // Si vous souhaitez désérialiser en un objet JSON, utilisez :
            var data = JsonConvert.DeserializeObject<HomeWizardResponse>(responseBody);

            return data;
        }
    }
    
    private async Task<SolarData> GetSolarPanelsDetailsAsync()
    {
        string url = "https://uni003eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=2rGmkPrC7orIQGKJDMIkJFA5iAphb08L";
        
        using (HttpClient client = new HttpClient())
        {
            // Envoi de la requête GET
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode(); // Lance une exception si le code de statut n'est pas 2xx
            
            JsonResponse jsonResponse = JsonConvert.DeserializeObject<JsonResponse>(await response.Content.ReadAsStringAsync());
            
            return JsonConvert.DeserializeObject<SolarData>(jsonResponse.Data.Replace("&quot;", "\""));
        }
    }

}