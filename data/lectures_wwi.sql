-- In der Tabelle `study_programs` hat Wirtschaftsinformatik den `id`-Wert 2.
-- TODOs: siehe `lectures_tif.sql`

INSERT INTO lectures (study_program_id, semester, title, hours, created_at, updated_at) VALUES
-- 1. Semester
(2, 1, 'Einführung ERP-Systeme',                                   30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Einführung in die Wirtschaftsinformatik',                  24, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Grundlagen der IT',                                        24, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Einführung in die Programmierung',                         60, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Einführung in die Betriebswirtschaftslehre',               36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Marketing',                                                24, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Vertrags-/Schuldrecht',                                    30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Handels-/Gesellschaftsrecht',                              30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Analysis und Lineare Algebra',                             30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Wissenschaftliches Arbeiten 1',                             8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Präsentation/Kommunikationskompetenz',                     30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 2. Semester
(2, 2, 'Vertiefung ERP-Systeme',                                   30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Systemanalyse und -entwurf',                               36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Kommunikations- und Betriebssysteme',                      36, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Fortgeschrittene Programmierung',                          30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Algorithmen / Datenstrukturen',                            30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Technik der Finanzbuchführung',                            30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Kosten- und Leistungsrechnung',                            30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Logik und Algebra',                                        30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Wissenschaftliches Arbeiten 2',                            22, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 3. Semester
(2, 3, 'Projektmanagement',                                        27, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Datenbanken I + II',                                       55, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Web-Programmierung',                                       33, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Verteilte Systeme',                                        22, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Investition und Finanzierung',                             28, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Bilanzierung',                                             27, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Statistik',                                                28, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 3, 'Teamarbeit',                                               27, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 4. Semester
(2, 4, 'Fortgeschrittene Systementwicklung',                       55, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 4, 'Fallstudie',                                               28, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 4, 'Mikro-/Makroökonomie',                                     28, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 4, 'Geld, Währung, Wirtschaftspolitik',                        27, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 4, 'Operation Research',                                       27, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 4, 'Technikfolgenabschätzung',                                 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 5. Semester
(2, 5, 'IT-Service-Management',                                    50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 5, 'Geschäftsprozessmanagement',                               30, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 5, 'Projektkonzeption',                                        20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 5, 'Neue Konzepte',                                            50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 5, 'Wissensmanagement',                                        25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),

-- 6. Semester
(2, 6, 'IT-Security-Management',                                   50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 6, 'Projektrealisierung',                                      50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 6, 'Grundlagen Unternehmensführung + Strategieentwicklung',    25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 6, 'Businessplan Organisationsentwicklung',                    25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
