# Product Requirements Document (PRD)

## DHBW Vorlesungsplanung System

**Version:** 1.4
**Datum:** 2025-05-26  
**Erstellt von:** behrends

---

## 1. Executive Summary

### Vision

Ein intuitives Web-Tool zur effizienten Planung und Verwaltung von Vorlesungen an der DHBW, das die bisherige Excel-basierte Planung ablöst und bessere Übersicht über Dozierende, Kurse und Stundenverteilung bietet.

### Ziele

- Ablösung der Excel-basierten Vorlesungsplanung
- Zentrale Verwaltung von Dozierenden und deren Stundenkapazitäten
- Übersichtliche Quartalsplanung mit Konfliktprävention
- Einfache Handhabung für 15 interne DHBW-Mitarbeiter\*innen

---

## 2. Problemstellung

### Aktuelle Herausforderungen

- **Excel-Chaos:** Unübersichtliche Tabellen, Versionskonflikte, fehlende Synchronisation
- **Manuelle Stundenverfolgung:** Keine automatische Überwachung der 240h-Grenze für externe Dozierende
- **Fehlende Übersicht:** Schwierig zu erkennen, wer wann wie viele Stunden hat
- **Planungsfehler:** Doppelbelegungen und Überschreitungen werden erst spät erkannt
- **Kollaboration:** Mehrere Personen können nicht gleichzeitig an der Planung arbeiten
- **Keine Historisierung:** Änderungen sind schwer nachvollziehbar

### Pain Points

- 📊 **Studiengangsmanager\*innen:** "Ich verliere den Überblick über die Dozierenden-Kapazitäten"
- ⏰ **Zeitaufwand:** "Planung dauert viel zu lange durch Excel-Jonglage"
- 🚨 **Konfliktrisiko:** "Überschreitungen bemerken wir oft zu spät"
- 👥 **Teamwork:** "Parallel arbeiten führt zu Versionskonflikten"

---

## 3. Stakeholder & Zielgruppe

### Primäre Nutzer (15 Personen intern)

- **Studiengangsmanager\*innen:** Planen Vorlesungen für ihre Studiengänge
- **Studiengangsleitungen:** Überblick und Koordination
- **Administratoren:** System- und Benutzerverwaltung

### Dozierende (kein direkter Systemzugang)

- Externe Kommunikation läuft über DHBW-Mitarbeiter\*innen
- Keine eigenen Accounts oder direkter Zugang zum System

---

## 4. Funktionale Anforderungen

### 4.1 Dozierenden-Verwaltung

- **Stammdaten:** Vorname, Nachname, Titel, E-Mail
- **Kategorisierung:** Intern/Extern
- **Stundenkapazität:**
  - Interne Dozierende: Unbegrenzt
  - Externe Dozierende: 240h Jahresgrenze
- **Überschreitungskontrolle:** Soft-Block mit Warnung und Bestätigung

### 4.2 Studiengang-Verwaltung

- Stammdaten der ~10 DHBW-Studiengänge
- Vorlesungen pro Studiengang und Semester
- Zuordnung von Dozierenden zu Studiengängen

### 4.3 Kurs-Verwaltung (Kohorten)

- Kurse als konkrete Studierendengruppen pro Studiengang
- Kohortenbasiert (z.B. "BWL Kurs 2024", "Informatik Kurs 2023")
- Automatische Semester-Zuordnung basierend auf Startjahr

### 4.4 Vorlesungsplanung

- **Feste Vorlesungen:** Studienverlaufsplan pro Studiengang definiert Vorlesungen
- **Konkrete Planung:** Zuweisung von Dozierenden zu spezifischen Vorlesungen
- **Quartalsweise Planung:** Q1-Q4 für verschiedene Kurse und Semester
- **Automatische Stundenberechnung:** Summe pro Dozent\*in über alle Quartale

### 4.5 Planungsübersicht

- **Dashboard:** Übersicht aller Studiengänge und Planungsstatus
- **Quartalsansicht:** Detailplanung pro Quartal mit Kurs-/Semester-Übersicht
- **Dozentenübersicht:** Aktuelle Stundenverteilung und Kapazitäten
- **Konflikterkennung:** Automatische Warnung bei Überschreitungen

### 4.6 Benutzer-Management

- **Rollen:** Admin, User
- **Berechtigungen:** Zuordnung zu Studiengängen
- **Freie Bearbeitung:** Kollaborative Planung ohne Approval-Workflows

---

## 5. Technische Anforderungen

### 5.1 Architektur

- **Frontend:** Next.js 14+ mit TypeScript
- **UI Framework:** Tailwind CSS + shadcn/ui
- **Backend:** MVP ohne Backend → später Next.js API Routes
- **Datenbank:** MVP mit localStorage → später SQLite/PostgreSQL
- **Authentication:** Dummy-Auth → später Keycloak SSO

### 5.2 MVP Data Layer (localStorage)

```typescript
// Data Storage im Browser localStorage
interface ApplicationData {
  lecturers: Lecturer[];
  users: User[];
  studyPrograms: StudyProgram[];
  lectures: Lecture[];
  courses: Course[];
  assignments: Assignment[];
}

// Service-Abstraktion für spätere Backend-Migration
abstract class DataService<T> {
  abstract getAll(): Promise<T[]>;
  abstract getById(id: string): Promise<T | null>;
  abstract create(item: T): Promise<T>;
  abstract update(id: string, item: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
```

### 5.3 Datenmodell (TypeScript Interfaces)

```typescript
interface Lecturer {
  id: string;
  firstname: string;
  lastname: string;
  title?: string;
  email?: string;
  type: 'internal' | 'external';
  yearlyHoursLimit?: number;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  firstname: string;
  lastname: string;
  title?: string;
  email: string;
  role: 'admin' | 'user';
  assignedStudyPrograms: string[];
  createdAt: string;
  updatedAt: string;
}

interface StudyProgram {
  id: string;
  name: string;
  shortName: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

// Feste Vorlesungen pro Studiengang
interface Lecture {
  id: string;
  studyProgramId: string; // Gehört zu welchem Studiengang
  semester: number; // Semester 1-6
  title: string; // "Marketing Grundlagen"
  hours: number; // 20h
  createdAt: string;
  updatedAt: string;
}

// Kurs = Konkrete Kohorte (z.B. "BWL Kurs 2024")
interface Course {
  id: string;
  studyProgramId: string; // Gehört zu welchem Studiengang
  name: string; // "BWL Kurs 2024"
  startYear: number; // 2024 (Startjahr der Kohorte)
  createdAt: string;
  updatedAt: string;
}

// Zuordnung: Welcher Dozent macht welche Vorlesung für welchen Kurs?
interface Assignment {
  id: string;
  lectureId: string; // Referenz zur Vorlesung
  courseId: string; // Für welchen Kurs
  year: number; // 2024
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  lecturerId?: string; // Welcher Dozent (optional = noch nicht geplant)
  createdAt: string;
  updatedAt: string;
}
```

### 5.4 Migration-Ready Architecture

- **Service Layer:** Abstrahierte Data Services für alle CRUD-Operationen
- **State Management:** React Query/SWR für einheitliche Data-Patterns
- **Validation:** Zod Schemas für Frontend- und später Backend-Validation
- **Error Handling:** Konsistente Error-Patterns von Anfang an
- **TypeScript:** Strikte Typisierung für nahtlose Backend-Migration

### 5.5 Deployment

- **MVP:** Static Site Hosting (Vercel, Netlify, oder einfach lokaler Server)
- **Später:** On-premises mit Traefik + Container
- **Backup:** MVP keine Backups nötig → später file-basierte SQLite-Sicherung
- **Performance:** Optimiert für 15 concurrent users

### 5.6 Style Guide (Corporate Design)

#### Farben (Brand Palette)

| Token                 | Hex         | Verwendung                    |
| --------------------- | ----------- | ----------------------------- |
| **--color-primary**   | **#E2001A** | Aktive Elemente, CTAs, Fokus  |
| --color-neutral-light | #F5F5F5     | Hintergrundflächen, Sektionen |
| --color-neutral-dark  | #1D1D1B     | Text, Icons                   |

> **Kontrast:** #E2001A ↔ #FFFFFF ≈ 4.6 : 1 → WCAG AA

---

#### Typografie

- **Font:** “Source Sans Pro”, Arial, sans-serif
- **Größen (px):** 32 / 24 / 20 / 16 / 14 / 12
- **Zeilenhöhe:** 1.4 – 1.6
- **Gewichte:** 700 (Headlines) / 400 (Body)

---

#### Layout-Raster

- 12-Column Grid, max-width 1280 px, 24 px Gutter
- Breakpoints: 1280 / 992 / 768 / 576 px
- Content-Max-Width: 1120 px

---

#### UI-Basiskomponenten

| Komponente             | Stil                                                     |
| ---------------------- | -------------------------------------------------------- |
| **Button (primary)**   | Hintergrund `--color-primary`, Radius 4 px, Shadow lvl 1 |
| **Button (secondary)** | Transparent, 1 px Outline `--color-primary`              |
| **Card**               | Weiß, Radius 4 px, subtile Shadow                        |
| **Off-Canvas-Nav**     | 100 % Höhe, Logo links, Close rechts                     |

---

#### Token-Snippet (CSS)

```css
:root {
  --color-primary: #e2001a;
  --color-neutral-light: #f5f5f5;
  --color-neutral-dark: #1d1d1b;

  --font-base: 'Source Sans Pro', Arial, sans-serif;
}
```

---

#### Accessibility-Checks (ggf. optional bei internen Apps)

- Tastaturfokus: `outline:2px solid var(--color-primary)`
- Sichtbarer Skip-Link vor `<header>`
- **Akzeptanzkriterium:** Lighthouse Accessibility ≥ 90 / 100

---

## 6. Business Rules

### 6.1 Stundenregeln

- **Externe Dozierende:** Maximal 240h pro Jahr
- **Überschreitung:** Warnung + Bestätigungsdialog ("Trotzdem zuordnen?")
- **Tracking:** Automatische Berechnung über alle Quartale

### 6.2 Planungsregeln

- **Berechtigung:** Freie Bearbeitung in zugewiesenen Studiengängen
- **Deadline:** 3 Wochen vor Quartalsbeginn (informativ, keine Enforcement)
- **Kollaboration:** Mehrere User können gleichzeitig planen

### 6.3 Datenregeln

- **Validierung:** Pflichtfelder, Datentyp-Kontrolle
- **Konsistenz:** Referenzielle Integrität zwischen Entitäten
- **Vorlesungen:** Feste Vorlesungen sind studiengangsabhängig
- **Kohorten:** Automatische Semester-Berechnung basierend auf Startjahr

---

## 7. User Stories

### Als Studiengangsmanager\*in möchte ich...

- Vorlesungen für meine Kurse (Kohorten) quartalsweise planen können
- Sehen, welche Dozierende verfügbar sind und wie viele Stunden sie bereits haben
- Stundenkapazitäten von externen Dozierenden überwachen
- Die festen Vorlesungen des Studiengangs als Basis für die Planung nutzen

### Als Studiengangsleiterin möchte ich...

- Überblick über alle meine Kurse und deren Planungsstatus haben
- Sehen, welche Vorlesungen in welchen Quartalen für welche Semester geplant sind
- Bei Bedarf Planungen korrigieren können

### Als Administrator\*in möchte ich...

- Neue Dozierende und User anlegen können
- Vorlesungen pro Studiengang verwalten können
- Systemweite Übersicht über alle Planungen haben
- Neue Kurse (Kohorten) anlegen können

---

## 8. Wireframes (Low-Fi)

### 8.1 Dashboard

```
┌─────────────────────────────────────────────────────┐
│ DHBW Vorlesungsplanung                   [Profile] │
├─────────────────────────────────────────────────────┤
│ Dashboard | Dozierende | Quartale | Admin          │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Meine Studiengänge           Aktuelle Übersicht    │
│ ┌─────────────────┐         ┌─────────────────┐     │
│ │ BWL             │         │ Q1 2024: 85%    │     │
│ │ 📊 Q1: ✅ Q2: ⚠️│         │ Q2 2024: 40%    │     │
│ │ Kurse: 3        │         │ Q3 2024: 10%    │     │
│ └─────────────────┘         └─────────────────┘     │
│ ┌─────────────────┐                               │
│ │ Informatik      │         Externe Dozierende     │
│ │ 📊 Q1: ✅ Q2: ❌│         ┌─────────────────┐     │
│ │ Kurse: 2        │         │ Dr. Müller:     │     │
│ └─────────────────┘         │ 180/240h        │     │
│                            │ ▓▓▓▓▓▓▓░░░      │     │
│ [+ Neuer Studiengang]      └─────────────────┘     │
└─────────────────────────────────────────────────────┘
```

### 8.2 Quartalsplanung

```
┌─────────────────────────────────────────────────────┐
│ Quartalsplanung Q2 2024 - BWL                      │
├─────────────────────────────────────────────────────┤
│ [Q1] [Q2] [Q3] [Q4]    Kurs: [BWL 2024 ▼]         │
├─────────────────────────────────────────────────────┤
│                                                     │
│ BWL Kurs 2024 (Semester 1)                        │
│ ┌───────────────────────────────────────────────────┐ │
│ │ Vorlesung                │ Std │ Dozent*in        │ │
│ │ Marketing Grundlagen     │ 20  │ [Dr. Schmidt ▼] │ │
│ │ Controlling Basics       │ 16  │ [Nicht geplant]  │ │
│ │ Projektmanagement        │ 12  │ [Prof. Müller▼] │ │
│ └───────────────────────────────────────────────────┘ │
│                                                     │
│ BWL Kurs 2023 (Semester 3)                        │
│ ┌───────────────────────────────────────────────────┐ │
│ │ Unternehmensführung      │ 24  │ [Prof. Weber ▼] │ │
│ │ Wirtschaftsrecht         │ 18  │ [Nicht geplant]  │ │
│ └───────────────────────────────────────────────────┘ │
│                                                     │
│                   [Speichern] [Exportieren]        │
└─────────────────────────────────────────────────────┘
```

### 8.3 Dozierenden-Übersicht

```
┌─────────────────────────────────────────────────────┐
│ Dozierende                           [+ Hinzufügen] │
├─────────────────────────────────────────────────────┤
│ Filter: [Alle] [Intern] [Extern]   Suche: [____]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ┌───────────────────────────────────────────────────┐ │
│ │ Prof. Dr. Anna Schmidt (Intern)                   │ │
│ │ 📧 schmidt@dhbw.de                               │ │
│ │ 📊 2024: 45h geplant                             │ │
│ │ BWL Marketing, Controlling                       │ │
│ │                              [Bearbeiten] [📊]  │ │
│ └───────────────────────────────────────────────────┘ │
│                                                     │
│ ┌───────────────────────────────────────────────────┐ │
│ │ Dr. Hans Müller (Extern) ⚠️                      │ │
│ │ 📧 mueller@extern.de                             │ │
│ │ 📊 2024: 185/240h ▓▓▓▓▓▓▓▓░░                    │ │
│ │ Informatik Programmierung, Datenbanken          │ │
│ │                              [Bearbeiten] [📊]  │ │
│ └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 9. MVP Scope

### Enthalten

- ✅ Frontend-Only Architektur mit localStorage
- ✅ Migration-Ready Service Layer für spätere Backend-Integration
- ✅ Dozierenden-Verwaltung mit Stundenkontrolle
- ✅ Feste Vorlesungen pro Studiengang
- ✅ Kurs-Verwaltung (Kohorten) mit automatischer Semester-Berechnung
- ✅ Quartalsplanung mit vorlesungsbasierter Dozent-Zuordnung
- ✅ Übersichtsdashboard mit Planungsstatus
- ✅ User-Management mit 2 Rollen (Admin/User)
- ✅ Responsive Web-Interface
- ✅ TypeScript-Interfaces für alle Datenstrukturen

### Nice-to-Have (Post-MVP)

- 📋 Backend-Migration mit SQLite/PostgreSQL
- 📋 Excel-Import für bestehende Daten
- 📋 Erweiterte Reporting-Funktionen
- 📋 Keycloak SSO-Integration
- 📋 Automatische E-Mail-Benachrichtigungen
- 📋 Mobile-optimierte Ansichten
- 📋 Real-time Collaboration Features
- 📋 Änderungsprotokoll für Nachverfolgung

### Ausgeschlossen

- ❌ Direkter Dozierenden-Zugang
- ❌ Komplexe Approval-Workflows
- ❌ Integration mit anderen DHBW-Systemen
- ❌ Multi-User Synchronisation (localStorage-Limitation)

---

## 10. Risiken & Mitigation

### Technische Risiken

| Risiko                                            | Wahrscheinlichkeit | Impact  | Mitigation                                        |
| ------------------------------------------------- | ------------------ | ------- | ------------------------------------------------- |
| localStorage Datenexport bei Backend-Migration    | Mittel             | Mittel  | Export/Import-Features in MVP einbauen            |
| Browser localStorage Limits (5-10MB)              | Niedrig            | Mittel  | Datenmodell schlank halten, Monitoring            |
| Mehrere Browser/Geräte = verschiedene Datenstände | Hoch               | Niedrig | Bewusste MVP-Limitation, später Backend           |
| Service-Abstraktion zu komplex für MVP            | Niedrig            | Niedrig | Einfache Interfaces, erst bei Migration erweitern |

### Business Risiken

| Risiko                             | Wahrscheinlichkeit | Impact | Mitigation                                                      |
| ---------------------------------- | ------------------ | ------ | --------------------------------------------------------------- |
| User Adoption zu langsam           | Mittel             | Hoch   | Change Management, Training, schrittweise Migration             |
| Requirements ändern sich           | Hoch               | Mittel | Agile Entwicklung, regelmäßige Stakeholder-Reviews              |
| MVP zu limitiert für echte Nutzung | Mittel             | Mittel | Klare Kommunikation der MVP-Grenzen, schnelle Backend-Migration |

### MVP-spezifische Risiken

| Risiko                                           | Wahrscheinlichkeit | Impact  | Mitigation                                    |
| ------------------------------------------------ | ------------------ | ------- | --------------------------------------------- |
| localStorage-Daten gehen verloren                | Mittel             | Mittel  | Export-Feature einbauen, User-Training        |
| Keine Multi-User Kollaboration in MVP            | Hoch               | Niedrig | Bewusste Limitation, kurze MVP-Phase          |
| Vorlesungs-Zuordnung zu komplex für localStorage | Niedrig            | Mittel  | Einfache Referenzen, embedded data wo möglich |

---

## 11. Migration Strategy (localStorage → Backend)

### Phase 1: MVP (localStorage)

- Frontend-Only mit Service-Abstraktion
- Alle Daten in localStorage persistiert
- TypeScript-Interfaces definiert
- Export/Import-Funktionen für Datensicherung

### Phase 2: Backend Integration

```typescript
// Service-Implementierung austauschen
// Von localStorage...
class LocalStorageAssignmentService extends DataService<Assignment> {
  async getAll(): Promise<Assignment[]> {
    return JSON.parse(localStorage.getItem('assignments') || '[]');
  }
}

// ...zu API Service
class ApiAssignmentService extends DataService<Assignment> {
  async getAll(): Promise<Assignment[]> {
    return fetch('/api/assignments').then((r) => r.json());
  }
}
```

### Phase 3: Production Ready

- SQLite/PostgreSQL Datenbank
- Backup & Recovery Systeme
- Multi-User Synchronisation
- Keycloak SSO Integration

---

## 12. Testdaten & Content

### Datenansatz

**Mix aus echten + Dummy-Daten:**

- **Echte DHBW-Studiengänge:** BWL, Informatik, Maschinenbau, etc.
- **Realistische Vorlesungen:** Feste Vorlesungen mit echten Namen pro Studiengang
- **Dummy-Personen:** Fiktive Dozierende und User mit realistischen Titeln
- **Beispiel-Kurse:** BWL Kurs 2023, BWL Kurs 2024, Informatik Kurs 2023, etc.

### MVP Seed Data Beispiel

```typescript
const seedData: ApplicationData = {
  studyPrograms: [
    { id: '1', name: 'Betriebswirtschaftslehre', shortName: 'BWL' },
    { id: '2', name: 'Informatik', shortName: 'INF' },
  ],
  lectures: [
    {
      id: '1',
      studyProgramId: '1',
      semester: 1,
      title: 'Marketing Grundlagen',
      hours: 20,
    },
    {
      id: '2',
      studyProgramId: '1',
      semester: 1,
      title: 'Controlling Basics',
      hours: 16,
    },
  ],
  courses: [
    {
      id: '1',
      studyProgramId: '1',
      name: 'BWL Kurs 2024',
      startYear: 2024,
    },
    {
      id: '2',
      studyProgramId: '1',
      name: 'BWL Kurs 2023',
      startYear: 2023,
    },
  ],
  assignments: [
    {
      id: '1',
      lectureId: '1',
      courseId: '1',
      year: 2024,
      quarter: 'Q2',
      lecturerId: '1',
    },
  ],
  // ... weitere Dummy-Daten
};
```

---

## 13. Erfolgskriterien

### Quantitative Ziele

- 100% der Quartalsplanungen digital abgewickelt
- Reduzierung der Planungszeit um 50%
- Eliminierung von Stundenüberschreitungen durch automatische Kontrolle

### Qualitative Ziele

- Intuitive Bedienung ohne Schulungsaufwand
- Bessere Übersicht über Dozierende-Kapazitäten
- Reduzierte Planungsfehler durch Validierung
- Klare Trennung zwischen festen Vorlesungen und konkreter Planung

### MVP-spezifische Erfolgskriterien

- Stakeholder können MVP nach 2 Wochen Entwicklung testen
- Feedback-Zyklen unter 24h durch sofortige Deployment-Möglichkeit
- Validierung aller Core-Workflows ohne Backend-Komplexität
- Einfache Dozent-Vorlesung-Zuordnung erleichtert Planung neuer Semester/Kurse
