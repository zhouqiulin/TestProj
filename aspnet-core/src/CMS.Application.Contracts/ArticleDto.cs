using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace CMS
{
   public class ArticleDto:AuditedEntityDto<Guid>
    {
        
        public string Title { get; set; }

        public ArticleType Type { get; set; }

        public string Description { get; set; }

        public string Content { get; set; }
    }
}
