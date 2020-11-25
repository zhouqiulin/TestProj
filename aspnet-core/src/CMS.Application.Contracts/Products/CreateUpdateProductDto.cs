using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;



namespace CMS.Products
{
    public class CreateUpdateProductDto
    {
        [Required]
        [StringLength(128)]
        public string Name { get; set; }

        [StringLength(128)]
        public string Title { get; set; }

        [StringLength(128)]
        public string Keywords { get; set; }

        [Required]
        public Guid TreeId { get; set; }

        [Required]
        public string MainImageUrl { get; set; }

        [Required]
        public string OtherImageUrl { get; set; }

        [StringLength(256)]
        public string Description { get; set; }

        [Required]
        public string Content { get; set; }

        public int Sort { get; set; }

        public bool Valid { get; set; }
    }

    public class CreateUpdateProductDto<Tkey>: CreateUpdateProductDto
    {
        public Tkey Id { get; set; }
    }
}
