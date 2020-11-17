using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace CMS.Trees
{
    public class TreeDto : AuditedEntityDto<Guid>
    {
        public Guid? ParentId { get; set; }

        public Category Category { get; set; }

        public string Name { get; set; }

        public int Sort { get; set; }
    }
}
