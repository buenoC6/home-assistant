using HomeAssistant.Business.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HomeAssistant.WebApi.Controllers;

[ApiController]
[Route("api/electricity")]
public class ElectricityController : ControllerBase
{
    private readonly IElectricityService _service;
    
    public ElectricityController(IElectricityService service)
    {
        _service = service;
    }
    
    [HttpGet("details")]
    public async Task<IActionResult> GetElectricityInfo()
    {
        var electricityData = await _service.GetElectricityInfoAsync();
        return Ok(electricityData);
    }
}