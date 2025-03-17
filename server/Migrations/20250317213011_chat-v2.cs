using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class chatv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chat_Beacons_BeacondId",
                table: "Chat");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessage_Chat_ChatId",
                table: "ChatMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessage_Users_UserId",
                table: "ChatMessage");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatUser_Chat_ChatsChatId",
                table: "ChatUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatMessage",
                table: "ChatMessage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Chat",
                table: "Chat");

            migrationBuilder.RenameTable(
                name: "ChatMessage",
                newName: "ChatMessages");

            migrationBuilder.RenameTable(
                name: "Chat",
                newName: "Chats");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessage_UserId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessage_ChatId",
                table: "ChatMessages",
                newName: "IX_ChatMessages_ChatId");

            migrationBuilder.RenameIndex(
                name: "IX_Chat_BeacondId",
                table: "Chats",
                newName: "IX_Chats_BeacondId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatMessages",
                table: "ChatMessages",
                column: "ChatMessageId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Chats",
                table: "Chats",
                column: "ChatId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_Chats_ChatId",
                table: "ChatMessages",
                column: "ChatId",
                principalTable: "Chats",
                principalColumn: "ChatId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessages_Users_UserId",
                table: "ChatMessages",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Beacons_BeacondId",
                table: "Chats",
                column: "BeacondId",
                principalTable: "Beacons",
                principalColumn: "BeaconId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatUser_Chats_ChatsChatId",
                table: "ChatUser",
                column: "ChatsChatId",
                principalTable: "Chats",
                principalColumn: "ChatId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_Chats_ChatId",
                table: "ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatMessages_Users_UserId",
                table: "ChatMessages");

            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Beacons_BeacondId",
                table: "Chats");

            migrationBuilder.DropForeignKey(
                name: "FK_ChatUser_Chats_ChatsChatId",
                table: "ChatUser");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Chats",
                table: "Chats");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ChatMessages",
                table: "ChatMessages");

            migrationBuilder.RenameTable(
                name: "Chats",
                newName: "Chat");

            migrationBuilder.RenameTable(
                name: "ChatMessages",
                newName: "ChatMessage");

            migrationBuilder.RenameIndex(
                name: "IX_Chats_BeacondId",
                table: "Chat",
                newName: "IX_Chat_BeacondId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_UserId",
                table: "ChatMessage",
                newName: "IX_ChatMessage_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ChatMessages_ChatId",
                table: "ChatMessage",
                newName: "IX_ChatMessage_ChatId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Chat",
                table: "Chat",
                column: "ChatId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ChatMessage",
                table: "ChatMessage",
                column: "ChatMessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Chat_Beacons_BeacondId",
                table: "Chat",
                column: "BeacondId",
                principalTable: "Beacons",
                principalColumn: "BeaconId");

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessage_Chat_ChatId",
                table: "ChatMessage",
                column: "ChatId",
                principalTable: "Chat",
                principalColumn: "ChatId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatMessage_Users_UserId",
                table: "ChatMessage",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ChatUser_Chat_ChatsChatId",
                table: "ChatUser",
                column: "ChatsChatId",
                principalTable: "Chat",
                principalColumn: "ChatId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
