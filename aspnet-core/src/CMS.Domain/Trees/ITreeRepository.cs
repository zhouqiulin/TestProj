using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Repositories;

namespace CMS.Trees
{
    public interface ITreeRepository: IRepository<Tree, Guid>
    {
         Task UpdateRange(IList<Tree> entities);

        IList<Guid> findChildNode(Guid? parentId);
    }
}
