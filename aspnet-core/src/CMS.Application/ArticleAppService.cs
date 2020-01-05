using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using CMS.Articles;
using System.Threading.Tasks;

namespace CMS
{
    public class ArticleAppService: CrudAppService<Article,ArticleDto,Guid,PagedAndSortedResultRequestDto, CreateUpdateArticleDto, CreateUpdateArticleDto>, IArticleAppService
    {
        private readonly IRepository<Article, Guid> _repository;
        private readonly IArticleRepository _crepository;
        public ArticleAppService(IRepository<Article, Guid> repository,IArticleRepository crepository) : base(repository)
        {
            _repository = repository;
            _crepository = crepository;
        }

        public async Task<IList<ArticleDto>> UpdateRange(IList<CreateUpdateArticleDto<Guid>> updateDtos)
        {
            await CheckUpdatePolicyAsync();
            var entities = new List<Article>();

            foreach (var item in updateDtos)
            {
                var entity = await GetEntityByIdAsync(item.Id);
                MapToEntity(item,entity);
                entities.Add(entity);
            }
            await _crepository.UpdateRange(entities);
            return ObjectMapper.Map<IList<Article>, IList<ArticleDto>>(entities);


        }
    }
}


