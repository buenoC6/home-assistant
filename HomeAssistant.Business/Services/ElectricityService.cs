using HomeAssistant.Business.Interfaces;
using HomeAssistant.Business.Models;
using Newtonsoft.Json;

namespace HomeAssistant.Business.Services;

public class ElectricityService : IElectricityService
{
    public async Task<HomeWizardResponse> GetElectricityInfoAsync()
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
}