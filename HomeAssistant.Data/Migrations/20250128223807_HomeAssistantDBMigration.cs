using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HomeAssistant.Data.Migrations
{
    /// <inheritdoc />
    public partial class HomeAssistantDBMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "DailyProduction",
                table: "SolarPanels",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "SolarData",
                table: "SolarPanels",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DailyProduction",
                table: "SolarPanels");

            migrationBuilder.DropColumn(
                name: "SolarData",
                table: "SolarPanels");
        }
    }
}
