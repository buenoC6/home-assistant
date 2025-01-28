using System.Net;
using System.Net.NetworkInformation;
using HomeAssistant.Business.Interfaces;
using HomeAssistant.Business.Models;
using Newtonsoft.Json;

namespace HomeAssistant.Business.Services;

public class DeviceService : IDeviceService
{
    private readonly HttpClient _httpClient;
    
    public DeviceService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<DeviceInfo[]> GetDevicesAsync()
    {
        var baseIP = "192.168.1."; // Modifier selon votre réseau
        var tasks = new List<Task<DeviceInfo>>();

        for (int i = 1; i <= 254; i++)
        {
            string ip = baseIP + i;
            tasks.Add(PingDevice(ip));
        }

        var results = await Task.WhenAll(tasks);

        return results
            .Where(device => device.IsReachable)
            .Select(device => new DeviceInfo
            {
                IPAddress = device.IPAddress,
                Hostname = device.Hostname,
                OsInfo = device.OsInfo,
                RoundtripTime = device.RoundtripTime
            })
            .ToArray();
    }
    
    public async Task<HomeWizardResponse> GetElectricityInfoAsync()
    {
        // Construire l'URL de l'API
        var url = $"http://192.168.1.9/api/v1/data";
        
        // Envoyer une requête GET
        var response = await _httpClient.GetAsync(url);

        // Vérifier si la réponse est réussie
        response.EnsureSuccessStatusCode();

        // Lire le contenu de la réponse
        var responseBody = await response.Content.ReadAsStringAsync();

        // Si vous souhaitez désérialiser en un objet JSON, utilisez :
        var data = JsonConvert.DeserializeObject<HomeWizardResponse>(responseBody);

        return data;
    }


    public async Task<Data> GetOnduleurDetailsAsync()
    {
        string url = "https://uni003eu5.fusionsolar.huawei.com/rest/pvms/web/kiosk/v1/station-kiosk-file?kk=2rGmkPrC7orIQGKJDMIkJFA5iAphb08L";
        
        using (HttpClient client = new HttpClient())
        {
            // Envoi de la requête GET
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode(); // Lance une exception si le code de statut n'est pas 2xx
            
            JsonResponse jsonResponse = JsonConvert.DeserializeObject<JsonResponse>(await response.Content.ReadAsStringAsync());
            
            return JsonConvert.DeserializeObject<Data>(jsonResponse.Data.Replace("&quot;", "\""));
        }
    }


    private async Task<DeviceInfo> PingDevice(string ipAddress)
    {
        try
        {
            using (var ping = new Ping())
            {
                var reply = await ping.SendPingAsync(ipAddress, 100);
                if (reply.Status == IPStatus.Success)
                {
                    string? hostname = null;

                    try
                    {
                        var hostEntry = await Dns.GetHostEntryAsync(ipAddress);
                        hostname = hostEntry.HostName;
                    }
                    catch
                    {
                        hostname = "Unknown";
                    }

                    var osInfo = await GetHttpHeadersAsync(ipAddress);
                    
                    return new DeviceInfo
                    {
                        IPAddress = ipAddress,
                        Hostname = hostname,
                        OsInfo = osInfo,
                        RoundtripTime = reply.RoundtripTime,
                        IsReachable = true
                    };
                }
            }
        }
        catch
        {
            // Ignorer les erreurs
        }

        return new DeviceInfo
        {
            IPAddress = ipAddress,
            Hostname = null,
            RoundtripTime = -1,
            IsReachable = false
        };
    }
    
    private async Task<string> GetHttpHeadersAsync(string ipAddress)
    {
        using (var client = new HttpClient())
        {
            try
            {
                var response = await client.GetAsync($"http://{ipAddress}");
                if (response.IsSuccessStatusCode)
                {
                    var serverHeader = response.Headers.Server?.ToString();
                    return serverHeader ?? "No Server Header";
                }
            }
            catch
            {
                return "Error connecting";
            }
        }
        return null;
    }
}

