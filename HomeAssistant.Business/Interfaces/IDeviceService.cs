using HomeAssistant.Business.Models;

namespace HomeAssistant.Business.Interfaces;

public interface IDeviceService
{
    Task<DeviceInfo[]> GetDevicesAsync();
    
    Task<Data> GetOnduleurDetailsAsync();
}