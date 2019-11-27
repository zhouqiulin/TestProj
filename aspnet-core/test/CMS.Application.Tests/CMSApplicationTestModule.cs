using Volo.Abp.Modularity;

namespace CMS
{
    [DependsOn(
        typeof(CMSApplicationModule),
        typeof(CMSDomainTestModule)
        )]
    public class CMSApplicationTestModule : AbpModule
    {

    }
}