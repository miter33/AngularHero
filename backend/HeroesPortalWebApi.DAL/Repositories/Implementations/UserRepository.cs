using Dapper;
using HeroesPortalWebApi.Common.Models;
using HeroesPortalWebApi.DAL.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace HeroesPortalWebApi.DAL.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        IConfiguration configuration;
        private readonly ILogger<UserRepository> logger;

        public UserRepository(IConfiguration configuration, ILogger<UserRepository> logger)
        {
            this.configuration = configuration;
            this.logger = logger;
        }

        public User GetUser(string email)
        {
            SqlConnection db = null;
            string sqlQuery = "sp_select_user_by_email";
            User user = null;
            try
            {
                using (db = new SqlConnection(configuration.GetConnectionString("DefaultConnection")))
                {
                    db.Open();
                    user = db.Query<User>(sqlQuery, new { email }, commandType: CommandType.StoredProcedure).FirstOrDefault();
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

            return user;
        }
    }
}
