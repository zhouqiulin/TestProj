using CMS.Menus;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace CMS
{
    public class MenuAppService : CrudAppService<Menu, MenuDto, Guid,GetMenuListInputDto, CreateUpdateMenuDto>, IMenuAppService
    {
        private readonly IRepository<Menu, Guid> _repository;
        private readonly IMenuRepository _menuRepository;

        public MenuAppService(IRepository<Menu, Guid> repository, IMenuRepository menuRepository) : base(repository)
        {
            _repository = repository;
            _menuRepository = menuRepository;
        }

        public async Task<IList<MenuDto>> UpdateRange(IList<CreateUpdateMenuDto<Guid>> updateDtos)
        {
            await CheckUpdatePolicyAsync();
            var entities = new List<Menu>();

            foreach (var item in updateDtos)
            {
                var entity = await GetEntityByIdAsync(item.Id);
                base.MapToEntity(item, entity);
                entities.Add(entity);
            }
            await _menuRepository.UpdateRange(entities);
            return ObjectMapper.Map<IList<Menu>, IList<MenuDto>>(entities);
        }
    }
}