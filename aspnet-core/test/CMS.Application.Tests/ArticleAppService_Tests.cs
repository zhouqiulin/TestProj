using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;
using Shouldly;
using Xunit;
using System.Threading.Tasks;
using Volo.Abp.Validation;
using System.Linq;
using CMS.Articles;

namespace CMS
{
    public class ArticleAppService_Test : CMSApplicationTestBase
    {
        private readonly IArticleAppService _articleAppService;
        public ArticleAppService_Test()
        {
            _articleAppService = GetRequiredService<ArticleAppService>();
        }

        [Fact]
        public async Task Should_Get_List_Of_Articles()
        {
            var result = await _articleAppService.GetListAsync(new GetArticleListInputDto());
            result.TotalCount.ShouldBeGreaterThan(0);
            result.Items.ShouldContain(b => b.Title == "贺氏吊装");

        }

        [Fact]
        public async Task Should_Create_A_Vaild_Article()
        {

            var result  = await _articleAppService.CreateAsync(new CreateUpdateArticleDto
            {
                Title = "Create a valid articel test",
                Content="Article Content",
                Description="Article Description"
            });

            result.Id.ShouldNotBe(Guid.Empty);
            result.Title.ShouldBe("Create a valid articel test");

        }

        [Fact]
        public async Task Should_Not_Create_A_Article_Without_Title()
        {
            var exception = await Assert.ThrowsAsync<AbpValidationException>(
                   async () =>
                   {
                       await _articleAppService.CreateAsync(
                        new CreateUpdateArticleDto
                        {
                            Title = "",
                            Content = "Without Title Test"

                        });
                   }
               );
            exception.ValidationErrors.ShouldContain(err => err.MemberNames.Any(mem => mem == "Title"));
        }



    }
}
