using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using System.Threading.Tasks;

namespace CMS
{
    public interface IArticleAppService : ICrudAppService<ArticleDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateArticleDto, CreateUpdateArticleDto>
    {

    }
}
