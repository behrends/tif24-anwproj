import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Define types for our data
interface Vorlesung {
  id: string;
  name: string;
  beschreibung: string;
  dozent: string;
  ects: number;
}

interface Semester {
  nummer: number;
  vorlesungen: Vorlesung[];
}

interface Studiengang {
  id: string;
  name: string;
  description: string;
  semester: Semester[];
}

// Sample data for study programs
const studiengaengeData: Studiengang[] = [
  {
    id: 'informatik',
    name: 'Informatik',
    description: 'Bachelor of Science in Informatik',
    semester: [
      {
        nummer: 1,
        vorlesungen: [
          { id: 'inf-1-1', name: 'Einführung in die Programmierung', beschreibung: 'Grundlagen der Programmierung mit Java', dozent: 'Prof. Dr. Schmidt', ects: 6 },
          { id: 'inf-1-2', name: 'Mathematik für Informatiker I', beschreibung: 'Lineare Algebra und Analysis', dozent: 'Prof. Dr. Müller', ects: 8 },
          { id: 'inf-1-3', name: 'Grundlagen der Informatik', beschreibung: 'Einführung in theoretische Konzepte', dozent: 'Prof. Dr. Weber', ects: 5 },
          { id: 'inf-1-4', name: 'Technische Grundlagen', beschreibung: 'Hardware und Betriebssysteme', dozent: 'Dr. Fischer', ects: 5 },
        ]
      },
      {
        nummer: 2,
        vorlesungen: [
          { id: 'inf-2-1', name: 'Algorithmen und Datenstrukturen', beschreibung: 'Grundlegende Algorithmen und Datenstrukturen', dozent: 'Prof. Dr. Schmidt', ects: 8 },
          { id: 'inf-2-2', name: 'Mathematik für Informatiker II', beschreibung: 'Diskrete Mathematik und Logik', dozent: 'Prof. Dr. Müller', ects: 6 },
          { id: 'inf-2-3', name: 'Objektorientierte Programmierung', beschreibung: 'Fortgeschrittene Programmierung in Java', dozent: 'Dr. Krause', ects: 6 },
          { id: 'inf-2-4', name: 'Rechnerarchitektur', beschreibung: 'Aufbau und Funktionsweise von Computern', dozent: 'Prof. Dr. Becker', ects: 5 },
        ]
      },
      {
        nummer: 3,
        vorlesungen: [
          { id: 'inf-3-1', name: 'Datenbanksysteme', beschreibung: 'Entwurf und Implementation von Datenbanken', dozent: 'Prof. Dr. Schmidt', ects: 6 },
          { id: 'inf-3-2', name: 'Softwaretechnik', beschreibung: 'Methoden und Werkzeuge der Softwareentwicklung', dozent: 'Prof. Dr. Koch', ects: 6 },
          { id: 'inf-3-3', name: 'Theoretische Informatik', beschreibung: 'Formale Sprachen und Automatentheorie', dozent: 'Prof. Dr. Weber', ects: 8 },
          { id: 'inf-3-4', name: 'Statistik', beschreibung: 'Grundlagen der Wahrscheinlichkeitsrechnung', dozent: 'Dr. König', ects: 5 },
        ]
      },
      {
        nummer: 4,
        vorlesungen: [
          { id: 'inf-4-1', name: 'Betriebssysteme', beschreibung: 'Konzepte moderner Betriebssysteme', dozent: 'Prof. Dr. Fischer', ects: 6 },
          { id: 'inf-4-2', name: 'Rechnernetze', beschreibung: 'Grundlagen der Netzwerktechnologie', dozent: 'Prof. Dr. Schulz', ects: 6 },
          { id: 'inf-4-3', name: 'Web Engineering', beschreibung: 'Entwicklung von Webanwendungen', dozent: 'Dr. Krause', ects: 6 },
          { id: 'inf-4-4', name: 'IT-Sicherheit', beschreibung: 'Grundlagen der Informationssicherheit', dozent: 'Prof. Dr. Becker', ects: 6 },
        ]
      },
      {
        nummer: 5,
        vorlesungen: [
          { id: 'inf-5-1', name: 'Künstliche Intelligenz', beschreibung: 'Grundlagen und Algorithmen der KI', dozent: 'Prof. Dr. Weber', ects: 6 },
          { id: 'inf-5-2', name: 'Software-Projekt', beschreibung: 'Praktisches Softwareprojekt in Teams', dozent: 'Prof. Dr. Koch', ects: 8 },
          { id: 'inf-5-3', name: 'Verteilte Systeme', beschreibung: 'Konzepte und Architekturen verteilter Systeme', dozent: 'Dr. Fischer', ects: 6 },
          { id: 'inf-5-4', name: 'Mobile Anwendungen', beschreibung: 'Entwicklung von mobilen Apps', dozent: 'Dr. Krause', ects: 5 },
        ]
      },
      {
        nummer: 6,
        vorlesungen: [
          { id: 'inf-6-1', name: 'Bachelor-Arbeit', beschreibung: 'Wissenschaftliche Abschlussarbeit', dozent: 'Verschiedene', ects: 12 },
          { id: 'inf-6-2', name: 'Bachelor-Seminar', beschreibung: 'Vorbereitung und Präsentation der Abschlussarbeit', dozent: 'Verschiedene', ects: 3 },
          { id: 'inf-6-3', name: 'Wahlpflichtmodul 1', beschreibung: 'Spezialisierung nach Wahl', dozent: 'Verschiedene', ects: 6 },
          { id: 'inf-6-4', name: 'Wahlpflichtmodul 2', beschreibung: 'Spezialisierung nach Wahl', dozent: 'Verschiedene', ects: 6 },
        ]
      }
    ]
  },
  {
    id: 'wirtschaftsinformatik',
    name: 'Wirtschaftsinformatik',
    description: 'Bachelor of Science in Wirtschaftsinformatik',
    semester: [
      {
        nummer: 1,
        vorlesungen: [
          { id: 'wi-1-1', name: 'Grundlagen der Wirtschaftsinformatik', beschreibung: 'Einführung in die Wirtschaftsinformatik', dozent: 'Prof. Dr. Meier', ects: 6 },
          { id: 'wi-1-2', name: 'BWL Grundlagen', beschreibung: 'Betriebswirtschaftliche Grundlagen', dozent: 'Prof. Dr. Schneider', ects: 6 },
          { id: 'wi-1-3', name: 'Programmierung I', beschreibung: 'Grundlagen der Programmierung', dozent: 'Dr. Wagner', ects: 6 },
          { id: 'wi-1-4', name: 'Mathematik für WI', beschreibung: 'Mathematische Grundlagen', dozent: 'Prof. Dr. Müller', ects: 6 },
        ]
      },
      {
        nummer: 2,
        vorlesungen: [
          { id: 'wi-2-1', name: 'Rechnungswesen', beschreibung: 'Grundlagen des Rechnungswesens', dozent: 'Prof. Dr. Schneider', ects: 6 },
          { id: 'wi-2-2', name: 'Datenbanksysteme', beschreibung: 'Grundlagen der Datenbanken', dozent: 'Prof. Dr. Schmidt', ects: 6 },
          { id: 'wi-2-3', name: 'Programmierung II', beschreibung: 'Fortgeschrittene Programmierung', dozent: 'Dr. Wagner', ects: 6 },
          { id: 'wi-2-4', name: 'Statistik', beschreibung: 'Grundlagen der Statistik', dozent: 'Dr. König', ects: 6 },
        ]
      },
      {
        nummer: 3,
        vorlesungen: [
          { id: 'wi-3-1', name: 'Geschäftsprozessmanagement', beschreibung: 'Modellierung und Optimierung von Geschäftsprozessen', dozent: 'Prof. Dr. Meier', ects: 6 },
          { id: 'wi-3-2', name: 'Software Engineering', beschreibung: 'Methoden der Softwareentwicklung', dozent: 'Prof. Dr. Koch', ects: 6 },
          { id: 'wi-3-3', name: 'Wirtschaftsrecht', beschreibung: 'Rechtliche Grundlagen für Unternehmen', dozent: 'Prof. Dr. Hoffmann', ects: 6 },
          { id: 'wi-3-4', name: 'Marketing', beschreibung: 'Grundlagen des Marketings', dozent: 'Prof. Dr. Schneider', ects: 6 },
        ]
      },
      {
        nummer: 4,
        vorlesungen: [
          { id: 'wi-4-1', name: 'Business Intelligence', beschreibung: 'Datenanalyse für Unternehmen', dozent: 'Prof. Dr. Schmidt', ects: 6 },
          { id: 'wi-4-2', name: 'IT-Projektmanagement', beschreibung: 'Management von IT-Projekten', dozent: 'Dr. Krause', ects: 6 },
          { id: 'wi-4-3', name: 'ERP-Systeme', beschreibung: 'Enterprise Resource Planning', dozent: 'Prof. Dr. Meier', ects: 6 },
          { id: 'wi-4-4', name: 'Finanzwirtschaft', beschreibung: 'Grundlagen der Finanzwirtschaft', dozent: 'Prof. Dr. Wolf', ects: 6 },
        ]
      },
      {
        nummer: 5,
        vorlesungen: [
          { id: 'wi-5-1', name: 'E-Business', beschreibung: 'Digitale Geschäftsmodelle', dozent: 'Prof. Dr. Meier', ects: 6 },
          { id: 'wi-5-2', name: 'IT-Sicherheit', beschreibung: 'Sicherheitskonzepte und -maßnahmen', dozent: 'Prof. Dr. Becker', ects: 6 },
          { id: 'wi-5-3', name: 'Projektarbeit', beschreibung: 'Praktisches Projekt in Wirtschaftsinformatik', dozent: 'Dr. Wagner', ects: 8 },
          { id: 'wi-5-4', name: 'Wahlpflichtmodul', beschreibung: 'Spezialisierung nach Wahl', dozent: 'Verschiedene', ects: 5 },
        ]
      },
      {
        nummer: 6,
        vorlesungen: [
          { id: 'wi-6-1', name: 'Bachelor-Arbeit', beschreibung: 'Wissenschaftliche Abschlussarbeit', dozent: 'Verschiedene', ects: 12 },
          { id: 'wi-6-2', name: 'Seminar', beschreibung: 'Forschungsseminar', dozent: 'Verschiedene', ects: 3 },
          { id: 'wi-6-3', name: 'IT-Consulting', beschreibung: 'Grundlagen der IT-Beratung', dozent: 'Prof. Dr. Koch', ects: 6 },
          { id: 'wi-6-4', name: 'Wahlpflichtmodul', beschreibung: 'Spezialisierung nach Wahl', dozent: 'Verschiedene', ects: 6 },
        ]
      }
    ]
  },
  {
    id: 'bwl',
    name: 'BWL',
    description: 'Bachelor of Science in Betriebswirtschaftslehre',
    semester: [
      {
        nummer: 1,
        vorlesungen: [
          { id: 'bwl-1-1', name: 'Einführung in die BWL', beschreibung: 'Grundlagen der Betriebswirtschaftslehre', dozent: 'Prof. Dr. Schneider', ects: 6 },
          { id: 'bwl-1-2', name: 'VWL Grundlagen', beschreibung: 'Volkswirtschaftliche Grundlagen', dozent: 'Prof. Dr. Wolf', ects: 6 },
          { id: 'bwl-1-3', name: 'Rechnungswesen I', beschreibung: 'Buchführung und Bilanzierung', dozent: 'Dr. Schwarz', ects: 6 },
          { id: 'bwl-1-4', name: 'Wirtschaftsmathematik', beschreibung: 'Mathematische Grundlagen für BWL', dozent: 'Prof. Dr. Müller', ects: 6 },
        ]
      },
      {
        nummer: 2,
        vorlesungen: [
          { id: 'bwl-2-1', name: 'Marketing Grundlagen', beschreibung: 'Einführung in das Marketing', dozent: 'Prof. Dr. Schneider', ects: 6 },
          { id: 'bwl-2-2', name: 'Personalwirtschaft', beschreibung: 'Grundlagen des Personalmanagements', dozent: 'Dr. Klein', ects: 6 },
          { id: 'bwl-2-3', name: 'Rechnungswesen II', beschreibung: 'Kosten- und Leistungsrechnung', dozent: 'Dr. Schwarz', ects: 6 },
          { id: 'bwl-2-4', name: 'Wirtschaftsstatistik', beschreibung: 'Statistische Methoden für BWL', dozent: 'Dr. König', ects: 6 },
        ]
      },
      {
        nummer: 3,
        vorlesungen: [
          { id: 'bwl-3-1', name: 'Finanzwirtschaft', beschreibung: 'Grundlagen der Unternehmensfinanzierung', dozent: 'Prof. Dr. Wolf', ects: 6 },
          { id: 'bwl-3-2', name: 'Wirtschaftsrecht', beschreibung: 'Handels- und Gesellschaftsrecht', dozent: 'Prof. Dr. Hoffmann', ects: 6 },
          { id: 'bwl-3-3', name: 'Produktion und Logistik', beschreibung: 'Grundlagen der Produktionswirtschaft', dozent: 'Prof. Dr. Schulz', ects: 6 },
          { id: 'bwl-3-4', name: 'Wirtschaftsinformatik', beschreibung: 'IT-Grundlagen für BWL', dozent: 'Prof. Dr. Meier', ects: 6 },
        ]
      },
      {
        nummer: 4,
        vorlesungen: [
          { id: 'bwl-4-1', name: 'Controlling', beschreibung: 'Unternehmenssteuerung und -planung', dozent: 'Dr. Schwarz', ects: 6 },
          { id: 'bwl-4-2', name: 'Unternehmensführung', beschreibung: 'Management und Organisation', dozent: 'Prof. Dr. Schneider', ects: 6 },
          { id: 'bwl-4-3', name: 'Wirtschaftspolitik', beschreibung: 'Staatliche Wirtschaftssteuerung', dozent: 'Prof. Dr. Wolf', ects: 6 },
          { id: 'bwl-4-4', name: 'Steuerlehre', beschreibung: 'Grundlagen der Besteuerung', dozent: 'Prof. Dr. Hoffmann', ects: 6 },
        ]
      },
      {
        nummer: 5,
        vorlesungen: [
          { id: 'bwl-5-1', name: 'Strategisches Management', beschreibung: 'Entwicklung und Umsetzung von Unternehmensstrategien', dozent: 'Prof. Dr. Schneider', ects: 6 },
          { id: 'bwl-5-2', name: 'Internationales Management', beschreibung: 'Globale Unternehmensführung', dozent: 'Dr. Klein', ects: 6 },
          { id: 'bwl-5-3', name: 'Seminar', beschreibung: 'Forschungsseminar BWL', dozent: 'Verschiedene', ects: 6 },
          { id: 'bwl-5-4', name: 'Wahlpflichtmodul', beschreibung: 'Spezialisierung nach Wahl', dozent: 'Verschiedene', ects: 6 },
        ]
      },
      {
        nummer: 6,
        vorlesungen: [
          { id: 'bwl-6-1', name: 'Bachelor-Arbeit', beschreibung: 'Wissenschaftliche Abschlussarbeit', dozent: 'Verschiedene', ects: 12 },
          { id: 'bwl-6-2', name: 'Projektarbeit', beschreibung: 'Praktisches Unternehmensprojekt', dozent: 'Verschiedene', ects: 6 },
          { id: 'bwl-6-3', name: 'Business Ethics', beschreibung: 'Unternehmensethik und Nachhaltigkeit', dozent: 'Prof. Dr. Hoffmann', ects: 6 },
          { id: 'bwl-6-4', name: 'Wahlpflichtmodul', beschreibung: 'Spezialisierung nach Wahl', dozent: 'Verschiedene', ects: 6 },
        ]
      }
    ]
  },
  {
    id: 'maschinenbau',
    name: 'Maschinenbau',
    description: 'Bachelor of Engineering in Maschinenbau',
    semester: [
      {
        nummer: 1,
        vorlesungen: [
          { id: 'mb-1-1', name: 'Technische Mechanik I', beschreibung: 'Statik und Festigkeitslehre', dozent: 'Prof. Dr. Wagner', ects: 6 },
          { id: 'mb-1-2', name: 'Mathematik für Ingenieure I', beschreibung: 'Analysis und lineare Algebra', dozent: 'Prof. Dr. Müller', ects: 8 },
          { id: 'mb-1-3', name: 'Werkstoffkunde', beschreibung: 'Grundlagen der Werkstofftechnik', dozent: 'Prof. Dr. Schulz', ects: 6 },
          { id: 'mb-1-4', name: 'Technisches Zeichnen', beschreibung: 'Grundlagen der technischen Darstellung', dozent: 'Dr. Krause', ects: 5 },
        ]
      },
      {
        nummer: 2,
        vorlesungen: [
          { id: 'mb-2-1', name: 'Technische Mechanik II', beschreibung: 'Kinetik und Kinetik', dozent: 'Prof. Dr. Wagner', ects: 6 },
          { id: 'mb-2-2', name: 'Mathematik für Ingenieure II', beschreibung: 'Differentialgleichungen und numerische Methoden', dozent: 'Prof. Dr. Müller', ects: 6 },
          { id: 'mb-2-3', name: 'Fertigungstechnik', beschreibung: 'Grundlegende Fertigungsverfahren', dozent: 'Prof. Dr. Schulz', ects: 6 },
          { id: 'mb-2-4', name: 'Elektrotechnik', beschreibung: 'Grundlagen der Elektrotechnik', dozent: 'Dr. Fischer', ects: 5 },
        ]
      },
      {
        nummer: 3,
        vorlesungen: [
          { id: 'mb-3-1', name: 'Thermodynamik', beschreibung: 'Grundlagen der Wärmelehre', dozent: 'Prof. Dr. Wagner', ects: 6 },
          { id: 'mb-3-2', name: 'Maschinenelemente I', beschreibung: 'Verbindungselemente und Wellen', dozent: 'Prof. Dr. Becker', ects: 6 },
          { id: 'mb-3-3', name: 'Strömungslehre', beschreibung: 'Grundlagen der Fluiddynamik', dozent: 'Dr. Krause', ects: 6 },
          { id: 'mb-3-4', name: 'CAD', beschreibung: 'Computer-Aided Design', dozent: 'Dr. Wagner', ects: 5 },
        ]
      },
      {
        nummer: 4,
        vorlesungen: [
          { id: 'mb-4-1', name: 'Maschinenelemente II', beschreibung: 'Lager und Getriebe', dozent: 'Prof. Dr. Becker', ects: 6 },
          { id: 'mb-4-2', name: 'Regelungstechnik', beschreibung: 'Grundlagen der Steuerungs- und Regelungstechnik', dozent: 'Prof. Dr. Fischer', ects: 6 },
          { id: 'mb-4-3', name: 'Konstruktionslehre', beschreibung: 'Methoden des konstruktiven Entwurfs', dozent: 'Prof. Dr. Schulz', ects: 6 },
          { id: 'mb-4-4', name: 'Messtechnik', beschreibung: 'Grundlagen der technischen Messtechnik', dozent: 'Dr. König', ects: 6 },
        ]
      },
      {
        nummer: 5,
        vorlesungen: [
          { id: 'mb-5-1', name: 'Werkzeugmaschinen', beschreibung: 'Aufbau und Einsatz von Werkzeugmaschinen', dozent: 'Prof. Dr. Schulz', ects: 6 },
          { id: 'mb-5-2', name: 'Finite Elemente Methode', beschreibung: 'Numerische Berechnungsverfahren', dozent: 'Prof. Dr. Wagner', ects: 6 },
          { id: 'mb-5-3', name: 'Projektarbeit', beschreibung: 'Praktisches Maschinenbau-Projekt', dozent: 'Verschiedene', ects: 8 },
          { id: 'mb-5-4', name: 'Wahlpflichtmodul', beschreibung: 'Spezialisierung nach Wahl', dozent: 'Verschiedene', ects: 5 },
        ]
      },
      {
        nummer: 6,
        vorlesungen: [
          { id: 'mb-6-1', name: 'Bachelor-Arbeit', beschreibung: 'Wissenschaftliche Abschlussarbeit', dozent: 'Verschiedene', ects: 12 },
          { id: 'mb-6-2', name: 'Qualitätsmanagement', beschreibung: 'Methoden der Qualitätssicherung', dozent: 'Dr. König', ects: 6 },
          { id: 'mb-6-3', name: 'Produktionsplanung', beschreibung: 'Organisation der Produktion', dozent: 'Prof. Dr. Schulz', ects: 6 },
          { id: 'mb-6-4', name: 'Wahlpflichtmodul', beschreibung: 'Spezialisierung nach Wahl', dozent: 'Verschiedene', ects: 6 },
        ]
      }
    ]
  }
];

export default function StudiengangDetail({ params }: { params: { id: string } }) {
  const studiengang = studiengaengeData.find(s => s.id === params.id);
  
  if (!studiengang) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <Link 
          href="/studiengaenge" 
          className="text-blue-600 hover:underline flex items-center gap-1"
        >
          ← Zurück zur Übersicht
        </Link>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">{studiengang.name}</h1>
      <p className="text-lg text-muted-foreground mb-8">{studiengang.description}</p>
      
      <div className="space-y-10">
        {studiengang.semester.map((semester) => (
          <div key={semester.nummer} className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Semester {semester.nummer}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {semester.vorlesungen.map((vorlesung) => (
                <div 
                  key={vorlesung.id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-medium">{vorlesung.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{vorlesung.beschreibung}</p>
                  <div className="mt-3 flex justify-between text-sm">
                    <span>Dozent: {vorlesung.dozent}</span>
                    <span className="font-medium">{vorlesung.ects} ECTS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
