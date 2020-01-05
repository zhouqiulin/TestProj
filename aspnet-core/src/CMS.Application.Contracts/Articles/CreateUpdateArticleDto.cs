using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace CMS
{
    public class CreateUpdateArticleDto
    {
        [Required]
        [StringLength(128)]
        public string Title { get; set; }

        [Required]
        public Guid Type { get; set; }

        [StringLength(64)]
        public string From { get; set; }


        [StringLength(128)]
        public string CoverUrl { get; set; }

        [Required]
        [StringLength(128)]
        public string Description { get; set; }

        [Required]
        public string Content { get; set; }
    }

    public class CreateUpdateArticleDto<Tkey> : CreateUpdateArticleDto
    {
        public Guid Id { get; set; }
    }
}
