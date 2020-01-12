using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using System.Threading.Tasks;
using CMS.Products;

namespace CMS
{
    public interface IProductAppService : ICrudAppService<ProductDto, Guid, GetProductListInputDto, CreateUpdateProductDto, CreateUpdateProductDto>
    {
        public Task<IList<ProductDto>> UpdateRange(IList<CreateUpdateProductDto<Guid>> updateDtos);
    }
}
