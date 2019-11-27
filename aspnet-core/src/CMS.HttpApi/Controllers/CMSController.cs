using CMS.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace CMS.Controllers
{
    /* Inherit your controllers from this class.
     */
    public abstract class CMSController : AbpController
    {
        protected CMSController()
        {
            LocalizationResource = typeof(CMSResource);
        }
    }
}