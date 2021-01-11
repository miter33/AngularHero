using HeroesPortalWebApi.BLL.Services.Interfaces;
using HeroesPortalWebApi.Common.Models;
using HeroesPortalWebApi.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;

namespace HeroesPortalWebApi.BLL.Services.Implementations
{
    public class HeroService : IHeroService
    {
        private readonly IHeroRepository repository;

        public HeroService(IHeroRepository repository)
        {
            this.repository = repository;
        }

        public int Add(Hero hero)
        {
            if(hero == null)
            {
                throw new ArgumentNullException("The hero wasn`t added. The hero is absent");
            }

            return repository.Add(hero);
        }

        public List<Hero> GetAll()
        {
            return repository.GetAll();
        }

        public Hero GetById(int id)
        {
            if(id <= 0)
            {
                throw new ArgumentException("Id hero is incorrect");
            }

            return repository.GetById(id);
        }

        public List<Hero> GetAllByName(string name)
        {
            if(name == null)
            {
                throw new ArgumentNullException("The name of hero equal null");
            }

            return repository.GetAllByName(name);
        }

        public void Update(Hero hero)
        {
            if(hero != null)
            {
                repository.Update(hero);
            }
        }

        public void Delete(int id)
        {
            if (id > 0)
            {
                repository.Delete(id);
            }
        }
    }
}
