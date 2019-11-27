using CMS.EntityFrameworkCore;
using Volo.Abp.Modularity;

namespace CMS
{
    [DependsOn(
        typeof(CMSEntityFrameworkCoreTestModule)
        )]
    public class CMSDomainTestModule : AbpModule
    {

    }
}