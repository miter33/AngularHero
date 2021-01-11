using HeroesPortalWebApi.BLL.Services.Interfaces;
using HeroesPortalWebApi.Common.Models;
using HeroesPortalWebApi.DAL.Repositories.Interfaces;

namespace HeroesPortalWebApi.BLL.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public User GetUser(string email, string password)
        {
            User user = userRepository.GetUser(email);
            if(user != null)
            {
                bool isMatchingPassword = BCrypt.Net.BCrypt.Verify(password, user?.Password);
                if(isMatchingPassword)
                {
                    return user;
                }
            }

            return null;
        }
    }
}
