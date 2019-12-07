using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace CMS
{
    public class Article : AuditedAggregateRoot<Guid>
    {
        public string Title { get; set; }

        public ArticleType Type { get; set; }

        public string Description { get; set; }

        public string Content { get; set; }

    }
}
