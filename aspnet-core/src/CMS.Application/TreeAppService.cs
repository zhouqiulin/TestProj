using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using CMS.Trees;
using System.Threading.Tasks;
using System.Linq;
using CMS.Articles;
using CMS.Products;
using CMS.Pages;

namespace CMS
{
    public class TreeAppService : CrudAppService<Tree, TreeDto, Guid, GetTreeListInputDto, CreateUpdateTreeDto, CreateUpdateTreeDto>, ITreeAppService
    {
        private readonly ITreeRepository _treeRepository;
        private readonly IArticleRepository _articleRepository;
        private readonly IProductRepository _productRepository;
        private readonly IPageRepository _pageRepository;



        public TreeAppService(ITreeRepository treeRepository, IArticleRepository articleRepository, IProductRepository productRepository, IPageRepository pageRepository) : base(treeRepository)
        {
            _treeRepository = treeRepository;
            _articleRepository = articleRepository;
            _productRepository = productRepository;
            _pageRepository = pageRepository;
        }


        public async Task<IList<TreeDto>> UpdateRange(IList<CreateUpdateTreeDto<Guid>> updateDtos)
        {
            await CheckUpdatePolicyAsync();
            var entities = new List<Tree>();

            foreach (var item in updateDtos)
            {
                var entity = await GetEntityByIdAsync(item.Id);
                base.MapToEntity(item, entity);
                entities.Add(entity);
            }
            await _treeRepository.UpdateRange(entities);
            return ObjectMapper.Map<IList<Tree>, IList<TreeDto>>(entities);


        }

        protected override IQueryable<Tree> CreateFilteredQuery(GetTreeListInputDto input)
        {
            return _treeRepository.Where(o => o.Name.Contains(input.Name) || input.Name.IsNullOrWhiteSpace())
                    .Where(o => o.Category == input.Category || input.Category == 0);

        }

        public override async Task<PagedResultDto<TreeDto>> GetListAsync(GetTreeListInputDto input)
        {
            var model = await base.GetListAsync(input);
            Dictionary<Guid, int> treeDic = new Dictionary<Guid, int>();

            void calcArticles()
            {
                _articleRepository.GroupBy(m => m.TreeId).Select(m => new { m.Key, Count = m.Count() }).ToList().ForEach(ele =>
                {
                    treeDic.Add(ele.Key, ele.Count);
                });
            }

            void calcProducts()
            {
                _productRepository.GroupBy(m => m.TreeId).Select(m => new { m.Key, Count = m.Count() }).ToList().ForEach(ele =>
                {
                    treeDic.Add(ele.Key, ele.Count);
                });
            }

            void calcPages()
            {
                _pageRepository.GroupBy(m => m.TreeId).Select(m => new { m.Key, Count = m.Count() }).ToList().ForEach(ele =>
                {
                    treeDic.Add(ele.Key, ele.Count);
                });
            }



            switch (input.Category)
            {
                case Category.Article:
                    calcArticles();
                    break;
                case Category.Product:
                    calcProducts();
                    break;
                case Category.Page:
                    calcPages();
                    break;
                default:
                    calcArticles();
                    calcProducts();
                    calcPages();
                    break;
            }


            foreach (var item in model.Items)
            {
                if (treeDic.ContainsKey(item.Id))
                {
                    item.AssetsCount = treeDic[item.Id];
                }
                else
                {
                    item.AssetsCount = 0;

                }

            }

            return model;
        }


    }
}


