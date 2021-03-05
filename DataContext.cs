using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json.Linq;

namespace WebProject
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("Data Source=web_project.db");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>()
                .HasOne(p => p.Owner)
                .WithMany()
                .HasForeignKey(p => p.OwnerId);

            var passwordHasher = new PasswordHasher<User>();
            var user1 = new User {
                Id = 1,
                UserName = "Sample User",
                Email = "example@email.com",
            };
            user1.PasswordHash = passwordHasher.HashPassword(user1, "password123");
            modelBuilder.Entity<User>().HasData(user1);
            var user2 = new User {
                Id = 2,
                UserName = "Sample User 2",
                Email = "example2@email.com",
            };
            user2.PasswordHash = passwordHasher.HashPassword(user2, "password123");
            modelBuilder.Entity<User>().HasData(user2);
            var user3 = new User {
                Id = 3,
                UserName = "Sample User 3",
                Email = "example3@email.com",
            };
            user3.PasswordHash = passwordHasher.HashPassword(user3, "password123");
            modelBuilder.Entity<User>().HasData(user3);
            modelBuilder.Entity<Project>().HasData(new Project {
                Id = 1,
                Name = "First Project",
                Json = "{'users': [{'userName': 'Test User', 'email': 'aa@bb@cc'}]}",
                OwnerId = 1
            });
        }
    }
}