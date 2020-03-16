using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Services;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;
using CMS.Trees;
using System.Threading.Tasks;
using System.Linq;

namespace CMS
{
    public class TreeAppService : CrudAppService<Tree, TreeDto, Guid, GetTreeListInputDto, CreateUpdateTreeDto, CreateUpdateTreeDto>, ITreeAppService
    {
        private readonly IRepository<Tree, Guid> _repository;
        private readonly ITreeRepository _treeRepository;
        public TreeAppService(IRepository<Tree, Guid> repository, ITreeRepository treeRepository) : base(repository)
        {
            _repository = repository;
            _treeRepository = treeRepository;
        }


        public async Task<IList<TreeDto>> UpdateRange(IList<CreateUpdateTreeDto<Guid>> updateDtos)
        {
            await CheckUpdatePolicyAsync();
            var entities = new List<Tree>();

            foreach (var item in updateDtos)
            {
                var entity = await GetEntityByIdAsync(item.Id);
                base.MapToEntity(item, entity);
                entities.Add(entity);
            }
            await _treeRepository.UpdateRange(entities);
            return ObjectMapper.Map<IList<Tree>, IList<TreeDto>>(entities);


        }

        protected override IQueryable<Tree> CreateFilteredQuery(GetTreeListInputDto input)
        {
            return _repository.Where(o => o.Name.Contains(input.Name) || input.Name.IsNullOrWhiteSpace())
                    .Where(o => o.Category == input.Category || input.Category == 0);

        }

    }
}


