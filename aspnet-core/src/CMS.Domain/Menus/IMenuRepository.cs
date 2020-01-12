using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;


namespace CMS.Menus
{
    public interface IMenuRepository : IBasicRepository<Menu, Guid>
    {
        public Task UpdateRange(IList<Menu> entities);


    }
}
