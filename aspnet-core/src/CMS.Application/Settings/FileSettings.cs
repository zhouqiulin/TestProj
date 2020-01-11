using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Settings;

namespace CMS.Settings
{
    class FileSettings : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            context.Add(
                new SettingDefinition("App.UploadFiles.BaseUrl", "UploadFiles"),
                new SettingDefinition("App.UploadFiles.MaxLength", 5 * 1024 * 1024 + ""),
                new SettingDefinition("App.UploadFiles.AllowType", ".jpg,.jpeg,.gif,.bmp")
                ); ;
        }
    }
}
