using AutoMapper;
using CMS.Articles;
using CMS.Products;
using CMS.Menus;
using CMS.Pages;

namespace CMS
{
    public class CMSApplicationAutoMapperProfile : Profile
    {
        public CMSApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            CreateMap<Menu,MenuDto>();
            CreateMap<CreateUpdateMenuDto, Menu>();

            CreateMap<Article, ArticleDto>();
            CreateMap<CreateUpdateArticleDto, Article>();

            CreateMap<Product, ProductDto>();
            CreateMap<CreateUpdateProductDto, Product>();

            CreateMap<Page, PageDto>();
            CreateMap<CreateUpdatePageDto, Page>();

        }
    }
}
