using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.EntityFrameworkCore;
using CMS.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using CMS.Trees;
using System.Threading.Tasks;

namespace CMS.Repository
{
   public class TreeRepository : EfCoreRepository<CMSDbContext, Tree, Guid>, ITreeRepository
    {
        public TreeRepository(IDbContextProvider<CMSDbContext> dbContext):base(dbContext)
        {

        }

        public Task UpdateRange(IList<Tree> entities)
        {
            DbContext.UpdateRange(entities);
            return Task.CompletedTask;
        }
    }
}
