using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveImageSetBeaconRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ImageSets_Beacons_BeaconId",
                table: "ImageSets");

            migrationBuilder.DropIndex(
                name: "IX_ImageSets_BeaconId",
                table: "ImageSets");

            migrationBuilder.DropColumn(
                name: "BeaconId",
                table: "ImageSets");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BeaconId",
                table: "ImageSets",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ImageSets_BeaconId",
                table: "ImageSets",
                column: "BeaconId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ImageSets_Beacons_BeaconId",
                table: "ImageSets",
                column: "BeaconId",
                principalTable: "Beacons",
                principalColumn: "BeaconId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
