using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using System.ComponentModel.DataAnnotations;

namespace CMS.Trees
{
    public class CreateUpdateTreeDto
    {
        public Guid? ParentId { get; set; }

        [Required]
        public Category Category { get; set; }

        [Required]
        public string Name { get; set; }

        public int Sort { get; set; }
    }

    public class CreateUpdateTreeDto<Tkey> : CreateUpdateTreeDto
    {
        public Tkey Id { get; set; }
    }
}
