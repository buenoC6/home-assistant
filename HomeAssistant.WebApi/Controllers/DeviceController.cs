using HomeAssistant.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HomeAssistant.WebApi.Controllers;

[ApiController]
[Route("api/network")]
public class DeviceController : ControllerBase
{
    private readonly IDeviceService _service;

    public DeviceController(IDeviceService service)
    {
        _service = service;
    }

    [HttpGet("scan")]
    public async Task<IActionResult> ScanDevices()
    {
        var devices = await _service.GetDevicesAsync();
        return Ok(devices);
    }
}