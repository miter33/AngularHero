using HeroesPortalWebApi.WEB.Models;

namespace HeroesPortalWebApi.WEB.Authentication.Services
{
    public interface IJwtAuthentication
    {
        string GenerateToken(Login login);
    }
}
