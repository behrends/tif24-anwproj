# Product Requirements Document (PRD)

## DHBW Vorlesungsplanung System

**Version:** 1.2
**Datum:** 2025-05-24  
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
- Zuordnung von Dozierenden zu Studiengängen
- Hierarchische Kurs-Struktur pro Studiengang

### 4.3 Kurs-Verwaltung

- Kurse mit Multiple-Choice Vorlesungen
- Quartalsweise Planung (Q1-Q4)
- Vorlesungsdetails: Titel, Stundenzahl, Dozent\*in
- Automatische Stundenberechnung

### 4.4 Planungsübersicht

- **Dashboard:** Übersicht aller Studiengänge und Planungsstatus
- **Quartalsansicht:** Detailplanung pro Quartal
- **Dozentenübersicht:** Aktuelle Stundenverteilung und Kapazitäten
- **Konflikterkennung:** Automatische Warnung bei Überschreitungen

### 4.5 Benutzer-Management

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
  courses: Course[];
  lectures: Lecture[];
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

interface Course {
  id: string;
  studyProgramId: string;
  name: string;
  semester: number;
  createdAt: string;
  updatedAt: string;
}

interface Lecture {
  id: string;
  courseId: string;
  title: string;
  hours: number;
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4';
  year: number;
  lecturerId?: string;
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

---

## 7. User Stories

### Als Studiengangsmanager\*in möchte ich...

- Vorlesungen für meine Studiengänge planen können
- Sehen, welche Dozierende verfügbar sind
- Stundenkapazitäten von externen Dozierenden überwachen
- Quartalsplanungen einfach anpassen können

### Als Studiengangsleiterin möchte ich...

- Überblick über alle meine Studiengänge haben
- Planungsstatus der verschiedenen Quartale einsehen
- Bei Bedarf Planungen korrigieren können

### Als Administrator\*in möchte ich...

- Neue Dozierende und User anlegen können
- Berechtigungen verwalten können
- Systemweite Übersicht über alle Planungen haben

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
│ └─────────────────┘         │ Q3 2024: 10%    │     │
│ ┌─────────────────┐         └─────────────────┘     │
│ │ Informatik      │                               │
│ │ 📊 Q1: ✅ Q2: ❌│         Externe Dozierende     │
│ └─────────────────┘         ┌─────────────────┐     │
│                            │ Dr. Müller:     │     │
│ [+ Neuer Studiengang]      │ 180/240h        │     │
│                            │ ▓▓▓▓▓▓▓░░░      │     │
│                            └─────────────────┘     │
└─────────────────────────────────────────────────────┘
```

### 8.2 Quartalsplanung

```
┌─────────────────────────────────────────────────────┐
│ Quartalsplanung Q2 2024 - BWL                      │
├─────────────────────────────────────────────────────┤
│ [Q1] [Q2] [Q3] [Q4]    Filter: [Alle] [Geplant]    │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Kurs: BWL Semester 3                               │
│ ┌───────────────────────────────────────────────────┐ │
│ │ Vorlesung                │ Std │ Dozent*in        │ │
│ │ Marketing Grundlagen     │ 20  │ [Dr. Schmidt ▼] │ │
│ │ Controlling              │ 16  │ [Nicht geplant]  │ │
│ │ Projektmanagement        │ 12  │ [Prof. Müller▼] │ │
│ └───────────────────────────────────────────────────┘ │
│                                                     │
│ Kurs: BWL Semester 5                               │
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
- ✅ Basis-Kurs und Vorlesungsplanung
- ✅ Quartalsansicht mit Übersichtsdashboard
- ✅ User-Management mit Rollenkonzept
- ✅ Responsive Web-Interface
- ✅ TypeScript-Interfaces für alle Datenstrukturen

### Nice-to-Have (Post-MVP)

- 📋 Backend-Migration mit SQLite/PostgreSQL
- 📋 Excel-Import für bestehende Daten
- 📋 Erweiterte Reporting-Funktionen
- 📋 Keycloak SSO-Integration
- 📋 Automatische E-Mail-Benachrichtigungen
- 📋 Mobile-optimierte Ansichten
- 📋 Änderungsprotokoll für Nachverfolgung
- 📋 Real-time Collaboration Features

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

| Risiko                                | Wahrscheinlichkeit | Impact  | Mitigation                             |
| ------------------------------------- | ------------------ | ------- | -------------------------------------- |
| localStorage-Daten gehen verloren     | Mittel             | Mittel  | Export-Feature einbauen, User-Training |
| Keine Multi-User Kollaboration in MVP | Hoch               | Niedrig | Bewusste Limitation, kurze MVP-Phase   |

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
class LocalStorageLecturerService extends DataService<Lecturer> {
  async getAll(): Promise<Lecturer[]> {
    return JSON.parse(localStorage.getItem('lecturers') || '[]');
  }
}

// ...zu API Service
class ApiLecturerService extends DataService<Lecturer> {
  async getAll(): Promise<Lecturer[]> {
    return fetch('/api/lecturers').then((r) => r.json());
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
- **Dummy-Personen:** Fiktive Dozierende und User mit realistischen Titeln
- **Realistische Vorlesungen:** Passend zu echten Studiengängen

### MVP Seed Data

```typescript
// Fest in App integrierte Dummy-Daten für sofortigen Start
const seedData: ApplicationData = {
  lecturers: [...],
  users: [...],
  studyPrograms: [...],
  courses: [...],
  lectures: [...]
}
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

### MVP-spezifische Erfolgskriterien

- Stakeholder können MVP nach 2 Wochen Entwicklung testen
- Feedback-Zyklen unter 24h durch sofortige Deployment-Möglichkeit
- Validierung aller Core-Workflows ohne Backend-Komplexität
