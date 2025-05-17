using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeAssistant.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ElectricityUsages",
                columns: table => new
                {
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ElectricityUsages", x => x.Timestamp);
                });

            migrationBuilder.CreateTable(
                name: "SolarPanels",
                columns: table => new
                {
                    Timestamp = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SolarData = table.Column<string>(type: "text", nullable: false),
                    DailyProduction = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SolarPanels", x => x.Timestamp);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ElectricityUsages");

            migrationBuilder.DropTable(
                name: "SolarPanels");
        }
    }
}
