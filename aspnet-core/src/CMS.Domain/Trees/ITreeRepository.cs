using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Trees
{
    public interface ITreeRepository
    {
         Task UpdateRange(IList<Tree> entities);
    }
}
