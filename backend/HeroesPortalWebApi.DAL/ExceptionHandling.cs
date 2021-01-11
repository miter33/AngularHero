using System;
using System.Data.SqlClient;

namespace HeroesPortalWebApi.DAL
{
    public static class ExceptionHandling
    {
        public static string GetErrorMessage(Exception exception)
        {
            switch (exception)
            {
                case InvalidOperationException ex:
                    return ex.Message;
                case SqlException ex:
                    return ex.Message;
                default:
                    return exception.Message;
            }
        }
    }
}
