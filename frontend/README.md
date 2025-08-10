# Seak Frontend

Angular 20 Frontend für das Seak Arbeitszeitverwaltungssystem.

## Übersicht

Das Frontend bietet eine moderne Web-Oberfläche für:

- Arbeitszeitenverwaltung
- Personenverwaltung
- Planungszeiten
- Zeitvisualisierung

## Technologie-Stack

- **Framework**: Angular 20
- **Sprache**: TypeScript
- **Styling**: SCSS
- **State Management**: Signals-basierte Stores
- **Package Manager**: pnpm

## Installation

```bash
cd frontend
pnpm install
```

## Entwicklung

```bash
# Development Server starten
pnpm run start
```

Der Development Server läuft auf http://localhost:4200.

## Projektstruktur

```
src/
├── app/
│   ├── components/           # Angular Komponenten
│   │   ├── arbeitszeit/     # Arbeitszeit-Verwaltung
│   │   ├── date-picker/     # Datums-Auswahl
│   │   ├── layout/          # Layout-Komponenten
│   │   ├── person/          # Personen-Verwaltung
│   │   ├── planung/         # Planungs-Verwaltung
│   │   └── time-visualization/ # Zeit-Visualisierung
│   ├── models/              # TypeScript Interfaces
│   ├── services/            # API-Services
│   ├── stores/              # State Management
│   ├── utils/               # Hilfsfunktionen
│   └── testing/             # Test-Hilfsmittel
├── styles/                  # Globale Styles
└── index.html              # Haupt-HTML
```

## Komponenten

### Arbeitszeit

- Verwaltung von Arbeitszeit-Einträgen

### Date Picker

- Datums-Auswahl für Filter

### Layout

- Navigation und Struktur

### Person

- Personen-Verwaltung

### Planung

- Planungszeiten-Verwaltung

### Time Visualization

- Zeitliche Darstellung

## State Management

Das Frontend verwendet Signal-basierte Stores:

- `arbeitszeit.store.ts` - Arbeitszeit-Daten
- `planzeit.store.ts` - Planungszeit-Daten
- `filter.store.ts` - Filter-Einstellungen

## Services

- `api.service.ts` - HTTP-API Kommunikation

## Tests

```bash
# Unit Tests
pnpm run test
```

## Build

```bash
# Development Build
pnpm run build

# Production Build
pnpm run build:prod
```

## Weitere Informationen

- [Angular Dokumentation](https://angular.dev/)
- [Projekt-Übersicht](../README.md)
