using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ReaddImageSetBeaconRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "BeaconId",
                table: "ImageSets",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ImageSets_BeaconId",
                table: "ImageSets",
                column: "BeaconId",
                unique: true,
                filter: "[BeaconId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_ImageSets_Beacons_BeaconId",
                table: "ImageSets",
                column: "BeaconId",
                principalTable: "Beacons",
                principalColumn: "BeaconId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
