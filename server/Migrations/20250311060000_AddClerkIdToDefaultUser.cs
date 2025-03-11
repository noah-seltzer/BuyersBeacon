using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddClerkIdToDefaultUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE Users " +
                "SET ClerkId = 'default_clerk_id' " +
                "WHERE UserId = 'AA568EEF-C1A6-4EF0-99D3-53B5580414F8'"
            );
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // No down migration needed
        }
    }
} 