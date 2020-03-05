using System;
using System.Collections.Generic;
using System.Text;

namespace CMS.Pages
{
    public class CreateUpdatePageDto
    {
        public string Name { get; set; }

        public Guid TreeId { get; set; }

        public string Content { get; set; }

        public int Sort { get; set; }

        public bool Valid { get; set; }
    }
    public class CreateUpdatePageDto<TKey>
    {
        public TKey Id { get; set; }
    }
}
