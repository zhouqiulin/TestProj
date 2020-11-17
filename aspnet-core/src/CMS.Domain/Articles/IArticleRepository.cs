using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace CMS.Articles
{
    public interface IArticleRepository : IRepository<Article, Guid>
    {
        public Task UpdateRange(IList<Article> entities);


    }
}
