using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace JobWebAPI.Models
{
    /// <summary>
    /// This class is for Job Model
    /// </summary>
    public class Job
    {
        // Primary Key of Movie
        [Key]
        public int JobID { get; set; }

        // Title of Job
        [Required]
        [StringLength(200)]
        public string JobTitle { get; set; }

        // Represent Company Name
        [Required]
        [StringLength(200)]
        public string CompanyName { get; set; }

        // Package Per Year
        [Required]
        [StringLength(200)]
        public string Package { get; set; }

        // Last Date of Apply
        [Required]
        [StringLength(200)]
        public string LastDate { get; set; }
    }
}
