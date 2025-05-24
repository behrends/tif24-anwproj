# Product Requirements Document (PRD)

## DHBW Vorlesungsplanung System

**Version:** 1.0
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

- **Rollen:** Admin, Manager, Director
- **Berechtigungen:** Zuordnung zu Studiengängen
- **Freie Bearbeitung:** Kollaborative Planung ohne Approval-Workflows

---

## 5. Technische Anforderungen

### 5.1 Architektur

- **Frontend:** Next.js 14+ mit TypeScript
- **UI Framework:** Tailwind CSS + shadcn/ui
- **Backend:** Next.js API Routes
- **Datenbank:** SQLite (MVP + Production)
- **Authentication:** Dummy-Auth → später Keycloak SSO

### 5.2 Datenmodell

```sql
-- Dozierende
Lecturers: id, firstname, lastname, title, type, yearly_hours_limit

-- Nutzer
Users: id, firstname, lastname, title, email, role, assigned_study_programs[]

-- Studiengänge
StudyPrograms: id, name, short_name, description

-- Kurse
Courses: id, study_program_id, name, semester

-- Vorlesungen
Lectures: id, course_id, title, hours, quarter, lecturer_id
```

### 5.3 Deployment

- **Hosting:** On-premises mit Traefik
- **Container:** Single Docker Container
- **Backup:** File-basierte SQLite-Sicherung
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
- **Historisierung:** Änderungsprotokoll für Nachverfolgung

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

- ✅ Dozierenden-Verwaltung mit Stundenkontrolle
- ✅ Basis-Kurs und Vorlesungsplanung
- ✅ Quartalsansicht mit Übersichtsdashboard
- ✅ User-Management mit Rollenkonzept
- ✅ Responsive Web-Interface
- ✅ SQLite-basierte Persistierung

### Nice-to-Have (Post-MVP)

- 📋 Excel-Import für bestehende Daten
- 📋 Erweiterte Reporting-Funktionen
- 📋 Keycloak SSO-Integration
- 📋 Automatische E-Mail-Benachrichtigungen
- 📋 Mobile-optimierte Ansichten

### Ausgeschlossen

- ❌ Direkter Dozierenden-Zugang
- ❌ Komplexe Approval-Workflows
- ❌ Real-time Collaboration
- ❌ Integration mit anderen DHBW-Systemen

---

## 10. Risiken & Mitigation

### Technische Risiken

| Risiko                                     | Wahrscheinlichkeit | Impact  | Mitigation                                  |
| ------------------------------------------ | ------------------ | ------- | ------------------------------------------- |
| SQLite Performance bei concurrent access   | Mittel             | Mittel  | Optimistische Locking, Connection Pooling   |
| Datenkorruption bei simultaner Bearbeitung | Niedrig            | Hoch    | Transaktionale Updates, regelmäßige Backups |
| Browser-Kompatibilität                     | Niedrig            | Niedrig | Standard Web-APIs, Progressive Enhancement  |

### Business Risiken

| Risiko                                          | Wahrscheinlichkeit | Impact | Mitigation                                          |
| ----------------------------------------------- | ------------------ | ------ | --------------------------------------------------- |
| User Adoption zu langsam                        | Mittel             | Hoch   | Change Management, Training, schrittweise Migration |
| Requirements ändern sich                        | Hoch               | Mittel | Agile Entwicklung, regelmäßige Stakeholder-Reviews  |
| Integration mit Keycloak komplexer als erwartet | Mittel             | Mittel | MVP mit Dummy-Auth, Keycloak als separate Phase     |

---

## 11. Testdaten & Content

### Datenansatz

**Mix aus echten + Dummy-Daten:**

- **Echte DHBW-Studiengänge:** BWL, Informatik, Maschinenbau, etc.
- **Dummy-Personen:** Fiktive Dozierende und User mit realistischen Titeln
- **Realistische Vorlesungen:** Passend zu echten Studiengängen

---

## 12. Erfolgskriterien

### Quantitative Ziele

- 100% der Quartalsplanungen digital abgewickelt
- Reduzierung der Planungszeit um 50%
- Eliminierung von Stundenüberschreitungen durch automatische Kontrolle

### Qualitative Ziele

- Intuitive Bedienung ohne Schulungsaufwand
- Bessere Übersicht über Dozierende-Kapazitäten
- Reduzierte Planungsfehler durch Validierung
