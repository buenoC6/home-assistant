namespace HomeAssistant.Business.Models;

public class DeviceInfo
{
    public string IPAddress { get; init; }
    public string? Hostname { get; init; }
    public string? OsInfo { get; init; }
    public long RoundtripTime { get; init; }
    public bool IsReachable { get; init; }
}