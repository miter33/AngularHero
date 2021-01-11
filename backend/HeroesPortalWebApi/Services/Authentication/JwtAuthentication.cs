using HeroesPortalWebApi.BLL.Services.Interfaces;
using HeroesPortalWebApi.Common.Models;
using HeroesPortalWebApi.WEB.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace HeroesPortalWebApi.WEB.Authentication.Services
{
    public class JwtAuthentication : IJwtAuthentication
    {
        private readonly IOptions<JwtTokenOptions> options;

        public JwtAuthentication(IOptions<JwtTokenOptions> options)
        {
            this.options = options;
        }

        public string GenerateToken(Login login)
        {
            var authParams = options.Value;
            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, login.Email)
            };

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims, expires: DateTime.Now.AddDays(authParams.TokenLifeTime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
