using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace CMS.Articles
{
   public class ArticleDto:AuditedEntityDto<Guid>
    {

        public string Title { get; set; }

        public Guid TypeId { get; set; }

        public string From { get; set; }

        public string CoverUrl { get; set; }

        public string Description { get; set; }

        public string Content { get; set; }

        public int Sort { get; set; }
    }
}
