using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using CMS.Pages;
using Volo.Abp.Application.Dtos;
using System.Threading.Tasks;

namespace CMS.Pages
{
    public interface IPageAppService : ICrudAppService<PageDto, Guid, GetPagetListInputDto, CreateUpdatePageDto, CreateUpdatePageDto>
    {
        public Task<IList<PageDto>> UpdateRange(IList<CreateUpdatePageDto<Guid>> updateDtos);
    }
}
