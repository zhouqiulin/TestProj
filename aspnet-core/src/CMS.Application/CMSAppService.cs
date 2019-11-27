using System;
using System.Collections.Generic;
using System.Text;
using CMS.Localization;
using Volo.Abp.Application.Services;

namespace CMS
{
    /* Inherit your application services from this class.
     */
    public abstract class CMSAppService : ApplicationService
    {
        protected CMSAppService()
        {
            LocalizationResource = typeof(CMSResource);
        }
    }
}
