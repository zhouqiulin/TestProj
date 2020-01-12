using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using CMS.Products;
using System.Threading.Tasks;
using System.Linq;

namespace CMS
{
    public class ProductAppService: CrudAppService<Product,ProductDto,Guid, GetProductListInputDto, CreateUpdateProductDto, CreateUpdateProductDto>, IProductAppService
    {
        private readonly IRepository<Product, Guid> _repository;
        private readonly IProductRepository _productRepository;
        public ProductAppService(IRepository<Product, Guid> repository,IProductRepository productRepository) : base(repository)
        {
            _repository = repository;
            _productRepository = productRepository;
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
            return _repository.Where(o => o.Name.Contains(input.Name) || input.Name.IsNullOrWhiteSpace());

        }
     
    }
}


