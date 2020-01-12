using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace CMS.Menus
{
   public class MenuDto:AuditedEntityDto<Guid>
    {
        public Guid ParentId { get; set; }
        public string Name { get; set; }
        public PageType PageType { get; set; }
        public int RelatedId { get; set; }
        public int Sort { get; set; }
    }
}
