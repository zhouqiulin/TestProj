using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;

namespace CMS
{
    public class ArticleAppService: CrudAppService<Article,ArticleDto,Guid,PagedAndSortedResultRequestDto,CreateUpdateArticleDto,CreateUpdateArticleDto>,IArticleAppService
    {
        public ArticleAppService(IRepository<Article, Guid> repository) : base(repository)
        {

        }
    }
}


