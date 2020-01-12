using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace CMS.Menus
{
    public class CreateUpdateMenuDto
    {
        [Required]
        public Guid ParentId { get; set; }

        [Required]
        [StringLength(16)]
        public string Name { get; set; }

        [Required]
        public PageType PageType { get; set; }

        [Required]
        public int RelatedId { get; set; }
        public int Sort { get; set; }
    }

    public class CreateUpdateMenuDto<Tkey> : CreateUpdateMenuDto
    {
        public Tkey Id;
    }

}

