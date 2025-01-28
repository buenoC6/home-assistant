# Home Assistant Web API

## Prérequis

Avant de commencer, assurez-vous que vous avez les outils suivants installés :

- [.NET SDK](https://dotnet.microsoft.com/download) (version compatible avec votre projet)
- [PostgreSQL](https://www.postgresql.org/download/) (si vous utilisez PostgreSQL comme base de données)

## Créer une migration

Pour créer une nouvelle migration, utilisez la commande suivante dans le terminal :

```bash
dotnet ef migrations add HomeAssistantDBMigration --project HomeAssistant.Data --startup-project HomeAssistant.WebApi
```

## Appliquer les Migrations

#### Par défaut l'update de la migration s'execute au démarrage de l'application
Pour appliquer toutes les migrations non appliquées à la base de données, utilisez la commande suivante :

```bash
dotnet ef database update --project HomeAssistant.Data --startup-project HomeAssistant.WebApi
```
