-- In der Tabelle `study_programs` hat Informatik den `id`-Wert 1.
-- TODOs: 
--    - Es fehlen z.B. noch die Wahlmodule und Prüfungsleistungen.
--    - Sollen langfristig auch Modulcodes, ECTS-Punkte, Module/Units mit in die Tabelle?


INSERT INTO lectures (study_program_id, semester, title, hours, created_at, updated_at) VALUES
(1, 1, 'Programmieren',                                      84, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Web-Engineering 1',                                  36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Web-Engineering 2',                                  36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Grundlagen und Logik',                               60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Digitaltechnik',                                     60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Analysis',                                           60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 1, 'Wissenschaftliches Arbeiten Workshop I',              8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'Programmiersprachen',                                84, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'Anwendungsprojekt Informatik',                       72, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'Algorithmen und Komplexität',                        60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'Lineare Algebra',                                    60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'BWL',                                                24, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 2, 'Projektmanagement 1 + 2',                            48, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Grundlagen des Software Engineering Teil 1',         36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Netztechnik',                                        48, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Labor Netztechnik',                                  12, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Rechnerarchitekturen 1',                             36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Betriebssysteme',                                    36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Systemnahe Programmierung 1',                        24, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Fortgeschrittene Algorithmen',                       60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Angewandte Mathematik',                              36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 3, 'Statistik',                                          36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 'Grundlagen des Software Engineering Teil 2',         60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 'Grundlagen von Datenbanksystemen',                   72, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 'Formale Sprachen & Automaten 1',                     48, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 'Einführung Compilerbau',                             24, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 'IT-Sicherheit',                                      60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 'Big Data',                                           30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 'Internet of Things',                                 30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 4, 'Wissenschaftliches Arbeiten Workshop II',             4,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 5, 'Advanced Software Engineering',                      60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 5, 'Aktuelle DB-Architekturen & -Technologien',          30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 5, 'Labor Aktuelle DB-Technologien',                     30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(1, 6, 'Wissenschaftliches Arbeiten Workshop III',            4,  CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);