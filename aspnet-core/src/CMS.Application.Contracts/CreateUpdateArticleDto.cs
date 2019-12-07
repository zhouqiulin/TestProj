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
        public ArticleType Type { get; set; } = ArticleType.Undefined;

        [Required]
        [StringLength(128)]
        public string Description { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
