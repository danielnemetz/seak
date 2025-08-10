# Seak

Ein Full-Stack Projekt mit Angular Frontend und NestJS Backend für Arbeitszeitverwaltung und Planung.

## Projektstruktur

```
seak/
├── frontend/          # Angular 20 Frontend
├── backend/           # NestJS Backend API
├── types/             # Gemeinsame TypeScript Typen
└── package.json       # Root Dependencies & Scripts
```

## Voraussetzungen

- Node.js 18+
- pnpm
- Git

## Installation & Setup

```bash
# Repository klonen
git clone git@github.com:danielnemetz/seak.git
cd seak

# Dependencies installieren
pnpm install

# Pre-commit Hooks aktivieren
pnpm run prepare
```

## Entwicklung

### Einfacher Start (Empfohlen)

```bash
# Beide Services parallel starten
pnpm run dev:all

# Oder einzeln starten
pnpm run dev:backend    # Backend auf Port 3000
pnpm run dev:frontend   # Frontend auf Port 4200
```

### Manueller Start

```bash
# Frontend starten
cd frontend
ng serve

# Backend starten (in neuem Terminal)
cd backend
pnpm run start:dev
```

## Verfügbare Scripts

### Entwicklung

```bash
pnpm run dev:all        # Beide Services parallel
pnpm run dev:backend    # Nur Backend
pnpm run dev:frontend   # Nur Frontend
```

### Build

```bash
pnpm run build          # Alles bauen
pnpm run build:backend  # Nur Backend
pnpm run build:frontend # Nur Frontend
```

### Tests

```bash
pnpm run test           # Alle Tests
pnpm run test:backend   # Nur Backend Tests
pnpm run test:frontend  # Nur Frontend Tests
pnpm run test:watch     # Tests im Watch-Modus
```

### Code Quality

```bash
pnpm run lint           # Linting prüfen
pnpm run lint:fix       # Linting-Fehler automatisch beheben
pnpm run format         # Code formatieren
pnpm run format:check   # Formatierung prüfen
```

### Utilities

```bash
pnpm run clean          # Alle Build-Ordner löschen
pnpm run ng             # Angular CLI (z.B. pnpm run ng generate component)
```

## Tests

```bash
# Alle Tests ausführen
pnpm run test

# Tests im Watch-Modus
pnpm run test:watch

# Einzelne Bereiche testen
pnpm run test:backend
pnpm run test:frontend
```

## Code Quality

Das Projekt verwendet:

- **ESLint** für Code-Linting
- **Prettier** für Code-Formatierung
- **Husky** mit Pre-commit Hooks
- **lint-staged** für automatische Formatierung

## Weitere Informationen

- [Frontend Details](frontend/README.md)
- [Backend Details](backend/README.md)
