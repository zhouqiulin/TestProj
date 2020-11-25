using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace CMS.Pages
{
   public class PageDto:AuditedEntityDto<Guid>
    {
        public string Name { get; set; }

        public Guid TreeId { get; set; }

        public string Content { get; set; }

        public string Description { get; set; }


        public string Title { get; set; }

        public string Keywords { get; set; }

        public int Sort { get; set; }

        public bool Valid { get; set; }
    }
}
