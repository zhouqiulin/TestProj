using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace CMS.Products
{
    public class GetProductListInputDto : PagedAndSortedResultRequestDto
    {
        public string Name { get; set; }
    }
}
