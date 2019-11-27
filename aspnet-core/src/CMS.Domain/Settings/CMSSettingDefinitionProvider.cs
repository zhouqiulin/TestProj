using Volo.Abp.Settings;

namespace CMS.Settings
{
    public class CMSSettingDefinitionProvider : SettingDefinitionProvider
    {
        public override void Define(ISettingDefinitionContext context)
        {
            //Define your own settings here. Example:
            //context.Add(new SettingDefinition(CMSSettings.MySetting1));
        }
    }
}
