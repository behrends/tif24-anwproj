# Product Requirements Document (PRD)

## DHBW Lörrach - Vorlesungsplanungs-System

---

## 1. Executive Summary

### 1.1 Vision

Entwicklung einer benutzerfreundlichen Webanwendung zur digitalen Vorlesungsplanung, die das aktuelle Excel-basierte System der DHBW Lörrach ersetzt und kollaboratives, effizientes Planen ermöglicht.

### 1.2 Problemstellung

Das aktuelle Excel-System verursacht:

- Doppelbelegungen von Dozierenden
- Unübersichtliche Datenhaltung mit vielen Spalten
- Fehlende Kollaborationsmöglichkeiten
- Mangelnde Statusverfolgung (zugesagt/abgesagt/ausstehend)
- Umständliche Handhabung ohne Fortschrittsüberblick

---

## 2. Zielgruppe & Nutzer

### 2.1 Primäre Nutzer (15 Personen)

- **Studiengangsmanager\*innen:** 3-4 Personen
- **Studiengangsleiter\*innen:** ~11 Personen (übernehmen Planung in Studiengängen ohne Manager\*innen)

### 2.2 Nutzerrollen & Berechtigungen

| Rolle                       | Berechtigung                                            |
| --------------------------- | ------------------------------------------------------- |
| **Studiengangsmanager\*in** | Nur eigene zugewiesene Studiengänge einsehen/bearbeiten |
| **Studiengangsleiter\*in**  | Nur eigene zugewiesene Studiengänge einsehen/bearbeiten |
| **Admin**                   | Alle Daten einsehen und ändern, Stammdaten verwalten    |

---

## 3. Datenmodell & Rahmenbedingungen

### 3.1 Organisationsstruktur

- **10 Studiengänge** (Dummy-Daten für MVP)
- **1-2 Kurse pro Studiengang**
- **Kurs:** Feste Studierendengruppe über 6 Semester
- **25 Dozierende** (Dummy-Daten für MVP)

### 3.2 Quartalsystem

- **Theoriephase:** Vorlesungen an der DHBW (meist 1 Quartal)
- **Praxisphase:** Studierende im Unternehmen (anderes Quartal)
- **Planungshorizont:** 2-3 Quartale im Voraus
- **Zeiträume:** Konkrete Start-/Enddaten pro Kurs/Quartal (z.B. 7. Jan - 29. März)

### 3.3 Dozierende & Stundenkontingente

- **Interne Dozierende:** Unbegrenzte Stunden
- **Externe Dozierende:** Max. 240 Stunden/Jahr ⚠️ Tracking erforderlich
- **Team-Teaching:** Mehrere Dozierende pro Vorlesung möglich

### 3.4 Vorlesungsattribute

- Variable Stundenzahl
- Unterschiedliche Prüfungsformen
- Zuordnung zu Kurs und Quartal

---

## 4. MVP Features & User Stories

### 4.1 Kern-Features (Must-Have)

#### F1: Studiengang & Kurs Management

**User Story:** Als Studiengangsmanager\*in möchte ich meinen Studiengang und Kurs auswählen können, um eine spezifische Planung zu beginnen.

**Acceptance Criteria:**

- Dropdown/Auswahl für zugewiesene Studiengänge
- Kursauswahl basierend auf gewähltem Studiengang
- Nur Zugriff auf eigene Studiengänge (außer Admin)

#### F2: Quartal & Zeitraum Management

**User Story:** Als Planer\*in möchte ich ein Quartal auswählen und den konkreten Zeitraum festlegen können.

**Acceptance Criteria:**

- Quartalsauswahl (Q1, Q2, Q3, Q4)
- Start-/Enddatum-Eingabe für gewähltes Quartal
- Planung für 2-3 Quartale im Voraus möglich

#### F3: Vorlesungsübersicht

**User Story:** Als Planer\*in möchte ich alle Vorlesungen für einen gewählten Kurs und Zeitraum sehen.

**Acceptance Criteria:**

- Tabellarische Übersicht aller Vorlesungen
- Anzeige von Stundenzahl und Prüfungsform
- Filtermöglichkeiten nach Status

#### F4: Dozierenden-Zuordnung

**User Story:** Als Planer\*in möchte ich Dozierende zu Vorlesungen zuordnen können.

**Acceptance Criteria:**

- Dropdown/Suche für verfügbare Dozierende
- Mehrfachzuordnung möglich (Team-Teaching)
- Anzeige von Dozent-Typ (intern/extern)
- Warnung bei Überschreitung der 240h-Grenze (externe Dozierende)

#### F5: Status-Tracking

**User Story:** Als Planer\*in möchte ich den Status von Dozentenanfragen verfolgen können.

**Acceptance Criteria:**

- Status: Ausstehend, Zugesagt, Abgesagt
- Farbkodierung für schnelle Übersicht
- Filtermöglichkeit nach Status

#### F6: Planungsübersicht

**User Story:** Als Planer\*in möchte ich die komplette Planung für einen Kurs und Quartal einsehen können.

**Acceptance Criteria:**

- Vollständige Übersicht aller Vorlesungen mit Dozierenden
- Status-Übersicht (wie viele zugesagt/offen/abgesagt)
- Stunden-Tracking pro Dozent\*in

#### F7: PDF-Export

**User Story:** Als Planer\*in möchte ich die Planung als PDF exportieren können.

**Acceptance Criteria:**

- Generierung einer übersichtlichen PDF-Datei
- Enthält alle relevanten Planungsdaten
- Professional formatiert für offizielle Verwendung

### 4.2 Authentication & Authorization (MVP)

**User Story:** Als Nutzer\*in möchte ich mich einfach anmelden können.

**MVP-Lösung:**

- Button/Dropdown zur Benutzerauswahl (Dummy-Login)
- Verschiedene Test-Accounts mit unterschiedlichen Studiengängen
- Später: Keycloak SSO-Integration

---

## 5. Technische Spezifikation

### 5.1 Tech Stack

- **Frontend:** Next.js mit TypeScript
- **UI Framework:** Tailwind CSS + shadcn/ui
- **Database:** SQLite (MVP) → PostgreSQL (Production)
- **Deployment:** Web-Anwendung (Desktop-optimiert)

### 5.2 Datenbank Schema (vereinfacht)

```sql
-- Studiengänge
StudyPrograms: id, name, manager_id

-- Kurse
Courses: id, study_program_id, name, semester

-- Dozierende
Lecturers: id, name, type (internal/external), yearly_hours_limit

-- Vorlesungen
Lectures: id, course_id, name, hours, exam_type, quarter_id

-- Quartal/Zeiträume
Quarters: id, course_id, quarter (Q1-Q4), start_date, end_date

-- Zuordnungen
LectureAssignments: id, lecture_id, lecturer_id, status (pending/confirmed/declined)

-- Nutzer
Users: id, name, role, assigned_study_programs[]
```

### 5.3 Performance Requirements

- **Nutzer:** Max. 15 concurrent users
- **Response Time:** < 2 Sekunden für Standard-Operationen
- **Data Volume:** ~20 Kurse, ~200 Vorlesungen, ~25 Dozierende

---

## 6. Nice-to-Have Features (Future Releases)

### 6.1 Phase 2 Features

- **Konflikt-Erkennung:** Automatische Warnung bei Terminüberschneidungen
- **Kalender-Integration:** Import/Export zu/von Outlook/Google Calendar
- **E-Mail-Benachrichtigungen:** Automatische Anfragen an Dozierende
- **Reporting:** Auslastungs-Reports, Statistiken
- **Bulk-Operations:** Mehrere Zuordnungen gleichzeitig

### 6.2 Phase 3 Features

- **Mobile Responsiveness:** Tablet/Smartphone-Optimierung
- **Advanced Search:** Volltext-Suche über alle Daten
- **Workflow-Management:** Approval-Prozesse
- **Integration:** Verbindung zu bestehenden DHBW-Systemen

---

## 7. Wireframe-Konzept

### 7.1 Hauptnavigation

```
[Logo DHBW Lörrach] [Studiengang: BWL ▼] [Quartal: Q1 2024 ▼] [User: Max Mustermann ▼]
```

### 7.2 Dashboard-Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Kurs: BWL-A (Q1 2024: 07.01 - 29.03.2024)                  │
│ Status: 12/20 Vorlesungen geplant | 8 ausstehend            │
├─────────────────────────────────────────────────────────────┤
│ [Filter: Alle ▼] [Status: Alle ▼] [Export PDF]             │
├─────────────────────────────────────────────────────────────┤
│ Vorlesung            │Std│Prüfung  │Dozent*in      │Status  │
│ Marketing Grundlagen │24 │Klausur  │Dr. Müller     │✅ Zu   │
│ Statistik           │32 │Projekt  │[+ Zuordnen]   │⏳ Offen│
│ Unternehmensführung │20 │Präsent. │Prof. Weber +1 │❌ Ab   │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Success Metrics

### 8.1 MVP Success Criteria

- **Adoption:** 100% der Planer\*innen nutzen das System
- **Efficiency:** 50% Zeitersparnis vs. Excel-Lösung
- **Quality:** 90% Reduktion von Doppelbelegungen
- **Satisfaction:** 8/10 User Satisfaction Score

### 8.2 Key Performance Indicators

- Anzahl geplanter Vorlesungen pro Woche
- Zeit bis zur vollständigen Quartalplanung
- Anzahl Planungsfehler/Konflikte
- User Adoption Rate

---

## 9. Risiken & Mitigation

| Risiko                 | Wahrscheinlichkeit | Impact | Mitigation                               |
| ---------------------- | ------------------ | ------ | ---------------------------------------- |
| Datenmigrationsaufwand | Mittel             | Hoch   | Schrittweise Migration, Excel-Import     |
| User Adoption          | Niedrig            | Hoch   | Training, graduelle Einführung           |
| Technische Komplexität | Niedrig            | Mittel | MVP-First Approach, bewährter Tech Stack |

---

## 10. Timeline & Nächste Schritte

### 10.1 MVP Development (8-12 Wochen)

- **Woche 1-2:** Setup & Basic CRUD Operations
- **Woche 3-4:** Core Planning Features (F1-F4)
- **Woche 5-6:** Status Tracking & Overview (F5-F6)
- **Woche 7-8:** PDF Export & Polish (F7)
- **Woche 9-10:** Testing & Feedback Integration
- **Woche 11-12:** Deployment & User Training

### 10.2 Immediate Next Steps

1. **Wireframes erstellen** für key user flows
2. **Datenbank Schema** detailliert ausarbeiten
3. **Development Environment** Setup
4. **Dummy Data** Generator entwickeln
5. **User Testing** Plan erstellen
