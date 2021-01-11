using FluentValidation;
using HeroesPortalWebApi.WEB.Models;

namespace HeroesPortalWebApi.WEB.Validators
{
    public class LoginValidator : AbstractValidator<Login>
    {
        public LoginValidator()
        {
            RuleFor(x => x.Email).NotEmpty().Matches(@"^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})$");
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        }
    }
}
