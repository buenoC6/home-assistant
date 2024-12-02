using HomeAssistant.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HomeAssistant.WebApi.Controllers;

[ApiController]
[Route("api/network")]
public class DevicesController : ControllerBase
{
    private readonly IDeviceService _service;

    public DevicesController(IDeviceService service)
    {
        _service = service;
    }

    [HttpGet("scan")]
    public async Task<IActionResult> ScanDevices()
    {
        var devices = await _service.GetDevicesAsync();
        return Ok(devices);
    }

    [HttpGet("onduleur")]
    public async Task<IActionResult> GetOnduleurDeviceInfo()
    {
        var onduleurDetails = await _service.GetOnduleurDetailsAsync();
        return Ok(onduleurDetails);
    }
}