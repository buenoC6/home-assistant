using System.Net;
using System.Net.NetworkInformation;
using HomeAssistant.Business.Interfaces;
using HomeAssistant.Business.Models;

namespace HomeAssistant.Business.Services;

public class DeviceService : IDeviceService
{
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

