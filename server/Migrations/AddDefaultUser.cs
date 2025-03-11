using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddDefaultUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "UserName", "Email" },
                values: new object[] { 
                    "AA568EEF-C1A6-4EF0-99D3-53B5580414F8", 
                    "DefaultUser",
                    "default@example.com"
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: "AA568EEF-C1A6-4EF0-99D3-53B5580414F8");
        }
    }
} 