using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using CMS.Menus;
using CMS.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CMS.Repository
{
    public class MenuRepository : EfCoreRepository<CMSDbContext, Menu, Guid>, IMenuRepository
    {
        public MenuRepository(IDbContextProvider<CMSDbContext> dbContextProvider) : base(dbContextProvider)
        {

        }

        public Task UpdateRange(IList<Menu> entities)
        {
            DbContext.UpdateRange(entities);
            return Task.CompletedTask;
        }
    }
}
