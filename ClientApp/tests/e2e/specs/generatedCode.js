// https://docs.cypress.io/api/introduction/api.html
import { CRC32 } from 'crc_32_ts';

describe('Generated Code', () => {
    it('Visits the generated code', () => {
      cy.visit('localhost:8080/editor')
      cy.wait(2000)
    })
    it('Browse files', () => {
      cy.get('.pathElement').contains('restapi.yml')
      cy.get('p').contains('ClientApp').click()
      cy.get('p').contains('src').click()
      cy.get('p').contains('App.vue').click()
      cy.get('.pathElement').contains('App.vue')
      cy.get('p').contains('ApplicationDbContext.cs').click()
      cy.get('.pathElement').contains('ApplicationDbContext.cs')
    })
    it('default generated code', () => {
      const defaultJson = CRC32.str('{\n\t"users": [\n\t\t{\n\t\t\t"userName": "Test User",\n\t\t\t"email": "example@email.com",\n\t\t\t"tasks": [\n\t\t\t\t//timestamps\n\t\t\t\t{\n\t\t\t\t\t"title": "Task Title",\n\t\t\t\t\t"description": "Task description",\n\t\t\t\t\t"isOpen": true,\n\t\t\t\t\t"dueDate": "2021-12-30T12:00:05",\n\t\t\t\t\t"estimatedHours": 1.5,\n\t\t\t\t\t"priority": 1,\n\t\t\t\t\t"tags": [\n\t\t\t\t\t\t//manyToMany\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\t"name": "important",\n\t\t\t\t\t\t\t"color": "red"\n\t\t\t\t\t\t}\n\t\t\t\t\t]\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}')
      const defaultDbContext = CRC32.str('using System;\nusing System.Collections.Generic;\nusing Microsoft.EntityFrameworkCore;\nusing Microsoft.AspNetCore.Identity;\nusing Newtonsoft.Json.Linq;\n\nnamespace MyProject\n{\n    public class ApplicationDbContext : DbContext\n    {\n        public DbSet<User> Users { get; set; }\n        public DbSet<Task> Tasks { get; set; }\n        public DbSet<Tag> Tags { get; set; }\n        \n        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)\n            : base(options)\n        {\n        }\n\n        protected override void OnModelCreating(ModelBuilder modelBuilder)\n        {\n            modelBuilder.Entity<Task>()\n                .HasOne(p => p.User)\n                .WithMany(p => p.Tasks)\n                .HasForeignKey(p => p.UserId);\n\n            modelBuilder.Entity<Task>()\n            .HasMany(p => p.Tags)\n            .WithMany(p => p.Tasks)\n            .UsingEntity(j =>\n                {\n                    j.HasData(new {\n                        TasksId = 1,\n                        TagsId = 1\n                    });\n                }\n            );\n            var passwordHasher = new PasswordHasher<User>();\n            var user1 = new User {\n                Id = 1,\n                UserName = "Test User",\n                Email = "example@email.com"\n            };\n            user1.PasswordHash = passwordHasher.HashPassword(user1, "password123");\n            modelBuilder.Entity<User>().HasData(user1);\n            modelBuilder.Entity<Task>().HasData(new Task {\n                Id = 1,\n                Title = "Task Title",\n                Description = "Task description",\n                IsOpen = true,\n                DueDate = new DateTime(2021, 12, 30, 12, 0, 5),\n                EstimatedHours = 1,5f,\n                Priority = 1,\n                Created = DateTime.Now,\n                Updated = DateTime.Now,\n                UserId = 1\n            });\n            modelBuilder.Entity<Tag>().HasData(new Tag {\n                Id = 1,\n                Name = "important",\n                Color = "red"\n            });\n        }\n    }\n}')
      cy.get('#cm0 .CodeMirror')
      .first()
      .then((cm0) => {
        const json = cm0[0].CodeMirror.getValue()
        expect(CRC32.str(json)).to.eq(defaultJson)
      })
      cy.get('#cm1 .CodeMirror')
      .first()
      .then((cm1) => {
        const dbContext = cm1[0].CodeMirror.getValue()
        cy.log(dbContext)
        expect(CRC32.str(dbContext)).to.eq(defaultDbContext)
      })
    })
    it('New generated code', () => {
      const newJson = '{\n\t"users": [\n\t\t{\n\t\t\t"userName": "Test User",\n\t\t\t"email": "example@email.com",\n\t\t\t"tasks": [\n\t\t\t\t//timestamps\n\t\t\t\t{\n\t\t\t\t\t"title": "Task Title",\n\t\t\t\t\t"description": "Task description",\n\t\t\t\t\t"isOpen": true\n\t\t\t\t}\n\t\t\t]\n\t\t}\n\t]\n}\n'
      const newDbContext = CRC32.str('using System;\nusing System.Collections.Generic;\nusing Microsoft.EntityFrameworkCore;\nusing Microsoft.AspNetCore.Identity;\nusing Newtonsoft.Json.Linq;\n\nnamespace MyProject\n{\n    public class ApplicationDbContext : DbContext\n    {\n        public DbSet<User> Users { get; set; }\n        public DbSet<Task> Tasks { get; set; }\n        \n        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)\n            : base(options)\n        {\n        }\n\n        protected override void OnModelCreating(ModelBuilder modelBuilder)\n        {\n            modelBuilder.Entity<Task>()\n                .HasOne(p => p.User)\n                .WithMany(p => p.Tasks)\n                .HasForeignKey(p => p.UserId);\n\n            var passwordHasher = new PasswordHasher<User>();\n            var user1 = new User {\n                Id = 1,\n                UserName = "Test User",\n                Email = "example@email.com"\n            };\n            user1.PasswordHash = passwordHasher.HashPassword(user1, "password123");\n            modelBuilder.Entity<User>().HasData(user1);\n            modelBuilder.Entity<Task>().HasData(new Task {\n                Id = 1,\n                Title = "Task Title",\n                Description = "Task description",\n                IsOpen = true,\n                Created = DateTime.Now,\n                Updated = DateTime.Now,\n                UserId = 1\n            });\n        }\n    }\n}')
      cy.get('#cm0 .CodeMirror')
      .first()
      .then((editor) => {
        editor[0].CodeMirror.setValue(newJson);
      });
      cy.get('.generate').click();
      cy.wait(2000)
      cy.get('#cm1 .CodeMirror')
      .first()
      .then((cm1) => {
        const dbContext = cm1[0].CodeMirror.getValue()
        expect(CRC32.str(dbContext)).to.eq(newDbContext)
      })
    })
  })
  