using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using CMS.Pages;
using CMS.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CMS.Repository
{
    public class PageRepository : EfCoreRepository<CMSDbContext, Page, Guid>, IPageRepository
    {
        public PageRepository(IDbContextProvider<CMSDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }

        public Task UpdateRange(IList<Page> entities)
        {
            DbContext.UpdateRange(entities);
            return Task.CompletedTask;
        }
    }
}
