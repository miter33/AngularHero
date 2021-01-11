using HeroesPortalWebApi.Common.Models;

namespace HeroesPortalWebApi.BLL.Services.Interfaces
{
    public interface IUserService
    {
        User GetUser(string email, string password);
    }
}
