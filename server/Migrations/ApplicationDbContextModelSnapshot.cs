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
                        .HasColumnType("decimal(18, 2)");

                    b.Property<DateTime?>("LastDraftSave")
                        .HasColumnType("datetime2")
                        .HasAnnotation("Relational:JsonPropertyName", "LastDraftSave");

                    b.Property<string>("LocCity")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("LocCountry")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("LocPostalCode")
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("LocRegion")
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("BeaconId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Beacons");
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

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Property<Guid>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ClerkId")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
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

            modelBuilder.Entity("server.Models.Beacon", b =>
                {
                    b.Navigation("ImageSet");
                });

            modelBuilder.Entity("server.Models.Category", b =>
                {
                    b.Navigation("Beacons");
                });

            modelBuilder.Entity("server.Models.ImageSet", b =>
                {
                    b.Navigation("Images");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Navigation("Beacons");
                });
#pragma warning restore 612, 618
        }
    }
}
