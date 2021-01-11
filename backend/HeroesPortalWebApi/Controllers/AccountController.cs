using HeroesPortalWebApi.BLL.Services.Interfaces;
using HeroesPortalWebApi.Common.Models;
using HeroesPortalWebApi.WEB.Authentication.Services;
using HeroesPortalWebApi.WEB.Models;
using Microsoft.AspNetCore.Mvc;

namespace HeroesPortalWebApi.WEB.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IJwtAuthentication jwtAuthentication;
        private readonly IUserService userService;

        public AccountController(IJwtAuthentication jwtAuthentication, IUserService userService)
        {
            this.jwtAuthentication = jwtAuthentication;
            this.userService = userService;
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] Login login)
        {
            User user = userService.GetUser(login.Email, login.Password);
            if (user != null)
            {
                string token = jwtAuthentication.GenerateToken(login);
                if (token != null)
                {
                    return Ok(new { accessToken = token, email = user.Email, userName = user.UserName });
                }
            }

            return Unauthorized();
        }
    }
}
