using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using System.Threading.Tasks;
using CMS.Menus;

namespace CMS
{
    public interface IMenuAppService : ICrudAppService<MenuDto, Guid, GetMenuListInputDto, CreateUpdateMenuDto>
    {
      
    }

  
}
