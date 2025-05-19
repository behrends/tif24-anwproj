# Product Requirements Document: MVP Vorlesungsplanung DHBW Lörrach

## 1. Produktvision

Eine intuitive Webanwendung, die es den Mitarbeitern der DHBW Lörrach ermöglicht, die Zuweisung von Dozierenden zu Vorlesungen für kommende Quartale effizient, transparent und fehlerreduziert zu planen und die bisherige, unübersichtliche Excel-basierte Planung abzulösen.

## 2. Problemlösung (Opportunity)

Die aktuelle Planung von Vorlesungszuständigkeiten an der DHBW Lörrach erfolgt über eine große, unübersichtliche Excel-Datei. Dies führt zu folgenden Problemen:

*   **Mangelnde Übersichtlichkeit:** Die Dateistruktur (viele Spalten) erschwert das schnelle Erfassen von Informationen.
*   **Fehlende Nachvollziehbarkeit:** Vergangene Planungen sind schwer nachzuvollziehen oder zu archivieren.
*   **Keine automatische Validierung:** Die Einhaltung von Regeln, wie z.B. die maximale Stundenzahl (240h/Jahr) für externe Dozierende, wird nicht systemisch unterstützt und muss manuell geprüft werden, was fehleranfällig ist.
*   **Eingeschränkte Kollaboration:** Nur eine Person kann gleichzeitig an der Datei arbeiten, was den Planungsprozess verlangsamt.

Die vorgeschlagene Webanwendung soll diese Probleme lösen, indem sie eine strukturierte, benutzerfreundliche Oberfläche für die Planung bietet, wichtige Regeln automatisiert prüft und eine klare Archivierung vergangener Planungen ermöglicht. Die arbeitsteilige Planung nach Studiengängen wird im MVP berücksichtigt.

## 3. Zielgruppe

*   **Primäre Nutzer:** Mitarbeiter der DHBW Lörrach, die für die operative Planung der Vorlesungszuständigkeiten (Zuordnung von Dozierenden zu Vorlesungen) verantwortlich sind.

## 4. Konzepte und Begriffe

*   **Dozierende:** Personen, die Vorlesungen halten. Unterscheidung zwischen *internen Professoren* und *externen Dozierenden*.
*   **Vorlesung:** Eine Lehreinheit mit definiertem Inhalt, Stundenumfang, zugehörigem Studiengang, Semester und Prüfungsleistung.
*   **Studiengang:** Ein spezifischer Studiengang an der DHBW Lörrach (z.B. Wirtschaftsinformatik, Maschinenbau). Dient im MVP als Filterkriterium und zur Aufteilung der Planungsarbeit.
*   **Quartal:** Ein definierter Planungszeitraum (z.B. Q3 2025) mit Start- und Enddatum, für den Vorlesungen Dozierenden zugewiesen werden.
*   **Akademisches Jahr:** Läuft vom 01.10. bis zum 30.09. des Folgejahres. Relevant für die Berechnung der 240-Stunden-Grenze externer Dozierender.
*   **Zuordnung:** Die Verbindung einer Vorlesung (innerhalb eines Quartals) mit einem oder mehreren Dozierenden, inklusive der Angabe der jeweiligen Stundenanteile.
*   **Stundenkontingent (extern):** Externe Dozierende dürfen maximal 240 Stunden pro akademischem Jahr unterrichten.
*   **Stammkatalog:** Eine zentrale Liste aller verfügbaren Vorlesungen, aus der für die Quartalsplanung ausgewählt wird.

## 5. Datenstruktur

### 5.1. Dozierende (Lecturers)
    *   `lecturer_id` (Primärschlüssel, PK)
    *   `name` (Text, Pflichtfeld)
    *   `status` (Enum: 'intern', 'extern', Pflichtfeld)
    *   `email` (Text, optional)
    *   `remarks` (Text, optional, z.B. Präferenzen)

### 5.2. Vorlesungen (Courses) - Stammkatalog
    *   `course_id` (PK)
    *   `name` (Text, Pflichtfeld)
    *   `study_program_id` (Fremdschlüssel (FK) zu StudyPrograms, Pflichtfeld)
    *   `semester` (Integer, z.B. 1-6, Pflichtfeld)
    *   `standard_hours` (Integer, Stundenumfang, Pflichtfeld)
    *   `examination_type` (Text, rein informativ, z.B. "Klausur", "Projektarbeit")

### 5.3. Studiengänge (StudyPrograms)
    *   `study_program_id` (PK)
    *   `name` (Text, Pflichtfeld, z.B. "Wirtschaftsinformatik")

### 5.4. Quartale (Quarters)
    *   `quarter_id` (PK)
    *   `name` (Text, Pflichtfeld, z.B. "Q3 2025")
    *   `start_date` (Datum, Pflichtfeld)
    *   `end_date` (Datum, Pflichtfeld)
    *   `academic_year_id` (FK zu AcademicYears)

### 5.5. Akademische Jahre (AcademicYears)
    *   `academic_year_id` (PK)
    *   `name` (Text, z.B. "AY 2024/2025")
    *   `start_date` (Datum, 01.10.JJJJ)
    *   `end_date` (Datum, 30.09.JJJJ+1)

### 5.6. Planungszuordnungen (Assignments)
    *   `assignment_id` (PK)
    *   `quarter_id` (FK zu Quarters, Pflichtfeld)
    *   `course_id` (FK zu Courses, Pflichtfeld)
    *   `lecturer_id` (FK zu Lecturers, Pflichtfeld)
    *   `assigned_hours` (Integer, Stunden für diesen Dozenten in dieser Vorlesung in diesem Quartal, Pflichtfeld)
    *   *Hinweis: Eine Vorlesung in einem Quartal kann mehrere Assignment-Einträge haben, wenn sie geteilt wird.*

## 6. Aufbau der App (Screens, wichtige Komponenten)

Für den MVP konzentrieren wir uns auf folgende Screens und Kernkomponenten. Alle Aktionen werden von einer einzigen Nutzerrolle ("Planer") ausgeführt.

### 6.1. Dashboard / Startseite
*   **Zweck:** Einstiegspunkt nach dem Login.
*   **Komponenten:**
    *   Auflistung der aktuellen und zukünftigen Quartale (Name, Zeitraum).
    *   Möglichkeit, ein Quartal auszuwählen, um zur Planungsansicht zu gelangen.
    *   Möglichkeit, zu vergangenen (archivierten) Quartalen zu navigieren (Leseansicht).
    *   Navigationslinks zu den Stammdatenbereichen (Dozierende, Vorlesungen, Quartale, Studiengänge).

### 6.2. Stammdatenverwaltung

#### 6.2.1. Dozierende verwalten
*   **Zweck:** Anlegen, Anzeigen, Bearbeiten und (optional für MVP: Löschen) von Dozierenden.
*   **Ansicht:** Tabellarische Liste aller Dozierenden mit Spalten für Name, Status, E-Mail.
*   **Funktionen:**
    *   Button "Neuen Dozierenden anlegen" -> Formular (Name, Status, E-Mail, Bemerkungen).
    *   Editieren eines bestehenden Dozierenden.

#### 6.2.2. Vorlesungen verwalten (Stammkatalog)
*   **Zweck:** Anlegen, Anzeigen, Bearbeiten und (optional für MVP: Löschen) von Vorlesungen im Stammkatalog.
*   **Ansicht:** Tabellarische Liste aller Vorlesungen mit Spalten für Name, Studiengang, Semester, Standardstunden, Prüfungsleistung.
*   **Funktionen:**
    *   Button "Neue Vorlesung anlegen" -> Formular (Name, Studiengang (Auswahl), Semester, Standardstunden, Prüfungsleistung).
    *   Editieren einer bestehenden Vorlesung.

#### 6.2.3. Studiengänge verwalten
*   **Zweck:** Anlegen und Verwalten von Studiengängen.
*   **Ansicht:** Liste der Studiengänge.
*   **Funktionen:**
    *   Button "Neuen Studiengang anlegen" -> Formular (Name).
    *   Editieren eines bestehenden Studiengangs.

#### 6.2.4. Quartale verwalten
*   **Zweck:** Anlegen und Verwalten von Planungsquartalen.
*   **Ansicht:** Liste der Quartale mit Name, Start-/Enddatum.
*   **Funktionen:**
    *   Button "Neues Quartal anlegen" -> Formular (Name, Startdatum, Enddatum, Auswahl des zugehörigen Akademischen Jahres).
    *   Editieren eines bestehenden Quartals.
    *   *Hinweis: Akademische Jahre müssen implizit hier mitverwaltet oder separat (sehr einfach) angelegt werden können.*

### 6.3. Quartalsplanung (Kernansicht)
*   **Zweck:** Zuweisen von Dozierenden zu Vorlesungen für ein ausgewähltes Quartal.
*   **Zugriff:** Über Auswahl eines Quartals vom Dashboard.
*   **Komponenten:**
    *   **Filter:**
        *   Nach Studiengang (essenziell für arbeitsteilige Planung).
    *   **Anzeige:** Tabellarische Liste der Vorlesungen für das ausgewählte Quartal (und den ggf. gefilterten Studiengang).
        *   Spalten: Vorlesungsname, Semester, Standardstunden, Bereits zugewiesene Dozierende (Name/Namen), Verbleibende Stunden (falls teil-zugewiesen).
    *   **Aktion pro Vorlesung:** Button/Icon "Dozierende(n) zuweisen/bearbeiten".

### 6.4. Dozierenden-Zuweisungs-Modal/-Seite
*   **Zweck:** Auswahl und Zuweisung eines oder mehrerer Dozierenden zu einer spezifischen Vorlesung im aktuellen Quartal.
*   **Aufruf:** Aus der Quartalsplanungsansicht für eine bestimmte Vorlesung.
*   **Anzeige:**
    *   Informationen zur ausgewählten Vorlesung (Name, Standardstunden).
    *   Bereits zugewiesene Dozierende für diese Vorlesung in diesem Quartal (falls vorhanden) mit ihren Stundenanteilen.
*   **Funktionen:**
    *   Button "Dozierenden hinzufügen".
    *   **Dozierenden-Auswahl:**
        *   Filterbare/Durchsuchbare Liste aller Dozierenden.
        *   Anzeige pro Dozierendem in der Liste: Name, Status (intern/extern), Bemerkungen.
        *   **Für externe Dozierende:** Anzeige der bereits im aktuellen *akademischen Jahr* verplanten Stunden (berechnet aus allen Assignments für diesen Dozierenden im relevanten akademischen Jahr).
    *   **Stundeneingabe:** Nach Auswahl eines Dozierenden: Eingabefeld für die Anzahl der Stunden, die dieser Dozierende für *diese spezifische Vorlesung in diesem Quartal* übernehmen soll.
    *   **Validierung/Warnung:**
        *   Wenn einem externen Dozierenden Stunden zugewiesen werden, die seine Gesamtstundenzahl im akademischen Jahr über 240 Stunden heben würden, wird eine deutliche Warnung angezeigt. Die Speicherung ist trotzdem möglich (Soft Warning), aber der Planer wird informiert.
        *   Die Summe der zugewiesenen Stunden für eine Vorlesung sollte idealerweise die Standardstunden der Vorlesung nicht überschreiten (optionale Warnung für MVP).
    *   Speichern der Zuordnung(en) für die Vorlesung.
    *   Möglichkeit, eine bestehende Zuordnung für diese Vorlesung zu ändern (Stunden anpassen) oder zu entfernen.

### 6.5. Archivansicht (Vergangene Quartalsplanungen)
*   **Zweck:** Einsicht in abgeschlossene Planungen.
*   **Zugriff:** Über das Dashboard.
*   **Ansicht:** Ähnlich der Quartalsplanungsansicht, aber rein lesend (keine Bearbeitungsfunktionen). Auswahl eines vergangenen Quartals zeigt die damaligen Zuordnungen.
