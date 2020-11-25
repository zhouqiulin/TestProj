using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CMS.Pages
{
    public class CreateUpdatePageDto
    {

        [Required]
        [StringLength(64)]
        public string Name { get; set; }

        [Required]

        public Guid TreeId { get; set; }


        [StringLength(128)]

        public string Description { get; set; }


        [Required]
        public string Content { get; set; }

        [StringLength(64)]
        public string Title { get; set; }


        [StringLength(64)]

        public string Keywords { get; set; }

        public int Sort { get; set; }

        public bool Valid { get; set; }
    }
    public class CreateUpdatePageDto<TKey>:CreateUpdatePageDto
    {
        public TKey Id { get; set; }
    }
}
