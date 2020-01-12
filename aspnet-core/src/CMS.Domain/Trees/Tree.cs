using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace CMS.Trees
{
    public class Tree : AuditedAggregateRoot<Guid>
    {
        public int ParentId { get; set; }

        public Category Category { get; set; }

        public string Name { get; set; }

        public int Sort { get; set; }
    }
}
