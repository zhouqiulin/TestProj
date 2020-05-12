using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace CMS.Trees
{
    public class Tree : AuditedAggregateRoot<Guid>
    {
        public Guid? ParentId { get; set; } = null;

        public Category Category { get; set; }

        public string Name { get; set; }

        public int Sort { get; set; }
    }
}
