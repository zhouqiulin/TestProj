using CMS.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.BackgroundJobs;
using Volo.Abp.Modularity;

namespace CMS.DbMigrator
{
    [DependsOn(
        typeof(AbpAutofacModule),
        typeof(CMSEntityFrameworkCoreDbMigrationsModule),
        typeof(CMSApplicationContractsModule)
        )]
    public class CMSDbMigratorModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            Configure<AbpBackgroundJobOptions>(options => options.IsJobExecutionEnabled = false);
        }
    }
}
