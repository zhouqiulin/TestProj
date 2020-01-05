using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using System.Threading.Tasks;
using CMS.Articles;

namespace CMS
{
    public interface IArticleAppService : ICrudAppService<ArticleDto, Guid, PagedAndSortedResultRequestDto, CreateUpdateArticleDto, CreateUpdateArticleDto>
    {
        public Task<IList<ArticleDto>> UpdateRange(IList<CreateUpdateArticleDto<Guid>> createUpdateArticleDtos);
    }
}
