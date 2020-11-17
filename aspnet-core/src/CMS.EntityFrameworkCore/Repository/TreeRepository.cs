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
        public TreeRepository(IDbContextProvider<CMSDbContext> dbContext) : base(dbContext)
        {

        }

        public Task UpdateRange(IList<Tree> entities)
        {
            DbContext.UpdateRange(entities);
            return Task.CompletedTask;
        }


        /// <summary>
        /// 所有子节点
        /// </summary>
        /// <param name="treeId"></param>
        /// <returns></returns>
        public IList<Guid> findChildNode(Guid? parentdId)
        {
            List<Guid> allGuid = new List<Guid>();

            void findChild(Guid? pId)
            {
                foreach (var item in DbContext.Trees)
                {
                    if (item.ParentId == pId)
                    {
                        allGuid.Add(item.Id);
                        findChild(item.Id);

                    }

                }

            }

            findChild(parentdId);
            return allGuid;

        }

    }
}
