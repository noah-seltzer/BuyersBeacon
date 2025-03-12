using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class three : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Beacon_Category_CategoryId",
                table: "Beacon");

            migrationBuilder.DropForeignKey(
                name: "FK_Beacon_Users_UserId",
                table: "Beacon");

            migrationBuilder.DropForeignKey(
                name: "FK_Image_ImageSet_ImageSetId",
                table: "Image");

            migrationBuilder.DropForeignKey(
                name: "FK_ImageSet_Beacon_BeaconId",
                table: "ImageSet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ImageSet",
                table: "ImageSet");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Image",
                table: "Image");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Beacon",
                table: "Beacon");

            migrationBuilder.RenameTable(
                name: "ImageSet",
                newName: "ImageSets");

            migrationBuilder.RenameTable(
                name: "Image",
                newName: "Images");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "Categories");

            migrationBuilder.RenameTable(
                name: "Beacon",
                newName: "Beacons");

            migrationBuilder.RenameIndex(
                name: "IX_ImageSet_BeaconId",
                table: "ImageSets",
                newName: "IX_ImageSets_BeaconId");

            migrationBuilder.RenameIndex(
                name: "IX_Image_ImageSetId",
                table: "Images",
                newName: "IX_Images_ImageSetId");

            migrationBuilder.RenameIndex(
                name: "IX_Beacon_UserId",
                table: "Beacons",
                newName: "IX_Beacons_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Beacon_CategoryId",
                table: "Beacons",
                newName: "IX_Beacons_CategoryId");

            migrationBuilder.AddColumn<string>(
                name: "ClerkId",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "NumImages",
                table: "ImageSets",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "FileName",
                table: "Images",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                table: "Categories",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreate",
                table: "Beacons",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateUpdate",
                table: "Beacons",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ItemDescription",
                table: "Beacons",
                type: "nvarchar(500)",
                maxLength: 500,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ItemName",
                table: "Beacons",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "ItemPrice",
                table: "Beacons",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "LocCity",
                table: "Beacons",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocCountry",
                table: "Beacons",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocPostalCode",
                table: "Beacons",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LocRegion",
                table: "Beacons",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ImageSets",
                table: "ImageSets",
                column: "ImageSetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Images",
                table: "Images",
                column: "ImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Beacons",
                table: "Beacons",
                column: "BeaconId");

            migrationBuilder.AddForeignKey(
                name: "FK_Beacons_Categories_CategoryId",
                table: "Beacons",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Beacons_Users_UserId",
                table: "Beacons",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_ImageSets_ImageSetId",
                table: "Images",
                column: "ImageSetId",
                principalTable: "ImageSets",
                principalColumn: "ImageSetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ImageSets_Beacons_BeaconId",
                table: "ImageSets",
                column: "BeaconId",
                principalTable: "Beacons",
                principalColumn: "BeaconId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Beacons_Categories_CategoryId",
                table: "Beacons");

            migrationBuilder.DropForeignKey(
                name: "FK_Beacons_Users_UserId",
                table: "Beacons");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_ImageSets_ImageSetId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_ImageSets_Beacons_BeaconId",
                table: "ImageSets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ImageSets",
                table: "ImageSets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Images",
                table: "Images");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Beacons",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "ClerkId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NumImages",
                table: "ImageSets");

            migrationBuilder.DropColumn(
                name: "FileName",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "CategoryName",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "DateCreate",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "DateUpdate",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "ItemDescription",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "ItemName",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "ItemPrice",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "LocCity",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "LocCountry",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "LocPostalCode",
                table: "Beacons");

            migrationBuilder.DropColumn(
                name: "LocRegion",
                table: "Beacons");

            migrationBuilder.RenameTable(
                name: "ImageSets",
                newName: "ImageSet");

            migrationBuilder.RenameTable(
                name: "Images",
                newName: "Image");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Category");

            migrationBuilder.RenameTable(
                name: "Beacons",
                newName: "Beacon");

            migrationBuilder.RenameIndex(
                name: "IX_ImageSets_BeaconId",
                table: "ImageSet",
                newName: "IX_ImageSet_BeaconId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_ImageSetId",
                table: "Image",
                newName: "IX_Image_ImageSetId");

            migrationBuilder.RenameIndex(
                name: "IX_Beacons_UserId",
                table: "Beacon",
                newName: "IX_Beacon_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Beacons_CategoryId",
                table: "Beacon",
                newName: "IX_Beacon_CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ImageSet",
                table: "ImageSet",
                column: "ImageSetId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Image",
                table: "Image",
                column: "ImageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "CategoryId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Beacon",
                table: "Beacon",
                column: "BeaconId");

            migrationBuilder.AddForeignKey(
                name: "FK_Beacon_Category_CategoryId",
                table: "Beacon",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Beacon_Users_UserId",
                table: "Beacon",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Image_ImageSet_ImageSetId",
                table: "Image",
                column: "ImageSetId",
                principalTable: "ImageSet",
                principalColumn: "ImageSetId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ImageSet_Beacon_BeaconId",
                table: "ImageSet",
                column: "BeaconId",
                principalTable: "Beacon",
                principalColumn: "BeaconId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
