using System.Threading.Tasks;

namespace CMS.Data
{
    public interface ICMSDbSchemaMigrator
    {
        Task MigrateAsync();
    }
}
