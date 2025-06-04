# DHBW Vorlesungsplanung

Dieses Projekt ist ein kleines MVP zur Planung von Vorlesungen an der DHBW. Alle Daten werden im Browser über `localStorage` gespeichert.

## Entwicklung starten

```bash
npm install
npm run dev
```

Die Anwendung läuft anschließend unter http://localhost:3000.

## Funktionen

- Dashboard mit Übersicht aller Daten
- Verwaltung von Dozierenden unter `/dozierende`
- Verwaltung von Studiengängen unter `/studiengaenge`
- Verwaltung von Vorlesungen unter `/vorlesungen`
- Verwaltung von Kursen unter `/kurse`
- Einfache Vorlesungsplanung unter `/planung`

Die Daten werden lokal im Browser gespeichert und können nach einem Reload wieder aufgerufen werden.
