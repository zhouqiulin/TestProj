using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CMS.Migrations
{
    public partial class Update_Article_Entity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "AppArticles");

            migrationBuilder.AddColumn<string>(
                name: "CoverUrl",
                table: "AppArticles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "From",
                table: "AppArticles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Keywords",
                table: "AppArticles",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Sort",
                table: "AppArticles",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "TreeId",
                table: "AppArticles",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "Valid",
                table: "AppArticles",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoverUrl",
                table: "AppArticles");

            migrationBuilder.DropColumn(
                name: "From",
                table: "AppArticles");

            migrationBuilder.DropColumn(
                name: "Keywords",
                table: "AppArticles");

            migrationBuilder.DropColumn(
                name: "Sort",
                table: "AppArticles");

            migrationBuilder.DropColumn(
                name: "TreeId",
                table: "AppArticles");

            migrationBuilder.DropColumn(
                name: "Valid",
                table: "AppArticles");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "AppArticles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
