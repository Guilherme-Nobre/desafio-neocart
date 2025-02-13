﻿using System;
using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data
{
	public class AppDbContext : DbContext
	{
        public DbSet<Todo> Todos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseSqlite("DataSource=app.db;Cache=Shared");
    }
}