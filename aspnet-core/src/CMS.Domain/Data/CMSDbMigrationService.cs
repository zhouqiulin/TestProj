using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;

namespace CMS.Data
{
    public class CMSDbMigrationService : ITransientDependency
    {
        public ILogger<CMSDbMigrationService> Logger { get; set; }

        private readonly IDataSeeder _dataSeeder;
        private readonly ICMSDbSchemaMigrator _dbSchemaMigrator;

        public CMSDbMigrationService(
            IDataSeeder dataSeeder,
            ICMSDbSchemaMigrator dbSchemaMigrator)
        {
            _dataSeeder = dataSeeder;
            _dbSchemaMigrator = dbSchemaMigrator;

            Logger = NullLogger<CMSDbMigrationService>.Instance;
        }

        public async Task MigrateAsync()
        {
            Logger.LogInformation("Started database migrations...");

            Logger.LogInformation("Migrating database schema...");
            await _dbSchemaMigrator.MigrateAsync();

            Logger.LogInformation("Executing database seed...");
            await _dataSeeder.SeedAsync();

            Logger.LogInformation("Successfully completed database migrations.");
        }
    }
}