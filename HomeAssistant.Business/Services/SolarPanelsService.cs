using HomeAssistant.Business.Interfaces;
using HomeAssistant.Business.Models;
using Newtonsoft.Json;

namespace HomeAssistant.Business.Services;

public class SolarPanelsService : ISolarPanelsService
{
    public async Task<SolarData> GetSolarPanelsDetailsAsync()
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