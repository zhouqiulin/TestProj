using Volo.Abp.Http.Client.IdentityModel;
using Volo.Abp.Modularity;

namespace CMS.HttpApi.Client.ConsoleTestApp
{
    [DependsOn(
        typeof(CMSHttpApiClientModule),
        typeof(AbpHttpClientIdentityModelModule)
        )]
    public class CMSConsoleApiClientModule : AbpModule
    {
        
    }
}
