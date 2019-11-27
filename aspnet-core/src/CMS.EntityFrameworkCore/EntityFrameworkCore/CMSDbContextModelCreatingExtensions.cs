using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp;
using Volo.Abp.Users;

namespace CMS.EntityFrameworkCore
{
    public static class CMSDbContextModelCreatingExtensions
    {
        public static void ConfigureCMS(this ModelBuilder builder)
        {
            Check.NotNull(builder, nameof(builder));

            /* Configure your own tables/entities inside here */

            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(CMSConsts.DbTablePrefix + "YourEntities", CMSConsts.DbSchema);

            //    //...
            //});
        }

        public static void ConfigureCustomUserProperties<TUser>(this EntityTypeBuilder<TUser> b)
            where TUser: class, IUser
        {
            //b.Property<string>(nameof(AppUser.MyProperty))...
        }
    }
}