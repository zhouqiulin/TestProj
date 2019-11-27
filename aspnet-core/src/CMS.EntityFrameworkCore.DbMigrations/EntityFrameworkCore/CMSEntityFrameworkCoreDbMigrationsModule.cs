using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Modularity;

namespace CMS.EntityFrameworkCore
{
    [DependsOn(
        typeof(CMSEntityFrameworkCoreModule)
        )]
    public class CMSEntityFrameworkCoreDbMigrationsModule : AbpModule
    {
        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<CMSMigrationsDbContext>();
        }
    }
}
