using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Settings;

namespace CMS
{
    public class FileAppService : CMSAppService
    {
        private readonly ISettingProvider _settingProvider;

        public FileAppService(ISettingProvider settingProvider)
        {
            _settingProvider = settingProvider;
        }

        public async Task<string> UploadFile(IFormFile file)
        {
            if (await ValidateFile(file))
            {
                var url = await GetPath();

                var fileName = GenerateFileName(Path.GetExtension(file.FileName));
                var fullPath = Path.Combine(url.Item1, fileName);
                using (var stream = File.Create(fullPath))
                {
                    await file.CopyToAsync(stream);
                }
                return url.Item2 + "/" + fileName;
            }
            return "";
        }

        private async Task<Tuple<string, string>> GetPath()
        {
            var curDirectory = Directory.GetCurrentDirectory();
            var root = "wwwroot";
            var baseUrl = await _settingProvider.GetOrNullAsync("App.UploadFiles.BaseUrl");
            var time = DateTime.Now;
            var year = time.Year.ToString();
            var month = time.Month.ToString();
            var day = time.Day.ToString();
            var discUrl = Path.Combine(curDirectory, root, baseUrl, year, month, day);
            var webUrl = "/" + baseUrl + "/" + year + "/" + month + "/" + day;
            Directory.CreateDirectory(discUrl);
            return new Tuple<string, string>(discUrl, webUrl);
        }

        private string GenerateFileName(string extention)
        {
            return Guid.NewGuid().ToString("N") + extention;
        }

        private async Task<bool> ValidateFile(IFormFile file)
        {
            var maxLength = await _settingProvider.GetAsync<long>("App.UploadFiles.MaxLength");

            //为空检查
            if (file==null||file.Length == 0)
            {
                throw new UserFriendlyException("文件不能为空");
            }

            //大小检查
            if (file.Length > maxLength)
            {
                var KB = Math.Floor((double)(maxLength / 1024));
                var MB = Math.Floor((double)(maxLength / 1024 / 1024));

                string size;
                if (MB > 0)
                {
                    size = MB + "MB";
                }
                else
                {
                    size = KB + "KB";
                }

                throw new UserFriendlyException("上传的文件的不应该大于" + size);
            }

            //文件格式检查
            var allowTypes = await _settingProvider.GetOrNullAsync("App.UploadFiles.AllowType");
            var allowTypeList = allowTypes.Split(",");
            if (Array.IndexOf(allowTypeList, Path.GetExtension(file.FileName)) == -1)
            {
                throw new UserFriendlyException("请上传正确的文件格式");
            }

            return true;
        }
    }
}