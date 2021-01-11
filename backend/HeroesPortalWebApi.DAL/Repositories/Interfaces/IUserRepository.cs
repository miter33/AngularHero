using HeroesPortalWebApi.Common.Models;

namespace HeroesPortalWebApi.DAL.Repositories.Interfaces
{
    public interface IUserRepository
    {
        User GetUser(string email);
    }
}
