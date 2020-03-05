using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using CMS.Pages;
using Volo.Abp.Application.Dtos;

namespace CMS.Pages
{
    public interface IPageAppService : ICrudAppService<PageDto, Guid, PagedAndSortedResultRequestDto, CreateUpdatePageDto, CreateUpdatePageDto>
    {

    }
}
