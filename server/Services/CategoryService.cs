using server.Data;
using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ApplicationDbContext _context;

        public CategoryService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Category?> GetById(Guid CategoryId)
        {
            return await _context.Categories.Select(c => new Category
            {
                CategoryId = c.CategoryId,
                CategoryName = c.CategoryName
            }).FirstOrDefaultAsync((c) => c.CategoryId == CategoryId);
        }
    }
}
