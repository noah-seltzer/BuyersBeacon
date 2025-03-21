using Microsoft.EntityFrameworkCore.Migrations;

public partial class AddUserDefaults : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql(@"
            UPDATE Users 
            SET DisplayName = 'Anonymous User' 
            WHERE DisplayName IS NULL;

            UPDATE Users 
            SET Bio = 'No bio yet' 
            WHERE Bio IS NULL;

            UPDATE Users 
            SET Location = 'Location not set' 
            WHERE Location IS NULL;
        ");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // No down migration needed as we don't want to remove data
    }
} 