using FluentValidation;
using HeroesPortalWebApi.Common.Models;
using Newtonsoft.Json;

namespace HeroesPortalWebApi.WEB.Validators
{
    public class HeroValidator : AbstractValidator<Hero>
    {
        public HeroValidator()
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}
