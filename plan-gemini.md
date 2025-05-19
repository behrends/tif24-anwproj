# Execution Plan: MVP Vorlesungsplanung DHBW Lörrach (Next.js Edition) - Vollständig

**Gesamtdauer:** Ca. 2 Wochen Vollzeitäquivalent (verteilt auf die verfügbare Zeit der Teammitglieder).
**Gesamtbudget:** 400 Personenstunden (ca. 360h für Tasks + 40h Puffer).

**Grundlegende Annahmen:**
1.  **Team-Skills:** Das Team ist vertraut mit React/Next.js und TypeScript. Erfahrung mit Tailwind CSS und dem Konzept von Utility-First CSS ist vorhanden. shadcn/ui wird als Komponentenbibliothek genutzt.
2.  **Tech-Stack:** Next.js (mit API Routes für Backend-Logik), TypeScript, lokale SQLite-Datenbank (via Prisma ORM), Tailwind CSS für Styling, shadcn/ui für Komponenten.
3.  **UI/UX:** shadcn/ui liefert qualitativ hochwertige, anpassbare Komponenten. Fokus auf Funktionalität und saubere Umsetzung der PRD-Anforderungen.
4.  **Authentifizierung:** Simple lokale Authentifizierung (Auswahl eines Testnutzers, keine Passwörter im MVP). Alle Testnutzer haben die Rolle "Planer".
5.  **Daten:** Umfangreiche Nutzung von Dummy-Daten für die Entwicklung und zum Befüllen der lokalen SQLite-DB über Seed-Skripte.
6.  **Definition of Done (DoD) für MVP:** Alle im PRD als Kernfunktionalität beschriebenen Features sind implementiert, kritische Logik (240h-Regel) ist serverseitig in API Routes implementiert und durch Dummy-Daten testbar. Die App läuft lokal stabil.
7.  **Kommunikation:** Tägliche kurze Stand-ups (15 Min.) und eine wöchentliche Demo/Review (1 Stunde).
8.  **Priorisierung:** "Optional für MVP"-Features werden *nicht* umgesetzt.

**Rollenverteilung (flexibel, da Next.js Full-Stack ermöglicht):**
*   **3 Full-Stack Entwickler (Next.js):** Arbeiten an UI-Komponenten, Seitenaufbau, API-Routen, Datenbankinteraktion und Geschäftslogik.
*   **1 Full-Stack Entwickler mit Fokus auf Datenmodellierung/ORM & Kernlogik:** Stellt sicher, dass das DB-Schema korrekt ist, Seed-Skripte funktionieren und die Kernlogik (240h-Regel) robust implementiert wird.
*   **1 Full-Stack Entwickler mit Fokus auf UI-Konsistenz & Testing:** Achtet auf einheitliche Nutzung von shadcn/ui, unterstützt bei komplexeren UI-Interaktionen und treibt die Teststrategie voran. Übernimmt auch Koordination/PM-Unterstützung.

---

## Phase 0: Setup & Grundstruktur (ca. 30 Stunden - Teamübergreifend)

### Aufgabe 0.1: Kick-off Meeting & finale Klärungen
*   **Dauer:** 4 Stunden
*   **Beteiligte:** Alle
*   **Ziel:** Gemeinsames Verständnis des PRDs, Bestätigung des angepassten Scopes für MVP.
*   **Aktivitäten:** PRD durchgehen, Verantwortlichkeiten abstecken, Kommunikationswege festlegen.
*   **Ergebnis:** Klares Bild der anstehenden Aufgaben und Ziele.

### Aufgabe 0.2: Next.js Projekt-Setup & Basiskonfiguration
*   **Dauer:** 10 Stunden
*   **Beteiligte:** 2 Entwickler
*   **Ziel:** Lauffähiges Next.js Basisprojekt mit Kerntechnologien.
*   **Aktivitäten:** Next.js/TS init, Tailwind CSS, shadcn/ui Integration & Test, Basis-Layout-Komponenten, Git-Repo-Setup.
*   **Ergebnis:** Funktionierendes Next.js Projekt, Git-Repo einsatzbereit.

### Aufgabe 0.3: Datenbank-Setup & ORM-Integration
*   **Dauer:** 10 Stunden
*   **Beteiligte:** 1-2 Entwickler (Fokus DB/ORM)
*   **Ziel:** Definiertes DB-Schema und Interaktion via ORM.
*   **Aktivitäten:** Prisma Setup, `schema.prisma` Definition (alle Tabellen aus PRD 5), erste Migration, Prisma Client Generierung.
*   **Ergebnis:** Lokale SQLite-DB mit korrekter Struktur, Prisma Client einsatzbereit.

### Aufgabe 0.4: Dummy-Daten Strategie & initiale Seed-Skripte
*   **Dauer:** 6 Stunden
*   **Beteiligte:** 1 Entwickler (Unterstützung durch Team)
*   **Ziel:** DB mit initialen, repräsentativen Dummy-Daten befüllen.
*   **Aktivitäten:** Definition essentieller Stammdaten (StudyPrograms, Lecturers, Quarters, Cohorts, Lectures), Erstellung & Testen eines Prisma Seed-Skripts.
*   **Ergebnis:** Funktionierendes Seed-Skript für grundlegende Stammdaten.

---

## Phase 1: Basis-Authentifizierung & Stammdaten-Management (ca. 90 Stunden)

### Aufgabe 1.1: Einfache lokale Authentifizierung
*   **Dauer:** 10 Stunden
*   **Beteiligte:** 1 Entwickler
*   **Ziel:** Simulieren eines "eingeloggten" Testnutzers und Seitenschutz.
*   **Aktivitäten:** `/dev-login` Seite mit Nutzer-Auswahl (Dropdown), Speicherung im globalen Zustand (Context/Zustand), einfacher "Auth-Guard" mit Redirect.
*   **Ergebnis:** Test-Account-Auswahl, geschützte Seiten nur nach Auswahl zugänglich.

### Aufgabe 1.2: Stammdaten-Verwaltung API Routes & UI
*   **Dauer:** 60 Stunden
*   **Beteiligte:** 3-4 Entwickler parallel
*   **Ziel:** CRUD-Funktionalität für alle Stammdaten-Entitäten (`Lecturers`, `Lectures`, `StudyPrograms`, `Cohorts`, `Quarters`).
*   **Pro Entität (ca. 12-15h):**
    *   **API Routes:** `GET /api/[entity]`, `POST /api/[entity]`, `GET /api/[entity]/[id]`, `PUT /api/[entity]/[id]`, `DELETE /api/[entity]/[id]`. Nutzung Prisma Client. Input-Validierung.
    *   **UI (Pages/App Router):** Listenansicht (shadcn/ui `Table`), Formulare für Neu/Bearbeiten (shadcn/ui `Dialog` oder separate Seite, `Input`, `Select` etc.), Aktionen (Bearbeiten, Löschen mit Bestätigung), Anbindung an API Routes, client-seitige Filter.
*   **Aufteilung (Beispiel):** Dev1: StudyPrograms & Quarters, Dev2: Lecturers, Dev3: Lectures, Dev4: Cohorts.
*   **Ergebnis:** Alle Stammdaten via UI verwaltbar, Daten in SQLite persistiert.

### Aufgabe 1.3: Dashboard / Startseite & Globale Navigation
*   **Dauer:** 20 Stunden
*   **Beteiligte:** 1-2 Entwickler
*   **Ziel:** Funktionaler Einstiegspunkt und konsistente Navigation.
*   **Aktivitäten:** Dashboard-Seite gestalten, dynamische Quartalsliste (API-Abruf), Hauptnavigation (Sidebar/Top-Nav) in Layout-Komponente, Links zu Stammdatenbereichen.
*   **Ergebnis:** Funktionale Startseite und durchgängige Navigation.

---

## Phase 2: Kernfunktionalität Planung (ca. 160 Stunden - Teamübergreifend)

### Aufgabe 2.1: API Routes & Serverseitige Logik für `ScheduledCourses`
*   **Dauer:** 30 Stunden
*   **Beteiligte:** 2 Entwickler
*   **Ziel:** Backend-Logik für das Planen von Vorlesungen (PRD 6.3 Teil 1).
*   **Aktivitäten:** API Routes für Erstellung, Bearbeitung (`custom_hours`, `custom_name`), Entfernung von `ScheduledCourses`. Übernahme von Default-Werten. Sicherstellung Unique Constraints (`quarter_id`, `cohort_id`, `lecture_id`).
*   **Ergebnis:** Serverseitige Logik für `ScheduledCourses` ist implementiert und testbar.

### Aufgabe 2.2: API Routes & Serverseitige Logik für `Assignments` & 240h-Regel
*   **Dauer:** 40 Stunden
*   **Beteiligte:** 2 Entwickler
*   **Ziel:** Backend-Logik für Dozentenzuweisung inkl. 240h-Stunden-Regel (PRD 6.4).
*   **Aktivitäten:** API Routes für Erstellung, Änderung, Löschung von `Assignments`. Implementierung der dynamischen Berechnung der verplanten Stunden externer Dozierender pro akademischem Jahr. API Route für diese Berechnung. Validierungslogik (240h-Warnung, Summe `assigned_hours` vs. `custom_hours`).
*   **Ergebnis:** Kernlogik für Dozentenzuweisung und 240h-Regel ist serverseitig implementiert und testbar.

### Aufgabe 2.3: Frontend-Implementierung Quartalsplanung Screen
*   **Dauer:** 50 Stunden
*   **Beteiligte:** 2 Entwickler
*   **Ziel:** UI für die Quartalsplanung (PRD 6.3).
*   **Aktivitäten:** Quartals-/Studiengangauswahl. Anzeige `ScheduledCourses` pro Kurs (shadcn/ui `Tabs`). "+ Vorlesung planen" Dialog mit `Lectures`-Liste. Aktionen pro `ScheduledCourse`. Hauptplanungsliste für Zuweisungen. Anbindung an APIs.
*   **Ergebnis:** UI für die Verwaltung von `ScheduledCourses` und die Übersicht der Planungsliste.

### Aufgabe 2.4: Frontend-Implementierung Dozierenden-Zuweisungs-Modal/-Seite
*   **Dauer:** 40 Stunden
*   **Beteiligte:** 2 Entwickler
*   **Ziel:** UI für die Zuweisung von Dozierenden zu einer `ScheduledCourse` (PRD 6.4).
*   **Aktivitäten:** `Dialog` oder Seite mit Kontextinfo. Liste zugewiesener Dozierender (Bearbeiten/Entfernen). "Dozierenden hinzufügen" Button. Dozierenden-Auswahl (shadcn/ui `Combobox`) mit dynamischer Anzeige verplanter Stunden (API-Call). Stundeneingabe. Anzeige von Backend-Warnungen. Anbindung an APIs.
*   **Ergebnis:** UI für die detaillierte Zuweisung von Dozierenden inkl. Stundenvalidierung.

---

## Phase 3: Archiv, Tests & Feinschliff (ca. 70 Stunden - Teamübergreifend)

### Aufgabe 3.1: Archivansicht (API & UI)
*   **Dauer:** 20 Stunden
*   **Beteiligte:** 1-2 Entwickler
*   **Ziel:** Read-only Ansicht vergangener Planungen (PRD 6.5).
*   **Aktivitäten:** Read-only API Routes für vergangene Quartalsdaten. Frontend-Seite mit Quartals-/Studiengangfilter. Read-only Darstellung der Planungsdaten (Wiederverwendung von Komponenten).
*   **Ergebnis:** Nutzer können abgeschlossene Planungen einsehen.

### Aufgabe 3.2: Testing (Manuell & API-Level)
*   **Dauer:** 30 Stunden
*   **Beteiligte:** Alle Entwickler (koordiniert durch UI/Test-Fokus Entwickler)
*   **Ziel:** Sicherstellung der Kernfunktionalität und Identifikation von Bugs.
*   **Aktivitäten:** Entwickler testen eigene API Routes (Postman/Skripte) mit Dummy-Daten (insb. 240h-Regel). Manuelle Klick-Tests aller Workflows. Fokus auf positive und wichtige negative Testfälle.
*   **Ergebnis:** Höhere Stabilität und Zuverlässigkeit der Anwendung. Liste bekannter Issues.

### Aufgabe 3.3: Bugfixing & UI Polish
*   **Dauer:** 15 Stunden
*   **Beteiligte:** Alle Entwickler
*   **Ziel:** Behebung identifizierter Fehler und Verbesserung der User Experience.
*   **Aktivitäten:** Fehlerbehebung basierend auf Testergebnissen. Konsistenzverbesserungen im UI. Überprüfung Basis-Responsivität.
*   **Ergebnis:** Eine stabilere und benutzerfreundlichere Anwendung.

### Aufgabe 3.4: Seed-Daten Erweiterung/Verfeinerung
*   **Dauer:** 5 Stunden
*   **Beteiligte:** 1 Entwickler (DB/Logik-Fokus)
*   **Ziel:** Repräsentative Dummy-Daten zur Demonstration aller Features.
*   **Aktivitäten:** Sicherstellen vielfältiger Daten (externe Dozenten nahe/über 240h, teil-zugewiesene Kurse etc.).
*   **Ergebnis:** Aussagekräftige Demodaten.

---

## Phase 4: Finale Touches & Übergabe-Vorbereitung (ca. 10 Stunden)

### Aufgabe 4.1: Build-Prozess & Deployment-Notizen
*   **Dauer:** 5 Stunden
*   **Beteiligte:** Koordinator/Lead-Entwickler
*   **Ziel:** Sicherstellen eines funktionierenden Builds und Basis-Infos für Deployment.
*   **Aktivitäten:** `npm run build` testen. Kurze Notizen für mögliches Deployment (z.B. Vercel, Netlify).
*   **Ergebnis:** App ist baubar, erste Deployment-Überlegungen dokumentiert.

### Aufgabe 4.2: Kurze technische Dokumentation/README
*   **Dauer:** 5 Stunden
*   **Beteiligte:** Koordinator/Lead-Entwickler
*   **Ziel:** Basis-Dokumentation für Übergabe oder Weiterentwicklung.
*   **Aktivitäten:** README aktualisieren: Projektstart, Seed-Skripte, wichtige Tech-Entscheidungen.
*   **Ergebnis:** Grundlegende technische Dokumentation.

---

## Puffer (ca. 40 Stunden)
*   Diese Stunden dienen als Puffer für unvorhergesehene Probleme, komplexere Teilaufgaben oder um bei bestimmten Features etwas mehr ins Detail zu gehen, falls die Zeit es erlaubt.

---

## Wichtige Meilensteine & Reviews

*   **Ende Phase 0:** Projekt-Setup abgeschlossen, DB-Schema definiert, erste Seed-Daten vorhanden.
*   **Ende Phase 1:** Stammdaten-Verwaltung (CRUD & UI) für alle Entitäten funktional. Einfache lokale Authentifizierung vorhanden. Dashboard zeigt Quartale. **(Review-Meeting)**
*   **Ende Phase 2:** Kernplanungsfunktionalität (Vorlesungen planen, Dozenten zuweisen inkl. 240h-Warnung und Stundenvalidierung) ist über API Routes und UI implementiert und mit Dummy-Daten testbar. **Dies ist der wichtigste Meilenstein für den MVP. (Review-Meeting)**
*   **Ende Phase 3:** Archivansicht ist implementiert. App ist intensiv manuell getestet, kritische Bugs sind behoben. Seed-Daten sind repräsentativ.
*   **Ende Phase 4:** MVP ist finalisiert, Basis-Doku für eine mögliche Übergabe oder Weiterentwicklung ist erstellt. **(Finale MVP-Demo & Abschluss-Review)**
