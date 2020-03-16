using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using System.Threading.Tasks;
using CMS.Trees;

namespace CMS
{
    public interface ITreeAppService : ICrudAppService<TreeDto, Guid, GetTreeListInputDto, CreateUpdateTreeDto, CreateUpdateTreeDto>
    {
        public Task<IList<TreeDto>> UpdateRange(IList<CreateUpdateTreeDto<Guid>> updateDtos);
    }
}
