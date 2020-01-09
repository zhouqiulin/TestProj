using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace CMS.Articles
{
    public class GetArticleListInputDto : PagedAndSortedResultRequestDto
    {
        public string Title { get; set; }
    }
}
