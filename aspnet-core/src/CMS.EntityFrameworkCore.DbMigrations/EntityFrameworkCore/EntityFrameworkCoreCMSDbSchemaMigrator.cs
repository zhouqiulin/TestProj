using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using Volo.Abp.DependencyInjection;

namespace CMS.EntityFrameworkCore
{
    [Dependency(ReplaceServices = true)]
    public class EntityFrameworkCoreCMSDbSchemaMigrator 
        : ICMSDbSchemaMigrator, ITransientDependency
    {
        private readonly CMSMigrationsDbContext _dbContext;

        public EntityFrameworkCoreCMSDbSchemaMigrator(CMSMigrationsDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task MigrateAsync()
        {
            await _dbContext.Database.MigrateAsync();
        }
    }
}