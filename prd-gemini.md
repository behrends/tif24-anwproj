# Product Requirements Document: MVP Vorlesungsplanung DHBW Lörrach

## 1. Produktvision

Eine intuitive Webanwendung, die es den Mitarbeitern der DHBW Lörrach ermöglicht, die Zuweisung von Dozierenden zu Vorlesungen für spezifische Kurse in kommenden Quartalen effizient, transparent und fehlerreduziert zu planen und die bisherige, unübersichtliche Excel-basierte Planung abzulösen.

## 2. Problemlösung (Opportunity)

Die aktuelle Planung von Vorlesungszuständigkeiten an der DHBW Lörrach erfolgt über eine große, unübersichtliche Excel-Datei. Dies führt zu folgenden Problemen:

*   **Mangelnde Übersichtlichkeit:** Die Dateistruktur (viele Spalten) erschwert das schnelle Erfassen von Informationen.
*   **Fehlende Nachvollziehbarkeit:** Vergangene Planungen sind schwer nachzuvollziehen oder zu archivieren.
*   **Keine automatische Validierung:** Die Einhaltung von Regeln, wie z.B. die maximale Stundenzahl (240h/Jahr) für externe Dozierende, wird nicht systemisch unterstützt und muss manuell geprüft werden, was fehleranfällig ist.
*   **Eingeschränkte Kollaboration:** Nur eine Person kann gleichzeitig an der Datei arbeiten, was den Planungsprozess verlangsamt.

Die vorgeschlagene Webanwendung soll diese Probleme lösen, indem sie eine strukturierte, benutzerfreundliche Oberfläche für die Planung bietet, wichtige Regeln automatisiert prüft und eine klare Archivierung vergangener Planungen ermöglicht. Die arbeitsteilige Planung nach Studiengängen wird im MVP berücksichtigt.

## 3. Zielgruppe

*   **Primäre Nutzer:** Mitarbeiter der DHBW Lörrach, die für die operative Planung der Vorlesungszuständigkeiten verantwortlich sind. Dies umfasst insbesondere Rollen wie die "Studiengangsmanagerin", die in einigen Studiengängen explizit diese Aufgabe wahrnimmt.

## 4. Konzepte und Begriffe

*   **Dozierende:** Personen, die Vorlesungen halten. Unterscheidung zwischen *internen Professoren* und *externen Dozierenden*. Haben einen Titel (optional), Vor- und Nachnamen.
*   **Vorlesung (Katalog / Lecture):** Eine Lehreinheit im Stammkatalog (DB-Tabelle: `Lectures`) mit definiertem Inhalt, Regelstundenumfang, zugehörigem Studiengang, typischem Semester und Prüfungsleistung.
*   **Studiengang:** Ein spezifischer Studiengang an der DHBW Lörrach (z.B. Wirtschaftsinformatik, Maschinenbau).
*   **Kurs (Kohorte/Studentengruppe):** Eine feste Gruppe von Studierenden innerhalb eines Studiengangs, die gemeinsam Vorlesungen über mehrere Semester besuchen (z.B. TIF24A, WWI24B). Ein Kurs hat einen Bezeichner und ist einem Studiengang zugeordnet.
*   **Quartal:** Ein definierter Planungszeitraum (z.B. Q3 2025) mit Start- und Enddatum, für den Vorlesungen Dozierenden zugewiesen werden.
*   **Akademisches Jahr:** Definiert als Zeitraum vom 01.10. eines Jahres bis zum 30.09. des Folgejahres. Relevant für die Berechnung der 240-Stunden-Grenze externer Dozierender. Es wird dynamisch aus dem Datum eines Quartals abgeleitet.
*   **Geplante Vorlesung (Vorlesungsinstanz / ScheduledCourse):** Eine spezifische Durchführung einer Katalog-Vorlesung für einen bestimmten Kurs in einem bestimmten Quartal. Diese wird vom Planer "aktiviert" oder ausgewählt.
*   **Zuordnung (Assignment):** Die Verbindung einer *geplanten Vorlesung* mit einem oder mehreren Dozierenden, inklusive der Angabe der jeweiligen Stundenanteile.
*   **Stundenkontingent (extern):** Externe Dozierende dürfen maximal 240 Stunden pro akademischem Jahr unterrichten.
*   **Stammkatalog (Vorlesungen / Lectures):** Eine zentrale Liste aller prinzipiell verfügbaren Vorlesungen.

## 5. Datenstruktur

**Vorbemerkung zu Audit-Feldern:** Sofern nicht anders angegeben, wird für alle im Folgenden definierten Tabellen empfohlen, Standard-Audit-Felder wie `created_at` (Zeitstempel der Erstellung) und `updated_at` (Zeitstempel der letzten Änderung) auf Datenbankebene zu implementieren. Diese dienen der Nachvollziehbarkeit und dem Debugging, sind aber für den Nutzer im MVP nicht direkt sichtbar. Felder wie `created_by` oder `updated_by` sind für den MVP nicht vorgesehen.

### 5.1. Dozierende (Lecturers)
    *   `lecturer_id` (PK, Autoincrement)
    *   `title` (Text, optional, z.B. "Dr.", "Prof. Dr.")
    *   `first_name` (Text, Pflichtfeld)
    *   `last_name` (Text, Pflichtfeld)
    *   `status` (Enum: 'intern', 'extern', Pflichtfeld)
    *   `email` (Text, optional, unique)
    *   `remarks` (Text, optional, z.B. Präferenzen)

### 5.2. Vorlesungen (Lectures) - Stammkatalog
    *   `lecture_id` (PK, Autoincrement)
    *   `name` (Text, Pflichtfeld)
    *   `study_program_id` (FK zu StudyPrograms, Pflichtfeld)
    *   `default_semester` (Integer, z.B. 1-6, informativ für Auswahl, Pflichtfeld)
    *   `standard_hours` (Integer, Stundenumfang pro Durchführung/Kurs, Pflichtfeld)
    *   `examination_type` (Text, rein informativ, z.B. "Klausur", "Projektarbeit")

### 5.3. Studiengänge (StudyPrograms)
    *   `study_program_id` (PK, Autoincrement)
    *   `name` (Text, Pflichtfeld, unique, z.B. "Wirtschaftsinformatik")

### 5.4. Kurse (Cohorts)
    *   `cohort_id` (PK, Autoincrement)
    *   `name` (Text, Pflichtfeld, unique innerhalb eines StudyProgram, z.B. "TIF24A")
    *   `study_program_id` (FK zu StudyPrograms, Pflichtfeld)
    *   `is_active` (Boolean, Default: true, optional, um alte Kurse auszublenden)

### 5.5. Quartale (Quarters)
    *   `quarter_id` (PK, Autoincrement)
    *   `name` (Text, Pflichtfeld, unique, z.B. "Q3 2025")
    *   `start_date` (Datum, Pflichtfeld)
    *   `end_date` (Datum, Pflichtfeld)

### 5.6. Geplante Vorlesungen (ScheduledCourses)
    *   `scheduled_course_id` (PK, Autoincrement)
    *   `quarter_id` (FK zu Quarters, Pflichtfeld)
    *   `cohort_id` (FK zu Cohorts, Pflichtfeld)
    *   `lecture_id` (FK zu Lectures, Pflichtfeld)
    *   `custom_name` (Text, optional, falls der Name für diese Instanz leicht abweicht, Default: Name aus `Lectures`)
    *   `custom_hours` (Integer, optional, falls Stunden abweichen, Default: `standard_hours` aus `Lectures`)
    *   *Constraint: Unique combination of `quarter_id`, `cohort_id`, `lecture_id`*

### 5.7. Planungszuordnungen (Assignments)
    *   `assignment_id` (PK, Autoincrement)
    *   `scheduled_course_id` (FK zu ScheduledCourses, Pflichtfeld)
    *   `lecturer_id` (FK zu Lecturers, Pflichtfeld)
    *   `assigned_hours` (Integer, Stunden für diesen Dozenten in dieser geplanten Vorlesung, Pflichtfeld, >0)
    *   *Constraint: Unique combination of `scheduled_course_id`, `lecturer_id`*

## 6. Aufbau der App (Screens, wichtige Komponenten)

Für den MVP konzentrieren wir uns auf folgende Screens und Kernkomponenten. Alle Aktionen werden von einer einzigen Nutzerrolle ("Planer") ausgeführt.

### 6.1. Dashboard / Startseite
*   **Zweck:** Einstiegspunkt nach dem Login.
*   **Komponenten:**
    *   Auflistung der aktuellen und zukünftigen Quartale (Name, Zeitraum), klickbar zur Planungsansicht.
    *   Link/Bereich zur Ansicht vergangener (archivierter) Quartale.
    *   Hauptnavigation zu den Stammdatenbereichen:
        *   Dozierende
        *   Vorlesungen (Katalog)
        *   Studiengänge
        *   Kurse
        *   Quartale

### 6.2. Stammdatenverwaltung

#### 6.2.1. Dozierende verwalten
*   **Zweck:** Anlegen, Anzeigen, Bearbeiten von Dozierenden.
*   **Ansicht:** Tabellarische Liste aller Dozierenden mit Spalten für Titel, Vorname, Nachname, Status, E-Mail. Filter-/Suchmöglichkeit nach Name.
*   **Funktionen:**
    *   Button "Neuen Dozierenden anlegen" -> Formular (Titel, Vorname, Nachname, Status (Dropdown 'intern'/'extern'), E-Mail, Bemerkungen).
    *   Editieren eines bestehenden Dozierenden (Klick auf Eintrag -> Formular vorausgefüllt).
    *   (Optional für MVP: Löschen eines Dozierenden, nur wenn keine Assignments existieren).

#### 6.2.2. Vorlesungen verwalten (Stammkatalog / Lectures)
*   **Zweck:** Anlegen, Anzeigen, Bearbeiten von Vorlesungen im Stammkatalog.
*   **Ansicht:** Tabellarische Liste aller Katalog-Vorlesungen mit Spalten für Name, Studiengang, Semester, Standardstunden, Prüfungsleistung. Filter-/Suchmöglichkeit nach Name, Studiengang.
*   **Funktionen:**
    *   Button "Neue Vorlesung anlegen" -> Formular (Name, Studiengang (Dropdown), Default-Semester, Standardstunden, Prüfungsleistung).
    *   Editieren einer bestehenden Katalog-Vorlesung.
    *   (Optional für MVP: Löschen, nur wenn keine `ScheduledCourses` darauf verweisen).

#### 6.2.3. Studiengänge verwalten
*   **Zweck:** Anlegen, Anzeigen, Bearbeiten von Studiengängen.
*   **Ansicht:** Tabellarische Liste der Studiengänge mit Spalte für Name.
*   **Funktionen:**
    *   Button "Neuen Studiengang anlegen" -> Formular (Name).
    *   Editieren eines bestehenden Studiengangs.
    *   (Optional für MVP: Löschen, nur wenn keine Kurse/Vorlesungen darauf verweisen).

#### 6.2.4. Kurse verwalten
*   **Zweck:** Anlegen, Anzeigen, Bearbeiten von Kursen.
*   **Ansicht:** Tabellarische Liste der Kurse mit Spalten für Name (Bezeichner), zugehöriger Studiengang, Aktiv-Status. Filter-/Suchmöglichkeit nach Name, Studiengang.
*   **Funktionen:**
    *   Button "Neuen Kurs anlegen" -> Formular (Name, Studiengang (Dropdown), Aktiv (Checkbox)).
    *   Editieren eines bestehenden Kurses.
    *   (Optional für MVP: Löschen, nur wenn keine `ScheduledCourses` darauf verweisen).

#### 6.2.5. Quartale verwalten
*   **Zweck:** Anlegen, Anzeigen, Bearbeiten von Planungsquartalen.
*   **Ansicht:** Liste der Quartale mit Name, Start-/Enddatum.
*   **Funktionen:**
        *   Button "Neues Quartal anlegen" -> Formular (Name, Startdatum, Enddatum).
        *   Editieren eines bestehenden Quartals.

### 6.3. Quartalsplanung (Kernansicht)
*   **Zweck:** Definieren, welche Vorlesungen für welche Kurse in diesem Quartal stattfinden, und Zuweisen von Dozierenden zu diesen geplanten Vorlesungen.
*   **Zugriff:** Über Auswahl eines Quartals vom Dashboard. Der Name des ausgewählten Quartals wird prominent angezeigt.
*   **Komponenten:**
    *   **Filter/Auswahl des Arbeitsbereichs:**
        *   Dropdown zur Auswahl eines Studiengangs (Pflichtauswahl zur Fokussierung der Ansicht).
    *   **Ansicht für den ausgewählten Studiengang im gewählten Quartal:**
        *   **Teil 1: Geplante Vorlesungen (ScheduledCourses) verwalten**
            *   Pro Kurs des ausgewählten Studiengangs (Kurse werden als Sektionen oder Reiter dargestellt):
                *   Anzeige der bereits für diesen Kurs im aktuellen Quartal "geplanten Vorlesungen" (`ScheduledCourses`). Spalten: Katalog-Vorlesungsname, effektive Stunden (aus `ScheduledCourse`), zugewiesene Gesamtstunden, Status (z.B. offen, teil-zugewiesen, voll zugewiesen).
                *   Button/Aktion pro Kurs: "+ Vorlesung für [Kursname] in diesem Quartal planen"
                    *   Öffnet Modal/Seite: Liste der Vorlesungen aus dem Stammkatalog (`Lectures`), idealerweise vorgefiltert auf den Studiengang des Kurses und ggf. das `default_semester`. Nutzer kann Vorlesungen auswählen.
                    *   Beim Speichern wird für jede Auswahl ein `ScheduledCourse`-Eintrag erstellt (mit Stunden aus Katalog).
                *   Aktion pro `ScheduledCourse`: Bearbeiten (z.B. `custom_hours` anpassen, falls abweichend vom Katalog), Entfernen (löscht `ScheduledCourse` und zugehörige `Assignments`).
        *   **Teil 2: Dozierende den geplanten Vorlesungen zuweisen (Hauptplanungsliste)**
            *   Tabellarische Liste aller `ScheduledCourses` für den ausgewählten Studiengang und das Quartal.
            *   Spalten: Vorlesungsname (aus Katalog), Kurs-Bezeichner, Semester (aus Katalog), Geplante Stunden (aus `ScheduledCourse`), Bereits zugewiesene Dozierende (Titel, Name, Stundenanteile), Verbleibende Stunden für Zuweisung.
            *   Aktion pro `ScheduledCourse` in der Liste: Button/Icon "Dozierende(n) zuweisen/bearbeiten" -> führt zu Screen 6.4.

### 6.4. Dozierenden-Zuweisungs-Modal/-Seite
*   **Zweck:** Auswahl und Zuweisung eines oder mehrerer Dozierenden zu einer spezifischen `ScheduledCourse`.
*   **Kontext:** Klar sichtbare Informationen zur `ScheduledCourse`: Vorlesungsname (Katalog), Kursname, Geplante Stunden für diese Instanz.
*   **Anzeige:**
    *   Liste der bereits für diese `ScheduledCourse` zugewiesenen Dozierenden (falls vorhanden) mit Titel, Name und ihren jeweiligen `assigned_hours`. Möglichkeit, bestehende Zuweisungen zu bearbeiten (Stunden ändern) oder zu entfernen.
*   **Funktionen:**
    *   Button "Dozierenden hinzufügen".
    *   **Dozierenden-Auswahl-Bereich:**
        *   Durchsuchbare/Filterbare Liste aller Dozierenden (Filter nach Name, Status intern/extern).
        *   Anzeige pro Dozierendem in der Auswahl-Liste: Titel, Vorname, Nachname, Status (intern/extern), Bemerkungen.
        *   **Für externe Dozierende:** Dynamische Anzeige der bereits im aktuellen *akademischen Jahr* (abgeleitet aus dem Startdatum des Planungsquartals) verplanten Stunden. Diese Berechnung summiert alle `assigned_hours` für diesen Dozenten, deren zugehörige `ScheduledCourses` in Quartalen liegen, die in das relevante akademische Jahr fallen.
    *   **Stundeneingabe:** Nach Auswahl eines Dozierenden: Eingabefeld für die Anzahl der Stunden (`assigned_hours`), die dieser Dozierende für *diese spezifische `ScheduledCourse`* übernehmen soll.
    *   **Validierung/Warnung beim Speichern einer Zuweisung:**
        *   Wenn einem externen Dozierenden Stunden zugewiesen werden, die seine Gesamtstundenzahl im (dynamisch berechneten) akademischen Jahr über 240 Stunden heben würden, wird eine deutliche, nicht-blockierende Warnung angezeigt. Die Speicherung ist trotzdem möglich.
        *   Die Summe der `assigned_hours` für eine `ScheduledCourse` sollte die `custom_hours` (oder `standard_hours`) der `ScheduledCourse` nicht überschreiten (Warnung, wenn doch).
    *   Speichern der Zuordnung (`Assignment`) oder der Änderungen.

### 6.5. Archivansicht (Vergangene Quartalsplanungen)
*   **Zweck:** Einsicht in abgeschlossene Planungen (Read-only).
*   **Zugriff:** Über das Dashboard (z.B. Link "Vergangene Quartale"). Auswahl eines vergangenen Quartals.
*   **Ansicht:**
    *   Zeigt das ausgewählte Quartal und den zugehörigen Studiengang-Filter.
    *   Listet die `ScheduledCourses` dieses Quartals für den gewählten Studiengang auf.
    *   Zeigt für jede `ScheduledCourse` die damals getätigten `Assignments` (Dozierende: Titel, Vorname, Nachname und deren Stunden).
    *   Keine Bearbeitungsfunktionen.
