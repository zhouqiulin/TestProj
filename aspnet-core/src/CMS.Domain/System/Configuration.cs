using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Domain.Entities.Auditing;

namespace CMS.System
{
    public class Configuration : AuditedAggregateRoot<Guid>
    {
        public string CompanyName { get; set; }
        public string CompanyLogoUrl { get; set; }
        public string CompanyEmail { get; set; }
        public string CompanyFax { get; set; }
        public string CompanyTel { get; set; }
        public string CompanyContactName { get; set; }
        public string CompanyContactPhone { get; set; }
        public string CompanyAddress { get; set; }
        public string ICP { get; set; }

    }
}
