using HomeAssistant.Business.Interfaces;
using HomeAssistant.Business.Models;
using HomeAssistant.Data.Interfaces;
using Newtonsoft.Json;
using JsonResponse = HomeAssistant.Business.Models.JsonResponse;
using SolarData = HomeAssistant.Business.Models.SolarData;

namespace HomeAssistant.Business.Services;

public class ApiPollingService : BackgroundService , IApiPollingService
{
    private readonly ILogger<ApiPollingService> _logger;
    private readonly IServiceScopeFactory _scopeFactory;

    public ApiPollingService(ILogger<ApiPollingService> logger, IServiceScopeFactory scopeFactory)
    {
        _logger = logger;
        _scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("ApiPollingService started.");

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                // Calcul du délai jusqu'à 23h56
                var now = DateTime.UtcNow;
                var nextRunTime = DateTime.UtcNow.Date.AddDays(1).AddHours(23).AddMinutes(56); // 23h56 du jour suivant
                var delay = nextRunTime - now;

                if (delay.TotalMilliseconds > 0)
                {
                    // Attendre jusqu'à la prochaine exécution (23h56)
                    _logger.LogInformation("En attente jusqu'à 23h56...");
                    await Task.Delay(delay, stoppingToken);
                }

                using var scope = _scopeFactory.CreateScope();
                var solarPanelRepo = scope.ServiceProvider.GetRequiredService<ISolarPanelRepository>();
                var electricityRepo = scope.ServiceProvider.GetRequiredService<IElectricityRepository>();
                
                var solarPanelsData = await this.GetSolarPanelsDetailsAsync();
                var electricityData = await this.GetElectricityDetailsAsync();
                
                solarPanelRepo.CreateDailySolarPanelData(new Data.Models.SolarData
                {
                    Language = solarPanelsData.Language,
                    PowerCurve = new Data.Models.PowerCurve
                    {
                        XAxis = solarPanelsData.PowerCurve.XAxis,
                        CurrentPower = solarPanelsData.PowerCurve.CurrentPower,
                        ActivePower = solarPanelsData.PowerCurve.ActivePower,
                    },
                    RealKpi = new Data.Models.RealKpi
                    {
                        RealTimePower = solarPanelsData.RealKpi.RealTimePower,
                        CumulativeEnergy = solarPanelsData.RealKpi.CumulativeEnergy,
                        MonthEnergy = solarPanelsData.RealKpi.MonthEnergy,
                        DailyEnergy = solarPanelsData.RealKpi.DailyEnergy,
                        YearEnergy = solarPanelsData.RealKpi.YearEnergy
                    },
                    SocialContribution = new Data.Models.SocialContribution
                    {
                        Co2Reduction = solarPanelsData.SocialContribution.Co2Reduction,
                        Co2ReductionByYear = solarPanelsData.SocialContribution.Co2ReductionByYear,
                        StandardCoalSavings = solarPanelsData.SocialContribution.StandardCoalSavings,
                        StandardCoalSavingsByYear = solarPanelsData.SocialContribution.StandardCoalSavingsByYear,
                        EquivalentTreePlanting = solarPanelsData.SocialContribution.EquivalentTreePlanting,
                        EquivalentTreePlantingByYear = solarPanelsData.SocialContribution.EquivalentTreePlantingByYear,
                        ComponentFlag = solarPanelsData.SocialContribution.ComponentFlag
                    },
                    StationOverview = new Data.Models.StationOverview
                    {
                        StationName = solarPanelsData.StationOverview.StationName,
                        StationDn = solarPanelsData.StationOverview.StationDn,
                        PlantAddress = solarPanelsData.StationOverview.PlantAddress
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erreur lors de l'appel API.");
            }
        }
    }

    private async Task<HomeWizardResponse> GetElectricityDetailsAsync()
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