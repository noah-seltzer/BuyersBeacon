using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using var context = new ApplicationDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<ApplicationDbContext>>());

            // Seed Categories
            if (!context.Categories.Any())
            {
                context.Categories.AddRange(
                    new Category { CategoryName = "Electronics" },
                    new Category { CategoryName = "Furniture" },
                    new Category { CategoryName = "Clothing" },
                    new Category { CategoryName = "Books" },
                    new Category { CategoryName = "Sports & Outdoors" },
                    new Category { CategoryName = "Toys & Games" },
                    new Category { CategoryName = "Automotive" },
                    new Category { CategoryName = "Home & Garden" },
                    new Category { CategoryName = "Health & Beauty" },
                    new Category { CategoryName = "Collectibles" },
                    new Category { CategoryName = "Jewelry" },
                    new Category { CategoryName = "Musical Instruments" },
                    new Category { CategoryName = "Art & Crafts" },
                    new Category { CategoryName = "Baby Products" },
                    new Category { CategoryName = "Pet Supplies" }
                );
                
                context.SaveChanges();
            }

            // Seed Tags
            if (!context.Tags.Any())
            {
            context.Tags.AddRange(
                new Tag { Name = "Reliable" },
                new Tag { Name = "Fast Shipping" },
                new Tag { Name = "Fair Price" },
                new Tag { Name = "Friendly" },
                new Tag { Name = "Professional" },
                new Tag { Name = "Responsive" },
                new Tag { Name = "Trustworthy" }
            );

                
                context.SaveChanges();
            }
        }
    }
}