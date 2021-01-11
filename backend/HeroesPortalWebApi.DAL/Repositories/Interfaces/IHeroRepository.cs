using HeroesPortalWebApi.Common.Models;
using System.Collections.Generic;

namespace HeroesPortalWebApi.DAL.Repositories.Interfaces
{
    public interface IHeroRepository
    {
        int Add(Hero hero);
        List<Hero> GetAll();
        Hero GetById(int id);
        void Update(Hero hero);
        void Delete(int id);
        List<Hero> GetAllByName(string name);
    }
}
