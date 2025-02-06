using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class two : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Beacon",
                columns: table => new
                {
                    BeaconId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Beacon", x => x.BeaconId);
                    table.ForeignKey(
                        name: "FK_Beacon_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Beacon_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ImageSet",
                columns: table => new
                {
                    ImageSetId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BeaconId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImageSet", x => x.ImageSetId);
                    table.ForeignKey(
                        name: "FK_ImageSet_Beacon_BeaconId",
                        column: x => x.BeaconId,
                        principalTable: "Beacon",
                        principalColumn: "BeaconId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Image",
                columns: table => new
                {
                    ImageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImageSetId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Image", x => x.ImageId);
                    table.ForeignKey(
                        name: "FK_Image_ImageSet_ImageSetId",
                        column: x => x.ImageSetId,
                        principalTable: "ImageSet",
                        principalColumn: "ImageSetId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Beacon_CategoryId",
                table: "Beacon",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Beacon_UserId",
                table: "Beacon",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Image_ImageSetId",
                table: "Image",
                column: "ImageSetId");

            migrationBuilder.CreateIndex(
                name: "IX_ImageSet_BeaconId",
                table: "ImageSet",
                column: "BeaconId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Image");

            migrationBuilder.DropTable(
                name: "ImageSet");

            migrationBuilder.DropTable(
                name: "Beacon");

            migrationBuilder.DropTable(
                name: "Category");
        }
    }
}
