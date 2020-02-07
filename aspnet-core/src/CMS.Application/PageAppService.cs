using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using CMS.Pages;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;

namespace CMS
{
    public  class PageAppService : CrudAppService<Page, PageDto, Guid, PagedAndSortedResultRequestDto, CreateUpdatePageDto, CreateUpdatePageDto>, IPageAppService
    {
        private IRepository<Page, Guid> _repository;
        public PageAppService(IRepository<Page,Guid> reposotory ):base(reposotory)
        {
            _repository = reposotory;
        }

    }
}
