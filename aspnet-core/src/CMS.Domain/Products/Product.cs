using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;
using CMS.Type;

namespace CMS.Products
{
    public class Product : AuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }

        public string Title { get; set; }

        public string Keywords { get; set; }

        public Guid TreeId { get; set; }

        public string MainCoverUrl { get; set; }

        public List<string> OtherCoverUrl { get; set; }

        public string Description { get; set; }

        public string Content { get; set; }

        public int Sort { get; set; }

        public bool Valid { get; set; }


    }
}
