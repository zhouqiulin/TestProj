using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using CMS.Articles;
using System.Threading.Tasks;
using System.Linq;
using CMS.Trees;

namespace CMS
{
    public class ArticleAppService: CrudAppService<Article,ArticleDto,Guid, GetArticleListInputDto, CreateUpdateArticleDto, CreateUpdateArticleDto>, IArticleAppService
    {
        private readonly IArticleRepository _articleRepository;
        private readonly ITreeRepository _treeRepository;

        public ArticleAppService(IArticleRepository articleRepository, ITreeRepository treeRepository) : base(articleRepository)
        {
            _articleRepository = articleRepository;
            _treeRepository = treeRepository;

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
            var nodes = _treeRepository.findChildNode(input.TreeId);

            if (input.TreeId != null)
            {
                nodes.Add((Guid)input.TreeId);
            }
            

            return _articleRepository.Where(o => o.Title.Contains(input.Title) || input.Title.IsNullOrWhiteSpace()).Where(o =>nodes.Contains(o.TreeId));

        }
     
    }
}


