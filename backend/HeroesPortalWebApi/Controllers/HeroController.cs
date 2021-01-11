using System.Collections.Generic;
using HeroesPortalWebApi.BLL.Services.Interfaces;
using HeroesPortalWebApi.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HeroesPortalWebApi.WEB.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HeroController : ControllerBase
    {
        private readonly IHeroService heroService;

        public HeroController(IHeroService heroService)
        {
            this.heroService = heroService;
        }

        [HttpGet]
        public List<Hero> Get()
        {
            return heroService.GetAll();
        }

        [HttpGet("{id}")]
        public ActionResult<Hero> Get(int id)
        {
            if (id > 0)
            {
                return heroService.GetById(id);
            }

            return BadRequest();
        }

        [HttpGet("search")]
        public ActionResult<List<Hero>> Get([FromQuery]string name)
        {
            if(name != null)
            {
                return heroService.GetAllByName(name);
            }

            return BadRequest();
        }

        [HttpPost]
        public IActionResult Post(Hero hero)
        {
            if(hero != null)
            {
                int heroId = heroService.Add(hero);
                return Ok(new Hero { id = heroId, Name = hero.Name });
            }

            return BadRequest();
        }

        [HttpPut]
        public IActionResult Put(Hero hero)
        {
            if(hero != null)
            {
                heroService.Update(hero);
                return Ok(hero);
            }

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if(id > 0)
            {
                heroService.Delete(id);
                return Ok(id);
            }

            return BadRequest();
        }
    }
}
