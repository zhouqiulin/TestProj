using Microsoft.EntityFrameworkCore;
using CMS.Users;
using CMS.Articles;
using CMS.Products;
using CMS.Menus;
using CMS.Trees;
using CMS.Pages;

using Volo.Abp.Data;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.Identity;
using Volo.Abp.Users.EntityFrameworkCore;

namespace CMS.EntityFrameworkCore
{
    /* This is your actual DbContext used on runtime.
     * It includes only your entities.
     * It does not include entities of the used modules, because each module has already
     * its own DbContext class. If you want to share some database tables with the used modules,
     * just create a structure like done for AppUser.
     *
     * Don't use this DbContext for database migrations since it does not contain tables of the
     * used modules (as explained above). See CMSMigrationsDbContext for migrations.
     */
    [ConnectionStringName("Default")]
    public class CMSDbContext : AbpDbContext<CMSDbContext>
    {
        public DbSet<AppUser> Users { get; set; }

        /* Add DbSet properties for your Aggregate Roots / Entities here.
         * Also map them inside CMSDbContextModelCreatingExtensions.ConfigureCMS
         */

        public DbSet<Article> Articles { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Menu> Menus { get; set; }

        public DbSet<Tree> Trees { get; set; }

        public DbSet<Page> Pages { get; set; }

        public CMSDbContext(DbContextOptions<CMSDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            /* Configure the shared tables (with included modules) here */

            builder.Entity<AppUser>(b =>
            {
                b.ToTable(AbpIdentityDbProperties.DbTablePrefix + "Users"); //Sharing the same table "AbpUsers" with the IdentityUser
                
                b.ConfigureByConvention();
                b.ConfigureAbpUser();

                /* Configure mappings for your additional properties
                 * Also see the CMSEfCoreEntityExtensionMappings class
                 */
            });

            /* Configure your own tables/entities inside the ConfigureCMS method */

            builder.ConfigureCMS();
        }
    }
}
