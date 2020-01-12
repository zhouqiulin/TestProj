using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Volo.Abp;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.Users;
using CMS.Articles;
using CMS.Products;

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
            builder.Entity<Article>(b =>
            {
                b.ToTable(CMSConsts.DbTablePrefix + "Articles", CMSConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.Title).IsRequired().HasMaxLength(128);

            });

            builder.Entity<Product>(b =>
            {
                b.ToTable(CMSConsts.DbTablePrefix + "Products", CMSConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.Name).IsRequired().HasMaxLength(128);

            });
        }

        public static void ConfigureCustomUserProperties<TUser>(this EntityTypeBuilder<TUser> b)
            where TUser: class, IUser
        {
            //b.Property<string>(nameof(AppUser.MyProperty))...
        }
    }
}