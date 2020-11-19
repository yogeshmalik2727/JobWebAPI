using JobWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobWebAPI.Data
{
    public class JobsDBContext : DbContext
    {
        public JobsDBContext(DbContextOptions<JobsDBContext> options) : base(options)
        {

        }

        public DbSet<Job> Jobs { get; set; }
    }
}