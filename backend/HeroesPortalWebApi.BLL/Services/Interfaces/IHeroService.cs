using HeroesPortalWebApi.Common.Models;
using System.Collections.Generic;

namespace HeroesPortalWebApi.BLL.Services.Interfaces
{
    public interface IHeroService
    {
        int Add(Hero hero);
        List<Hero> GetAll();
        Hero GetById(int id);
        void Update(Hero hero);
        void Delete(int id);
        List<Hero> GetAllByName(string name);
    }
}
