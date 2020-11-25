using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace CMS.Pages
{
    public class GetPagetListInputDto : PagedAndSortedResultRequestDto
    {
        public string Name { get; set; }
        public Guid? TreeId { get; set; }
    }
}
