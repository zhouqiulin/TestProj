using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using CMS.Articles;
using System.Threading.Tasks;
using System.Linq;

namespace CMS
{
    public class ArticleAppService: CrudAppService<Article,ArticleDto,Guid, GetArticleListInputDto, CreateUpdateArticleDto, CreateUpdateArticleDto>, IArticleAppService
    {
        private readonly IRepository<Article, Guid> _repository;
        private readonly IArticleRepository _articleRepository;
        public ArticleAppService(IRepository<Article, Guid> repository,IArticleRepository articleRepository) : base(repository)
        {
            _repository = repository;
            _articleRepository = articleRepository;
        }

        public async Task<IList<ArticleDto>> UpdateRange(IList<CreateUpdateArticleDto<Guid>> updateDtos)
        {
            await CheckUpdatePolicyAsync();
            var entities = new List<Article>();

            foreach (var item in updateDtos)
            {
                var entity = await GetEntityByIdAsync(item.Id);
                base.MapToEntity(item,entity);
                entities.Add(entity);
            }
            await _articleRepository.UpdateRange(entities);
            return ObjectMapper.Map<IList<Article>, IList<ArticleDto>>(entities);


        }
        protected override IQueryable<Article> CreateFilteredQuery(GetArticleListInputDto input)
        {
            return _repository.Where(o => o.Title.Contains(input.Title) || input.Title.IsNullOrWhiteSpace());

        }
     
    }
}


