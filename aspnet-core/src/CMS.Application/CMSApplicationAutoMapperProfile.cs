﻿using AutoMapper;
using CMS.Articles;

namespace CMS
{
    public class CMSApplicationAutoMapperProfile : Profile
    {
        public CMSApplicationAutoMapperProfile()
        {
            /* You can configure your AutoMapper mapping configuration here.
             * Alternatively, you can split your mapping configurations
             * into multiple profile classes for a better organization. */
            CreateMap<Article, ArticleDto>();
            CreateMap<CreateUpdateArticleDto, Article>();
        }
    }
}
