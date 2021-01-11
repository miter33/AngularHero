using System.ComponentModel.DataAnnotations;

namespace HeroesPortalWebApi.WEB.Models
{
    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
