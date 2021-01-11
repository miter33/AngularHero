using Dapper;
using HeroesPortalWebApi.Common.Models;
using HeroesPortalWebApi.DAL.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace HeroesPortalWebApi.DAL.Repositories.Implementations
{
    public class HeroRepository : IHeroRepository
    {
        private SqlConnection db = null;
        private readonly IConfiguration configuration;
        private readonly ILogger<HeroRepository> logger;

        public HeroRepository(IConfiguration configuration, ILogger<HeroRepository> logger)
        {
            this.configuration = configuration;
            this.logger = logger;
        }

        public List<Hero> GetAll()
        {
            string sqlQuery = "sp_select_all_heroes";
            List<Hero> heroes = null;
            try
            {
                using (db = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
                {
                    db.Open();
                    heroes = db.Query<Hero>(sqlQuery, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Error: {ExceptionHandling.GetErrorMessage(ex)}");
            }
            finally
            {
                if (db.State != ConnectionState.Closed)
                {
                    db.Close();
                }
            }

            return heroes;
        }

        public List<Hero> GetAllByName(string name)
        {
            string sqlQuery = "sp_select_all_hero_by_name";
            List<Hero> heroes = null;
            try
            {
                using (db = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
                {
                    db.Open();
                    heroes = db.Query<Hero>(sqlQuery, new { name }, commandType: CommandType.StoredProcedure).ToList();
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Error: {ExceptionHandling.GetErrorMessage(ex)}");
            }
            finally
            {
                if (db.State != ConnectionState.Closed)
                {
                    db.Close();
                }
            }

            return heroes;
        }

        public Hero GetById(int id)
        {
            string sqlQuery = "sp_select_hero_by_id";
            Hero hero = null;
            try
            {
                using (db = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
                {
                    db.Open();
                    hero = db.Query<Hero>(sqlQuery, new { id }, commandType: CommandType.StoredProcedure).FirstOrDefault();
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Error: {ExceptionHandling.GetErrorMessage(ex)}");
            }
            finally
            {
                if (db.State != ConnectionState.Closed)
                {
                    db.Close();
                }
            }

            return hero;
        }

        public int Add(Hero hero)
        {
            string sqlQuery = "sp_insert_hero";
            int heroId = 0;
            try
            {
                using (db = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
                {
                    db.Open();
                    heroId = (int)(db.ExecuteScalar(sqlQuery, new { hero.Name }, commandType: CommandType.StoredProcedure));
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Error: {ExceptionHandling.GetErrorMessage(ex)}");
            }
            finally
            {
                if (db.State != ConnectionState.Closed)
                {
                    db.Close();
                }
            }
            return heroId;
        }

        public void Update(Hero hero)
        {
            string sqlQuery = "sp_update_hero";
            try
            {
                using (db = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
                {
                    db.Open();
                    db.Execute(sqlQuery, new { hero.id, hero.Name }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Error: {ExceptionHandling.GetErrorMessage(ex)}");
            }
            finally
            {
                if (db.State != ConnectionState.Closed)
                {
                    db.Close();
                }
            }
        }

        public void Delete(int id)
        {
            string sqlQuery = "sp_delete_hero";
            try
            {
                using (db = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
                {
                    db.Open();
                    db.Query<Hero>(sqlQuery, new { id }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Error: {ExceptionHandling.GetErrorMessage(ex)}");
            }
            finally
            {
                if (db.State != ConnectionState.Closed)
                {
                    db.Close();
                }
            }
        }
    }

}
