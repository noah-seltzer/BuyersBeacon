using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddDefaultTestUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // First check if the user already exists
            migrationBuilder.Sql(
                "IF NOT EXISTS (SELECT * FROM Users WHERE UserId = 'AA568EEF-C1A6-4EF0-99D3-53B5580414F8') " +
                "BEGIN " +
                "    INSERT INTO Users (UserId, UserName, Email) " +
                "    VALUES ('AA568EEF-C1A6-4EF0-99D3-53B5580414F8', 'DefaultUser', 'default@example.com') " +
                "END"
            );
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