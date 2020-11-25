using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace CMS.Pages
{
    public interface IPageRepository : IRepository<Page, Guid>
    {
        public Task UpdateRange(IList<Page> entities);


    }
}
