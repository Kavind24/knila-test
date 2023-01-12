using Microsoft.AspNetCore.Mvc;
using System.Net;
using TestApp.Api.Model;
using TestApp.Api.Services;

namespace TestApp.Api.Controllers
{
    [Route("users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersDetailsService _usersDetailsService;
        private readonly ILogger<UsersController> _logger;
        public UsersController(UsersDetailsService usersDetailsService, ILogger<UsersController> logger)
        {
            _usersDetailsService = usersDetailsService;
            _logger = logger;
        }

        [HttpGet(Name = "GetAllUsers")]
        [ProducesResponseType(typeof(IEnumerable<ContactDetails>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var response = await _usersDetailsService.GetAllUsers();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut(Name = "AddUsers")]
        [ProducesResponseType(typeof(IEnumerable<ContactDetails>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddUsers([FromBody] ContactDetails request)
        {
            try
            {
                await _usersDetailsService.AddUsers(request);
                var response = await _usersDetailsService.GetAllUsers();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("edit")]
        [ProducesResponseType(typeof(IEnumerable<ContactDetails>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> EditUsers([FromBody] ContactDetails request)
        {
            try
            {
                await _usersDetailsService.EditUsers(request);
                var response = await _usersDetailsService.GetAllUsers();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete(Name = "DeleteUsers")]
        [ProducesResponseType(typeof(IEnumerable<ContactDetails>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteUsers([FromBody] ContactDetails request)
        {
            try
            {
                await _usersDetailsService.DeleteUsers(request);
                var response = await _usersDetailsService.GetAllUsers();

                return Ok(response);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
