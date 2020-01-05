using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using CMS.Articles;
using CMS.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using System.Threading.Tasks;

namespace CMS.Repository
{
    public class ArticleRepository : EfCoreRepository<CMSDbContext, Article, Guid>, IArticleRepository
    {
        public ArticleRepository(IDbContextProvider<CMSDbContext> dbContextProvider) : base(dbContextProvider)
        {

        }

        public Task UpdateRange(IList<Article> entities)
        {
            DbContext.UpdateRange(entities);
            return Task.CompletedTask;
        }
    }
}
