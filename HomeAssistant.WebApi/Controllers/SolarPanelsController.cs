using HomeAssistant.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HomeAssistant.WebApi.Controllers;

[ApiController]
[Route("api/solarpanels")]
public class SolarPanelsController : ControllerBase
{
    private readonly ISolarPanelsService _service;
    
    public SolarPanelsController(ISolarPanelsService service)
    {
        _service = service;
    }
    
    [HttpGet("details")]
    public async Task<IActionResult> GetOnduleurDeviceInfo()
    {
        var onduleurDetails = await _service.GetSolarPanelsDetailsAsync();
        return Ok(onduleurDetails);
    }
}