using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using CMS.Products;
using CMS.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CMS.Repository
{
    public class ProductRepository : EfCoreRepository<CMSDbContext, Product, Guid>, IProductRepository
    {
        public ProductRepository(IDbContextProvider<CMSDbContext> dbContextProvider) : base(dbContextProvider)
        {

        }

        public Task UpdateRange(IList<Product> entities)
        {
            DbContext.UpdateRange(entities);
            return Task.CompletedTask;
        }
    }
}
