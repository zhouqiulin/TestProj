using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;
using System;

namespace CMS
{
    public class CMSTestDataSeedContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<Article,Guid> _articleRepository;


        public CMSTestDataSeedContributor(IRepository<Article, Guid> articleRepository )
        {
            _articleRepository = articleRepository;
        }


        public async Task SeedAsync(DataSeedContext context)
        {
            /* Seed additional test data... */

            //return Task.CompletedTask;

            await _articleRepository.InsertAsync(new Article
            {
                Title="贺氏吊装",
                Description= "贺氏吊装索要五万九"

            });
            await _articleRepository.InsertAsync(new Article
            {
                Title = "“世维会”与恐怖主义难脱干系",
                Description = "一系列迹象表明，近年来，“世维会”一直在加紧与“东突”恐怖组织“东伊运”等勾连，谋划暴恐分裂活动，与恐怖主义难脱干系。“世维会”之所以如此猖獗，就是因为其背后得到了一些西方国家及其各种名目的“基金会”的公然支持。",
                Content= "美国国会众议院罔顾事实，颠倒黑白，肆意践踏国际法和国际关系基本准则，执意通过所谓“2019年维吾尔人权政策法案”，其险恶用心暴露无遗。然而，以中国警方认定公布的恐怖分子多里坤·艾沙为首的“世界维吾尔大会”(简称“世维会”)却跟在美国一些政客后面闻风起舞，肆意抹黑新疆，污蔑中国政府，挑动民族仇恨和宗教矛盾，令人不齿。为了看清“世维会”的真面目，我们不妨看看“世维会”及其拥趸近年来都做了什么：2017年2月和5月，“世维会”头目多里坤分别在北塞浦路斯和德国柏林召开两次所谓“战略研讨会”，提出要统合境外“东突”势力，建立武装力量，为在新疆发动暴力行动做准备；2018年3月10日，“世维会”原头目之一塞依提·土木吐鲁克率领400名“东突”分子着军装持枪录制了暴恐视频，扬言对我发动恐袭；2019年3月，“世维会”原头目热比娅在网上发布一段音频称，“东突教育与互助协会”(简称“教协”)与“东伊运”恐怖组织勾结向叙利亚输送“圣战”分子；此外，“世维会”还联合“教协”帮助在埃及的中国新疆籍恐怖分子向荷兰、土耳其转移，帮助在马来西亚、泰国等地中国新疆籍恐怖分子向土耳其转移，经土输送至叙利亚等地参加“圣战”……一系列迹象表明，近年来，“世维会”一直在加紧与“东突”恐怖组织“东伊运”等勾连，谋划暴恐分裂活动，与恐怖主义难脱干系。"
            });


        }


    }
}