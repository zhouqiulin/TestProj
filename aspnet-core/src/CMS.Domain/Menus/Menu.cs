using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace CMS.Menus
{
   public class Menu:AuditedAggregateRoot<Guid>
    {
        public Guid ParentId { get; set; }
        public string Name { get; set; }
        public PageType PageType { get; set; }
        public int RelatedId { get; set; }
        public int Sort { get; set; }
    }
}
