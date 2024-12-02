# Étape de base pour exécuter l'application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER app
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Étape de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copie le fichier .csproj et restaure les dépendances
COPY ["HomeAssistant.WebApi/HomeAssistant.WebApi.csproj", "HomeAssistant.WebApi/"]
COPY ["HomeAssistant.Business/HomeAssistant.Business.csproj", "HomeAssistant.Business/"]
COPY ["HomeAssistant.Data/HomeAssistant.Data.csproj", "HomeAssistant.Data/"]
COPY ["HomeAssistant.Shared/HomeAssistant.Shared.csproj", "HomeAssistant.Shared/"]

RUN dotnet restore "HomeAssistant.WebApi/HomeAssistant.WebApi.csproj"

# Copie tout le reste du code source
COPY . .

# Change le répertoire de travail pour la construction de l'application
WORKDIR "/src"

# Copie les fichiers .csproj et restaure les dépendances


RUN dotnet build "HomeAssistant.WebApi/HomeAssistant.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Étape de publication
FROM build AS publish
RUN dotnet publish "HomeAssistant.WebApi/HomeAssistant.WebApi.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Étape finale pour exécuter l'application
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HomeAssistant.WebApi.dll"]