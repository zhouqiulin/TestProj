using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;
using CMS.Type;

namespace CMS.Pages
{
    public class Pages : AuditedAggregateRoot<Guid>
    {
        public string Name { get; set; }

        public Guid TreeId { get; set; }

        public string Content { get; set; }

        public  int  Sort  { get; set; }

        public bool Valid { get; set; }

    }
}
