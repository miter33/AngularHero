using FluentValidation;
using HeroesPortalWebApi.BLL.Services.Implementations;
using HeroesPortalWebApi.BLL.Services.Interfaces;
using HeroesPortalWebApi.Common.Models;
using HeroesPortalWebApi.DAL.Repositories.Implementations;
using HeroesPortalWebApi.DAL.Repositories.Interfaces;
using HeroesPortalWebApi.WEB.Authentication.Services;
using HeroesPortalWebApi.WEB.Models;
using HeroesPortalWebApi.WEB.Validators;
using Microsoft.Extensions.DependencyInjection;

namespace HeroesPortalWebApi.WEB.Dependency
{
    public static class DependencyRegistry
    {
        public static void AddDependencies(this IServiceCollection services)
        {
            services.AddTransient<IHeroRepository, HeroRepository>();
            services.AddTransient<IHeroService, HeroService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IJwtAuthentication, JwtAuthentication>();
            services.AddTransient<IValidator<Hero>, HeroValidator>();
            services.AddTransient<IValidator<Login>, LoginValidator>();
        }
    }
}
