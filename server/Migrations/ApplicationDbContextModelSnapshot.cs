﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Data;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("ChatUser", b =>
                {
                    b.Property<Guid>("ChatsChatId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ParticipantsUserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ChatsChatId", "ParticipantsUserId");

                    b.HasIndex("ParticipantsUserId");

                    b.ToTable("ChatUser", (string)null);
                });

            modelBuilder.Entity("server.Models.Beacon", b =>
                {
                    b.Property<Guid>("BeaconId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "BeaconId");

                    b.Property<Guid?>("CategoryId")
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "CategoryId");

                    b.Property<DateTime>("DateCreate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateUpdate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDraft")
                        .HasColumnType("bit")
                        .HasAnnotation("Relational:JsonPropertyName", "IsDraft");

                    b.Property<string>("ItemDescription")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)")
                        .HasAnnotation("Relational:JsonPropertyName", "ItemDescription");

                    b.Property<string>("ItemName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasAnnotation("Relational:JsonPropertyName", "ItemName");

                    b.Property<decimal>("ItemPrice")
                        .HasColumnType("decimal(18, 2)")
                        .HasAnnotation("Relational:JsonPropertyName", "ItemPrice");

                    b.Property<DateTime?>("LastDraftSave")
                        .HasColumnType("datetime2")
                        .HasAnnotation("Relational:JsonPropertyName", "LastDraftSave");

                    b.Property<string>("LocCity")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasAnnotation("Relational:JsonPropertyName", "LocCity");

                    b.Property<string>("LocCountry")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasAnnotation("Relational:JsonPropertyName", "LocCountry");

                    b.Property<string>("LocPostalCode")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasAnnotation("Relational:JsonPropertyName", "LocPostalCode");

                    b.Property<string>("LocRegion")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasAnnotation("Relational:JsonPropertyName", "LocRegion");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "UserId");

                    b.HasKey("BeaconId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Beacons");

                    b.HasAnnotation("Relational:JsonPropertyName", "Beacons");
                });

            modelBuilder.Entity("server.Models.Category", b =>
                {
                    b.Property<Guid>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "CategoryId");

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasAnnotation("Relational:JsonPropertyName", "CategoryName");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");

                    b.HasAnnotation("Relational:JsonPropertyName", "Category");
                });

            modelBuilder.Entity("server.Models.Chat", b =>
                {
                    b.Property<Guid>("ChatId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "ChatId");

                    b.Property<Guid>("BeaconId")
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "BeaconId");

                    b.HasKey("ChatId");

                    b.HasIndex("BeaconId");

                    b.ToTable("Chats");

                    b.HasAnnotation("Relational:JsonPropertyName", "Chat");
                });

            modelBuilder.Entity("server.Models.ChatMessage", b =>
                {
                    b.Property<Guid>("ChatMessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "ChatMessageId");

                    b.Property<Guid>("ChatId")
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "ChatId");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasAnnotation("Relational:JsonPropertyName", "Message");

                    b.Property<DateTime>("SendDateTime")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "UserId");

                    b.HasKey("ChatMessageId");

                    b.HasIndex("ChatId");

                    b.HasIndex("UserId");

                    b.ToTable("ChatMessages");
                });

            modelBuilder.Entity("server.Models.Image", b =>
                {
                    b.Property<Guid>("ImageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ExternalImageId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("ImageSetId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ImageUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MimeType")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ImageId");

                    b.HasIndex("ImageSetId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("server.Models.ImageSet", b =>
                {
                    b.Property<Guid>("ImageSetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid?>("BeaconId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("NumImages")
                        .HasColumnType("int");

                    b.HasKey("ImageSetId");

                    b.HasIndex("BeaconId")
                        .IsUnique()
                        .HasFilter("[BeaconId] IS NOT NULL");

                    b.ToTable("ImageSets");
                });

            modelBuilder.Entity("server.Models.Review", b =>
                {
                    b.Property<Guid>("ReviewId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<Guid>("ReviewerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ReviewId");

                    b.HasIndex("ReviewerId");

                    b.HasIndex("UserId");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("server.Models.ReviewTag", b =>
                {
                    b.Property<Guid>("ReviewTagId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("ReviewId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TagId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("ReviewTagId");

                    b.HasIndex("ReviewId");

                    b.HasIndex("TagId");

                    b.ToTable("ReviewTags");
                });

            modelBuilder.Entity("server.Models.Tag", b =>
                {
                    b.Property<Guid>("TagId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("TagId");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier")
                        .HasAnnotation("Relational:JsonPropertyName", "UserId");

                    b.Property<string>("AvatarUrl")
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar(1000)");

                    b.Property<double>("AverageRating")
                        .HasColumnType("float");

                    b.Property<string>("Bio")
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("ClerkId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasAnnotation("Relational:JsonPropertyName", "ClerkId");

                    b.Property<string>("DisplayName")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<DateTime>("JoinedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Location")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<int>("TotalReviews")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasAnnotation("Relational:JsonPropertyName", "User");
                });

            modelBuilder.Entity("ChatUser", b =>
                {
                    b.HasOne("server.Models.Chat", null)
                        .WithMany()
                        .HasForeignKey("ChatsChatId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("server.Models.User", null)
                        .WithMany()
                        .HasForeignKey("ParticipantsUserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();
                });

            modelBuilder.Entity("server.Models.Beacon", b =>
                {
                    b.HasOne("server.Models.Category", "Category")
                        .WithMany("Beacons")
                        .HasForeignKey("CategoryId");

                    b.HasOne("server.Models.User", "User")
                        .WithMany("Beacons")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("User");
                });

            modelBuilder.Entity("server.Models.Chat", b =>
                {
                    b.HasOne("server.Models.Beacon", "Beacon")
                        .WithMany("Chats")
                        .HasForeignKey("BeaconId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Beacon");
                });

            modelBuilder.Entity("server.Models.ChatMessage", b =>
                {
                    b.HasOne("server.Models.Chat", "Chat")
                        .WithMany("Messages")
                        .HasForeignKey("ChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Chat");

                    b.Navigation("User");
                });

            modelBuilder.Entity("server.Models.Image", b =>
                {
                    b.HasOne("server.Models.ImageSet", "ImageSet")
                        .WithMany("Images")
                        .HasForeignKey("ImageSetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("ImageSet");
                });

            modelBuilder.Entity("server.Models.ImageSet", b =>
                {
                    b.HasOne("server.Models.Beacon", "Beacon")
                        .WithOne("ImageSet")
                        .HasForeignKey("server.Models.ImageSet", "BeaconId");

                    b.Navigation("Beacon");
                });

            modelBuilder.Entity("server.Models.Review", b =>
                {
                    b.HasOne("server.Models.User", "Reviewer")
                        .WithMany("GivenReviews")
                        .HasForeignKey("ReviewerId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("server.Models.User", "User")
                        .WithMany("ReceivedReviews")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Reviewer");

                    b.Navigation("User");
                });

            modelBuilder.Entity("server.Models.ReviewTag", b =>
                {
                    b.HasOne("server.Models.Review", "Review")
                        .WithMany("ReviewTags")
                        .HasForeignKey("ReviewId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Tag", "Tag")
                        .WithMany("ReviewTags")
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Review");

                    b.Navigation("Tag");
                });

            modelBuilder.Entity("server.Models.Beacon", b =>
                {
                    b.Navigation("Chats");

                    b.Navigation("ImageSet");
                });

            modelBuilder.Entity("server.Models.Category", b =>
                {
                    b.Navigation("Beacons");
                });

            modelBuilder.Entity("server.Models.Chat", b =>
                {
                    b.Navigation("Messages");
                });

            modelBuilder.Entity("server.Models.ImageSet", b =>
                {
                    b.Navigation("Images");
                });

            modelBuilder.Entity("server.Models.Review", b =>
                {
                    b.Navigation("ReviewTags");
                });

            modelBuilder.Entity("server.Models.Tag", b =>
                {
                    b.Navigation("ReviewTags");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Navigation("Beacons");

                    b.Navigation("GivenReviews");

                    b.Navigation("ReceivedReviews");
                });
#pragma warning restore 612, 618
        }
    }
}
