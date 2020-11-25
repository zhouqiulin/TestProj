using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using CMS.Pages;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using System.Threading.Tasks;
using System.Linq;
using CMS.Trees;

namespace CMS
{
    public  class PageAppService : CrudAppService<Page, PageDto, Guid, GetPagetListInputDto, CreateUpdatePageDto, CreateUpdatePageDto>, IPageAppService
    {
        private readonly IPageRepository _pageRepository;
        private readonly ITreeRepository _treeRepository;

        public PageAppService(IPageRepository pageReposotory, ITreeRepository treeRepository) :base(pageReposotory)
        {
            _pageRepository = pageReposotory;
            _treeRepository = treeRepository;
        }

        public async Task<IList<PageDto>> UpdateRange(IList<CreateUpdatePageDto<Guid>> updateDtos)
        {
            await CheckUpdatePolicyAsync();
            var entities = new List<Page>();

            foreach (var item in updateDtos)
            {
                var entity = await GetEntityByIdAsync(item.Id);
                base.MapToEntity(item, entity);
                entities.Add(entity);
            }
            await _pageRepository.UpdateRange(entities);
            return ObjectMapper.Map<IList<Page>, IList<PageDto>>(entities);


        }
        protected override IQueryable<Page> CreateFilteredQuery(GetPagetListInputDto input)
        {
            var nodes = _treeRepository.findChildNode(input.TreeId);

            if (input.TreeId != null)
            {
                nodes.Add((Guid)input.TreeId);
            }


            return _pageRepository.Where(o => o.Title.Contains(input.Name) || input.Name.IsNullOrWhiteSpace()).Where(o => nodes.Contains(o.TreeId));

        }

    }
}
