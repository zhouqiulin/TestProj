using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using CMS.Products;
using System.Threading.Tasks;
using System.Linq;
using CMS.Trees;

namespace CMS
{
    public class ProductAppService: CrudAppService<Product,ProductDto,Guid, GetProductListInputDto, CreateUpdateProductDto, CreateUpdateProductDto>, IProductAppService
    {
        private readonly IProductRepository _productRepository;
        private readonly ITreeRepository _treeRepository;
        public ProductAppService(IProductRepository productRepository, ITreeRepository treeRepository) : base(productRepository)
        {
            _productRepository = productRepository;
            _treeRepository = treeRepository;
        }


        public async Task<IList<ProductDto>> UpdateRange(IList<CreateUpdateProductDto<Guid>> updateDtos)
        {
            await CheckUpdatePolicyAsync();
            var entities = new List<Product>();

            foreach (var item in updateDtos)
            {
                var entity = await GetEntityByIdAsync(item.Id);
                base.MapToEntity(item,entity);
                entities.Add(entity);
            }
            await _productRepository.UpdateRange(entities);
            return ObjectMapper.Map<IList<Product>, IList<ProductDto>>(entities);


        }

        protected override IQueryable<Product> CreateFilteredQuery(GetProductListInputDto input)
        {
            var nodes = _treeRepository.findChildNode(input.TreeId);

            if (input.TreeId != null)
            {
                nodes.Add((Guid)input.TreeId);
            }
            return _productRepository.Where(o => o.Name.Contains(input.Name) || input.Name.IsNullOrWhiteSpace()).Where(o => nodes.Contains(o.TreeId));

        }
     
    }
}


