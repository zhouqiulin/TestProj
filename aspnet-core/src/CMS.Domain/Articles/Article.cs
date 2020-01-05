using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace CMS.Articles
{
    public class Article : AuditedAggregateRoot<Guid>
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Keywords { get; set; }

        public Guid TreeId { get; set; }

        public string From { get; set; }

        public string CoverUrl { get; set; }

        public string Content { get; set; }

        public int Sort { get; set; }

        public bool Valid { get; set; }

    }
}
