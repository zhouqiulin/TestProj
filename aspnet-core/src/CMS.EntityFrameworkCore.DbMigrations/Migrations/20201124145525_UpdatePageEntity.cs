using Microsoft.EntityFrameworkCore.Migrations;

namespace CMS.Migrations
{
    public partial class UpdatePageEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Keywords",
                table: "AppPages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "AppPages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Keywords",
                table: "AppPages");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "AppPages");
        }
    }
}
