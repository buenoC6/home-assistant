﻿// <auto-generated />
using System;
using HomeAssistant.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HomeAssistant.Data.Migrations
{
    [DbContext(typeof(HomeAssistantDbContext))]
    partial class HomeAssistantDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("HomeAssistant.Data.Models.ElectricityUsageData", b =>
                {
                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Timestamp");

                    b.ToTable("ElectricityUsages");
                });

            modelBuilder.Entity("HomeAssistant.Data.Models.SolarPanelData", b =>
                {
                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("timestamp with time zone");

                    b.Property<double>("DailyProduction")
                        .HasColumnType("double precision");

                    b.Property<string>("SolarData")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Timestamp");

                    b.ToTable("SolarPanels");
                });
#pragma warning restore 612, 618
        }
    }
}
