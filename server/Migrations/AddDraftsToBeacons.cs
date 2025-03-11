using Microsoft.EntityFrameworkCore.Migrations;

namespace server.Migrations
{
    public partial class AddDraftsToBeacons : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDraft",
                table: "Beacons",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastDraftSave",
                table: "Beacons",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDraft",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "LastDraftSave",
                table: "Beacons");
        }
    }
} 