using System;
using System.Text.Json.Serialization;
using System.Collections.Generic;
namespace WebProject
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
    }
}